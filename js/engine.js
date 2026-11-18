/* Cozinha Caos — motor: jogadores, interações, cozimento, pedidos */
(function (CC) {
  'use strict';
  const ITEMS = CC.ITEMS, DISHES = CC.DISHES, RECIPES = CC.RECIPES, APPS = CC.APPS;
  const E = CC.Engine = {};
  let G = null, raf = 0, lastT = 0, cvs = null;
  const keys = {};
  const TS = CC.TS = 64;

  /* ---------- multiconjuntos ---------- */
  function cnt(a) { const m = {}; a.forEach(function (x) { m[x] = (m[x] || 0) + 1; }); return m; }
  function contains(big, small) { const b = cnt(big); for (const k in cnt(small)) { if ((b[k] || 0) < cnt(small)[k]) return false; } return true; }
  function sameSet(a, b) { return a.length === b.length && contains(a, b); }
  function isSeason(id) { return !!(ITEMS[id] && ITEMS[id].season); }

  /* ---------- prato: pode receber? ---------- */
  function canAdd(plate, id) {
    if (!ITEMS[id] || ITEMS[id].burnt) return false;
    const parts = plate.items.filter(function (i) { return !isSeason(i); });
    const seas = plate.items.filter(isSeason);
    if (isSeason(id)) {
      if (!parts.length || seas.indexOf(id) >= 0 || seas.length >= 3) return false;
      return G.menu.some(function (d) { return contains(d.parts, parts) && d.seas.indexOf(id) >= 0 && seas.every(function (s) { return d.seas.indexOf(s) >= 0; }); });
    }
    const np = parts.concat([id]);
    return G.menu.some(function (d) { return contains(d.parts, np) && seas.every(function (s) { return d.seas.indexOf(s) >= 0; }); });
  }

  /* ---------- equipamentos ---------- */
  function appAccepts(a, id) {
    if (a.st !== 'idle' || a.out) return false;
    if (a.items.length >= APPS[a.kind].cap) return false;
    const ni = a.items.concat([id]);
    return G.recs.some(function (r) { return r.app === a.kind && contains(r.in, ni); });
  }
  function exactRecipe(a) { return G.recs.find(function (r) { return r.app === a.kind && sameSet(r.in, a.items); }); }
  function hasExtension(a) { return G.recs.some(function (r) { return r.app === a.kind && r.in.length > a.items.length && contains(r.in, a.items); }); }

  function updateApp(a, dt) {
    if (a.st === 'idle' && a.items.length && !a.out) {
      const r = exactRecipe(a);
      if (r) {
        if (hasExtension(a) && a.items.length < APPS[a.kind].cap) { a.grace += dt; a.wait = a.grace / 2.5; if (a.grace < 2.5) return; }
        a.st = 'cook'; a.rec = r; a.prog = 0; a.grace = 0; a.wait = 0;
        sfx('start');
      } else { a.grace = 0; a.wait = 0; }
    } else if (a.st === 'cook') {
      a.prog += dt;
      if (a.prog >= a.rec.t) { a.st = 'done'; a.out = a.rec.out; a.items = []; a.burn = 0; sfx('done'); toast(ITEMS[a.out].n + ' pronto!', 'ok'); }
    } else if (a.st === 'done') {
      a.burn += dt;
      if (a.burn > 8 && !a.warned) { a.warned = true; sfx('warn'); }
      if (a.burn >= 14) { a.out = 'queimado'; a.st = 'burnt'; a.warned = false; if (G) G.burnt++; sfx('burn'); toast('Queimou! Jogue no lixo', 'bad'); }
    }
  }

  /* ---------- estado ---------- */
  E.get = function () { return G; };
  const COLS = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f'];
  CC.COLS = COLS;
  function mkPlayer(i, built, skin, name) {
    const sp = [[2.5, 2.5], [2.5, built.H - 1.5], [4.5, 2.5], [4.5, built.H - 1.5]][i];
    skin = skin || {};
    return { id: i, x: sp[0], y: sp[1], dx: 0, dy: 1, hold: null, mx: 0, my: 0, act: false, dash: 0, dcd: 0, color: skin.color || COLS[i], hat: skin.hat || 'toque', walk: 0, name: name || ('P' + (i + 1)), chopping: false, msg: '', msgT: 0, remote: false };
  }
  E.start = function (canvas, lv, opts) {
    cvs = canvas; opts = opts || {};
    const built = CC.buildGrid(lv);
    G = {
      lv: lv, opts: opts, grid: built.grid, W: built.W, H: built.H,
      menu: lv.menu.map(function (id) { return DISHES[id]; }),
      players: [], orders: [], oid: 1, left: lv.tempo, time: 0,
      score: 0, tips: 0, delivered: 0, failed: 0, combo: 0, bestCombo: 0, lives: lv.lives || 0, burnt: 0, wrong: 0,
      nextIn: 2.5, pending: [], floats: [], parts: [], toasts: [], over: false, paused: false, started: false,
      countdown: opts.noCountdown ? 0 : 3, lastDish: null, serveLog: [], shake: 0, ev: [], net: opts.net || null, client: false, dishCount: {}
    };
    const rel = {};
    G.menu.forEach(function (d) { d.parts.forEach(function walk(id) { if (rel[id]) return; rel[id] = 1; (CC.PROD[id] || []).forEach(function (r) { r.in.forEach(walk); }); }); });
    G.recs = RECIPES.filter(function (r) { return rel[r.out]; });
    const np = opts.players || 1;
    for (let i = 0; i < np; i++) G.players.push(mkPlayer(i, built, opts.skins && opts.skins[i], opts.names && opts.names[i]));
    (opts.remote || []).forEach(function (i) { if (G.players[i]) G.players[i].remote = true; });
    setupInput(np);
    lastT = performance.now();
    cancelAnimationFrame(raf);
    loop(lastT);
    return G;
  };
  /* cliente online: só desenha o estado recebido do anfitrião e manda os controles */
  E.startClient = function (canvas, lv, state, myIdx, send) {
    cvs = canvas;
    G = { lv: lv, opts: { players: state.players.length }, grid: state.grid, W: state.W, H: state.H, menu: [], players: [], orders: [], floats: [], parts: [], toasts: [], ev: [],
      score: 0, left: 0, time: 0, combo: 0, delivered: 0, failed: 0, over: false, paused: false, countdown: 0, shake: 0, client: true, net: 'client', myIdx: myIdx, send: send, lives: 0 };
    E.applyState(state, true);
    setupInput(state.players.length);
    lastT = performance.now(); cancelAnimationFrame(raf); loop(lastT);
    return G;
  };
  E.serialize = function () {
    if (!G) return null;
    const grid = G.grid.map(function (row) {
      return row.map(function (t) {
        if (!t) return null;
        if (t.k === 'app') return { k: 'app', kind: t.kind, items: t.items, st: t.st, prog: t.prog, rec: t.rec ? { t: t.rec.t, out: t.rec.out } : null, out: t.out, burn: t.burn, wait: t.wait || 0 };
        if (t.k === 'crate') return t;
        return t;
      });
    });
    const ev = G.ev; G.ev = [];
    return {
      W: G.W, H: G.H, grid: grid, ev: ev,
      score: G.score, left: G.left, time: G.time, combo: G.combo, delivered: G.delivered, failed: G.failed, over: G.over, countdown: G.countdown, lives: G.lives, tips: G.tips, bestCombo: G.bestCombo,
      result: G.result || null,
      orders: G.orders.map(function (o) { return { id: o.id, dish: o.dish.id, seas: o.seas, t: o.t, tmax: o.tmax, vip: o.vip }; }),
      players: G.players.map(function (p) { return { x: p.x, y: p.y, dx: p.dx, dy: p.dy, hold: p.hold, chopping: p.chopping, dash: p.dash, walk: p.walk, msg: p.msg, msgT: p.msgT, color: p.color, hat: p.hat, name: p.name, dcd: p.dcd }; })
    };
  };
  E.applyState = function (s, first) {
    G.W = s.W; G.H = s.H; G.grid = s.grid;
    G.score = s.score; G.left = s.left; G.time = s.time; G.combo = s.combo; G.delivered = s.delivered; G.failed = s.failed; G.over = s.over; G.countdown = s.countdown; G.lives = s.lives; G.tips = s.tips; G.bestCombo = s.bestCombo;
    if (s.result) G.result = s.result;
    G.orders = s.orders.map(function (o) { return { id: o.id, dish: DISHES[o.dish], seas: o.seas, t: o.t, tmax: o.tmax, vip: o.vip }; });
    s.players.forEach(function (q, i) {
      let p = G.players[i];
      if (!p) { p = G.players[i] = Object.assign({ id: i, mx: 0, my: 0, act: false, remote: false, tx: q.x, ty: q.y }, q); }
      const mine = i === G.myIdx;
      ['dx', 'dy', 'hold', 'chopping', 'dash', 'walk', 'msg', 'msgT', 'color', 'hat', 'name', 'dcd'].forEach(function (k) { if (!(mine && (k === 'dx' || k === 'dy' || k === 'dash' || k === 'walk' || k === 'dcd'))) p[k] = q[k]; });
      p.tx = q.x; p.ty = q.y;
      if (first || Math.hypot(p.x - q.x, p.y - q.y) > 1.6) { p.x = q.x; p.y = q.y; }
    });
    if (s.ev) s.ev.forEach(function (v) {
      if (v.t === 's') sfx(v.n, true); else if (v.t === 'f') float(v.x, v.y, v.txt, v.col, true); else if (v.t === 't') toast(v.txt, v.kind, true);
    });
  };
  function clientStep(dt) {
    G.players.forEach(function (p, i) {
      if (i === G.myIdx) {
        move(p, dt);
        const ex = p.tx - p.x, ey = p.ty - p.y; p.x += ex * Math.min(1, dt * 6); p.y += ey * Math.min(1, dt * 6);
      } else if (p.tx != null) { p.x += (p.tx - p.x) * Math.min(1, dt * 14); p.y += (p.ty - p.y) * Math.min(1, dt * 14); }
    });
    G.floats.forEach(function (f) { f.t -= dt; f.y -= dt * 0.6; }); G.floats = G.floats.filter(function (f) { return f.t > 0; });
    G.toasts.forEach(function (t) { t.t -= dt; }); G.toasts = G.toasts.filter(function (t) { return t.t > 0; });
    for (let y = 0; y < G.H; y++) for (let x = 0; x < G.W; x++) { const t = G.grid[y][x]; if (t) { t.x = x; t.y = y; } }
    emitParticles(dt);
    if (G.shake > 0) G.shake -= dt;
  }
  E.stop = function () { cancelAnimationFrame(raf); raf = 0; teardownInput(); G = null; };
  E.setPaused = function (p) { if (G && !(G.net)) { G.paused = p; for (const k in keys) keys[k] = false; } };
  E.snapshot = function () {
    if (!G) return null;
    return {
      score: G.score, left: G.left, time: G.time, combo: G.combo, delivered: G.delivered, failed: G.failed, over: G.over, countdown: G.countdown, lives: G.lives, endless: !!G.lv.endless,
      orders: G.orders.map(function (o) { return { id: o.id, dish: o.dish.id, t: o.t, tmax: o.tmax, seas: o.seas, vip: o.vip }; }),
      toasts: G.toasts.slice(-3).map(function (t) { return { id: t.id, txt: t.txt, kind: t.kind }; }),
      result: G.result || null
    };
  };

  function toast(txt, kind, fromNet) { if (G) { G.toasts.push({ id: Math.random(), txt: txt, kind: kind || '', t: 2.6 }); if (G.net === 'host' && !fromNet) G.ev.push({ t: 't', txt: txt, kind: kind || '' }); } }
  function say(p, txt) { p.msg = txt; p.msgT = 1.6; }
  function float(x, y, txt, col, fromNet) { G.floats.push({ x: x, y: y, txt: txt, col: col || '#fff', t: 1.4 }); if (G.net === 'host' && !fromNet) G.ev.push({ t: 'f', x: x, y: y, txt: txt, col: col || '#fff' }); }

  /* ---------- pedidos ---------- */
  function newOrder() {
    const lv = G.lv;
    let d, tries = 0;
    do { d = G.menu[Math.floor(Math.random() * G.menu.length)]; tries++; } while (G.menu.length > 1 && (d === G.lastDish) && tries < 5);
    G.lastDish = d;
    const seas = [];
    if (lv.seasP > 0 && d.seas.length && Math.random() < lv.seasP) seas.push(d.seas[Math.floor(Math.random() * d.seas.length)]);
    const players = G.players.length;
    const tmax = Math.round(d.time * lv.pat * (players === 1 ? 1.15 : 1) * (lv.endless ? Math.max(0.55, 1 - G.time / 900) : 1));
    const vip = !lv.practice && Math.random() < 0.08;
    G.orders.push({ id: G.oid++, dish: d, seas: seas, t: tmax, tmax: tmax, vip: vip });
    sfx('order');
  }
  function nextInterval() {
    const lv = G.lv, f = (G.players.length === 1 ? 1.25 : G.players.length >= 3 ? 0.8 : 1) * (lv.endless ? Math.max(0.4, 1 - G.time / 700) : 1);
    return (lv.int[0] + Math.random() * (lv.int[1] - lv.int[0])) * f;
  }
  function deliver(p, plate, tile) {
    const parts = plate.items.filter(function (i) { return !isSeason(i); });
    const seas = plate.items.filter(isSeason);
    let best = null;
    G.orders.forEach(function (o) {
      if (sameSet(o.dish.parts, parts) && o.seas.every(function (s) { return seas.indexOf(s) >= 0; })) { if (!best || o.t < best.t) best = o; }
    });
    if (!best) { say(p, 'Ninguém pediu isso!'); sfx('wrong'); toast('Prato errado: ninguém pediu isso', 'bad'); return false; }
    const frac = best.t / best.tmax;
    const base = best.dish.price + (best.seas.length ? 5 : 0);
    const tip = Math.round(base * 0.5 * frac / 1);
    G.combo++; G.bestCombo = Math.max(G.bestCombo, G.combo); G.dishCount[best.dish.id] = (G.dishCount[best.dish.id] || 0) + 1;
    const cb = Math.min(G.combo - 1, 6) * 3;
    const pts = (base + tip + cb) * (best.vip ? 2 : 1);
    G.score += pts; G.tips += tip; G.delivered++;
    G.orders.splice(G.orders.indexOf(best), 1);
    float(tile.x + 0.5, tile.y + 0.2, '+' + pts + (G.combo > 1 ? ' x' + G.combo : ''), '#ffd84a');
    toast(best.dish.n + ' entregue! +' + pts, 'ok');
    sfx('ding');
    tile.flash = 0.6;
    G.pending.push({ t: 6 + Math.random() * 3 });
    return true;
  }

  /* ---------- tiles ---------- */
  function tileAt(cx, cy) { if (cx < 0 || cy < 0 || cx >= G.W || cy >= G.H) return null; return G.grid[cy][cx]; }
  function solid(cx, cy) { return !!tileAt(cx, cy) || cx < 0 || cy < 0 || cx >= G.W || cy >= G.H; }
  function target(p) {
    const cx = Math.floor(p.x + p.dx * 0.78), cy = Math.floor(p.y + p.dy * 0.78);
    const t = tileAt(cx, cy);
    return t ? { t: t, x: cx, y: cy } : null;
  }
  E.target = target;

  function newPlate() { return { plate: 1, items: [] }; }
  function isPlate(h) { return h && h.plate; }
  function isItem(h) { return typeof h === 'string'; }

  /* ---------- interação (pegar/colocar) ---------- */
  function interact(p) {
    if (G.over || G.countdown > 0) return;
    const tg = target(p);
    if (!tg) return;
    const t = tg.t, h = p.hold;
    t.x = tg.x; t.y = tg.y;
    switch (t.k) {
      case 'counter': case 'board': case 'grater': return interactSlot(p, t);
      case 'crate': {
        const season = isSeason(t.id);
        if (!h) { p.hold = season ? { shaker: t.id } : t.id; sfx('pick'); return; }
        if (isPlate(h)) { if (canAdd(h, t.id)) { h.items.push(t.id); sfx('pick'); } else say(p, 'Não combina com este prato'); return; }
        if (h.shaker === t.id || h === t.id) { p.hold = null; sfx('put'); return; }
        return;
      }
      case 'app': return interactApp(p, t);
      case 'trash':
        if (!h) return;
        if (isPlate(h)) { if (h.items.length) { h.items = []; sfx('trash'); } return; }
        if (h.dirty) return;
        p.hold = null; sfx('trash'); return;
      case 'sink':
        if (h && h.dirty) { t.dirty++; p.hold = null; sfx('put'); return; }
        if (!h && t.clean > 0) { t.clean--; p.hold = newPlate(); sfx('pick'); return; }
        if (isPlate(h) && !h.items.length) { t.clean++; p.hold = null; sfx('put'); return; }
        return;
      case 'rack':
        if (!h && t.n > 0) { t.n--; p.hold = newPlate(); sfx('pick'); return; }
        if (isPlate(h) && !h.items.length) { t.n++; p.hold = null; sfx('put'); }
        return;
      case 'ret':
        if (!h && t.dirty > 0) { t.dirty--; p.hold = { dirty: 1 }; sfx('pick'); }
        return;
      case 'serve':
        if (isPlate(h) && h.items.length) { if (deliver(p, h, t)) p.hold = null; }
        else if (isPlate(h)) say(p, 'Prato vazio');
        else if (h && h.dirty) say(p, 'Isso vai na pia!');
        return;
    }
  }

  function interactSlot(p, t) {
    const h = p.hold, s = t.thing;
    if (!h && s) { p.hold = s; t.thing = null; t.prog = 0; sfx('pick'); return; }
    if (h && !s) {
      if (t.k === 'board' && isItem(h) && !CC.ITEMS[h].chop && h !== 'queimado' && false) return;
      t.thing = h; p.hold = null; t.prog = 0; sfx('put'); return;
    }
    if (h && s) {
      if (isPlate(h) && isItem(s)) { if (canAdd(h, s)) { h.items.push(s); t.thing = null; sfx('pick'); } else say(p, 'Não combina'); return; }
      if (isPlate(s) && isItem(h)) { if (canAdd(s, h)) { s.items.push(h); p.hold = null; sfx('pick'); } else say(p, 'Não combina'); return; }
      if (isPlate(s) && h.shaker) { if (canAdd(s, h.shaker)) { s.items.push(h.shaker); sfx('pick'); } else say(p, 'Não combina'); return; }
      if (isPlate(h) && s.shaker) { if (canAdd(h, s.shaker)) { h.items.push(s.shaker); sfx('pick'); } return; }
      if (isPlate(h) && isPlate(s)) { say(p, 'Já tem um prato aqui'); return; }
    }
  }

  function interactApp(p, a) {
    const h = p.hold;
    if (!h) {
      if (a.out) {
        const it = ITEMS[a.out];
        if (it.liq) { say(p, 'Precisa de um prato'); return; }
        p.hold = a.out; resetApp(a); sfx('pick'); return;
      }
      if (a.st === 'idle' && a.items.length) { p.hold = a.items.pop(); a.grace = 0; a.wait = 0; sfx('pick'); }
      return;
    }
    if (isPlate(h)) {
      if (a.out && a.out !== 'queimado' && canAdd(h, a.out)) { h.items.push(a.out); resetApp(a); sfx('pick'); return; }
      if (a.out) { say(p, a.out === 'queimado' ? 'Queimado!' : 'Não combina'); }
      return;
    }
    if (h.shaker) {
      if (a.st === 'idle' && a.items.length) { say(p, 'Tempero não vai aqui'); }
      return;
    }
    if (isItem(h)) {
      if (appAccepts(a, h)) { a.items.push(h); p.hold = null; a.grace = 0; sfx('put'); }
      else if (a.out) say(p, 'Ocupado');
      else say(p, 'Isso não vai aqui');
    }
  }
  function resetApp(a) { a.st = 'idle'; a.out = null; a.rec = null; a.prog = 0; a.burn = 0; a.warned = false; a.items = []; a.grace = 0; a.wait = 0; }

  /* ação segurada (cortar / lavar) */
  function holdAction(p, dt) {
    p.chopping = false;
    const tg = target(p);
    if (!tg) return;
    const t = tg.t;
    if ((t.k === 'board' || t.k === 'grater') && isItem(t.thing) && ITEMS[t.thing].raw && CC.ING[t.thing] && (t.k === 'board' ? CC.ING[t.thing].chop : CC.ING[t.thing].grate)) {
      const g = CC.ING[t.thing], sec = t.k === 'board' ? g.sec : g.gsec;
      p.chopping = true;
      t.prog += dt / sec;
      if (t.prog >= 1) { t.thing = t.thing + (t.k === 'board' ? '_c' : '_r'); t.prog = 0; sfx('chopdone'); float(tg.x + 0.5, tg.y, t.k === 'board' ? '✂️' : '🧀', '#fff'); }
    } else if (t.k === 'sink' && t.dirty > 0) {
      p.chopping = true;
      t.prog += dt / 3;
      if (t.prog >= 1) { t.prog = 0; t.dirty--; t.clean++; sfx('chopdone'); }
    }
  }
  function ING_CHOP(id) { const i = CC.ING[id]; if (i && i.chop) { ITEMS[id].sec_real = i.sec; return true; } return false; }

  /* ---------- física ---------- */
  const R = 0.3;
  function move(p, dt) {
    if (p.dcd > 0) p.dcd -= dt;
    let mx = p.mx, my = p.my;
    const mag = Math.hypot(mx, my);
    if (mag > 0) { mx /= mag; my /= mag; if (Math.abs(mx) > Math.abs(my) + 0.01) { p.dx = Math.sign(mx); p.dy = 0; } else if (Math.abs(my) > Math.abs(mx) + 0.01) { p.dx = 0; p.dy = Math.sign(my); } else { p.dx = Math.sign(mx); p.dy = 0; } }
    let sp = 4.4;
    if (p.dash > 0) { p.dash -= dt; sp = 10.5; if (!mag) { mx = p.dx; my = p.dy; } }
    if (p.act && p.chopping) { mx = 0; my = 0; }
    const nx = p.x + mx * sp * dt, ny = p.y + my * sp * dt;
    if (!hit(nx, p.y, p)) p.x = nx;
    if (!hit(p.x, ny, p)) p.y = ny;
    if (mag > 0) p.walk += dt * (p.dash > 0 ? 18 : 10);
  }
  function hit(x, y, self) {
    const x0 = Math.floor(x - R), x1 = Math.floor(x + R), y0 = Math.floor(y - R), y1 = Math.floor(y + R);
    for (let cy = y0; cy <= y1; cy++) for (let cx = x0; cx <= x1; cx++) if (solid(cx, cy)) return true;
    for (let i = 0; i < G.players.length; i++) { const o = G.players[i]; if (o !== self && Math.hypot(o.x - x, o.y - y) < R * 1.9) return true; }
    return false;
  }

  /* ---------- passo da simulação ---------- */
  E.step = function (dt) {
    if (!G || G.over || G.paused) return;
    if (G.countdown > 0) { G.countdown -= dt; if (G.countdown < 0) G.countdown = 0; return; }
    const lv = G.lv;
    G.time += dt;
    if (!lv.practice && !lv.endless) { G.left -= dt; if (G.left <= 0) { G.left = 0; return finish(); } }
    // pedidos
    G.nextIn -= dt;
    if (G.nextIn <= 0 && G.orders.length < lv.max) { newOrder(); G.nextIn = nextInterval(); }
    else if (G.nextIn <= 0) G.nextIn = 3;
    if (G.orders.length === 0 && G.nextIn > 4) G.nextIn = 4;
    for (let i = G.orders.length - 1; i >= 0; i--) {
      const o = G.orders[i];
      o.t -= dt;
      if (o.t <= 0) {
        if (lv.practice) { o.t = o.tmax; continue; }
        G.orders.splice(i, 1); G.failed++; G.combo = 0;
        const pen = Math.round(o.dish.price * 0.4); G.score = Math.max(0, G.score - pen);
        toast('Pedido perdido: ' + o.dish.n + ' (-' + pen + ')', 'bad'); sfx('fail'); G.shake = 0.3;
        if (lv.endless) { G.lives--; if (G.lives <= 0) return finish(); }
      }
    }
    // jogadores
    G.players.forEach(function (p) {
      move(p, dt);
      if (p.act) holdAction(p, dt); else p.chopping = false;
      if (p.msgT > 0) p.msgT -= dt;
    });
    // tiles
    for (let y = 0; y < G.H; y++) for (let x = 0; x < G.W; x++) {
      const t = G.grid[y][x];
      if (!t) continue;
      t.x = x; t.y = y;
      if (t.k === 'app') updateApp(t, dt);
      if (t.flash > 0) t.flash -= dt;
    }
    // pratos sujos voltando
    for (let i = G.pending.length - 1; i >= 0; i--) {
      G.pending[i].t -= dt;
      if (G.pending[i].t <= 0) { G.pending.splice(i, 1); const r = findTile('ret'); if (r) r.dirty++; sfx('put'); }
    }
    // efeitos
    G.floats.forEach(function (f) { f.t -= dt; f.y -= dt * 0.6; });
    G.floats = G.floats.filter(function (f) { return f.t > 0; });
    G.toasts.forEach(function (t) { t.t -= dt; });
    G.toasts = G.toasts.filter(function (t) { return t.t > 0; });
    if (G.shake > 0) G.shake -= dt;
    emitParticles(dt);
  };
  function findTile(k) { for (let y = 0; y < G.H; y++) for (let x = 0; x < G.W; x++) { const t = G.grid[y][x]; if (t && t.k === k) return t; } return null; }

  function emitParticles(dt) {
    for (let y = 0; y < G.H; y++) for (let x = 0; x < G.W; x++) {
      const t = G.grid[y][x];
      if (!t || t.k !== 'app') continue;
      if ((t.st === 'cook' || t.st === 'done' || t.st === 'burnt') && Math.random() < dt * 5) {
        const burning = t.st === 'burnt' || (t.st === 'done' && t.burn > 8);
        G.parts.push({ x: x + 0.3 + Math.random() * 0.4, y: y + 0.3, vy: -0.5 - Math.random() * 0.4, t: 1.1, c: burning ? 'rgba(40,40,40,' : 'rgba(255,255,255,', r: 0.07 + Math.random() * 0.07 });
      }
    }
    G.parts.forEach(function (q) { q.t -= dt; q.y += q.vy * dt; });
    G.parts = G.parts.filter(function (q) { return q.t > 0; });
  }

  function finish() {
    G.over = true;
    const lv = G.lv, st = lv.stars || [100, 250, 450];
    const stars = G.score >= st[2] ? 3 : G.score >= st[1] ? 2 : G.score >= st[0] ? 1 : 0;
    G.result = { score: G.score, stars: stars, delivered: G.delivered, failed: G.failed, tips: G.tips, bestCombo: G.bestCombo, need: st, time: Math.round(G.time), burnt: G.burnt, dishes: G.dishCount };
    sfx(stars ? 'win' : 'lose');
  }
  E.finish = function () { if (G && !G.over) finish(); };

  /* ---------- laço ---------- */
  function loop(now) {
    raf = requestAnimationFrame(loop);
    let dt = (now - lastT) / 1000; lastT = now;
    if (dt > 0.05) dt = 0.05;
    if (!G) return;
    readInput();
    if (G.client) { clientStep(dt); sendInput(dt); } else E.step(dt);
    CC.Render.draw(cvs, G, now / 1000);
  }

  /* ---------- entrada ---------- */
  const MAPS = [
    { up: ['KeyW'], down: ['KeyS'], left: ['KeyA'], right: ['KeyD'], act: ['Space'], chop: ['KeyE'], dash: ['KeyQ', 'ShiftLeft'] },
    { up: ['ArrowUp'], down: ['ArrowDown'], left: ['ArrowLeft'], right: ['ArrowRight'], act: ['Enter'], chop: ['ShiftRight', 'Period'], dash: ['Slash', 'Comma'] },
    { up: ['KeyI'], down: ['KeyK'], left: ['KeyJ'], right: ['KeyL'], act: ['KeyU'], chop: ['KeyO'], dash: ['KeyY'] },
    { up: ['Numpad8'], down: ['Numpad5'], left: ['Numpad4'], right: ['Numpad6'], act: ['Numpad0'], chop: ['NumpadDecimal'], dash: ['NumpadEnter'] }
  ];
  CC.MAPS = MAPS;
  const pressedQ = [], padPrev = {};
  function onDown(e) {
    if (!G) return;
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    if (e.code === 'Escape' || e.code === 'KeyP') { if (CC.onPauseKey) CC.onPauseKey(); e.preventDefault(); return; }
    if (e.code === 'KeyB') { if (CC.onBookKey) CC.onBookKey(); e.preventDefault(); return; }
    const used = [].concat.apply([], MAPS.map(function (m) { return [].concat.apply([], Object.keys(m).map(function (k) { return m[k]; })); }));
    if (used.indexOf(e.code) >= 0) e.preventDefault();
    if (!keys[e.code]) pressedQ.push(e.code);
    keys[e.code] = true;
  }
  function onUp(e) { keys[e.code] = false; }
  function onBlur() { for (const k in keys) keys[k] = false; }
  function setupInput(np) {
    window.addEventListener('keydown', onDown); window.addEventListener('keyup', onUp); window.addEventListener('blur', onBlur);
    E.np = np;
  }
  function teardownInput() { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); window.removeEventListener('blur', onBlur); for (const k in keys) keys[k] = false; pressedQ.length = 0; }
  function anyKey(list) { return list.some(function (c) { return keys[c]; }); }
  function setsFor(i) { return G.players.length === 1 || G.client ? [MAPS[0], MAPS[1]] : [MAPS[i]]; }
  function press(p, kind) {
    if (G.client) { if (p.id === G.myIdx) outbox.push(kind); return; }
    if (kind === 'i') interact(p);
    else if (p.dcd <= 0 && !G.paused) { p.dash = 0.16; p.dcd = 1.1; sfx('dash'); }
  }
  const outbox = [];
  let sendAcc = 0;
  function sendInput(dt) {
    sendAcc += dt;
    const p = G.players[G.myIdx];
    if (!p || !G.send) return;
    if (sendAcc < 0.033 && !outbox.length) return;
    sendAcc = 0;
    G.send({ t: 'in', mx: p.mx, my: p.my, act: p.act, pr: outbox.splice(0), x: p.x, y: p.y });
  }
  E.setRemote = function (i, mx, my, act, presses) {
    if (!G || !G.players[i]) return;
    const p = G.players[i];
    p.mx = Math.max(-1, Math.min(1, +mx || 0)); p.my = Math.max(-1, Math.min(1, +my || 0)); p.act = !!act;
    (presses || []).forEach(function (k) { if (k === 'i' || k === 'd') press(p, k); });
  };
  function readPads() {
    const out = {};
    try {
      const gp = navigator.getGamepads ? navigator.getGamepads() : [];
      for (let i = 0; i < gp.length; i++) if (gp[i] && gp[i].connected) out[i] = gp[i];
    } catch (e) { }
    return out;
  }
  function readInput() {
    const pads = readPads();
    const padList = Object.keys(pads).map(function (k) { return pads[k]; });
    G.players.forEach(function (p, i) {
      if (p.remote) return;
      if (G.client && i !== G.myIdx) return;
      const sets = setsFor(i);
      let mx = 0, my = 0, act = false;
      sets.forEach(function (m) {
        mx += (anyKey(m.right) ? 1 : 0) - (anyKey(m.left) ? 1 : 0);
        my += (anyKey(m.down) ? 1 : 0) - (anyKey(m.up) ? 1 : 0);
        if (anyKey(m.chop)) act = true;
      });
      const pad = G.client || G.players.length === 1 ? padList[0] : padList[i];
      if (pad) {
        const ax = pad.axes[0] || 0, ay = pad.axes[1] || 0;
        if (Math.abs(ax) > 0.25) mx += ax; if (Math.abs(ay) > 0.25) my += ay;
        const b = function (n) { return pad.buttons[n] && pad.buttons[n].pressed; };
        if (b(14)) mx -= 1; if (b(15)) mx += 1; if (b(12)) my -= 1; if (b(13)) my += 1;
        if (b(2) || b(7)) act = true;
        const key = 'p' + pad.index, pv = padPrev[key] || (padPrev[key] = {});
        const edge = function (name, on, fn) { if (on && !pv[name]) fn(); pv[name] = on; };
        edge('a', b(0), function () { press(p, 'i'); });
        edge('d', b(1) || b(5) || b(6), function () { press(p, 'd'); });
        edge('s', b(9), function () { if (CC.onPauseKey) CC.onPauseKey(); });
        edge('y', b(3), function () { if (CC.onBookKey) CC.onBookKey(); });
      }
      p.mx = Math.max(-1, Math.min(1, mx)); p.my = Math.max(-1, Math.min(1, my)); p.act = act;
    });
    while (pressedQ.length) {
      const c = pressedQ.shift();
      G.players.forEach(function (p, i) {
        if (p.remote) return;
        if (G.client && i !== G.myIdx) return;
        setsFor(i).forEach(function (m) {
          if (m.act.indexOf(c) >= 0) press(p, 'i');
          if (m.dash.indexOf(c) >= 0) press(p, 'd');
        });
      });
    }
  }
  // testes headless
  E.press = function (i, what) { const p = G.players[i]; if (what === 'act') interact(p); };
  E.interact = function (i) { interact(G.players[i]); };
  E.canAdd = canAdd;

  /* ---------- som ---------- */
  let actx = null;
  CC.sound = true;
  function tone(f, d, type, vol, slide) {
    if (!CC.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime;
      o.type = type || 'sine'; o.frequency.setValueAtTime(f, t);
      if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + d);
      g.gain.setValueAtTime(vol || 0.06, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + d);
    } catch (e) {}
  }
  function sfx(n, fromNet) {
    if (G && G.net === 'host' && !fromNet) G.ev.push({ t: 's', n: n });
    switch (n) {
      case 'pick': tone(520, 0.06, 'triangle', 0.05); break;
      case 'put': tone(330, 0.07, 'triangle', 0.05); break;
      case 'chopdone': tone(900, 0.08, 'square', 0.04); break;
      case 'trash': tone(200, 0.12, 'sawtooth', 0.04, 80); break;
      case 'start': tone(260, 0.12, 'sine', 0.04); break;
      case 'done': tone(660, 0.12, 'sine', 0.06); setTimeout(function () { tone(880, 0.16, 'sine', 0.06); }, 110); break;
      case 'warn': tone(440, 0.1, 'square', 0.05); setTimeout(function () { tone(440, 0.1, 'square', 0.05); }, 160); break;
      case 'burn': tone(150, 0.4, 'sawtooth', 0.06, 60); break;
      case 'ding': tone(784, 0.1, 'sine', 0.07); setTimeout(function () { tone(1175, 0.25, 'sine', 0.07); }, 100); break;
      case 'wrong': tone(160, 0.25, 'square', 0.05); break;
      case 'order': tone(600, 0.06, 'sine', 0.04); break;
      case 'fail': tone(220, 0.3, 'sawtooth', 0.05, 110); break;
      case 'dash': tone(300, 0.1, 'sawtooth', 0.025, 700); break;
      case 'win': [523, 659, 784, 1047].forEach(function (f, i) { setTimeout(function () { tone(f, 0.2, 'triangle', 0.07); }, i * 120); }); break;
      case 'lose': [400, 330, 260].forEach(function (f, i) { setTimeout(function () { tone(f, 0.25, 'triangle', 0.06); }, i * 150); }); break;
    }
  }
  E.sfx = sfx;
})(window.CC);
