/* Cozinha Caos — interface React (sem JSX) */
(function (CC) {
  'use strict';
  const h = React.createElement, useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
  const ITEMS = CC.ITEMS, DISHES = CC.DISHES, MP = CC.MP;
  const el = function (t) { return function (p) { return h.apply(null, [t, p].concat([].slice.call(arguments, 1))); }; };
  const div = el('div'), span = el('span'), button = el('button'), input = el('input'), canvas = el('canvas'), select = el('select'), option = el('option');

  /* ---------- save ---------- */
  const SAVE_KEY = 'cozinha_caos.v1';
  const HATS = ['toque', '🧢', '👑', '🎩', '🎓', '👒', '🪖', '🌟'];
  const DEF = function () {
    return { stars: {}, best: {}, sound: true, unlock: false, players: 1, name: 'Chef', skins: [0, 1, 2, 3].map(function (i) { return { color: CC.COLS[i], hat: 'toque' }; }),
      stats: { delivered: 0, matches: 0, online: 0, bestScore: 0, cats: {}, dishes: {}, endlessBest: 0 }, ach: {}, daily: {}, custom: null };
  };
  function loadSave() {
    const d = DEF();
    try { const s = JSON.parse(localStorage.getItem(SAVE_KEY)); if (s) { const m = Object.assign(d, s); m.stats = Object.assign(DEF().stats, s.stats || {}); m.skins = DEF().skins.map(function (x, i) { return Object.assign(x, (s.skins || [])[i] || {}); }); return m; } } catch (e) { }
    return d;
  }
  function writeSave(s) { try { localStorage.setItem(SAVE_KEY, JSON.stringify(s)); } catch (e) { } }

  /* ---------- conquistas ---------- */
  CC.ACH = [
    ['first', '🍽️', 'Primeiro prato', 'Entregue seu primeiro pedido', function (s) { return s.delivered >= 1; }],
    ['d50', '👨‍🍳', 'Cozinheiro', 'Entregue 50 pratos', function (s) { return s.delivered >= 50; }],
    ['d250', '🧑‍🍳', 'Chef', 'Entregue 250 pratos', function (s) { return s.delivered >= 250; }],
    ['d1000', '🏅', 'Mestre-cuca', 'Entregue 1000 pratos', function (s) { return s.delivered >= 1000; }],
    ['combo5', '🔥', 'Em chamas', 'Faça um combo x5', function (s, r) { return r && r.bestCombo >= 5; }],
    ['combo10', '☄️', 'Imparável', 'Faça um combo x10', function (s, r) { return r && r.bestCombo >= 10; }],
    ['star3', '⭐', 'Perfeccionista', 'Consiga 3 estrelas em uma fase', function (s, r, sv) { return Object.keys(sv.stars).some(function (k) { return sv.stars[k] >= 3; }); }],
    ['star10', '🌟', 'Constelação', 'Consiga 3 estrelas em 10 fases', function (s, r, sv) { return Object.keys(sv.stars).filter(function (k) { return sv.stars[k] >= 3; }).length >= 10; }],
    ['nofail', '😇', 'Sem reclamações', 'Termine uma fase sem perder pedidos (mín. 6 entregas)', function (s, r) { return r && r.failed === 0 && r.delivered >= 6 && r.time > 60; }],
    ['nofire', '🧯', 'Fogo sob controle', 'Entregue 8+ pratos sem queimar nada', function (s, r) { return r && r.burnt === 0 && r.delivered >= 8; }],
    ['score1000', '💰', 'Mil pontos', 'Faça 1000 pontos em uma partida', function (s, r) { return r && r.score >= 1000; }],
    ['endless30', '♾️', 'Maratonista', 'Entregue 30 pratos no Modo Infinito', function (s, r, sv, lv) { return lv && lv.id === 'endless' && r && r.delivered >= 30; }],
    ['daily', '📅', 'Desafio cumprido', 'Termine um Desafio do Dia', function (s, r, sv, lv) { return lv && lv.id === 'daily' && !!r; }],
    ['online', '🌐', 'Cozinha coletiva', 'Termine uma partida online', function (s) { return s.online >= 1; }],
    ['brigada', '👥', 'Brigada completa', 'Termine uma partida com 4 chefs', function (s, r) { return r && r.nplayers >= 4; }],
    ['variety', '📖', 'Cardápio vasto', 'Entregue 40 pratos diferentes', function (s) { return Object.keys(s.dishes).length >= 40; }],
    ['sushi', '🍣', 'Mestre do sushi', 'Entregue 20 pratos japoneses', function (s) { return (s.cats.japa || 0) >= 20; }],
    ['doceiro', '🍰', 'Confeiteiro', 'Entregue 25 sobremesas', function (s) { return (s.cats.doce || 0) >= 25; }],
    ['gourmet', '🦞', 'Paladar refinado', 'Entregue 15 pratos gourmet', function (s) { return (s.cats.gourmet || 0) >= 15; }],
    ['campeao', '🏆', 'Campeão', 'Vença uma competição entre chefs', function (s, r) { return r && r.versus && r.versus.rank && r.versus.rank[0].i === 0 && r.nplayers >= 2; }],
    ['maratona', '🎮', 'Viciado', 'Jogue 25 partidas', function (s) { return s.matches >= 25; }]
  ];

  /* ---------- componentes básicos ---------- */
  function Em(p) {
    const s = p.e || '', i = s.indexOf('+'), sz = p.size || 24;
    if (i < 0) return span({ className: 'em', style: { fontSize: sz } }, s);
    return span({ className: 'em comp', style: { fontSize: sz } }, s.slice(0, i), span({ className: 'badge', style: { fontSize: sz * 0.52 } }, s.slice(i + 1)));
  }
  const fmt = function (t) { t = Math.max(0, Math.ceil(t)); return Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2); };
  const Stars = function (p) { return div({ className: 'stars' }, [1, 2, 3].map(function (i) { return span({ key: i, className: i <= p.n ? 'on' : '' }, '★'); })); };
  function ChefIcon(p) { return span({ className: 'chefico', style: { background: p.skin.color } }, p.skin.hat === 'toque' ? '👨‍🍳' : p.skin.hat); }

  const WCOL = ['#2ecc71', '#3498db', '#e67e22', '#9b59b6'];
  function Ticket(p) {
    const o = p.o, d = DISHES[o.dish], f = o.t / o.tmax;
    const col = f > 0.5 ? '#4cd964' : f > 0.25 ? '#f1c40f' : '#e74c3c';
    const multi = p.nwin > 1;
    return div({ className: 'ticket' + (f < 0.25 ? ' urgent' : '') + (o.vip ? ' vip' : ''), onClick: p.onClick,
      onMouseEnter: function (e) { p.onHover(o.dish, e.currentTarget.getBoundingClientRect()); }, onMouseLeave: function () { p.onHover(null); } },
      multi ? div({ className: 'winbadge', style: { background: WCOL[(o.win || 0) % 4] } }, '🛎️ ' + CC.winName(p.lv, o.win || 0)) : null,
      div({ className: 'tk-head' }, h(Em, { e: d.e, size: 26 }), span({ className: 'tk-name' }, d.n), o.vip ? span({ className: 'vipb' }, '⭐x2') : null),
      div({ className: 'tk-parts' },
        d.parts.map(function (id, i) { return span({ key: i, title: ITEMS[id].n, className: 'chip' }, h(Em, { e: ITEMS[id].e, size: 17 })); }),
        o.seas.map(function (s) { return span({ key: s, title: ITEMS[s].n, className: 'chip seas' }, h(Em, { e: ITEMS[s].e, size: 15 }), span({ className: 'sn' }, ITEMS[s].n)); })),
      div({ className: 'tk-bar' }, div({ style: { width: (f * 100) + '%', background: col } })));
  }

  /* placar da competição */
  function Scoreboard(p) {
    const sn = p.snap, pl = sn.pl || [];
    if (sn.versus === 'teams') {
      const tot = [0, 1].map(function (t) { return pl.reduce(function (s, q, i) { return s + (i % 2 === t ? (sn.pscore[i] || 0) : 0); }, 0); });
      return div({ className: 'scoreboard' }, [0, 1].map(function (t) { return div({ key: t, className: 'sbteam t' + t }, (t ? '🔵 ' : '🔴 ') + tot[t]); }),
        pl.map(function (q, i) { return div({ key: 'p' + i, className: 'sbrow', style: { borderColor: q.c } }, h(ChefIcon, { skin: { color: q.c, hat: q.h || 'toque' } }), span({ className: 'sbs' }, sn.pscore[i] || 0)); }));
    }
    return div({ className: 'scoreboard' }, pl.map(function (q, i) { return div({ key: i, className: 'sbrow', style: { borderColor: q.c } }, h(ChefIcon, { skin: { color: q.c, hat: q.h || 'toque' } }), span({ className: 'sbs' }, sn.pscore[i] || 0), sn.goal ? span({ className: 'sbg' }, (sn.pdel[i] || 0) + '/' + sn.goal) : null); }));
  }
  function VersusResult(p) {
    const v = p.v, medals = ['🥇', '🥈', '🥉', '4º'];
    return div({ className: 'versus' },
      v.teams ? div({ className: 'vteams' }, v.teams.map(function (t, k) { return div({ key: t.t, className: 'vt' + (k === 0 ? ' win' : '') }, (t.t ? '🔵 Equipe azul' : '🔴 Equipe vermelha') + (k === 0 ? ' 🏆' : ''), div({ className: 'sub' }, t.members.join(' + ')), div({ className: 'vs' }, '💰 ' + t.score)); })) : null,
      div({ className: 'vrank' }, v.rank.map(function (r, k) { return div({ key: r.i, className: 'vrow' + (k === 0 && !v.teams ? ' win' : '') }, span({ className: 'vm' }, medals[k] || (k + 1) + 'º'), h(ChefIcon, { skin: { color: r.color, hat: r.hat || 'toque' } }), span({ className: 'vn' }, r.name), span({ className: 'vd' }, r.del + ' pratos'), span({ className: 'vs' }, '💰 ' + r.score)); })),
      v.goal ? div({ className: 'sub' }, 'Meta da corrida: ' + v.goal + ' pratos') : null);
  }

  /* guia rápido: aparece ao passar o mouse sobre um pedido */
  function QuickGuide(p) {
    const d = DISHES[p.dish];
    if (!d) return null;
    const seen = {}, steps = [];
    d.parts.forEach(function (pt) { CC.steps(pt).forEach(function (s) { const k = s.n + s.txt; if (!seen[k]) { seen[k] = 1; steps.push(s); } }); });
    const left = Math.max(8, Math.min(window.innerWidth - 400, p.rect.left)), top = p.rect.bottom + 6;
    return div({ className: 'qguide', style: { left: left, top: top } },
      div({ className: 'dt-head' }, h(Em, { e: d.e, size: 34 }), div(null, h('h3', null, d.n), div({ className: 'sub' }, CC.CATS[d.cat][0] + ' • 💰 ' + d.price))),
      h('ol', { className: 'steps tight' }, steps.slice(0, 14).map(function (s, i) { return h('li', { key: i }, h(Em, { e: s.e, size: 16 }), ' ', span({ className: 'sname' }, s.n), span({ className: 'stxt' }, s.txt)); }),
        h('li', { className: 'final' }, '🍽️ Prato: ', d.parts.map(function (id, i) { return h(Em, { key: i, e: ITEMS[id].e, size: 16 }); }), d.seas.length ? span({ className: 'opt' }, ' (tempero opcional)') : null)));
  }

  /* despensa (treino): pega qualquer ingrediente */
  function Pantry(p) {
    const qs = useState(''), q = qs[0], setQ = qs[1];
    const ids = Object.keys(CC.ING).sort(function (a, b) { return CC.ING[a].n < CC.ING[b].n ? -1 : 1; }).filter(function (id) { return !q || CC.ING[id].n.toLowerCase().indexOf(q.toLowerCase()) >= 0; });
    return div({ className: 'overlay' }, div({ className: 'pcwrap' },
      div({ className: 'topbar' }, h('h1', null, '🗄️ Despensa — escolha um ingrediente'), button({ className: 'btn sm', onClick: p.onClose }, '✖ Fechar')),
      input({ className: 'search', autoFocus: true, placeholder: '🔎 Buscar ingrediente…', value: q, onChange: function (e) { setQ(e.target.value); } }),
      div({ className: 'ingrid' }, ids.map(function (id) { return div({ key: id, className: 'ingcard', onClick: function () { p.onTake(id); } }, h(Em, { e: CC.ING[id].e, size: 28 }), div({ className: 'ingn' }, CC.ING[id].n)); }))));
  }

  /* computador: pedir estoque ao caminhão e comprar melhorias na loja */
  function Computer(p) {
    const sn = p.snap, up = sn.up || {};
    const ts = useState(sn.stockOn ? 'stock' : 'shop'), tab = ts[0], setTab = ts[1];
    const ss = useState([]), slots = ss[0], setSlots = ss[1];
    const qs = useState(''), q = qs[0], setQ = qs[1];
    const maxB = Math.min(6, 4 + (up.boxes || 0)), delay = Math.round(26 * Math.pow(0.88, up.express || 0));
    const ids = (sn.stockIds || []).slice().sort(function (a, b) { return ITEMS[a].n < ITEMS[b].n ? -1 : 1; });
    const shown = ids.filter(function (id) { return !q || ITEMS[id].n.toLowerCase().indexOf(q.toLowerCase()) >= 0; });
    const cost = slots.reduce(function (s, id) { return s + CC.priceOf(id) * 4; }, 0);
    const add = function (id) { if (slots.length < maxB) { setSlots(slots.concat([id])); CC.Sound.sfx('click'); } };
    const refill = function () {
      const low = ids.slice().sort(function (a, b) { return (sn.stock[a] || 0) - (sn.stock[b] || 0); }).slice(0, maxB);
      setSlots(low);
    };
    const stockTab = !sn.stockOn ? div({ className: 'empty' }, 'Esta fase tem estoque ilimitado. Use a aba Loja para comprar melhorias!') : div({ className: 'pccols' },
      div({ className: 'pcleft' },
        input({ className: 'search', placeholder: '🔎 Buscar ingrediente…', value: q, onChange: function (e) { setQ(e.target.value); } }),
        div({ className: 'ingrid' }, shown.map(function (id) {
          const n = sn.stock[id] || 0;
          return div({ key: id, className: 'ingcard' + (n <= 0 ? ' zero' : n < 3 ? ' low' : ''), onClick: function () { add(id); } },
            h(Em, { e: ITEMS[id].e, size: 26 }), div({ className: 'ingn' }, ITEMS[id].n), div({ className: 'ings' }, 'Estoque: ', span({ className: 'sv' }, n)), div({ className: 'ingp' }, '💵 ' + CC.priceOf(id) * 4 + ' /caixa'));
        }))),
      div({ className: 'pcright' },
        h('h3', null, '🚚 Novo pedido (' + slots.length + '/' + maxB + ' caixas)'),
        div({ className: 'sub pad' }, 'Cada caixa traz 4 unidades do ingrediente escolhido. O caminhão leva ~' + delay + 's.'),
        div({ className: 'slots' }, Array.from({ length: maxB }, function (_, i) {
          const id = slots[i];
          return div({ key: i, className: 'slot' + (id ? ' full' : '') }, id ? [h(Em, { key: 'e', e: ITEMS[id].e, size: 28 }), div({ key: 'n', className: 'ingn' }, ITEMS[id].n), div({ key: 'p', className: 'ingp' }, '4× • 💵 ' + CC.priceOf(id) * 4),
            button({ key: 'x', className: 'xbtn', onClick: function () { setSlots(slots.filter(function (_, j) { return j !== i; })); } }, '✕')] : div({ className: 'sub' }, 'Caixa ' + (i + 1) + ' vazia'));
        })),
        div({ className: 'row' }, button({ className: 'btn sm', onClick: refill }, '🧠 Repor os mais baixos'), button({ className: 'btn sm', onClick: function () { setSlots([]); } }, '🧹 Limpar')),
        div({ className: 'total' }, 'Total: 💵 ', span({ className: 'v' }, cost), '  •  Saldo: ', span({ className: 'v' }, sn.cash)),
        button({ className: 'btn big', disabled: !slots.length || cost > sn.cash, onClick: function () { p.onOrder(slots); setSlots([]); } }, cost > sn.cash ? 'Saldo insuficiente' : '📦 Pedir caminhão'),
        sn.trucks && sn.trucks.length ? div({ className: 'trucks' }, h('h4', null, 'A caminho'), sn.trucks.map(function (t, i) { return div({ key: i }, '🚚 ' + t.n + ' caixas — chega em ' + Math.ceil(t.t) + 's'); })) : null));
    const shopTab = div({ className: 'shopgrid' }, Object.keys(CC.SHOP).map(function (k) {
      const it = CC.SHOP[k], lvl = up[k] || 0, max = it.repeat ? 0 : it.cost.length, maxed = !it.repeat && lvl >= max, price = it.repeat ? it.cost[0] : it.cost[lvl];
      return div({ key: k, className: 'shopcard' + (maxed ? ' maxed' : '') },
        div({ className: 'shophead' }, h(Em, { e: it.e, size: 30 }), div(null, div({ className: 'ingn' }, it.n), it.repeat ? div({ className: 'pips' }, 'comprado ' + lvl + '×') : div({ className: 'pips' }, Array.from({ length: max }, function (_, i) { return span({ key: i, className: i < lvl ? 'on' : '' }, '●'); })))),
        div({ className: 'sub' }, it.d),
        button({ className: 'btn sm', disabled: maxed || price > sn.cash, onClick: function () { p.onBuy(k); } }, maxed ? 'Máximo' : '💵 ' + price + ' — Comprar'));
    }));
    return div({ className: 'overlay' }, div({ className: 'pcwrap' },
      div({ className: 'topbar' }, h('h1', null, '💻 Computador da cozinha'), div({ className: 'cash' }, '💵 ', sn.cash),
        div({ className: 'seg' }, [['stock', '📦 Estoque'], ['shop', '🛒 Loja']].map(function (t) { return button({ key: t[0], className: tab === t[0] ? 'on' : '', onClick: function () { setTab(t[0]); } }, t[1]); })),
        button({ className: 'btn sm', onClick: p.onClose }, '✖ Fechar')),
      tab === 'stock' ? stockTab : shopTab));
  }

  /* ---------- tela do jogo ---------- */
  function GameScreen(p) {
    const lv = p.lv, cref = useRef(null), mode = p.mode || 'local';
    const sn = useState(null), snap = sn[0], setSnap = sn[1];
    const ps = useState(false), paused = ps[0], setPaused = ps[1];
    const sv = useRef(false), pausedRef = useRef(false);
    const rs = useState(0), run = rs[0], setRun = rs[1];
    const bk = useState(null), book = bk[0], setBook = bk[1];
    const bookRef = useRef(null); bookRef.current = book;
    const online = mode !== 'local';
    const ts2 = useState(null), tip = ts2[0], setTip = ts2[1];
    const pcs = useState(false), pcOpen = pcs[0], setPcOpen = pcs[1];
    const pns = useState(false), panOpen = pns[0], setPanOpen = pns[1];
    const panFor = useRef(0), panRef = useRef(false); panRef.current = panOpen;
    const pcRef = useRef(false); pcRef.current = pcOpen;

    useEffect(function () {
      sv.current = false; pausedRef.current = false; setPaused(false);
      if (mode === 'guest') CC.Engine.startClient(cref.current, lv, p.init, MP.myIdx, MP.send);
      else {
        const np = mode === 'host' ? MP.players.length : p.players;
        const opts = { players: np, net: mode === 'host' ? 'host' : null };
        if (mode === 'host') { opts.remote = MP.players.map(function (x, i) { return i; }).filter(function (i) { return i > 0; }); opts.names = MP.players.map(function (x) { return x.name; }); opts.skins = MP.players.map(function (x) { return x.skin; }); }
        else { opts.skins = p.skins; opts.names = p.skins.map(function (x, i) { return i === 0 ? p.name : 'P' + (i + 1); }); }
        CC.Engine.start(cref.current, lv, opts);
        if (mode === 'host') MP.hostGameStarted(lv);
      }
      CC.onPauseKey = function () {
        const g = CC.Engine.get(); if (!g || g.over || bookRef.current) return;
        pausedRef.current = !pausedRef.current; CC.Engine.setPaused(pausedRef.current); setPaused(pausedRef.current);
      };
      CC.onBookKey = function () {
        const g = CC.Engine.get(); if (!g || g.over) return;
        if (bookRef.current) { setBook(null); pausedRef.current = false; CC.Engine.setPaused(false); setPaused(false); }
        else { pausedRef.current = true; CC.Engine.setPaused(true); setPaused(true); setBook(true); }
      };
      const openPc = function () { if (pcRef.current) return; pcRef.current = true; setPcOpen(true); if (mode === 'local') { pausedRef.current = true; CC.Engine.setPaused(true); setPaused(true); } };
      CC.Engine.onPc = function (idx) { if (mode === 'host' && idx !== 0) MP.toPlayer(idx, { t: 'pc' }); else openPc(); };
      const openPan = function (idx) { if (panRef.current) return; panRef.current = true; panFor.current = idx || 0; setPanOpen(true); if (mode === 'local') { pausedRef.current = true; CC.Engine.setPaused(true); setPaused(true); } };
      CC.Engine.onPantry = function (idx) { if (mode === 'host' && idx !== 0) MP.toPlayer(idx, { t: 'pantry' }); else openPan(idx); };
      if (mode === 'guest') { MP.on('pc', openPc); MP.on('pantry', openPan); }
      const iv = setInterval(function () {
        const s = CC.Engine.snapshot(); setSnap(s);
        if (s && s.over && s.result && !sv.current) { sv.current = true; const g = CC.Engine.get(); p.onFinish(lv, Object.assign({ nplayers: g ? g.players.length : 1 }, s.result), mode); }
      }, 100);
      return function () { clearInterval(iv); CC.onPauseKey = null; CC.onBookKey = null; CC.Engine.onPc = null; CC.Engine.onPantry = null; if (mode === 'guest') { MP.on('pc', null); MP.on('pantry', null); } CC.Engine.stop(); };
    }, [lv.id, run, p.players, mode]);

    const toggle = function (v) { pausedRef.current = v; CC.Engine.setPaused(v); setPaused(v); };
    const closePc = function () { pcRef.current = false; setPcOpen(false); if (mode === 'local') toggle(false); };
    const closePan = function () { panRef.current = false; setPanOpen(false); if (mode === 'local') toggle(false); };
    const doTake = function (id) { if (mode === 'guest') MP.send({ t: 'cmd', c: 'take', id: id }); else CC.Engine.pantryTake(panFor.current, id); closePan(); };
    const doOrder = function (ids) { if (mode === 'guest') MP.send({ t: 'cmd', c: 'order', ids: ids }); else CC.Engine.pcOrder(0, ids); };
    const doBuy = function (id) { if (mode === 'guest') MP.send({ t: 'cmd', c: 'buy', id: id }); else CC.Engine.shopBuy(0, id); };
    const res = snap && snap.result;
    const next = typeof lv.id === 'number' ? CC.LEVELS[CC.LEVELS.indexOf(lv) + 1] : null;
    const pl = online ? MP.players : null;
    const nlocal = p.players;
    return div({ className: 'game' },
      div({ className: 'hud' },
        div({ className: 'hud-l' },
          span({ className: 'lvn' }, h(Em, { e: lv.e, size: 20 }), ' ', lv.nome),
          div({ className: 'stat time' }, lv.practice ? '∞ Treino' : lv.endless ? (snap ? '♾️ ' + fmt(snap.time) : '♾️') : '⏱ ' + (snap ? fmt(snap.left) : '')),
          div({ className: 'stat score' }, '💰 ', snap ? snap.score : 0),
          snap && (snap.stockOn || snap.shopOn) ? div({ className: 'stat cashst', title: 'Dinheiro: use o computador 💻 para estoque e loja' }, '💵 ', snap.cash) : null,
          snap && snap.stockOn && snap.trucks && snap.trucks.length ? div({ className: 'stat' }, '🚚 ' + Math.ceil(Math.min.apply(null, snap.trucks.map(function (t) { return t.t; }))) + 's') : null,
          snap && (lv.endless || lv.lives) && snap.lives != null ? div({ className: 'stat lives' }, '❤️'.repeat(Math.max(0, snap.lives)) + '🖤'.repeat(Math.max(0, (lv.lives || 3) - snap.lives))) : null,
          snap && (snap.cfgBugs > 0 || snap.killed > 0) ? div({ className: 'stat', title: 'Pragas na cozinha / mortas' }, '🪳 ' + snap.bugsN + ' • ☠️ ' + snap.killed) : null,
          snap && snap.combo > 1 ? div({ className: 'stat combo' }, '🔥 x' + snap.combo) : null,
          snap && snap.versus ? h(Scoreboard, { snap: snap }) : null,
          pl ? div({ className: 'plist' }, pl.map(function (x, i) { return span({ key: i, className: 'pl' + (i === MP.myIdx ? ' me' : ''), title: x.name }, h(ChefIcon, { skin: x.skin || { color: CC.COLS[i], hat: 'toque' } })); })) : null),
        div({ className: 'hud-r' },
          button({ className: 'btn sm', onClick: function () { toggle(true); setBook(true); } }, '📖 Receitas'), ' ', button({ className: 'btn sm', onClick: function () { toggle(true); } }, online ? '☰ Menu' : '⏸ Pausa'))),
      div({ className: 'tickets' }, snap ? snap.orders.map(function (o) { return h(Ticket, { key: o.id, o: o, lv: lv, nwin: snap.nwin, onHover: function (d, r) { setTip(d ? { dish: d, rect: r } : null); }, onClick: function () { setTip(null); toggle(true); setBook(o.dish); } }); }) : null,
        snap && !snap.orders.length ? div({ className: 'noorder' }, 'Aguardando pedidos…') : null),
      div({ className: 'stage' }, canvas({ ref: cref, className: 'cv', onClick: function (e) { const g = CC.Engine.get(); if (!g || g.over || pausedRef.current) return; const r = e.currentTarget.getBoundingClientRect(); CC.Engine.clickSwat((e.clientX - r.left) / r.width * g.W, (e.clientY - r.top) / r.height * g.H); } }),
        snap && snap.rush > 0 ? div({ className: 'banner rush' }, '🔥 HORA DO RUSH! ' + Math.ceil(snap.rush) + 's') : null, snap && snap.dark > 0 ? div({ className: 'banner dark' }, '💡 APAGÃO!') : null,
        div({ className: 'toasts' }, snap ? snap.toasts.map(function (t) { return div({ key: t.id, className: 'toast ' + t.kind }, t.txt); }) : null),
        snap && snap.countdown > 0 ? div({ className: 'tipbox' }, lv.tip) : null),
      div({ className: 'ctrl-hint' }, online || nlocal === 1
        ? 'WASD/Setas mover • Espaço/Enter pegar-colocar • E (segure) cortar/lavar/ralar • Q dash • R/clique mata inseto • B receitas • 💻 computador: estoque e loja • passe o mouse num pedido para ver a receita'
        : 'P1: WASD • Espaço • E • Q   |   P2: Setas • Enter • Shift dir. • /   |   P3: IJKL • U • O • Y   |   P4: Num 8456 • 0 • Num. • NumEnter   |   🎮 controles'),
      tip && !book && !pcOpen ? h(QuickGuide, { dish: tip.dish, rect: tip.rect }) : null,
      panOpen && !res ? h(Pantry, { onTake: doTake, onClose: closePan }) : null,
      pcOpen && snap && !res ? h(Computer, { snap: snap, onOrder: doOrder, onBuy: doBuy, onClose: closePc }) : null,
      book && !res ? div({ className: 'overlay' }, div({ className: 'bookwrap' }, h(Book, { initial: book, onBack: function () { setBook(null); toggle(false); } }))) : null,
      paused && !book && !pcOpen && !panOpen && !res ? div({ className: 'overlay' }, div({ className: 'modal' },
        h('h2', null, online ? '☰ Menu (o jogo continua)' : '⏸ Pausado'),
        div({ className: 'tipline' }, lv.tip),
        div({ className: 'row' },
          button({ className: 'btn big', onClick: function () { toggle(false); } }, '▶ Continuar'),
          !online ? button({ className: 'btn', onClick: function () { setRun(run + 1); } }, '↻ Reiniciar') : null,
          button({ className: 'btn', onClick: function () { if (mode === 'host') MP.hostGameEnded(); p.onExit(); } }, online ? '🚪 Sair da partida' : '☰ Sair')))) : null,
      res ? div({ className: 'overlay' }, div({ className: 'modal result' },
        h('h2', null, res.versus ? '🏁 Fim da competição!' : lv.practice ? 'Treino encerrado' : lv.endless ? 'Fim de jogo!' : res.stars ? 'Fase concluída!' : 'Não foi dessa vez…'),
        res.versus ? h(VersusResult, { v: res.versus }) : div({ className: 'bigstars' }, h(Stars, { n: res.stars })),
        div({ className: 'score-big' }, '💰 ', res.score),
        div({ className: 'rstats' },
          div(null, '📦 Entregues: ', span({ className: 'v' }, res.delivered)),
          div(null, '❌ Perdidos: ', span({ className: 'v' }, res.failed)),
          div(null, '💸 Gorjetas: ', span({ className: 'v' }, res.tips)), res.killed ? div(null, '☠️ Pragas mortas: ', span({ className: 'v' }, res.killed)) : null,
          div(null, '🔥 Melhor combo: ', span({ className: 'v' }, 'x' + res.bestCombo))),
        res.versus ? null : div({ className: 'need' }, '★ ' + res.need[0] + '   ★★ ' + res.need[1] + '   ★★★ ' + res.need[2]),
        p.newAch && p.newAch.length ? div({ className: 'newach' }, p.newAch.map(function (a) { return div({ key: a[0] }, '🏆 Conquista: ', a[1], ' ', a[2]); })) : null,
        div({ className: 'row' },
          !online ? button({ className: 'btn', onClick: function () { setRun(run + 1); } }, '↻ Tentar de novo') : null,
          next && res.stars && !online ? button({ className: 'btn big', onClick: function () { p.onNext(next); } }, 'Próxima fase ▶') : null,
          button({ className: 'btn', onClick: function () { if (mode === 'host') MP.hostGameEnded(); p.onExit(); } }, online ? '🚪 Voltar à sala' : '☰ Fases')))) : null);
  }

  /* ---------- fases ---------- */
  function PlayersSeg(p) {
    return div({ className: 'seg' }, [1, 2, 3, 4].map(function (n) { return button({ key: n, className: p.save.players === n ? 'on' : '', onClick: function () { p.setPlayers(n); } }, (n === 1 ? '👤 ' : '👥 ') + n + (n === 1 ? ' jogador' : '')); }));
  }
  function Levels(p) {
    const sv = p.save;
    const camp = CC.LEVELS.filter(function (l) { return !l.practice; });
    const unlocked = function (i) { return sv.unlock || i === 0 || (sv.stars[camp[i - 1].id] || 0) >= 1; };
    return div({ className: 'screen' },
      div({ className: 'topbar' }, button({ className: 'btn sm', onClick: p.onBack }, '◀ Menu'), h('h1', null, 'Campanha'), h(PlayersSeg, { save: sv, setPlayers: p.setPlayers })),
      div({ className: 'lvgrid' }, camp.map(function (lv, i) {
        const ok = unlocked(i), st = sv.stars[lv.id] || 0;
        return div({ key: lv.id, className: 'lvcard' + (ok ? '' : ' locked'), style: { '--c': lv.cor }, onClick: function () { if (ok) p.onPlay(lv); } },
          div({ className: 'lvico' }, h(Em, { e: lv.e, size: 44 })),
          div({ className: 'lvname' }, lv.id + '. ' + lv.nome),
          div({ className: 'lvmeta' }, lv.menu.length + ' pratos • ' + fmt(lv.tempo)),
          h(Stars, { n: st }),
          div({ className: 'lvbest' }, sv.best[lv.id] ? 'Recorde: ' + sv.best[lv.id] : (ok ? 'Meta ★ ' + lv.stars[0] : '🔒 Complete a fase anterior')),
          div({ className: 'lvdishes' }, lv.menu.slice(0, 8).map(function (id) { return h(Em, { key: id, e: DISHES[id].e, size: 16 }); })));
      })));
  }

  /* ---------- modos ---------- */
  function Modes(p) {
    const sv = p.save, dk = CC.dailyKey();
    const card = function (ico, title, desc, extra, fn, col) { return div({ className: 'lvcard modecard', style: { '--c': col }, onClick: fn }, div({ className: 'lvico' }, h(Em, { e: ico, size: 48 })), div({ className: 'lvname' }, title), div({ className: 'lvmeta' }, desc), extra ? div({ className: 'lvbest' }, extra) : null); };
    return div({ className: 'screen' },
      div({ className: 'topbar' }, button({ className: 'btn sm', onClick: p.onBack }, '◀ Menu'), h('h1', null, 'Modos de jogo'), h(PlayersSeg, { save: sv, setPlayers: p.setPlayers })),
      div({ className: 'lvgrid' },
        card('♾️', 'Modo Infinito', 'Sem relógio, 3 vidas ❤️, 2 janelas, estoque e loja. Os pedidos aceleram até o caos.', 'Recorde: ' + (sv.stats.endlessBest || 0), function () { p.onPlay(CC.makeEndless()); }, '#8e44ad'),
        card('📅', 'Desafio do Dia', 'Cardápio e cozinha iguais para todos hoje.', sv.daily[dk] ? 'Melhor de hoje: ' + sv.daily[dk] : 'Ainda não jogado hoje', function () { p.onPlay(CC.makeDaily()); }, '#e67e22'),
        card('🍟', 'Fast Food', '3 janelas (Balcão, Drive-thru, Delivery): cada pedido vai na janela certa. Estoque e loja.', 'Cardápio de fast food • 5 min', function () { p.onPlay(CC.makeFastFood()); }, '#e74c3c'),
        card('🪟', 'Salão de Restaurante', 'Cada mesa é uma janela. Estoque que acaba, caminhão de entrega e loja de melhorias.', '3 mesas • 5 min', function () { p.onPlay(CC.makeSalon()); }, '#2c7a7b'),
        card('⚔️', 'Duelo de Chefs', 'Todos contra todos na mesma cozinha: pontos só para quem entrega. Dash derruba o rival!', '2 a 4 chefs • 4 min', function () { p.onPlay(CC.makeDuel()); }, '#b71c1c'),
        card('🏁', 'Corrida de Pedidos', 'O primeiro chef a entregar 8 pratos vence.', '2 a 4 chefs', function () { p.onPlay(CC.makeRace()); }, '#f57f17'),
        card('🛡️', 'Batalha de Equipes', '🔴 chefs 1 e 3 contra 🔵 chefs 2 e 4. Soma de pontos decide.', '2 a 4 chefs • 5 min', function () { p.onPlay(CC.makeTeams()); }, '#283593'),
        card('🪳', 'Infestação!', 'Baratas, moscas, formigas e vespas invadem a cozinha. Mate-as (R ou clique) antes que estraguem a comida.', 'Estoque + loja anti-pragas • 5 min', function () { p.onPlay(CC.makePests()); }, '#5d4037'),
        card('🦗', 'Restaurante Entomológico', 'Cardápio de insetos comestíveis: grilo frito, larva, gafanhoto e formiga com chocolate!', '20 pratos de insetos', function () { p.onPlay(CC.makeEntomo()); }, '#6b8e23'),
        card('💡', 'Noite de Apagões', 'A luz cai e volta, com horas de rush. Só os chefs têm lanterna.', 'Eventos aleatórios • 5 min', function () { p.onPlay(CC.makeBlackout()); }, '#1a237e'),
        card('🏪', 'Meu Restaurante', 'Escolha os pratos, o ritmo, o tempo e o layout.', 'Monte seu cardápio', p.onCustom, '#2980b9'),
        card('🌐', 'Online (até 4 chefs)', 'Crie uma sala ou entre com um código.', 'Cozinhe com amigos pela internet', p.onOnline, '#16a085'),
        card('🧪', 'Treino Livre', 'Todos os pratos e equipamentos, sem relógio.', '', function () { p.onPlay(CC.LEVELS[CC.LEVELS.length - 1]); }, '#34495e')));
  }

  /* ---------- restaurante personalizado ---------- */
  function Custom(p) {
    const init = Object.assign({ ids: ['hamburguer', 'batata_frita', 'suco_laranja', 'pizza_marg', 'sopa_tomate', 'bolo'], tempo: 240, pace: 1, layout: 'ilha', seasP: 0.3, windows: 1, winStyle: 'fast', size: 'medium', stockInit: 8, priceMul: 1, truckMul: 1, bugs: 0, speed: 1, chef: 1, burn: 1, vip: 0.08, lives: 0, tips: true, rush: false, dark: false, noCollide: false, shop: true, stock: false, utensils: true, utUses: 1, versus: 'coop', pvp: false, goal: 0 }, p.save.custom || {});
    const cs = useState(init), cfg = cs[0], setCfg = cs[1];
    const cats = useState('todos'), cat = cats[0], setCat = cats[1];
    const qs = useState(''), q = qs[0], setQ = qs[1];
    const set = function (k, v) { const n = Object.assign({}, cfg); n[k] = v; setCfg(n); };
    const has = {}; cfg.ids.forEach(function (i) { has[i] = 1; });
    const list = Object.keys(DISHES).filter(function (id) { const d = DISHES[id]; return (cat === 'todos' || d.cat === cat) && (!q || d.n.toLowerCase().indexOf(q.toLowerCase()) >= 0); });
    const toggle = function (id) { set('ids', has[id] ? cfg.ids.filter(function (x) { return x !== id; }) : cfg.ids.concat([id])); };
    const addAll = function (on) { const s = {}; cfg.ids.forEach(function (i) { s[i] = 1; }); list.forEach(function (i) { if (on) s[i] = 1; else delete s[i]; }); set('ids', Object.keys(s)); };
    const randomPick = function () { const all = Object.keys(DISHES).sort(function () { return Math.random() - 0.5; }); set('ids', all.slice(0, 12)); };
    const sel = function (k, opts) { return select({ value: cfg[k], onChange: function (e) { const v = e.target.value; set(k, isNaN(+v) ? v : +v); } }, opts.map(function (o) { return option({ key: o[0], value: o[0] }, o[1]); })); };
    return div({ className: 'screen' },
      div({ className: 'topbar' }, button({ className: 'btn sm', onClick: p.onBack }, '◀ Modos'), h('h1', null, '🏪 Meu Restaurante'), button({ className: 'btn big', disabled: cfg.ids.length < 2, onClick: function () { p.onStart(cfg); } }, '▶ Abrir (' + cfg.ids.length + ' pratos)')),
      div({ className: 'customcols' },
        div({ className: 'st-card opts2' },
          h('h3', null, '⚙️ Regras da partida'),
          h('h4', null, '⏱️ Ritmo'),
          h('label', null, 'Duração: ', sel('tempo', [[0, '♾️ Infinito'], [120, '2 min'], [180, '3 min'], [240, '4 min'], [300, '5 min'], [480, '8 min'], [720, '12 min']])),
          h('label', null, 'Ritmo dos pedidos: ', sel('pace', [[0, '😌 Tranquilo'], [1, '🙂 Normal'], [2, '😰 Frenético']])),
          h('label', null, 'Velocidade do jogo: ', sel('speed', [[0.75, '🐢 Lenta (0,75×)'], [1, 'Normal (1×)'], [1.25, '🐇 Rápida (1,25×)'], [1.5, '🚀 Turbo (1,5×)']])),
          h('label', null, 'Vidas (pedidos perdidos): ', sel('lives', [[0, 'Sem limite'], [1, '1 vida'], [3, '3 vidas'], [5, '5 vidas']])),
          h('label', null, 'Pedidos VIP: ', sel('vip', [[0, 'Nenhum'], [0.08, 'Raros'], [0.2, 'Frequentes'], [0.4, 'Muitos']])),
          h('label', null, 'Pedidos com tempero: ', sel('seasP', [[0, 'Nunca'], [0.3, 'Às vezes'], [0.6, 'Quase sempre'], [1, 'Sempre']])),
          h('label', { className: 'chk' }, input({ type: 'checkbox', checked: cfg.tips !== false, onChange: function (e) { set('tips', e.target.checked); } }), ' Gorjetas por rapidez'),
          h('h4', null, '🍳 Cozinha'),
          h('label', null, 'Layout: ', sel('layout', [['ilha', 'Ilha central'], ['livre', 'Aberta'], ['divisao', 'Dividida']])),
          h('label', null, 'Tamanho: ', sel('size', [['small', 'Pequena'], ['medium', 'Média'], ['large', 'Grande'], ['huge', 'Enorme']])),
          h('label', null, 'Comida queima: ', sel('burn', [[0, 'Nunca'], [1.6, 'Devagar'], [1, 'Normal'], [0.6, 'Rápido']])),
          h('label', null, 'Velocidade dos chefs: ', sel('chef', [[0.8, 'Lenta'], [1, 'Normal'], [1.2, 'Rápida']])),
          h('label', { className: 'chk' }, input({ type: 'checkbox', checked: !!cfg.noCollide, onChange: function (e) { set('noCollide', e.target.checked); } }), ' Chefs atravessam uns aos outros'),
          h('h4', null, '🍲 Utensílios'),
          h('label', { className: 'chk' }, input({ type: 'checkbox', checked: cfg.utensils !== false, onChange: function (e) { set('utensils', e.target.checked); } }), ' Panelas, frigideiras etc. precisam ser lavadas'),
          cfg.utensils !== false ? h('label', null, 'Durabilidade (usos até sujar): ', sel('utUses', [[0.5, 'Suja rápido (0,5×)'], [1, 'Normal'], [1.5, 'Resistente (1,5×)'], [2, 'Muito resistente (2×)'], [4, 'Quase eterno (4×)']])) : null,
          h('h4', null, '⚔️ Competição entre chefs'),
          h('label', null, 'Tipo de partida: ', sel('versus', [['coop', '🤝 Cooperativo'], ['ffa', '⚔️ Todos contra todos'], ['teams', '🛡️ Equipes (2×2)']])),
          cfg.versus && cfg.versus !== 'coop' ? h('label', null, 'Meta: ', sel('goal', [[0, 'Maior pontuação no tempo'], [5, 'Primeiro a 5 pratos'], [8, 'Primeiro a 8 pratos'], [12, 'Primeiro a 12 pratos']])) : null,
          h('label', { className: 'chk' }, input({ type: 'checkbox', checked: !!cfg.pvp, onChange: function (e) { set('pvp', e.target.checked); } }), ' Dash derruba outros chefs'),
          h('h4', null, '🪟 Janelas, estoque e loja'),
          h('label', null, 'Janelas de entrega: ', sel('windows', [[1, '1 janela'], [2, '2 janelas'], [3, '3 janelas'], [4, '4 janelas']])),
          h('label', null, 'Estilo das janelas: ', sel('winStyle', [['fast', 'Balcão / Drive-thru / Delivery'], ['salao', 'Mesas 1, 2, 3…']])),
          h('label', { className: 'chk' }, input({ type: 'checkbox', checked: !!cfg.stock, onChange: function (e) { set('stock', e.target.checked); } }), ' Estoque limitado + caminhão'),
          cfg.stock ? h('label', null, 'Estoque inicial: ', sel('stockInit', [[4, 'Pouco (4)'], [8, 'Normal (8)'], [16, 'Muito (16)'], [30, 'Farto (30)']])) : null,
          cfg.stock ? h('label', null, 'Preço do estoque: ', sel('priceMul', [[0.5, 'Barato (0,5×)'], [1, 'Normal'], [1.5, 'Caro (1,5×)'], [2, 'Salgado (2×)']])) : null,
          cfg.stock ? h('label', null, 'Entrega do caminhão: ', sel('truckMul', [[0.5, 'Rápida (0,5×)'], [1, 'Normal'], [1.5, 'Lenta (1,5×)'], [2, 'Muito lenta']])) : null,
          h('label', { className: 'chk' }, input({ type: 'checkbox', checked: cfg.shop !== false, onChange: function (e) { set('shop', e.target.checked); } }), ' Loja de melhorias'),
          h('h4', null, '⚡ Desafios'),
          h('label', null, 'Pragas 🪳: ', sel('bugs', [[0, 'Nenhuma'], [1, 'Poucas'], [2, 'Muitas'], [3, 'Infestação!']])),
          h('label', { className: 'chk' }, input({ type: 'checkbox', checked: !!cfg.rush, onChange: function (e) { set('rush', e.target.checked); } }), ' 🔥 Horas de rush (pedidos 2× mais rápidos)'),
          h('label', { className: 'chk' }, input({ type: 'checkbox', checked: !!cfg.dark, onChange: function (e) { set('dark', e.target.checked); } }), ' 💡 Apagões aleatórios'),
          div({ className: 'row' }, button({ className: 'btn sm', onClick: randomPick }, '🎲 12 aleatórios'), button({ className: 'btn sm', onClick: function () { set('ids', []); } }, '🧹 Limpar')),
          div({ className: 'sub pad' }, 'As cozinhas crescem automaticamente para caber todos os ingredientes e equipamentos do seu cardápio.')),
        div({ className: 'st-card' },
          div({ className: 'cats' }, button({ className: cat === 'todos' ? 'on' : '', onClick: function () { setCat('todos'); } }, 'Todos'),
            Object.keys(CC.CATS).map(function (k) { return button({ key: k, className: cat === k ? 'on' : '', onClick: function () { setCat(k); } }, CC.CATS[k][1] + ' ' + CC.CATS[k][0]); })),
          div({ className: 'row2' }, input({ className: 'search', placeholder: '🔎 Buscar…', value: q, onChange: function (e) { setQ(e.target.value); } }), button({ className: 'btn sm', onClick: function () { addAll(true); } }, '+ todos'), button({ className: 'btn sm', onClick: function () { addAll(false); } }, '− todos')),
          div({ className: 'dgrid tall' }, list.map(function (id) { const d = DISHES[id]; return div({ key: id, className: 'dcard' + (has[id] ? ' sel' : ''), onClick: function () { toggle(id); } }, h(Em, { e: d.e, size: 28 }), div({ className: 'dn' }, d.n)); })))));
  }

  /* ---------- perfil ---------- */
  const COLORS = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#e67e22', '#1abc9c', '#ec7aa8', '#95a5a6', '#34495e'];
  function Profile(p) {
    const sv = p.save, st = sv.stats;
    const ts = useState(0), pi = ts[0], setPi = ts[1];
    const skin = sv.skins[pi];
    const setSkin = function (k, v) { const sk = sv.skins.map(function (x, i) { if (i !== pi) return x; const o = Object.assign({}, x); o[k] = v; return o; }); p.upd({ skins: sk }); };
    return div({ className: 'screen' },
      div({ className: 'topbar' }, button({ className: 'btn sm', onClick: p.onBack }, '◀ Menu'), h('h1', null, '🏆 Perfil e conquistas')),
      div({ className: 'helpgrid' },
        div({ className: 'st-card' }, h('h3', null, '👨‍🍳 Seu chef'),
          h('label', { className: 'namelab' }, 'Nome: ', input({ className: 'search sm', maxLength: 14, value: sv.name, onChange: function (e) { p.upd({ name: e.target.value }); } })),
          div({ className: 'seg' }, [0, 1, 2, 3].map(function (i) { return button({ key: i, className: pi === i ? 'on' : '', onClick: function () { setPi(i); } }, 'Chef ' + (i + 1)); })),
          div({ className: 'chefprev' }, h(ChefIcon, { skin: skin })),
          div({ className: 'sub' }, 'Cor'), div({ className: 'swatches' }, COLORS.map(function (c) { return span({ key: c, className: 'sw' + (skin.color === c ? ' on' : ''), style: { background: c }, onClick: function () { setSkin('color', c); } }); })),
          div({ className: 'sub' }, 'Chapéu'), div({ className: 'swatches' }, HATS.map(function (hh) { return span({ key: hh, className: 'sw hat' + (skin.hat === hh ? ' on' : ''), onClick: function () { setSkin('hat', hh); } }, hh === 'toque' ? '👨‍🍳' : hh); })),
          h('h3', null, '📊 Estatísticas'),
          div({ className: 'rstats' }, div(null, '📦 Pratos entregues: ', span({ className: 'v' }, st.delivered)), div(null, '🎮 Partidas: ', span({ className: 'v' }, st.matches)), div(null, '🌐 Online: ', span({ className: 'v' }, st.online)),
            div(null, '💰 Maior pontuação: ', span({ className: 'v' }, st.bestScore)), div(null, '♾️ Infinito: ', span({ className: 'v' }, st.endlessBest)), div(null, '📖 Pratos diferentes: ', span({ className: 'v' }, Object.keys(st.dishes).length + '/' + Object.keys(DISHES).length)))),
        div({ className: 'st-card' }, h('h3', null, '🏆 Conquistas (' + Object.keys(sv.ach).length + '/' + CC.ACH.length + ')'),
          CC.ACH.map(function (a) { const on = sv.ach[a[0]]; return div({ key: a[0], className: 'ach' + (on ? ' on' : '') }, span({ className: 'aico' }, on ? a[1] : '🔒'), div(null, div({ className: 'an' }, a[2]), div({ className: 'sub' }, a[3]))); }))));
  }

  /* ---------- online ---------- */
  function Online(p) {
    const sv = p.save;
    const cs = useState(''), code = cs[0], setCode = cs[1];
    const es = useState(''), err = es[0], setErr = es[1];
    const bs = useState(false), busy = bs[0], setBusy = bs[1];
    const go = function (fn) { setBusy(true); setErr(''); fn().then(function () { setBusy(false); p.onLobby(); }).catch(function (e) { setBusy(false); setErr(e.message || String(e)); }); };
    return div({ className: 'screen' },
      div({ className: 'topbar' }, button({ className: 'btn sm', onClick: p.onBack }, '◀ Modos'), h('h1', null, '🌐 Multiplayer online')),
      div({ className: 'helpgrid' },
        div({ className: 'st-card' }, h('h3', null, '➕ Criar sala'),
          div({ className: 'sub pad' }, 'Você será o anfitrião: o jogo roda no seu computador e seus amigos entram com o código (até 4 chefs).'),
          button({ className: 'btn big', disabled: busy, onClick: function () { go(function () { return MP.host(sv.name || 'Chef', sv.skins[0]); }); } }, busy ? 'Aguarde…' : 'Criar sala')),
        div({ className: 'st-card' }, h('h3', null, '🔑 Entrar em uma sala'),
          input({ className: 'search codein', placeholder: 'CÓDIGO', maxLength: 5, value: code, onChange: function (e) { setCode(e.target.value.toUpperCase().replace(/[^A-Z]/g, '')); } }),
          button({ className: 'btn big', disabled: busy || code.length !== 5, onClick: function () { go(function () { return MP.join(code, sv.name || 'Chef', sv.skins[0]); }); } }, 'Entrar'),
          err ? div({ className: 'err' }, err) : null)),
      div({ className: 'sub pad center' }, 'Dica: os dois precisam abrir o mesmo site do jogo (ex.: o link do GitHub Pages). Usa conexão direta (WebRTC); em redes muito restritivas pode não conectar.'));
  }
  function Lobby(p) {
    const ls = useState(MP.players), pl = ls[0], setPl = ls[1];
    const st = useState(MP.status), status = st[0], setSt = st[1];
    const ms = useState('endless'), mode = ms[0], setMode = ms[1];
    const ch = useState([]), chat = ch[0], setChat = ch[1];
    const ts = useState(''), txt = ts[0], setTxt = ts[1];
    const host = MP.role === 'host';
    useEffect(function () {
      MP.on('lobby', function (l) { setPl(l.slice()); });
      MP.on('status', setSt);
      MP.on('chat', function (m) { setChat(function (c) { return c.concat([m]).slice(-8); }); });
      MP.on('start', function (d) { p.onGuestStart(d); });
      MP.on('closed', function () { p.onClosed(); });
      return function () { MP.on('lobby', null); MP.on('status', null); MP.on('chat', null); MP.on('start', null); MP.on('closed', null); };
    }, []);
    const camp = CC.LEVELS.filter(function (l) { return !l.practice; });
    const startIt = function () {
      let lv;
      if (mode === 'endless') lv = CC.makeEndless(); else if (mode === 'duel') lv = CC.makeDuel(); else if (mode === 'race') lv = CC.makeRace(); else if (mode === 'teams') lv = CC.makeTeams(); else if (mode === 'fastfood') lv = CC.makeFastFood(); else if (mode === 'salon') lv = CC.makeSalon(); else if (mode === 'pests') lv = CC.makePests(); else if (mode === 'entomo') lv = CC.makeEntomo(); else if (mode === 'blackout') lv = CC.makeBlackout(); else if (mode === 'daily') lv = CC.makeDaily(); else if (mode === 'train') lv = CC.LEVELS[CC.LEVELS.length - 1];
      else lv = camp.find(function (l) { return 'c' + l.id === mode; });
      p.onHostStart(lv);
    };
    return div({ className: 'screen' },
      div({ className: 'topbar' }, button({ className: 'btn sm', onClick: p.onLeave }, '◀ Sair da sala'), h('h1', null, '🌐 Sala ', span({ className: 'roomcode' }, MP.code || ''))),
      div({ className: 'helpgrid' },
        div({ className: 'st-card' }, h('h3', null, '👥 Chefs (' + pl.length + '/4)'),
          pl.map(function (x, i) { return div({ key: i, className: 'plrow' }, h(ChefIcon, { skin: x.skin || { color: CC.COLS[i], hat: 'toque' } }), span({ className: 'pn' }, x.name + (x.host ? ' 👑' : '') + (i === MP.myIdx ? ' (você)' : ''))); }),
          div({ className: 'sub pad' }, status),
          div({ className: 'chatbox' }, chat.map(function (m, i) { return div({ key: i }, span({ className: 'cf' }, m.from + ': '), m.txt); })),
          div({ className: 'row2' }, input({ className: 'search', placeholder: 'Mensagem…', value: txt, onChange: function (e) { setTxt(e.target.value); }, onKeyDown: function (e) { if (e.key === 'Enter' && txt) { MP.chat(txt); setTxt(''); } } }), button({ className: 'btn sm', onClick: function () { if (txt) { MP.chat(txt); setTxt(''); } } }, 'Enviar'))),
        div({ className: 'st-card' }, h('h3', null, '🎮 Partida'),
          host ? div(null,
            h('label', null, 'Modo/fase: ', select({ value: mode, onChange: function (e) { setMode(e.target.value); } },
              option({ value: 'endless' }, '♾️ Modo Infinito'), option({ value: 'duel' }, '⚔️ Duelo de Chefs'), option({ value: 'race' }, '🏁 Corrida de Pedidos'), option({ value: 'teams' }, '🛡️ Batalha de Equipes'), option({ value: 'fastfood' }, '🍟 Fast Food (3 janelas)'), option({ value: 'salon' }, '🪟 Salão (3 mesas)'), option({ value: 'pests' }, '🪳 Infestação!'), option({ value: 'entomo' }, '🦗 Entomológico'), option({ value: 'blackout' }, '💡 Noite de Apagões'), option({ value: 'daily' }, '📅 Desafio do Dia'), option({ value: 'train' }, '🧪 Treino Livre'),
              camp.map(function (l) { return option({ key: l.id, value: 'c' + l.id }, l.id + '. ' + l.nome); }))),
            div({ className: 'sub pad' }, 'Todos cozinham juntos na mesma cozinha. Todas as fases estão liberadas online.'),
            button({ className: 'btn big', onClick: startIt }, '▶ Começar partida'))
            : div({ className: 'sub pad' }, '⏳ Aguardando o anfitrião começar a partida…'),
          div({ className: 'sub pad' }, 'Código para compartilhar: ', span({ className: 'roomcode sm' }, MP.code || '')))));
  }

  /* ---------- livro de receitas ---------- */
  function Book(p) {
    const ts = useState('pratos'), tab = ts[0], setTab = ts[1];
    const cs = useState('todos'), cat = cs[0], setCat = cs[1];
    const qs = useState(''), q = qs[0], setQ = qs[1];
    const ss = useState(p.initial && p.initial !== true ? p.initial : null), sel = ss[0], setSel = ss[1];
    const rs = useState(''), rq = rs[0], setRq = rs[1];
    const list = Object.keys(DISHES).filter(function (id) { const d = DISHES[id]; return (cat === 'todos' || d.cat === cat) && (!q || d.n.toLowerCase().indexOf(q.toLowerCase()) >= 0); });
    let detail = null;
    if (sel && DISHES[sel]) {
      const d = DISHES[sel], seen = {}, steps = [];
      d.parts.forEach(function (pt) { CC.steps(pt).forEach(function (s) { const k = s.n + s.txt; if (!seen[k]) { seen[k] = 1; steps.push(s); } }); });
      detail = div({ className: 'detail' },
        div({ className: 'dt-head' }, h(Em, { e: d.e, size: 44 }), div(null, h('h3', null, d.n), div({ className: 'sub' }, CC.CATS[d.cat][0] + ' • 💰 ' + d.price + ' • ⏳ ' + d.time + 's'))),
        h('ol', { className: 'steps' }, steps.map(function (s, i) { return h('li', { key: i }, h(Em, { e: s.e, size: 18 }), ' ', span({ className: 'sname' }, s.n), span({ className: 'stxt' }, s.txt)); }),
          h('li', { className: 'final' }, '🍽️ Monte no prato: ', d.parts.map(function (id, i) { return h(Em, { key: i, e: ITEMS[id].e, size: 18 }); }), d.seas.length ? span({ className: 'opt' }, '  (opcional: ' + d.seas.map(function (s) { return ITEMS[s].n; }).join(', ') + ')') : null),
          h('li', { className: 'final' }, '🛎️ Entregue na janela verde')));
    }
    let body;
    if (tab === 'pratos') {
      body = div({ className: 'bookcols' },
        div({ className: 'blist' },
          div({ className: 'cats' }, button({ className: cat === 'todos' ? 'on' : '', onClick: function () { setCat('todos'); } }, 'Todos (' + Object.keys(DISHES).length + ')'),
            Object.keys(CC.CATS).map(function (k) { return button({ key: k, className: cat === k ? 'on' : '', onClick: function () { setCat(k); } }, CC.CATS[k][1] + ' ' + CC.CATS[k][0]); })),
          input({ className: 'search', placeholder: '🔎 Buscar prato…', value: q, onChange: function (e) { setQ(e.target.value); } }),
          div({ className: 'dgrid' }, list.map(function (id) { const d = DISHES[id]; return div({ key: id, className: 'dcard' + (sel === id ? ' sel' : ''), onClick: function () { setSel(id); } }, h(Em, { e: d.e, size: 30 }), div({ className: 'dn' }, d.n)); }))),
        div({ className: 'bdetail' }, detail || div({ className: 'empty' }, 'Selecione um prato para ver o passo a passo.')));
    } else if (tab === 'estacoes') {
      body = div({ className: 'bscroll' }, input({ className: 'search', placeholder: '🔎 Buscar receita ou ingrediente…', value: rq, onChange: function (e) { setRq(e.target.value); } }),
        div({ className: 'stations' }, Object.keys(CC.APPS).map(function (k) {
          const A = CC.APPS[k], rs2 = CC.RECIPES.filter(function (r) { return r.app === k && (!rq || (ITEMS[r.out].n + ' ' + r.in.map(CC.itemName).join(' ')).toLowerCase().indexOf(rq.toLowerCase()) >= 0); });
          if (!rs2.length) return null;
          return div({ key: k, className: 'st-card' }, h('h3', null, h(Em, { e: A.e, size: 22 }), ' ', A.n, span({ className: 'sub' }, '  cabe ' + A.cap + ' itens • ' + rs2.length + ' receitas')),
            rs2.map(function (r, i) { return div({ key: i, className: 'rcp' }, r.in.map(function (id, j) { return h(Em, { key: j, e: ITEMS[id].e, size: 18 }); }), span({ className: 'arrow' }, '→'), h(Em, { e: ITEMS[r.out].e, size: 20 }), span({ className: 'rn' }, ITEMS[r.out].n), span({ className: 'rt' }, r.t + 's' + (r.liq ? ' • prato' : ''))); }));
        })));
    } else {
      body = div({ className: 'stations bscroll' },
        div({ className: 'st-card' }, h('h3', null, '🥕 Ingredientes e cortes (' + Object.keys(CC.ING).length + ')'), Object.keys(CC.ING).map(function (k) { const g = CC.ING[k]; return div({ key: k, className: 'rcp' }, h(Em, { e: g.e, size: 20 }), span({ className: 'rn' }, g.n), (function () { const cuts = Object.keys(CC.CUTS).filter(function (c) { return g[CC.CUTS[c].adj]; }).map(function (c) { return CC.CUTS[c].e + ' ' + g[CC.CUTS[c].adj] + ' (' + g[CC.CUTS[c].sec] + 's)'; }); return span({ className: 'rt' }, cuts.length ? cuts.join(' • ') : 'sem corte'); })()); })),
        div({ className: 'st-card' }, h('h3', null, '🧂 Temperos'), div({ className: 'sub pad' }, 'Pegue o frasco e use no prato (ou aproxime o prato da caixa). Alguns pedidos exigem tempero!'),
          Object.keys(CC.SEAS).map(function (k) { const g = CC.SEAS[k]; return div({ key: k, className: 'rcp' }, h(Em, { e: g.e, size: 20 }), span({ className: 'rn' }, g.n)); })));
    }
    return div({ className: 'screen' },
      div({ className: 'topbar' }, button({ className: 'btn sm', onClick: p.onBack }, p.initial ? '✖ Fechar (B)' : '◀ Menu'), h('h1', null, '📖 Livro de Receitas'),
        div({ className: 'seg' }, [['pratos', 'Pratos'], ['estacoes', 'Equipamentos'], ['ingr', 'Ingredientes']].map(function (t) { return button({ key: t[0], className: tab === t[0] ? 'on' : '', onClick: function () { setTab(t[0]); } }, t[1]); }))),
      body);
  }

  /* ---------- ajuda ---------- */
  function Help(p) {
    return div({ className: 'screen' },
      div({ className: 'topbar' }, button({ className: 'btn sm', onClick: p.onBack }, '◀ Menu'), h('h1', null, '❓ Como jogar')),
      div({ className: 'helpgrid' },
        div({ className: 'st-card' }, h('h3', null, '🎮 Controles'),
          div({ className: 'kv' }, div(null, span({ className: 'k' }, 'WASD / Setas'), 'Mover'), div(null, span({ className: 'k' }, 'Espaço / Enter'), 'Pegar, colocar, usar equipamento'),
            div(null, span({ className: 'k' }, 'E (segurar)'), 'Cortar na tábua, ralar, lavar'), div(null, span({ className: 'k' }, 'Q / Shift'), 'Dash'), div(null, span({ className: 'k' }, 'B'), 'Livro de receitas (na partida)'), div(null, span({ className: 'k' }, 'R / clique'), 'Matar insetos (modo pragas)'), div(null, span({ className: 'k' }, 'P / Esc'), 'Pausa / menu')),
          h('h4', null, '👥 Até 4 jogadores no mesmo computador'),
          div({ className: 'kv' }, div(null, span({ className: 'k' }, 'P1'), 'WASD • Espaço • E • Q'), div(null, span({ className: 'k' }, 'P2'), 'Setas • Enter • Shift dir. • /'), div(null, span({ className: 'k' }, 'P3'), 'IJKL • U • O • Y'), div(null, span({ className: 'k' }, 'P4'), 'Num 8/5/4/6 • Num0 • Num. • NumEnter')),
          h('h4', null, '🎮 Controle (gamepad)'),
          div({ className: 'sub' }, 'Analógico/direcional move • A pega/coloca • X (ou RT) segura para cortar • B/RB dash • Start pausa • Y receitas. Cada controle assume um chef.')),
        div({ className: 'st-card' }, h('h3', null, '🍳 Como funciona'),
          h('ul', { className: 'rules' },
            h('li', null, 'Entregue o prato certo na ', h('b', null, 'janela verde 🛎️'), ' antes do tempo do pedido acabar. Clique em um pedido (ou aperte B) para ver a receita completa.'),
            h('li', null, 'Pegue ingredientes nas ', h('b', null, 'caixas'), '. Muitos precisam ser ', h('b', null, 'cortados ✂️'), ' na tábua ou ', h('b', null, 'ralados 🧀'), ' no ralador (segure E).'),
            h('li', null, 'Há ', h('b', null, '19 equipamentos'), ': panela, frigideira, chapa, fritadeira, forno, liquidificador, batedeira, wok, vaporeira, defumador, torradeira, cafeteira, processador, sorveteira, mesa de sushi, empanadora, mesa de massa, maçarico e panela de pressão.'),
            h('li', null, 'Coloque os ingredientes no equipamento: ele cozinha sozinho. Se houver receitas maiores possíveis, ele espera 2,5s por mais ingredientes (barra amarela).'),
            h('li', null, h('b', null, 'Não deixe queimar!'), ' Depois de pronto, a comida queima em ~14s. Queimados vão para o lixo 🗑️.'),
            h('li', null, 'Sopas, cafés e bebidas só saem do equipamento com um ', h('b', null, 'prato limpo'), ' na mão.'),
            h('li', null, 'Monte o prato juntando os itens: com o prato na mão, interaja com o item. Só combinações do cardápio são aceitas.'),
            h('li', null, 'Temperos: pegue o frasco e use no prato, ou, com o prato na mão, interaja direto com a caixa de tempero.'),
            h('li', null, h('b', null, 'Utensílios 🍲: '), 'cada equipamento precisa do seu recipiente (panela, frigideira, wok, cesto, jarra…). Depois de alguns usos ele fica ', h('b', null, 'sujo'), ': pegue-o (mão vazia no equipamento vazio), lave na pia (segure E) e pegue outro limpo na ', h('b', null, 'prateleira de utensílios'), ' (aperte E de frente para ela para escolher o tipo).'),
            h('li', null, h('b', null, 'Competição ⚔️: '), 'nos modos Duelo, Corrida e Equipes, cada entrega vale pontos para quem a fez. Dash num rival o derruba por um instante.'),
            h('li', null, 'Pratos entregues voltam ', h('b', null, 'sujos'), '. Lave na pia (segure E).'),
            h('li', null, 'Gorjetas por rapidez, ', h('b', null, 'combos'), ' por entregas seguidas e pedidos ⭐ VIP que valem o dobro.')))));
  }

  /* ---------- menu ---------- */
  function Menu(p) {
    const sv = p.save;
    return div({ className: 'screen menu' },
      div({ className: 'logo' }, div({ className: 'emojirow' }, '🍳🥘🍕🍣🍰'), h('h1', null, 'Cozinha Caos'), div({ className: 'tag' }, 'Cozinhe, corte, frite, asse e entregue — sozinho, em equipe ou online!')),
      div({ className: 'menubtns' },
        button({ className: 'btn big', onClick: p.onLevels }, '▶ Campanha (22 fases)'),
        button({ className: 'btn', onClick: p.onModes }, '🎲 Modos: Infinito • Diário • Online'),
        button({ className: 'btn', onClick: p.onBook }, '📖 Livro de receitas'),
        button({ className: 'btn', onClick: p.onProfile }, '🏆 Perfil e conquistas'),
        button({ className: 'btn', onClick: p.onHelp }, '❓ Como jogar')),
      div({ className: 'opts' },
        h('label', null, input({ type: 'checkbox', checked: sv.sound, onChange: function (e) { p.setOpt('sound', e.target.checked); } }), ' Som'),
        h('label', null, input({ type: 'checkbox', checked: sv.unlock, onChange: function (e) { p.setOpt('unlock', e.target.checked); } }), ' Liberar todas as fases'),
        button({ className: 'btn sm', onClick: function () { if (window.confirm('Apagar todo o progresso?')) p.onReset(); } }, 'Apagar progresso')),
      div({ className: 'foot' }, Object.keys(DISHES).length + ' pratos • ' + Object.keys(CC.ING).length + ' ingredientes • ' + Object.keys(CC.SEAS).length + ' temperos • ' + Object.keys(CC.APPS).length + ' equipamentos • ' + CC.RECIPES.length + ' receitas'));
  }

  /* ---------- app ---------- */
  function App() {
    const s0 = useState(loadSave), save = s0[0], setSave = s0[1];
    const s1 = useState('menu'), screen = s1[0], setScreen = s1[1];
    const s2 = useState(null), lvl = s2[0], setLvl = s2[1];
    const s3 = useState({ mode: 'local', init: null }), gm = s3[0], setGm = s3[1];
    const s4 = useState([]), newAch = s4[0], setNewAch = s4[1];
    const saveRef = useRef(save); saveRef.current = save;
    CC.sound = save.sound;
    const upd = function (patch) { const n = Object.assign({}, saveRef.current, patch); saveRef.current = n; setSave(n); writeSave(n); };
    const play = function (lv, mode, init) { setNewAch([]); setLvl(lv); setGm({ mode: mode || 'local', init: init || null }); setScreen('game'); };
    const onFinish = function (lv, res, mode) {
      if (lv.practice) return;
      const sv = saveRef.current;
      const stats = Object.assign({}, sv.stats, { cats: Object.assign({}, sv.stats.cats), dishes: Object.assign({}, sv.stats.dishes) });
      stats.delivered += res.delivered; stats.matches++; if (mode !== 'local') stats.online++; stats.bestScore = Math.max(stats.bestScore, res.score);
      Object.keys(res.dishes || {}).forEach(function (id) { stats.dishes[id] = (stats.dishes[id] || 0) + res.dishes[id]; const c = DISHES[id] && DISHES[id].cat; if (c) stats.cats[c] = (stats.cats[c] || 0) + res.dishes[id]; });
      const patch = { stats: stats };
      if (typeof lv.id === 'number') { const stars = Object.assign({}, sv.stars), best = Object.assign({}, sv.best); stars[lv.id] = Math.max(stars[lv.id] || 0, res.stars); best[lv.id] = Math.max(best[lv.id] || 0, res.score); patch.stars = stars; patch.best = best; }
      if (lv.id === 'endless') stats.endlessBest = Math.max(stats.endlessBest, res.score);
      if (lv.id === 'daily') { const d = Object.assign({}, sv.daily); d[lv.key] = Math.max(d[lv.key] || 0, res.score); patch.daily = d; }
      const tmp = Object.assign({}, sv, patch); const ach = Object.assign({}, sv.ach), got = [];
      CC.ACH.forEach(function (a) { if (!ach[a[0]] && a[4](stats, res, tmp, lv)) { ach[a[0]] = true; got.push(a); } });
      patch.ach = ach; setNewAch(got); upd(patch);
    };
    const gotoMenu = function () { setScreen('menu'); };
    useEffect(function () { window.CC.app = { play: play, setScreen: setScreen }; });
    const leaveRoom = function () { MP.leave(); setScreen('online'); };
    switch (screen) {
      case 'levels': return h(Levels, { save: save, onBack: gotoMenu, onPlay: function (lv) { play(lv); }, setPlayers: function (n) { upd({ players: n }); } });
      case 'modes': return h(Modes, { save: save, onBack: gotoMenu, onPlay: function (lv) { play(lv); }, onCustom: function () { setScreen('custom'); }, onOnline: function () { setScreen('online'); }, setPlayers: function (n) { upd({ players: n }); } });
      case 'custom': return h(Custom, { save: save, onBack: function () { setScreen('modes'); }, onStart: function (cfg) { upd({ custom: cfg }); play(CC.makeCustom(cfg)); } });
      case 'online': return h(Online, { save: save, onBack: function () { MP.leave(); setScreen('modes'); }, onLobby: function () { setScreen('lobby'); } });
      case 'lobby': return h(Lobby, { onLeave: leaveRoom, onClosed: function () { MP.leave(); setScreen('online'); }, onHostStart: function (lv) { play(lv, 'host'); }, onGuestStart: function (d) { play(d.lv, 'guest', d.init); } });
      case 'profile': return h(Profile, { save: save, upd: upd, onBack: gotoMenu });
      case 'book': return h(Book, { onBack: gotoMenu });
      case 'help': return h(Help, { onBack: gotoMenu });
      case 'game': return h(GameScreen, { lv: lvl, mode: gm.mode, init: gm.init, players: save.players, skins: save.skins, name: save.name, newAch: newAch,
        onExit: function () { if (gm.mode !== 'local') setScreen('lobby'); else setScreen(lvl.practice || typeof lvl.id === 'string' ? 'modes' : 'levels'); }, onFinish: onFinish, onNext: function (n) { play(n); } });
      default: return h(Menu, {
        save: save, onLevels: function () { setScreen('levels'); }, onModes: function () { setScreen('modes'); }, onBook: function () { setScreen('book'); }, onHelp: function () { setScreen('help'); }, onProfile: function () { setScreen('profile'); },
        setOpt: function (k, v) { const p = {}; p[k] = v; upd(p); }, onReset: function () { upd({ stars: {}, best: {}, stats: DEF().stats, ach: {}, daily: {} }); }
      });
    }
  }

  const bad = CC.validate();
  if (bad.length) console.warn('Dados inconsistentes:', bad);
  ReactDOM.createRoot(document.getElementById('root')).render(h(App));
})(window.CC);
