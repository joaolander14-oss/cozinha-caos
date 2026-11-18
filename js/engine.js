/* Cozinha Caos — motor: jogadores, interações, cozimento, pedidos */
(function (CC) {
  'use strict';
  const ITEMS = CC.ITEMS, DISHES = CC.DISHES, RECIPES = CC.RECIPES, APPS = CC.APPS;
  const E = CC.Engine = {};
  let G = null, raf = 0, lastT = 0, cvs = null;
  const keys = {};
  const TS = CC.TS = 64;
  CC.SHOP = {
    tray: { n: 'Bandeja', e: '🍽️', d: 'Carrega +1 prato empilhado por nível', cost: [120, 220, 380] },
    cart: { n: 'Carrinho de pratos', e: '🛒', d: 'Carrega até 7 pratos de uma vez (−15% de velocidade)', cost: [500] },
    knife: { n: 'Faca afiada', e: '🔪', d: 'Corta, rala, pila e espreme +35% mais rápido por nível', cost: [100, 180, 300] },
    sponge: { n: 'Esponja turbo', e: '🧽', d: 'Lava a louça +60% mais rápido por nível', cost: [80, 140, 240] },
    auto: { n: 'Lava-louças', e: '🫧', d: 'A pia lava pratos sozinha', cost: [260, 420] },
    shoes: { n: 'Tênis de corrida', e: '👟', d: '+8% de velocidade por nível', cost: [100, 180, 300] },
    heat: { n: 'Fogões potentes', e: '🔥', d: 'Tudo cozinha +12% mais rápido por nível', cost: [160, 280, 440] },
    timer: { n: 'Timer de segurança', e: '⏲️', d: 'A comida demora +5s para queimar por nível', cost: [90, 160, 260] },
    patience: { n: 'Atendimento simpático', e: '😊', d: 'Clientes esperam +12% por nível', cost: [120, 220, 360] },
    price: { n: 'Preços premium', e: '💎', d: '+8% no valor de cada prato por nível', cost: [180, 320, 500] },
    express: { n: 'Caminhão expresso', e: '🚚', d: 'Entregas de estoque 12% mais rápidas por nível', cost: [90, 170, 280] },
    boxes: { n: 'Caminhão maior', e: '📦', d: '+1 caixa por pedido de estoque (máx. 6)', cost: [110, 200] },
    plates: { n: 'Mais pratos', e: '🥣', d: '+2 pratos limpos no balcão (até 3 vezes)', cost: [60, 90, 120] }
  };
  Object.assign(CC.SHOP, {
    swatter: { n: 'Mata-moscas elétrico', e: '🪰', d: 'Alcance da raquete contra pragas +40% por nível', cost: [80, 150, 260] },
    zapper: { n: 'Lâmpada mata-insetos', e: '💡', d: 'Elimina pragas sozinha (1 por nível a cada 5s)', cost: [150, 260, 420] },
    screens: { n: 'Telas nas janelas', e: '🪟', d: 'Pragas aparecem 35% mais devagar por nível', cost: [120, 220, 350] },
    spray: { n: 'Inseticida', e: '🧴', d: 'Elimina todas as pragas e afasta novas por 45s (compre quando precisar)', cost: [90], repeat: true },
    fridge: { n: 'Geladeira grande', e: '❄️', d: 'Cada ingrediente guarda +10 unidades (base 20)', cost: [100, 180, 300] },
    tips: { n: 'Caixa registradora', e: '🧾', d: 'Gorjetas +25% por nível', cost: [140, 250, 400] },
    dashcd: { n: 'Botas turbo', e: '⚡', d: 'O dash recarrega 20% mais rápido por nível', cost: [90, 160, 260] },
    clock: { n: 'Relógio extra', e: '⏱️', d: '+15s no relógio (ou +1 vida nos modos com vidas). Compre quando precisar', cost: [130], repeat: true },
    durable: { n: 'Utensílios resistentes', e: '🛡️', d: 'Panelas e frigideiras aguentam +2 usos antes de sujar, por nível', cost: [110, 200, 320] },
    spares: { n: 'Jogo extra de utensílios', e: '🍲', d: 'Adiciona 1 de cada utensílio à prateleira (compre quando precisar)', cost: [140], repeat: true },
    generator: { n: 'Gerador de emergência', e: '🔋', d: 'A cozinha não fica às escuras em apagões', cost: [200] }
  });
  /* utensílios: cada equipamento precisa do seu recipiente; suja depois de alguns usos */
  CC.UT = {
    pot: { n: 'Panela', e: '🍲', col: '#9aa0aa', uses: 4 }, pan: { n: 'Frigideira', e: '🍳', col: '#4a4d55', uses: 5 }, wok: { n: 'Wok', e: '🥘', col: '#6d4c41', uses: 5 },
    fryer: { n: 'Cesto de fritura', e: '🧺', col: '#b0bec5', uses: 6 }, oven: { n: 'Assadeira', e: '🔲', col: '#78909c', uses: 4 }, blender: { n: 'Jarra', e: '🫙', col: '#80cbc4', uses: 5 },
    mixer: { n: 'Tigela', e: '🥣', col: '#d7ccc8', uses: 5 }, processor: { n: 'Copo do processador', e: '🥤', col: '#90a4ae', uses: 5 }, steamer: { n: 'Cesto de vapor', e: '🎋', col: '#c9a56b', uses: 5 },
    ricecooker: { n: 'Panela de arroz', e: '🍚', col: '#eceff1', uses: 5 }, pressure: { n: 'Panela de pressão', e: '🥫', col: '#78909c', uses: 4 }, bainmarie: { n: 'Pote de banho-maria', e: '🫕', col: '#c9a35b', uses: 5 },
    sushi: { n: 'Esteira de bambu', e: '🪵', col: '#a1887f', uses: 6 }, breader: { n: 'Bandeja de empanar', e: '🍽️', col: '#c9a56b', uses: 6 }, waffler: { n: 'Forma de crepe', e: '🧇', col: '#8d6e63', uses: 6 },
    grill: { n: 'Grelha', e: '🥩', col: '#455a64', uses: 6 }, toaster: { n: 'Cesto de torrar', e: '🍞', col: '#a1887f', uses: 8 }, coffee: { n: 'Jarra de café', e: '☕', col: '#6d4c41', uses: 6 },
    icecream: { n: 'Cuba de sorvete', e: '🍨', col: '#80deea', uses: 5 }, smoker: { n: 'Grade de defumação', e: '💨', col: '#5d4037', uses: 4 }, torch: { n: 'Ramequim', e: '🍮', col: '#bf360c', uses: 6 },
    fermenter: { n: 'Pote de fermentação', e: '🫙', col: '#7b8d3a', uses: 4 }, dehydrator: { n: 'Bandeja de desidratação', e: '☀️', col: '#d4a017', uses: 4 }, fountain: { n: 'Bandeja de chocolate', e: '🍫', col: '#5d4037', uses: 5 },
    roller: { n: 'Rolo de massa', e: '🥖', col: '#d7ccc8', uses: 6 }, popper: { n: 'Panela de pipoca', e: '🍿', col: '#c0392b', uses: 6 }, press: { n: 'Placa da sanduicheira', e: '🥪', col: '#607d8b', uses: 7 }
  };
  CC.mkUt = function (k) { return { ut: k, uses: 0, dirty: false }; };
  function utMax(k) { return Math.max(1, Math.round((CC.UT[k].uses + 2 * up('durable')) * cfg('utUses', 1))); }
  CC.utMax = utMax;
  function isUt(h) { return !!(h && h.ut); }
  Object.assign(CC.SHOP, {
    bonus: { n: 'Cartão fidelidade', e: '💳', d: 'Bônus de combo +50% por nível', cost: [120, 220, 360] },
    vipmag: { n: 'Atrair clientes VIP', e: '🎩', d: '+8% de chance de pedidos VIP por nível (se VIPs estiverem ligados)', cost: [150, 260, 420] },
    waiter: { n: 'Garçom ágil', e: '🏃', d: 'Pratos sujos voltam 25% mais rápido por nível', cost: [90, 160, 260] },
    contract: { n: 'Contrato com fornecedor', e: '🤝', d: 'Estoque 10% mais barato por nível', cost: [110, 200, 330] },
    boxsize: { n: 'Caixas maiores', e: '📦', d: '+1 unidade em cada caixa do caminhão, por nível', cost: [100, 190, 300] },
    autostock: { n: 'Reposição automática', e: '🔁', d: 'Pede sozinho o ingrediente mais baixo (a cada ~45s, 33s, 21s)', cost: [160, 280, 440] },
    lights: { n: 'Lanternas potentes', e: '🔦', d: 'Os chefs enxergam mais longe nos apagões', cost: [80, 140, 230] },
    insurance: { n: 'Seguro de pedidos', e: '🛡️', d: 'Pedidos perdidos custam 30% menos por nível', cost: [100, 180, 300] }
  });
  function cfg(k, d) { return (G && G.cfg && G.cfg[k] != null) ? G.cfg[k] : d; }
  function up(k) { return (G && G.up && G.up[k]) || 0; }

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
    if (G.utOn && CC.UT[a.kind] && (!a.ut || a.ut.dirty)) return false;
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
      a.prog += dt * (1 + 0.12 * up('heat'));
      if (a.prog >= a.rec.t) { a.st = 'done'; a.out = a.rec.out; a.items = []; a.burn = 0; if (a.ut) a.ut.uses++; sfx('done'); toast(ITEMS[a.out].n + ' pronto!', 'ok'); }
    } else if (a.st === 'done') {
      a.burn += dt;
      const BA = (14 + 5 * up('timer')) * cfg('burn', 1);
      if (BA > 0 && a.burn > BA - 6 && !a.warned) { a.warned = true; sfx('warn'); }
      if (BA > 0 && a.burn >= BA) { a.out = 'queimado'; a.st = 'burnt'; a.warned = false; if (G) G.burnt++; sfx('burn'); toast('Queimou! Jogue no lixo', 'bad'); }
    }
  }

  /* ---------- estado ---------- */
  E.get = function () { return G; };
  const COLS = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f'];
  CC.COLS = COLS;
  function mkPlayer(i, built, skin, name) {
    const sp = [[2.5, 2.5], [2.5, built.H - 1.5], [4.5, 2.5], [4.5, built.H - 1.5]][i];
    skin = skin || {};
    return { id: i, x: sp[0], y: sp[1], dx: 0, dy: 1, hold: null, mx: 0, my: 0, act: false, dash: 0, dcd: 0, color: skin.color || COLS[i], hat: skin.hat || 'toque', walk: 0, name: name || ('P' + (i + 1)), chopping: false, actKind: '', tray: [], msg: '', msgT: 0, remote: false };
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
    G.cfg = lv.cfg || {}; G.utOn = lv.utensils !== false && (G.cfg.utensils !== false);
    G.versus = lv.versus || null; G.winner = null; G.bugs = []; G.bugT = 15; G.bugId = 1; G.immune = 0; G.rush = 0; G.dark = 0; G.killed = 0; G.zapT = 5;
    G.evT = { rush: 40 + Math.random() * 40, dark: 55 + Math.random() * 50 };
    G.up = {}; Object.keys(CC.SHOP).forEach(function (k) { G.up[k] = 0; });
    G.stockOn = !!lv.stock; G.shopOn = lv.shop !== false; G.cash = lv.cash != null ? lv.cash : (lv.stock ? 300 : 0); G.trucks = []; G.nwin = lv.windows || 1;
    G.stock = {}; G.stockIds = [];
    G.grid.forEach(function (row) { row.forEach(function (t) { if (t && t.k === 'crate' && !CC.SEAS[t.id] && G.stockIds.indexOf(t.id) < 0) { G.stockIds.push(t.id); if (G.stockOn) G.stock[t.id] = (lv.stock && lv.stock.initial) || 6; } }); });
    const np = Math.max(lv.minPlayers || 1, opts.players || 1);
    for (let i = 0; i < np; i++) G.players.push(mkPlayer(i, built, opts.skins && opts.skins[i], opts.names && opts.names[i]));
    (opts.remote || []).forEach(function (i) { if (G.players[i]) G.players[i].remote = true; });
    G.pscore = G.players.map(function () { return 0; }); G.pdel = G.players.map(function () { return 0; }); G.pcombo = G.players.map(function () { return 0; });
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
        if (t.k === 'app') return { k: 'app', kind: t.kind, ut: t.ut, items: t.items, st: t.st, prog: t.prog, rec: t.rec ? { t: t.rec.t, out: t.rec.out } : null, out: t.out, burn: t.burn, wait: t.wait || 0 };
        if (t.k === 'crate') return t;
        return t;
      });
    });
    const ev = G.ev; G.ev = [];
    return {
      W: G.W, H: G.H, grid: grid, ev: ev,
      score: G.score, left: G.left, time: G.time, combo: G.combo, delivered: G.delivered, failed: G.failed, over: G.over, countdown: G.countdown, lives: G.lives, tips: G.tips, bestCombo: G.bestCombo,
      cash: G.cash, stock: G.stock, up: G.up, stockOn: G.stockOn, shopOn: G.shopOn, nwin: G.nwin, trucks: G.trucks.map(function (t) { return { t: t.t, n: t.boxes.length }; }),
      bc: costMap(), td: E.truckDelay(), bu: E.boxUnits(),
      utOn: G.utOn, versus: G.versus, pscore: G.pscore, pdel: G.pdel,
      rush: G.rush, dark: G.dark, killed: G.killed, bugs: G.bugs.map(function (b) { return { id: b.id, k: b.k, x: b.x, y: b.y, a: b.a }; }), cfgBugs: cfg('bugs', 0),
      result: G.result || null,
      orders: G.orders.map(function (o) { return { id: o.id, dish: o.dish.id, seas: o.seas, t: o.t, tmax: o.tmax, vip: o.vip, win: o.win }; }),
      players: G.players.map(function (p) { return { x: p.x, y: p.y, dx: p.dx, dy: p.dy, hold: p.hold, tray: p.tray, actKind: p.actKind, swing: p.swing || 0, stun: p.stun || 0, chopping: p.chopping, dash: p.dash, walk: p.walk, msg: p.msg, msgT: p.msgT, color: p.color, hat: p.hat, name: p.name, dcd: p.dcd }; })
    };
  };
  E.applyState = function (s, first) {
    G.W = s.W; G.H = s.H; G.grid = s.grid;
    G.score = s.score; G.left = s.left; G.time = s.time; G.combo = s.combo; G.delivered = s.delivered; G.failed = s.failed; G.over = s.over; G.countdown = s.countdown; G.lives = s.lives; G.tips = s.tips; G.bestCombo = s.bestCombo;
    if (s.result) G.result = s.result;
    G.cash = s.cash; G.stock = s.stock; G.up = s.up; G.stockOn = s.stockOn; G.shopOn = s.shopOn; G.nwin = s.nwin; G.trucks = s.trucks; G.rush = s.rush; G.dark = s.dark; G.killed = s.killed; G.cfgBugs = s.cfgBugs; G.utOn = s.utOn; G.bc = s.bc; G.td = s.td; G.bu = s.bu; G.versus = s.versus; G.pscore = s.pscore; G.pdel = s.pdel;
    (function () {
      const old = {}; (G.bugs || []).forEach(function (b) { old[b.id] = b; });
      G.bugs = (s.bugs || []).map(function (q) { const b = old[q.id] || { id: q.id, k: q.k, x: q.x, y: q.y }; b.k = q.k; b.tx = q.x; b.ty = q.y; b.a = q.a; return b; });
    })();
    if (!G.stockIds) { G.stockIds = []; s.grid.forEach(function (row) { row.forEach(function (t) { if (t && t.k === 'crate' && !CC.SEAS[t.id] && G.stockIds.indexOf(t.id) < 0) G.stockIds.push(t.id); }); }); }
    G.orders = s.orders.map(function (o) { return { id: o.id, dish: DISHES[o.dish], seas: o.seas, t: o.t, tmax: o.tmax, vip: o.vip, win: o.win }; });
    s.players.forEach(function (q, i) {
      let p = G.players[i];
      if (!p) { p = G.players[i] = Object.assign({ id: i, mx: 0, my: 0, act: false, remote: false, tx: q.x, ty: q.y }, q); }
      const mine = i === G.myIdx;
      ['dx', 'dy', 'hold', 'tray', 'actKind', 'swing', 'stun', 'chopping', 'dash', 'walk', 'msg', 'msgT', 'color', 'hat', 'name', 'dcd'].forEach(function (k) { if (!(mine && (k === 'dx' || k === 'dy' || k === 'dash' || k === 'walk' || k === 'dcd'))) p[k] = q[k]; });
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
    (G.bugs || []).forEach(function (b) { if (b.tx != null) { b.x += (b.tx - b.x) * Math.min(1, dt * 10); b.y += (b.ty - b.y) * Math.min(1, dt * 10); } });
    G.floats.forEach(function (f) { f.t -= dt; f.y -= dt * 0.6; }); G.floats = G.floats.filter(function (f) { return f.t > 0; });
    G.toasts.forEach(function (t) { t.t -= dt; }); G.toasts = G.toasts.filter(function (t) { return t.t > 0; });
    for (let y = 0; y < G.H; y++) for (let x = 0; x < G.W; x++) { const t = G.grid[y][x]; if (t) { t.x = x; t.y = y; } }
    emitParticles(dt);
    CC.Sound.ambient(G, dt, listeners());
    if (G.shake > 0) G.shake -= dt;
  }
  E.stop = function () { cancelAnimationFrame(raf); raf = 0; teardownInput(); G = null; };
  E.setPaused = function (p) { if (G && !(G.net)) { G.paused = p; for (const k in keys) keys[k] = false; } };
  E.snapshot = function () {
    if (!G) return null;
    return {
      score: G.score, left: G.left, time: G.time, combo: G.combo, delivered: G.delivered, failed: G.failed, over: G.over, countdown: G.countdown, lives: G.lives, endless: !!G.lv.endless,
      cash: G.cash, stock: G.stock, up: G.up, stockOn: G.stockOn, shopOn: G.shopOn, nwin: G.nwin, stockIds: G.stockIds, trucks: G.trucks ? G.trucks.map(function (t) { return { t: t.t, n: t.boxes.length }; }) : [],
      bc: G.client ? G.bc : costMap(), td: G.client ? G.td : E.truckDelay(), bu: G.client ? G.bu : E.boxUnits(),
      versus: G.versus, goal: G.lv.goal || 0, pscore: G.pscore, pdel: G.pdel, pl: G.players.map(function (q, i) { return { n: q.name, c: q.color, h: q.hat }; }),
      rush: G.rush, dark: G.dark, killed: G.killed, bugsN: G.bugs ? G.bugs.length : 0, cfgBugs: G.client ? G.cfgBugs : cfg('bugs', 0), lvives: G.lives,
      orders: G.orders.map(function (o) { return { id: o.id, dish: o.dish.id, t: o.t, tmax: o.tmax, seas: o.seas, vip: o.vip, win: o.win }; }),
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
    const tmax = Math.round(d.time * lv.pat * (1 + 0.12 * up('patience')) * (players === 1 ? 1.15 : 1) * (lv.endless ? Math.max(0.55, 1 - G.time / 900) : 1));
    const vp = cfg('vip', 0.08), vip = !lv.practice && Math.random() < (vp > 0 ? Math.min(0.6, vp + 0.08 * up('vipmag')) : 0);
    G.orders.push({ id: G.oid++, dish: d, seas: seas, t: tmax, tmax: tmax, vip: vip, win: G.nwin > 1 ? Math.floor(Math.random() * G.nwin) : 0 });
    sfx('order');
  }
  function nextInterval() {
    const lv = G.lv, f = (G.players.length === 1 ? 1.25 : G.players.length >= 3 ? 0.8 : 1) * (lv.endless ? Math.max(0.4, 1 - G.time / 700) : 1);
    return (lv.int[0] + Math.random() * (lv.int[1] - lv.int[0])) * f * (G.rush > 0 ? 0.5 : 1);
  }
  function winName(i) { const n = G.lv.winNames; return (n && n[i]) || ('Janela ' + String.fromCharCode(65 + i)); }
  CC.winName = function (lv, i) { return (lv.winNames && lv.winNames[i]) || ('Janela ' + String.fromCharCode(65 + i)); };
  function deliver(p, plate, tile) {
    const parts = plate.items.filter(function (i) { return !isSeason(i); });
    const seas = plate.items.filter(isSeason);
    const match = G.orders.filter(function (o) { return sameSet(o.dish.parts, parts) && o.seas.every(function (s) { return seas.indexOf(s) >= 0; }); });
    if (!match.length) { say(p, 'Ninguém pediu isso!'); sfx('wrong'); toast('Prato errado: ninguém pediu isso', 'bad'); return false; }
    let best = null;
    match.forEach(function (o) { if (G.nwin > 1 && o.win !== (tile.win || 0)) return; if (!best || o.t < best.t) best = o; });
    if (!best) { const o = match[0]; say(p, 'É da ' + winName(o.win) + '!'); sfx('wrong'); toast('Esse pedido é da ' + winName(o.win), 'bad'); return false; }
    const frac = best.t / best.tmax;
    const base = Math.round((best.dish.price + (best.seas.length ? 5 : 0)) * (1 + 0.08 * up('price')));
    const tip = cfg('tips', true) === false ? 0 : Math.round(base * 0.5 * frac * (1 + 0.25 * up('tips')));
    let cmb;
    if (G.versus) { G.pcombo[p.id] = (G.pcombo[p.id] || 0) + 1; cmb = G.pcombo[p.id]; G.combo = cmb; } else { G.combo++; cmb = G.combo; }
    G.bestCombo = Math.max(G.bestCombo, G.combo); G.dishCount[best.dish.id] = (G.dishCount[best.dish.id] || 0) + 1;
    const cb = Math.round(Math.min(cmb - 1, 6) * 3 * (1 + 0.5 * up('bonus')));
    const pts = Math.round((base + tip + cb) * (best.vip ? 2 : 1) * (G.rush > 0 ? 1.5 : 1));
    G.score += pts; G.cash += pts; G.tips += tip; G.delivered++;
    if (G.versus) { G.pscore[p.id] += pts; G.pdel[p.id]++; }
    G.orders.splice(G.orders.indexOf(best), 1);
    float(tile.x + 0.5, tile.y + 0.2, '+' + pts + (G.combo > 1 ? ' x' + G.combo : ''), '#ffd84a');
    toast(best.dish.n + ' entregue! +' + pts, 'ok');
    sfx('ding'); sfx('coin');
    tile.flash = 0.6;
    G.pending.push({ t: (6 + Math.random() * 3) * Math.pow(0.75, up('waiter')) });
    if (G.versus && G.lv.goal && G.pdel[p.id] >= G.lv.goal) { G.winner = p.id; finish(); }
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
  const SLOTS = { counter: 1, board: 1, grater: 1, mortar: 1, juicer: 1, peeler: 1 };
  function plateLike(x) { return !!(x && (x.plate || x.dirty)); }
  function trayCap() { return up('cart') ? 7 : 1 + up('tray'); }
  function tileGivesPlate(t) {
    if (t.k === 'rack') return t.n > 0;
    if (t.k === 'sink') return t.clean > 0;
    if (t.k === 'ret') return t.dirty > 0;
    if (SLOTS[t.k]) return plateLike(t.thing);
    return false;
  }
  function interact(p) {
    if (G.over || G.countdown > 0 || p.stun > 0) return;
    const tg = target(p);
    if (!tg) return;
    const t = tg.t;
    t.x = tg.x; t.y = tg.y;
    // bandeja/carrinho: empilha o prato da mão para pegar outro
    if (plateLike(p.hold) && tileGivesPlate(t) && p.tray.length < trayCap() - 1) { p.tray.push(p.hold); p.hold = null; }
    interactCore(p, t, tg);
    if (!p.hold && p.tray.length && !SLOTS[t.k]) { p.hold = p.tray.pop(); }
  }
  function interactCore(p, t, tg) {
    const h = p.hold;
    switch (t.k) {
      case 'counter': case 'board': case 'grater': case 'mortar': case 'juicer': case 'peeler': return interactSlot(p, t);
      case 'crate': {
        const season = isSeason(t.id), need = G.stockOn && !season;
        if (h && h.box) {
          if (h.box === t.id) {
            const capS = 20 + 10 * up('fridge'), cur = G.stock[t.id] || 0, add = Math.min(h.n, capS - cur);
            if (add <= 0) { say(p, 'Geladeira cheia (' + capS + ')'); sfx('wrong'); return; }
            G.stock[t.id] = cur + add; h.n -= add; float(t.x + 0.5, t.y, '+' + add + ' ' + ITEMS[t.id].e, '#8fe3a1'); sfx('box');
            if (h.n <= 0) p.hold = null; else say(p, 'Sobraram ' + h.n + ' na caixa');
          }
          else say(p, 'Caixa de ' + ITEMS[h.box].n);
          return;
        }
        if (!h) {
          if (need && !(G.stock[t.id] > 0)) { say(p, 'Sem estoque! Use o computador 💻'); sfx('wrong'); return; }
          if (need) G.stock[t.id]--;
          p.hold = season ? { shaker: t.id } : t.id; sfx('pick'); return;
        }
        if (isPlate(h)) {
          if (!canAdd(h, t.id)) { say(p, 'Não combina com este prato'); return; }
          if (need) { if (!(G.stock[t.id] > 0)) { say(p, 'Sem estoque!'); sfx('wrong'); return; } G.stock[t.id]--; }
          h.items.push(t.id); sfx('pick'); return;
        }
        if (h.shaker === t.id || h === t.id) { p.hold = null; if (need && h === t.id) G.stock[t.id]++; sfx('put'); }
        return;
      }
      case 'app': return interactApp(p, t);
      case 'trash':
        if (!h) return;
        if (h.box) { say(p, 'Não jogue o estoque fora!'); return; }
        if (h.ut) { say(p, 'Lave o utensílio, não jogue fora!'); return; }
        if (isPlate(h)) { if (h.items.length) { h.items = []; sfx('trash'); } return; }
        if (h.dirty) return;
        p.hold = null; sfx('trash'); return;
      case 'utrack': {
        if (!h) {
          if (!t.items.length) { say(p, 'Sem utensílios limpos'); return; }
          // escolhe o utensílio que algum equipamento está precisando
          const need = {};
          G.grid.forEach(function (row) { row.forEach(function (q) { if (q && q.k === 'app' && CC.UT[q.kind] && (!q.ut || q.ut.dirty)) need[q.kind] = 1; }); });
          let idx = -1;
          if (t.sel != null && t.items[t.sel % t.items.length] && p.cycled) idx = t.sel % t.items.length;
          if (idx < 0) idx = t.items.findIndex(function (u) { return need[u.ut]; });
          if (idx < 0) idx = 0;
          p.hold = t.items.splice(idx, 1)[0]; sfx('pick'); return;
        }
        if (isUt(h)) { if (h.dirty) { say(p, 'Lave primeiro'); return; } t.items.push(h); p.hold = null; sfx('put'); return; }
        say(p, 'Só utensílios limpos aqui'); return;
      }
      case 'sink':
        if (h && h.ut) { t.duts = t.duts || []; t.duts.push(h); p.hold = null; sfx('put'); return; }
        if (h && h.dirty) { let n = 1; p.tray = p.tray.filter(function (x) { if (x.dirty) { n++; return false; } return true; }); t.dirty += n; p.hold = null; sfx('put'); return; }
        if (!h && t.clean > 0) { t.clean--; p.hold = newPlate(); sfx('pick'); return; }
        if (isPlate(h) && !h.items.length) { let n = 1; p.tray = p.tray.filter(function (x) { if (x.plate && !x.items.length) { n++; return false; } return true; }); t.clean += n; p.hold = null; sfx('put'); return; }
        return;
      case 'rack':
        if (!h && t.n > 0) { t.n--; p.hold = newPlate(); sfx('pick'); return; }
        if (isPlate(h) && !h.items.length) { let n = 1; p.tray = p.tray.filter(function (x) { if (x.plate && !x.items.length) { n++; return false; } return true; }); t.n += n; p.hold = null; sfx('put'); }
        return;
      case 'ret':
        if (!h && t.dirty > 0) { t.dirty--; p.hold = { dirty: 1 }; sfx('pick'); }
        return;
      case 'serve':
        if (isPlate(h) && h.items.length) { if (deliver(p, h, t)) p.hold = null; }
        else if (isPlate(h)) say(p, 'Prato vazio');
        else if (h && h.dirty) say(p, 'Isso vai na pia!');
        return;
      case 'dock':
        if (!h && t.boxes.length) { const b = t.boxes.shift(); p.hold = { box: b.id, n: b.n }; sfx('box'); }
        else if (h && h.box) { t.boxes.push({ id: h.box, n: h.n }); p.hold = null; sfx('put'); }
        else if (!h) say(p, 'Nenhuma caixa na doca');
        return;
      case 'pc':
        sfx('click'); if (E.onPc) E.onPc(p.id);
        return;
      case 'pantry':
        if (!h) { sfx('click'); if (E.onPantry) E.onPantry(p.id); }
        else if (typeof h === 'string') { p.hold = null; sfx('put'); }
        return;
    }
  }

  function interactSlot(p, t) {
    const h = p.hold, s = t.thing;
    if (!h && !s && p.tray.length) { p.hold = p.tray.pop(); sfx('pick'); return; }
    if (!h && s) { p.hold = s; t.thing = null; t.prog = 0; sfx('pick'); return; }
    if (h && !s) { t.thing = h; p.hold = null; t.prog = 0; sfx('put'); return; }
    if (h && s) {
      if (isPlate(h) && isItem(s)) { if (canAdd(h, s)) { h.items.push(s); t.thing = null; sfx('pick'); } else say(p, 'Não combina'); return; }
      if (isPlate(s) && isItem(h)) { if (canAdd(s, h)) { s.items.push(h); p.hold = null; sfx('pick'); } else say(p, 'Não combina'); return; }
      if (isPlate(s) && h.shaker) { if (canAdd(s, h.shaker)) { s.items.push(h.shaker); sfx('pick'); } else say(p, 'Não combina'); return; }
      if (isPlate(h) && s.shaker) { if (canAdd(h, s.shaker)) { h.items.push(s.shaker); sfx('pick'); } return; }
      if (isPlate(h) && isPlate(s)) { say(p, 'Já tem um prato aqui'); return; }
    }
  }

  function interactApp(p, a) {
    const h = p.hold, U = G.utOn && CC.UT[a.kind];
    // colocar / trocar utensílio
    if (U && isUt(h)) {
      if (h.ut !== a.kind) { say(p, 'Isso não serve aqui (' + CC.UT[h.ut].n + ')'); sfx('wrong'); return; }
      if (a.st !== 'idle' || a.items.length || a.out) { say(p, 'Esvazie primeiro'); sfx('wrong'); return; }
      const old = a.ut; a.ut = h; p.hold = old || null; sfx('put'); return;
    }
    if (!h) {
      if (a.out) {
        const it = ITEMS[a.out];
        if (it.liq) { say(p, 'Precisa de um prato'); return; }
        p.hold = a.out; resetApp(a); sfx('pick'); return;
      }
      if (a.st === 'idle' && a.items.length) { p.hold = a.items.pop(); a.grace = 0; a.wait = 0; sfx('pick'); return; }
      if (U && a.ut && a.st === 'idle') { p.hold = a.ut; a.ut = null; sfx('pick'); }
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
      if (U && !a.ut) { say(p, 'Precisa de ' + U.n.toLowerCase() + '!'); sfx('wrong'); return; }
      if (U && a.ut.dirty) { say(p, U.n + ' suja! Lave na pia'); sfx('wrong'); return; }
      if (appAccepts(a, h)) { a.items.push(h); p.hold = null; a.grace = 0; sfx('put'); }
      else if (a.out) say(p, 'Ocupado');
      else say(p, 'Isso não vai aqui');
    }
  }
  function resetApp(a) {
    const had = !!a.out;
    a.st = 'idle'; a.out = null; a.rec = null; a.prog = 0; a.burn = 0; a.warned = false; a.items = []; a.grace = 0; a.wait = 0;
    if (had && a.ut && a.ut.uses >= utMax(a.kind)) { a.ut.dirty = true; if (G) { toast('🧽 ' + CC.UT[a.kind].n + ' suja! Lave na pia', 'bad'); } }
  }

  /* ação segurada (cortar, ralar, pilar, espremer, descascar, lavar) */
  function holdAction(p, dt) {
    p.chopping = false; p.actKind = '';
    const tg = target(p);
    if (!tg) return;
    const t = tg.t, C = CC.CUTS[t.k];
    if (t.k === 'utrack') { if (!p.actPrev && t.items.length) { t.sel = ((t.sel == null ? -1 : t.sel) + 1) % t.items.length; p.cycled = true; const u = t.items[t.sel]; say(p, 'Próximo: ' + CC.UT[u.ut].n); sfx('click'); } return; }
    if (C && isItem(t.thing) && ITEMS[t.thing].raw && CC.ING[t.thing] && CC.ING[t.thing][C.adj]) {
      const sec = CC.ING[t.thing][C.sec] || 2.5;
      p.chopping = true; p.actKind = t.k;
      t.prog += dt * (1 + 0.35 * up('knife')) / sec;
      if (t.prog >= 1) { t.thing = t.thing + C.suf; t.prog = 0; sfx('chopdone'); float(tg.x + 0.5, tg.y, C.badge, '#fff'); }
    } else if (t.k === 'sink' && (t.dirty > 0 || (t.duts && t.duts.length))) {
      p.chopping = true; p.actKind = 'wash';
      const utw = !!(t.duts && t.duts.length);
      t.prog += dt * (1 + 0.6 * up('sponge')) / (utw ? 4.5 : 3);
      if (Math.random() < dt * 14) G.parts.push({ x: tg.x + 0.25 + Math.random() * 0.5, y: tg.y + 0.45, vy: -0.5, t: 0.8, c: 'rgba(130,200,255,', r: 0.05 + Math.random() * 0.05 });
      if (t.prog >= 1) {
        t.prog = 0; sfx('chopdone');
        if (utw) { const u = t.duts.shift(); u.uses = 0; u.dirty = false; const rk = findTile('utrack'); if (rk) rk.items.push(u); float(tg.x + 0.5, tg.y, '✨', '#8fe3ff'); }
        else { t.dirty--; t.clean++; }
      }
    }
  }

  /* ---------- física ---------- */
  const R = 0.3;
  function move(p, dt) {
    if (p.dcd > 0) p.dcd -= dt;
    let mx = p.mx, my = p.my;
    if (p.stun > 0) { p.stun -= dt; mx = 0; my = 0; }
    const mag = Math.hypot(mx, my);
    if (mag > 0) { mx /= mag; my /= mag; if (Math.abs(mx) > Math.abs(my) + 0.01) { p.dx = Math.sign(mx); p.dy = 0; } else if (Math.abs(my) > Math.abs(mx) + 0.01) { p.dx = 0; p.dy = Math.sign(my); } else { p.dx = Math.sign(mx); p.dy = 0; } }
    let sp = 4.4 * cfg('chef', 1) * (1 + 0.08 * up('shoes')) * (up('cart') ? 0.85 : p.tray && p.tray.length >= 2 ? 0.94 : 1);
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
    if (!cfg('noCollide', false)) for (let i = 0; i < G.players.length; i++) { const o = G.players[i]; if (o !== self && Math.hypot(o.x - x, o.y - y) < R * 1.9) return true; }
    return false;
  }

  /* ---------- passo da simulação ---------- */
  E.step = function (dt) {
    if (!G || G.over || G.paused) return;
    if (G.countdown > 0) { G.countdown -= dt; if (G.countdown < 0) G.countdown = 0; return; }
    dt *= cfg('speed', 1);
    const lv = G.lv;
    if (!G.started) { G.started = true; for (let i = 0; i < (lv.initial || 0) && G.orders.length < lv.max; i++) newOrder(); }
    G.time += dt;
    updateEvents(dt);
    updateBugs(dt);
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
        const pen = Math.round(o.dish.price * 0.4 * (1 - 0.3 * up('insurance'))); G.score = Math.max(0, G.score - pen); G.cash = Math.max(0, G.cash - pen);
        toast('Pedido perdido: ' + o.dish.n + ' (-' + pen + ')', 'bad'); sfx('fail'); G.shake = 0.3;
        if (lv.lives) { G.lives--; if (G.lives <= 0) return finish(); }
      }
    }
    // jogadores
    G.players.forEach(function (p) {
      move(p, dt);
      if (cfg('pvp', false) && p.dash > 0) G.players.forEach(function (o) {
        if (o !== p && !(o.stun > 0) && Math.hypot(o.x - p.x, o.y - p.y) < 0.85) {
          o.stun = 1.3; o.mx = 0; o.my = 0; const dx = o.x - p.x, dy = o.y - p.y, d = Math.hypot(dx, dy) || 1;
          for (let s = 0; s < 8; s++) { const nx = o.x + dx / d * 0.15, ny = o.y + dy / d * 0.15; if (!hit(nx, ny, o)) { o.x = nx; o.y = ny; } }
          p.dash = 0; sfx('bump'); float(o.x, o.y - 0.7, '💫', '#fff');
        }
      });
      if (p.act && !(p.stun > 0)) holdAction(p, dt); else p.chopping = false;
      p.actPrev = !!p.act;
      if (p.msgT > 0) p.msgT -= dt;
      if (p.scd > 0) p.scd -= dt;
      if (p.swing > 0) p.swing -= dt;
    });
    // tiles
    for (let y = 0; y < G.H; y++) for (let x = 0; x < G.W; x++) {
      const t = G.grid[y][x];
      if (!t) continue;
      t.x = x; t.y = y;
      if (t.k === 'app') updateApp(t, dt);
      if (t.k === 'sink' && up('auto') && (t.dirty > 0 || (t.duts && t.duts.length))) { t.auto = (t.auto || 0) + dt; if (t.auto >= 9 - 3 * up('auto')) { t.auto = 0; if (t.dirty > 0) { t.dirty--; t.clean++; } else { const u = t.duts.shift(); u.uses = 0; u.dirty = false; const rk = findTile('utrack'); if (rk) rk.items.push(u); } } }
      if (t.flash > 0) t.flash -= dt;
    }
    // reposição automática
    if (up('autostock') && G.stockOn) {
      G.autoT = (G.autoT == null ? 30 : G.autoT) - dt;
      if (G.autoT <= 0) {
        G.autoT = 55 - 12 * up('autostock');
        const ids = G.stockIds.slice().sort(function (a, b) { return G.stock[a] - G.stock[b]; }), id = ids[0];
        if (id != null && G.stock[id] < 4 && findTile('dock')) { const c = E.boxCost(id); if (G.cash >= c) { G.cash -= c; G.trucks.push({ t: E.truckDelay(), boxes: [{ id: id, n: E.boxUnits() }] }); toast('🔁 Reposição automática: ' + ITEMS[id].n, 'ok'); } }
      }
    }
    // caminhões de estoque
    for (let i = G.trucks.length - 1; i >= 0; i--) {
      const tr = G.trucks[i]; tr.t -= dt;
      if (tr.t <= 0) {
        G.trucks.splice(i, 1);
        const d = findTile('dock'); if (d) { tr.boxes.forEach(function (b) { d.boxes.push(b); }); d.flash = 1.2; }
        sfx('truck'); toast('🚚 O caminhão chegou! Pegue as caixas na doca', 'ok');
      }
    }
    CC.Sound.ambient(G, dt, listeners());
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
  /* ---------- eventos (rush, apagão) ---------- */
  function updateEvents(dt) {
    if (G.rush > 0) { G.rush -= dt; if (G.rush <= 0) toast('O rush acabou', 'ok'); }
    if (G.dark > 0) { G.dark -= dt; if (G.dark <= 0) toast('A luz voltou!', 'ok'); }
    if (cfg('rush', false)) { G.evT.rush -= dt; if (G.evT.rush <= 0) { G.evT.rush = 70 + Math.random() * 50; G.rush = 20; toast('🔥 HORA DO RUSH! Pedidos 2× mais rápidos e +50% de pontos', 'bad'); sfx('order'); } }
    if (cfg('dark', false)) { G.evT.dark -= dt; if (G.evT.dark <= 0) { G.evT.dark = 60 + Math.random() * 60; if (up('generator')) toast('🔋 O gerador segurou o apagão', 'ok'); else { G.dark = 7; toast('💡 APAGÃO! Fique perto das luzes dos chefs', 'bad'); sfx('fail'); } } }
  }
  /* ---------- pragas ---------- */
  const BUGS = {
    roach: { e: '🪳', sp: 1.2, hp: 1, bite: 13, w: 3 }, fly: { e: '🪰', sp: 2.2, hp: 1, bite: 16, w: 3, fly: 1 }, ant: { e: '🐜', sp: 0.9, hp: 1, bite: 12, w: 2, group: 2 },
    beetle: { e: '🪲', sp: 0.9, hp: 1, bite: 14, w: 1 }, wasp: { e: '🐝', sp: 2.4, hp: 1, bite: 18, w: 1, fly: 1 }, worm: { e: '🐛', sp: 0.7, hp: 1, bite: 12, w: 1 }
  };
  CC.BUGS = BUGS;
  const BCAP = [0, 3, 6, 10], BINT = [99, 24, 15, 9];
  function floorEdge() {
    for (let k = 0; k < 40; k++) {
      const x = 1 + Math.floor(Math.random() * (G.W - 2)), y = 1 + Math.floor(Math.random() * (G.H - 2));
      if (!G.grid[y][x] && (x === 1 || y === 1 || x === G.W - 2 || y === G.H - 2)) return [x + 0.5, y + 0.5];
    }
    return [1.5, 1.5];
  }
  function spawnBugs() {
    const lvl = cfg('bugs', 0) | 0;
    if (G.bugs.length >= BCAP[lvl]) return;
    const keys = Object.keys(BUGS), tot = keys.reduce(function (s, k) { return s + BUGS[k].w; }, 0);
    let r = Math.random() * tot, kind = keys[0];
    for (let i = 0; i < keys.length; i++) { r -= BUGS[keys[i]].w; if (r <= 0) { kind = keys[i]; break; } }
    const K = BUGS[kind], n = K.group || 1, pt = floorEdge();
    for (let i = 0; i < n && G.bugs.length < BCAP[lvl] + 3; i++) G.bugs.push({ id: G.bugId++, k: kind, x: pt[0] + Math.random() * 0.6, y: pt[1] + Math.random() * 0.6, hp: K.hp, tx: 0, ty: 0, rt: 0, bt: 1 + Math.random() * 2, ph: Math.random() * 6, a: 0 });
    if (G.bugs.length === n) { toast('🪳 Pragas na cozinha! Use R (ou clique) para matar', 'bad'); }
    sfx('bug');
  }
  function bugTargets() {
    const out = [];
    for (let y = 0; y < G.H; y++) for (let x = 0; x < G.W; x++) {
      const t = G.grid[y][x]; if (!t) continue;
      let ok = false;
      if (SLOTS[t.k]) { const s = t.thing; ok = (typeof s === 'string' && s !== 'infestado') || (s && s.plate && s.items.length && s.items.indexOf('infestado') < 0); }
      else if (t.k === 'app') ok = !!t.out && t.out !== 'queimado' && t.out !== 'infestado';
      else if (t.k === 'crate') ok = G.stockOn && !CC.SEAS[t.id] && G.stock[t.id] > 0;
      else if (t.k === 'dock') ok = t.boxes.length > 0;
      if (ok) out.push([x + 0.5, y + 0.5]);
    }
    return out;
  }
  function updateBugs(dt) {
    const lvl = cfg('bugs', 0) | 0;
    if (G.immune > 0) G.immune -= dt;
    if (lvl > 0 && G.immune <= 0) { G.bugT -= dt; if (G.bugT <= 0) { G.bugT = BINT[lvl] * (1 + 0.4 * up('screens')) * (0.8 + Math.random() * 0.6); spawnBugs(); } }
    if (up('zapper') && G.bugs.length) { G.zapT -= dt; if (G.zapT <= 0) { G.zapT = 4; for (let i = 0; i < up('zapper') && G.bugs.length; i++) { const b = G.bugs[Math.floor(Math.random() * G.bugs.length)]; kill(b, '⚡'); } sfx('zap'); } }
    if (!G.bugs.length) return;
    const targets = bugTargets();
    G.bugs.forEach(function (b) {
      const K = BUGS[b.k];
      b.rt -= dt;
      if (b.rt <= 0 || !b.tx) {
        b.rt = 2 + Math.random() * 2;
        let best = null, bd = 1e9;
        targets.forEach(function (t) { const d = Math.hypot(t[0] - b.x, t[1] - b.y) + Math.random() * 4; if (d < bd) { bd = d; best = t; } });
        if (best) { b.tx = best[0]; b.ty = best[1]; b.goal = true; } else { b.tx = 1.5 + Math.random() * (G.W - 3); b.ty = 1.5 + Math.random() * (G.H - 3); b.goal = false; }
      }
      const dx = b.tx - b.x, dy = b.ty - b.y, d = Math.hypot(dx, dy) || 1;
      if (d > 0.45) {
        b.ph += dt * 9;
        const sp = K.sp * (G.immune > 0 ? 0.5 : 1);
        b.x += (dx / d * sp + (-dy / d) * Math.sin(b.ph) * 0.8) * dt; b.y += (dy / d * sp + (dx / d) * Math.sin(b.ph) * 0.8) * dt; b.a = Math.atan2(dy, dx);
      } else if (b.goal) {
        b.bt -= dt;
        if (b.bt <= 0) { b.bt = K.bite; infest(b); if (Math.random() < 0.6) b.rt = 0; }
      } else b.rt = 0;
    });
  }
  function infest(b) {
    const cx = Math.floor(b.tx), cy = Math.floor(b.ty), t = tileAt(cx, cy);
    if (!t) return;
    let hit = false;
    if (SLOTS[t.k]) {
      if (typeof t.thing === 'string' && t.thing !== 'infestado') { t.thing = 'infestado'; hit = true; }
      else if (t.thing && t.thing.plate && t.thing.items.length) { t.thing.items = ['infestado']; hit = true; }
    } else if (t.k === 'app' && t.out && t.out !== 'queimado' && t.out !== 'infestado') { t.out = 'infestado'; hit = true; }
    else if (t.k === 'crate' && G.stockOn && G.stock[t.id] > 0) { G.stock[t.id]--; float(cx + 0.5, cy, '-1 ' + ITEMS[t.id].e, '#ff8a80'); hit = true; }
    else if (t.k === 'dock' && t.boxes.length) { t.boxes[0].n--; if (t.boxes[0].n <= 0) t.boxes.shift(); hit = true; }
    if (hit) { sfx('bite'); if (!G.lastBugToast || G.time - G.lastBugToast > 6) { G.lastBugToast = G.time; toast('🪳 Uma praga estragou comida!', 'bad'); } }
  }
  function splat(b) { for (let i = 0; i < 5; i++) G.parts.push({ x: b.x + (Math.random() - 0.5) * 0.3, y: b.y + (Math.random() - 0.5) * 0.3, vy: -0.2, t: 0.6, c: 'rgba(120,170,60,', r: 0.06 + Math.random() * 0.05 }); }
  function kill(b, mark) {
    const i = G.bugs.indexOf(b); if (i < 0) return;
    G.bugs.splice(i, 1); G.killed++; G.cash += 2; splat(b); float(b.x, b.y - 0.2, mark || '+2', '#b8e986'); sfx('squish');
  }
  function swat(p, ax, ay) {
    if (G.over || G.countdown > 0) return;
    if (p.scd > 0) return; p.scd = 0.2;
    const R = 1.5 + 0.45 * up('swatter');
    let n = 0;
    G.bugs.slice().forEach(function (b) {
      const dx = b.x - p.x, dy = b.y - p.y, d = Math.hypot(dx, dy);
      const inFront = dx * p.dx + dy * p.dy > -0.15;
      let hitIt = false;
      if (ax != null) hitIt = Math.hypot(b.x - ax, b.y - ay) < 1.0 && d < 6; else hitIt = d < R && inFront;
      if (hitIt) { b.hp--; if (b.hp <= 0) { kill(b); n++; } else { splat(b); sfx('squish'); } }
    });
    p.swing = 0.2;
    if (!n) sfx('swat');
  }
  E.clickSwat = function (tx, ty) {
    if (!G || G.over) return;
    if (G.client) { const me = G.players[G.myIdx]; if (me) outbox.push('s@' + tx.toFixed(2) + ',' + ty.toFixed(2)); return; }
    const mine = G.players.find(function (p) { return !p.remote; }) || G.players[0];
    swat(mine, tx, ty);
  };
  function listeners() { if (!G) return []; if (G.client) return G.players[G.myIdx] ? [G.players[G.myIdx]] : []; return G.players.filter(function (p) { return !p.remote; }); }
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
    G.result = { score: G.score, stars: stars, delivered: G.delivered, failed: G.failed, tips: G.tips, bestCombo: G.bestCombo, need: st, time: Math.round(G.time), burnt: G.burnt, dishes: G.dishCount, cash: G.cash, killed: G.killed };
    if (G.versus) {
      const rank = G.players.map(function (q, i) { return { i: i, name: q.name, color: q.color, hat: q.hat, score: G.pscore[i], del: G.pdel[i] }; }).sort(function (a, b) { return b.score - a.score || b.del - a.del; });
      let teams = null;
      if (G.versus === 'teams') teams = [0, 1].map(function (t) { const m = rank.filter(function (r) { return r.i % 2 === t; }); return { t: t, score: m.reduce(function (s, r) { return s + r.score; }, 0), del: m.reduce(function (s, r) { return s + r.del; }, 0), members: m.map(function (r) { return r.name; }) }; }).sort(function (a, b) { return b.score - a.score; });
      G.result.versus = { mode: G.versus, rank: rank, teams: teams, goal: lv.goal || 0, winner: G.winner };
      G.result.stars = 0; G.result.need = [0, 0, 0];
      sfx('win'); return;
    }
    sfx(stars ? 'win' : 'lose');
  }
  E.finish = function () { if (G && !G.over) finish(); };
  /* computador: pedir estoque e comprar melhorias (rodam no anfitrião) */
  E.maxBoxes = function () { return Math.min(6, 4 + up('boxes')); };
  E.boxCost = function (id) { return Math.max(1, Math.round(CC.priceOf(id) * 4 * cfg('priceMul', 1) * (1 - 0.1 * up('contract')))); };
  E.boxUnits = function () { return 4 + up('boxsize'); };
  function costMap() { const m = {}; (G.stockIds || []).forEach(function (id) { m[id] = E.boxCost(id); }); return m; }
  E.truckDelay = function () { return Math.max(4, Math.round(26 * cfg('truckMul', 1) * Math.pow(0.88, up('express')))); };
  E.pcOrder = function (idx, ids) {
    if (!G || G.over || !G.stockOn) return false;
    ids = (ids || []).filter(function (id) { return G.stockIds.indexOf(id) >= 0; }).slice(0, E.maxBoxes());
    if (!ids.length) return false;
    const cost = ids.reduce(function (s, id) { return s + E.boxCost(id); }, 0);
    if (cost > G.cash) { sfx('nobuy'); toast('Dinheiro insuficiente para o pedido', 'bad'); return false; }
    if (!findTile('dock')) return false;
    G.cash -= cost;
    G.trucks.push({ t: E.truckDelay(), boxes: ids.map(function (id) { return { id: id, n: E.boxUnits() }; }) });
    sfx('buy'); toast('📦 Pedido enviado (-' + cost + '). O caminhão chega em ' + E.truckDelay() + 's', 'ok');
    return true;
  };
  E.shopBuy = function (idx, id) {
    const it = CC.SHOP[id];
    if (!G || G.over || !it) return false;
    const lvl = up(id), rep = !!it.repeat;
    if (!rep && lvl >= it.cost.length) { toast(it.n + ' já está no máximo', 'bad'); return false; }
    const price = rep ? it.cost[0] : it.cost[lvl];
    if (G.cash < price) { sfx('nobuy'); toast('Dinheiro insuficiente', 'bad'); return false; }
    if (id === 'clock') {
      if (G.lv.practice) { toast('Sem efeito no treino', 'bad'); return false; }
      if (G.lv.lives) G.lives = Math.min(5, G.lives + 1); else if (G.lv.endless) { toast('Sem efeito neste modo', 'bad'); return false; } else G.left += 15;
    }
    G.cash -= price; G.up[id] = lvl + 1;
    if (id === 'plates') { const r = findTile('rack'); if (r) r.n += 2; }
    if (id === 'spares') { const r = findTile('utrack'); if (!r) { G.cash += price; G.up[id] = lvl; toast('Sem prateleira de utensílios nesta fase', 'bad'); return false; } const ks = {}; G.grid.forEach(function (row) { row.forEach(function (t) { if (t && t.k === 'app' && CC.UT[t.kind]) ks[t.kind] = 1; }); }); Object.keys(ks).forEach(function (k) { r.items.push(CC.mkUt(k)); }); }
    if (id === 'spray') { G.bugs.forEach(function (b) { splat(b); }); G.killed += G.bugs.length; G.bugs = []; G.immune = 45; sfx('spray'); }
    else sfx('buy');
    toast(it.e + ' ' + it.n + ' comprado!', 'ok');
    return true;
  };
  E.onPc = null; E.onPantry = null;
  E.pantryTake = function (idx, id) {
    const p = G && G.players[idx];
    if (!p || p.hold || !ITEMS[id] || !ITEMS[id].raw || CC.SEAS[id]) return false;
    p.hold = id; sfx('pick'); return true;
  };

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
    { up: ['KeyW'], down: ['KeyS'], left: ['KeyA'], right: ['KeyD'], act: ['Space'], chop: ['KeyE'], dash: ['KeyQ', 'ShiftLeft'], swat: ['KeyR', 'KeyF'] },
    { up: ['ArrowUp'], down: ['ArrowDown'], left: ['ArrowLeft'], right: ['ArrowRight'], act: ['Enter'], chop: ['ShiftRight', 'Period'], dash: ['Slash', 'Comma'], swat: ['Quote', 'Backslash'] },
    { up: ['KeyI'], down: ['KeyK'], left: ['KeyJ'], right: ['KeyL'], act: ['KeyU'], chop: ['KeyO'], dash: ['KeyY'], swat: ['KeyH'] },
    { up: ['Numpad8'], down: ['Numpad5'], left: ['Numpad4'], right: ['Numpad6'], act: ['Numpad0'], chop: ['NumpadDecimal'], dash: ['NumpadEnter'], swat: ['NumpadAdd'] }
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
    if (p.stun > 0) return;
    if (kind === 'i') interact(p);
    else if (kind === 'd') { if (p.dcd <= 0 && !G.paused) { p.dash = 0.16; p.dcd = 1.1 * (1 - 0.2 * up('dashcd')); sfx('dash'); } }
    else if (kind === 's') swat(p);
    else if (kind.charAt(0) === 's' && kind.charAt(1) === '@') { const q = kind.slice(2).split(','); swat(p, +q[0], +q[1]); }
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
    (presses || []).forEach(function (k) { if (typeof k === 'string' && k.length < 20 && (k === 'i' || k === 'd' || k === 's' || k.indexOf('s@') === 0)) press(p, k); });
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
        edge('l', b(4), function () { press(p, 's'); });
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
          if (m.swat.indexOf(c) >= 0) press(p, 's');
        });
      });
    }
  }
  // testes headless
  E.press = function (i, what) { const p = G.players[i]; if (what === 'act') interact(p); };
  E.interact = function (i) { interact(G.players[i]); };
  E.canAdd = canAdd;

  /* ---------- som (CC.Sound) ---------- */
  function sfx(n, fromNet) {
    if (G && G.net === 'host' && !fromNet) G.ev.push({ t: 's', n: n });
    CC.Sound.sfx(n);
  }
  E.sfx = sfx;
})(window.CC);
