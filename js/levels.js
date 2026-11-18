/* Cozinha Caos — fases e gerador de cozinha */
(function (CC) {
  'use strict';
  const DISHES = CC.DISHES;
  const all = Object.keys(DISHES);

  /* menu: ids de pratos; seasP: chance do pedido pedir tempero; extra: equipamentos a mais */
  CC.LEVELS = [
    { id: 1, nome: 'Lanchonete do Zé', e: '🍔', cor: '#d35400', tip: 'Corte o pão e a carne (E na tábua), toste/grelhe na chapa e monte tudo no prato. Entregue na janela verde!',
      menu: ['hamburguer', 'cheeseburger', 'batata_frita', 'salada'], tempo: 150, int: [20, 26], max: 3, pat: 1.25, layout: 'ilha', plates: 4, seasP: 0, extra: { grill: 2 } },
    { id: 2, nome: 'Café da Manhã', e: '🍳', cor: '#f39c12', tip: 'Ovos na frigideira, sucos no liquidificador (bebida vai direto no prato) e panquecas na batedeira.',
      menu: ['ovo_pao', 'omelete_q', 'cafe_completo', 'suco_laranja', 'vitamina_banana', 'panqueca', 'torrada_abacate'], tempo: 170, int: [19, 25], max: 4, pat: 1.15, layout: 'ilha', plates: 4, seasP: 0.15 },
    { id: 3, nome: 'Pizzaria Napoli', e: '🍕', cor: '#c0392b', tip: 'Massa na batedeira + molho na panela + queijo → forno. Espere o forno completar a receita (ele aguarda 2,5s por mais ingredientes).',
      menu: ['pizza_marg', 'pizza_calabresa', 'pizza_cogumelo', 'bruschetta', 'grega', 'limonada'], tempo: 180, int: [19, 24], max: 4, pat: 1.1, layout: 'ilha', plates: 4, seasP: 0.2, extra: { oven: 2 } },
    { id: 4, nome: 'Sopas & Caldos', e: '🥣', cor: '#16a085', tip: 'Sopas ficam na panela: pegue um prato limpo e interaja com a panela pronta. Cuidado para não queimar!',
      menu: ['sopa_tomate', 'sopa_tomate_t', 'sopa_legumes', 'creme_milho', 'creme_cogumelo', 'sopa_cebola'], tempo: 180, int: [18, 24], max: 4, pat: 1.1, layout: 'livre', plates: 4, seasP: 0.3, extra: { pot: 2 } },
    { id: 5, nome: 'Churrascaria Gaúcha', e: '🍢', cor: '#a04000', tip: 'Espetinhos na chapa, arroz e feijão na panela. Monte o PF com tudo no mesmo prato.',
      menu: ['espetinho', 'espeto_frango', 'bife_fritas', 'pf', 'linguica_mand', 'milho', 'frango_arroz'], tempo: 190, int: [17, 23], max: 5, pat: 1.05, layout: 'divisao', plates: 5, seasP: 0.25, extra: { grill: 2, pot: 2 } },
    { id: 6, nome: 'Frutos do Mar', e: '🦐', cor: '#2980b9', tip: 'Camarão e peixe na fritadeira ou frigideira. Moqueca vai na panela com leite de coco (coco ralado).',
      menu: ['camarao_frito', 'peixe_fritas', 'moqueca', 'moqueca_camarao', 'arroz_camarao', 'peixe_assado', 'suco_abacaxi'], tempo: 200, int: [16, 22], max: 5, pat: 1.05, layout: 'ilha', plates: 5, seasP: 0.25, extra: { pot: 2, fryer: 2 } },
    { id: 7, nome: 'Cantina Mexicana', e: '🌮', cor: '#27ae60', tip: 'Guacamole sai do liquidificador (abacate + tomate + cebola). Tortilla já vem pronta para o prato.',
      menu: ['taco', 'taco_guac', 'quesadilla', 'quesadilla_frango', 'burrito', 'limonada'], tempo: 200, int: [16, 21], max: 5, pat: 1, layout: 'livre', plates: 5, seasP: 0.3, extra: { pan: 2, grill: 2 } },
    { id: 8, nome: 'Trattoria Italiana', e: '🍝', cor: '#8e44ad', tip: 'Macarrão cozido + molho na frigideira. Lasanha: macarrão + bolonhesa + molho branco + queijo no forno.',
      menu: ['macarrao_molho', 'macarrao_bolonhesa', 'carbonara', 'lasanha', 'macarrao_camarao', 'bruschetta', 'pizza_marg'], tempo: 210, int: [15, 20], max: 5, pat: 1, layout: 'divisao', plates: 5, seasP: 0.35, extra: { pot: 2, pan: 2, oven: 2 } },
    { id: 9, nome: 'Confeitaria Doce Vida', e: '🍰', cor: '#e84393', tip: 'Todas as massas começam na batedeira. Doces vão ao forno; milkshake e vitaminas, ao liquidificador.',
      menu: ['bolo', 'bolo_choco', 'cookies', 'brigadeiro', 'torta_maca', 'milkshake', 'churros', 'banana_sorvete'], tempo: 210, int: [15, 20], max: 5, pat: 1, layout: 'ilha', plates: 5, seasP: 0.35, extra: { oven: 2, mixer: 2 } },
    { id: 10, nome: 'Sabores do Brasil', e: '🇧🇷', cor: '#009c3b', tip: 'Pastel: massa na batedeira, recheio picado e fritadeira. Feijoada: feijão + linguiça + bacon na panela.',
      menu: ['feijoada', 'pastel_queijo', 'pastel_carne', 'pastel_misto', 'pao_queijo', 'pf_ovo', 'mandioca_frita', 'vitamina_morango'], tempo: 220, int: [14, 19], max: 6, pat: 0.95, layout: 'divisao', plates: 6, seasP: 0.3, extra: { pot: 2, fryer: 2, mixer: 2 } },
    { id: 11, nome: 'Gastrô Chef', e: '👨‍🍳', cor: '#2c3e50', tip: 'Cardápio variado e pedidos exigentes. Divida bem as tarefas — e lave a louça!',
      menu: ['xbacon', 'gourmet', 'caesar', 'omelete_c', 'creme_batata', 'peixe_grelhado', 'frango_batata', 'carbonara', 'torta_banana', 'milkshake_morango', 'arroz_frito', 'batata_recheada'], tempo: 240, int: [13, 18], max: 6, pat: 0.9, layout: 'ilha', plates: 6, seasP: 0.4, w: 16, h: 10, extra: { pot: 2, pan: 2, grill: 2, oven: 2, fryer: 2 } },
    { id: 12, nome: 'Caos Total', e: '🔥', cor: '#6c1d1d', tip: 'Todos os pratos do livro, uma cozinha enorme dividida ao meio. Boa sorte, chef!',
      menu: 'CLASSIC', tempo: 300, int: [11, 16], max: 7, pat: 0.85, layout: 'divisao', plates: 7, seasP: 0.45, w: 22, h: 12, extra: { pot: 2, pan: 2, grill: 2, oven: 2, fryer: 2 } },
    { id: 99, pantry: true, nome: 'Treino Livre', e: '🧪', cor: '#34495e', tip: 'Sem relógio e sem penalidades — todos os pratos e equipamentos. Perfeito para aprender receitas.',
      menu: 'ALL', tempo: 0, int: [20, 28], max: 4, pat: 1.6, layout: 'ilha', plates: 8, seasP: 0.3, w: 18, h: 11, practice: true, extra: { pot: 2, pan: 2, grill: 2, oven: 2, fryer: 2, blender: 2, mixer: 2 } }
  ];
  /* fases da expansão: menu sorteado por categorias (semente fixa) */
  function pickMenu(cats, n, seed) {
    let pool = all.filter(function (id) { return cats.indexOf(DISHES[id].cat) >= 0; });
    let s = seed >>> 0; const r = function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const t = pool[i]; pool[i] = pool[j]; pool[j] = t; }
    return pool.slice(0, n);
  }
  const EXTRA = [
    { id: 14, nome: 'Sushi Bar', e: '🍣', cor: '#c0392b', tip: 'Arroz cozido + alga nori + peixe cortado na Mesa de sushi. Sashimi é só peixe cortado!', cats: ['japa'], n: 9, tempo: 200, int: [15, 20], max: 5, pat: 1, layout: 'ilha', plates: 5, seasP: 0.3, extra: { sushi: 2, pot: 2 } },
    { id: 15, nome: 'Wok Express', e: '🍜', cor: '#d35400', tip: 'Macarrão cozido na panela e depois no wok com os legumes. O vapor cozinha bao e dumplings.', cats: ['asia'], n: 10, tempo: 210, int: [14, 19], max: 5, pat: 1, layout: 'divisao', plates: 5, seasP: 0.3, extra: { wok: 2, pot: 2, steamer: 2 } },
    { id: 16, nome: 'Defumados & Grelhados', e: '🥩', cor: '#6e2c00', tip: 'O defumador demora, mas rende pratos caros. Use o ralador e as chapas em paralelo.', cats: ['churras'], n: 10, tempo: 220, int: [14, 19], max: 5, pat: 1, layout: 'livre', plates: 6, seasP: 0.35, extra: { smoker: 2, grill: 2 } },
    { id: 17, nome: 'Cafeteria Aroma', e: '☕', cor: '#6f4e37', tip: 'Café: água + pó na cafeteira (vai direto no prato). Combine com torradas e bolos.', cats: ['cafeteria'], n: 12, tempo: 210, int: [13, 18], max: 6, pat: 0.95, layout: 'ilha', plates: 6, seasP: 0.4, extra: { coffee: 2, toaster: 2 } },
    { id: 18, nome: 'Padaria Artesanal', e: '🥐', cor: '#b9770e', tip: 'Abra a massa na Mesa de massa e asse. Rabanada e waffle vão na frigideira.', cats: ['padaria'], n: 11, tempo: 220, int: [13, 18], max: 6, pat: 0.95, layout: 'divisao', plates: 6, seasP: 0.35, extra: { roller: 2, oven: 2, mixer: 2 } },
    { id: 19, nome: 'Jardim Vegetariano', e: '🥦', cor: '#1e8449', tip: 'Muita verdura! Panela de pressão cozinha lentilha e grão rápido; vaporeira para brócolis.', cats: ['veg'], n: 11, tempo: 220, int: [13, 18], max: 6, pat: 0.95, layout: 'livre', plates: 6, seasP: 0.35, extra: { pressure: 2, processor: 2, steamer: 1 } },
    { id: 20, nome: 'Sorveteria Polar', e: '🍦', cor: '#16a085', tip: 'Sorveteira: leite + creme + fruta. Maçarico para brûlée e caramelizar.', menuIds: ['sorvete_creme', 'sorvete_choco', 'sorvete_morango', 'sorvete_manga', 'sorvete_coco', 'raspadinha', 'raspa_limao', 'frozen_iogurte', 'sundae', 'banana_split', 'banana_flamb', 'creme_brulee', 'cafe_gelado', 'milkshake'], tempo: 220, int: [13, 17], max: 6, pat: 0.95, layout: 'ilha', plates: 6, seasP: 0.5, extra: { icecream: 2, torch: 1, blender: 2 } },
    { id: 21, nome: 'Mar Gourmet', e: '🦞', cor: '#1b4f72', tip: 'Lagosta, ostras e polvo: caros, mas demorados. Panela de pressão amolece o polvo.', cats: ['gourmet'], n: 12, tempo: 240, int: [14, 18], max: 6, pat: 0.95, layout: 'divisao', plates: 7, seasP: 0.4, w: 17, h: 10, extra: { steamer: 2, pressure: 2, oven: 2, pot: 2 } },
    { id: 22, nome: 'Menu Degustação', e: '👑', cor: '#7d3c98', tip: 'Todas as cozinhas do mundo num só lugar. Prepare-se.', cats: ['lanche', 'asia', 'japa', 'churras', 'veg', 'cafeteria', 'padaria', 'gourmet', 'ita', 'mex', 'doce', 'bebida', 'pizza', 'sopa'], n: 30, tempo: 280, int: [11, 15], max: 7, pat: 0.9, layout: 'ilha', plates: 8, seasP: 0.45, w: 20, h: 12, extra: { pot: 2, pan: 2, grill: 2, oven: 2, fryer: 2, blender: 1, mixer: 1, wok: 1, steamer: 1, sushi: 1, coffee: 1, icecream: 1, pressure: 1, smoker: 1, roller: 1, torch: 1, processor: 1, breader: 1, toaster: 1 } },
    { id: 23, nome: 'Caos Supremo', e: '💥', cor: '#4a0e0e', tip: 'Cardápio enorme, cozinha gigante dividida ao meio. Só para mestres-cuca.', cats: ['lanche', 'asia', 'japa', 'churras', 'veg', 'cafeteria', 'padaria', 'gourmet', 'ita', 'mex', 'doce', 'bebida', 'pizza', 'sopa', 'br', 'mar', 'cafe', 'salada'], n: 26, tempo: 330, int: [9, 14], max: 8, pat: 0.85, layout: 'divisao', plates: 9, seasP: 0.5, w: 26, h: 15, extra: { pot: 2, pan: 2, grill: 2, oven: 2, fryer: 2, blender: 1, mixer: 1, wok: 1, steamer: 1, sushi: 1, coffee: 1, icecream: 1, pressure: 1, smoker: 1, roller: 1, torch: 1, processor: 1, breader: 1, toaster: 1 } }
  ];
  EXTRA.forEach(function (x) { if (x.cats) x.menu = pickMenu(x.cats, x.n, x.id * 977); else x.menu = x.menuIds; });
  CC.LEVELS.splice(CC.LEVELS.length - 1, 0, ...EXTRA);
  CC.LEVELS.forEach(function (l) {
    if (l.menu === 'CLASSIC') l.menu = pickMenu(['lanche', 'salada', 'cafe', 'pizza', 'sopa', 'br', 'mar', 'mex', 'ita', 'doce', 'bebida'], 16, 1212);
    if (l.menu === 'ALL') l.menu = all.slice();
    l.w = l.w || 15; l.h = l.h || 9;
    // potencial de pontos e estrelas
    const avg = l.menu.reduce(function (s, id) { return s + DISHES[id].price; }, 0) / l.menu.length;
    const n = l.tempo ? l.tempo / ((l.int[0] + l.int[1]) / 2) : 0;
    l.pot = Math.round(n * avg);
    l.stars = [0.18, 0.36, 0.55].map(function (f) { return Math.max(20, Math.round(l.pot * f / 10) * 10); });
  });

  /* seed simples para layouts reproduzíveis */
  function rng(seed) { let s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

  /* o que a fase precisa */
  CC.levelNeeds = function (lv) {
    const need = { raw: {}, apps: {}, board: false, grater: false, cuts: {}, seas: {} };
    lv.menu.forEach(function (id) {
      const d = DISHES[id];
      d.parts.forEach(function (p) {
        const a = CC.needs(p);
        Object.keys(a.raw).forEach(function (k) { need.raw[k] = 1; });
        Object.keys(a.apps).forEach(function (k) { need.apps[k] = 1; });
        if (a.board) need.board = true;
        if (a.grater) need.grater = true;
        Object.keys(a.cuts || {}).forEach(function (k) { need.cuts[k] = true; });
      });
      if (lv.seasP > 0) d.seas.forEach(function (s) { need.seas[s] = 1; });
    });
    return need;
  };

  /* monta a grade de tiles (cresce sozinha se faltar espaço) */
  CC.buildGrid = function (lv) {
    const need = CC.levelNeeds(lv);
    const crates = (lv.pantry ? [] : Object.keys(need.raw).sort(function (a, b) { return CC.ING[a].n < CC.ING[b].n ? -1 : 1; })).concat(Object.keys(need.seas));
    const apps = [];
    Object.keys(CC.APPS).forEach(function (a) {
      if (!need.apps[a]) return;
      const n = Math.max(1, (lv.extra && lv.extra[a]) || 1);
      for (let i = 0; i < n; i++) apps.push(a);
    });
    const big = lv.practice || (typeof lv.id === 'number' && lv.id >= 11 && lv.id < 90) || lv.menu.length > 22;
    let boards = need.board ? Math.min(4, Math.max(2, Math.ceil(Object.keys(need.raw).filter(function (r) { return CC.ING[r].chop; }).length / 3))) : 0;
    if (big) boards = Math.max(boards, 3);
    const cutThings = [];
    for (let i = 0; i < boards; i++) cutThings.push('board');
    Object.keys(need.cuts || {}).forEach(function (k) { if (k === 'board') return; for (let i = 0; i < (big ? 2 : 1); i++) cutThings.push(k); });
    const utOn = lv.utensils !== false && !(lv.cfg && lv.cfg.utensils === false);
    const utKinds = {};
    apps.forEach(function (a) { if (utOn && CC.UT[a]) utKinds[a] = 1; });
    // itens especiais: computador, doca, janelas extras
    const specials = [];
    if (Object.keys(utKinds).length) specials.push({ sp: 'utrack' });
    if (lv.pc !== false && (lv.stock || lv.shop !== false)) specials.push({ sp: 'pc' });
    if (lv.stock) specials.push({ sp: 'dock' });
    if (lv.pantry) { specials.push({ sp: 'pantry' }); specials.push({ sp: 'pantry' }); }
    for (let w = 1; w < (lv.windows || 1); w++) specials.push({ sp: 'win', win: w });
    const items = crates.map(function (id) { return { id: id }; });
    specials.forEach(function (s, k) { items.splice(Math.min(items.length, Math.floor((k + 1) * items.length / (specials.length + 1))), 0, s); });
    let W = lv.w, H = lv.h, L;
    for (let tries = 0; tries < 14; tries++) {
      L = layoutSlots(lv, W, H);
      const cCap = L.top.length + L.bot.length + L.leftFree.length, aCap = L.right.length + L.isl.length;
      if (apps.length + cutThings.length + Math.max(0, items.length - (cCap - 2)) <= aCap - 1) break;
      if (W < 40) W += 2; if (H < 22) H += 1;
    }
    const grid = L.grid, put = L.put;
    const spread = function (arr, count) {
      const out = [];
      for (let i = 0; i < count; i++) out.push(arr[Math.min(arr.length - 1, Math.floor((i + 0.5) * arr.length / count))]);
      return out;
    };
    ['T', 'W', 'K', 'D', 'X'].forEach(function (c, i) {
      const s = L.left[i + 1];
      if (c === 'T') put(s, { k: 'trash' });
      if (c === 'W') put(s, { k: 'sink', dirty: 0, clean: 0, prog: 0, duts: [] });
      if (c === 'K') put(s, { k: 'rack', n: lv.plates });
      if (c === 'D') put(s, { k: 'ret', dirty: 0 });
      if (c === 'X') put(s, { k: 'serve', flash: 0, win: 0 });
    });
    const mkItem = function (o) {
      if (o.id) return { k: 'crate', id: o.id };
      if (o.sp === 'pc') return { k: 'pc' };
      if (o.sp === 'utrack') return { k: 'utrack', items: Object.keys(utKinds).map(function (k) { return CC.mkUt(k); }), sel: null };
      if (o.sp === 'pantry') return { k: 'pantry' };
      if (o.sp === 'dock') return { k: 'dock', boxes: [], flash: 0 };
      return { k: 'serve', flash: 0, win: o.win };
    };
    const cCap = L.top.length + L.bot.length + L.leftFree.length;
    const nMain = Math.min(items.length, Math.max(0, cCap - 2));
    spread(L.top.concat(L.bot, L.leftFree), nMain).forEach(function (s, i) { put(s, mkItem(items[i])); });
    const mk = function (kind) { return { k: 'app', kind: kind, ut: utKinds[kind] ? CC.mkUt(kind) : null, items: [], st: 'idle', prog: 0, rec: null, out: null, burn: 0, grace: 0 }; };
    const things = apps.map(function (a) { return { app: a }; });
    items.slice(nMain).forEach(function (o, i) { things.splice(Math.min(things.length, 2 + i * 2), 0, { item: o }); });
    cutThings.forEach(function (k, i) { things.splice(Math.min(things.length, 1 + i * 3), 0, { cut: k }); });
    spread(L.isl.concat(L.right), things.length).forEach(function (s, i) {
      const th = things[i];
      put(s, th.cut ? { k: th.cut, thing: null, prog: 0 } : th.item ? mkItem(th.item) : mk(th.app));
    });
    return { grid: grid, W: W, H: H, need: need };
  };

  function layoutSlots(lv, W, H) {
    const grid = []; for (let y = 0; y < H; y++) grid.push(new Array(W).fill(null));
    const counter = function () { return { k: 'counter', thing: null }; };
    for (let x = 0; x < W; x++) { grid[0][x] = counter(); grid[H - 1][x] = counter(); }
    for (let y = 0; y < H; y++) { grid[y][0] = counter(); grid[y][W - 1] = counter(); }
    const mid = Math.floor(H / 2);
    const L = { top: [], bot: [], left: [], right: [], isl: [], leftFree: [] };
    for (let x = 1; x < W - 1; x++) { L.top.push([x, 0]); L.bot.push([x, H - 1]); }
    for (let y = 1; y < H - 1; y++) { L.left.push([0, y]); L.right.push([W - 1, y]); }
    L.leftFree = L.left.slice(6);
    if (lv.layout === 'ilha') {
      const rows = H >= 18 ? [Math.floor(H / 5), Math.floor(2 * H / 5), Math.floor(3 * H / 5), Math.floor(4 * H / 5)] : H >= 15 ? [Math.floor(H / 4), Math.floor(H / 2), Math.ceil(3 * H / 4)] : H >= 12 ? [Math.floor(H / 3), Math.ceil(2 * H / 3)] : [mid];
      rows.forEach(function (y) { for (let x = 3; x <= W - 4; x++) L.isl.push([x, y]); });
    } else if (lv.layout === 'livre') {
      const cx = Math.floor(W / 2);
      for (let x = cx - 2; x <= cx + 2; x++) L.isl.push([x, mid]);
      L.isl.push([cx - 4, 2], [cx + 4, 2], [cx - 4, H - 3], [cx + 4, H - 3]);
      if (W >= 18) for (let x = cx - 6; x <= cx + 6; x += 12) L.isl.push([x, mid]);
    } else if (lv.layout === 'divisao') {
      const dx = Math.floor(W / 2);
      for (let y = 1; y < H - 1; y++) { if (Math.abs(y - mid) <= 1) continue; L.isl.push([dx, y]); }
    }
    L.isl.forEach(function (s) { grid[s[1]][s[0]] = counter(); });
    const reach = function (s) { return [[1, 0], [-1, 0], [0, 1], [0, -1]].some(function (d) { const x = s[0] + d[0], y = s[1] + d[1]; return x >= 0 && y >= 0 && x < W && y < H && !grid[y][x]; }); };
    ['top', 'bot', 'right', 'isl'].forEach(function (k) { L[k] = L[k].filter(reach); });
    L.leftFree = L.leftFree.filter(reach);
    L.grid = grid;
    L.put = function (s, tile) { grid[s[1]][s[0]] = tile; };
    return L;
  }
})(window.CC);

/* ---------- modos extras: infinito, desafio do dia, restaurante personalizado ---------- */
(function (CC) {
  'use strict';
  const DISHES = CC.DISHES, all = Object.keys(DISHES);
  function rngf(seed) { let s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function shuffle(a, r) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function prep(lv) {
    lv.w = lv.w || 15; lv.h = lv.h || 9;
    const avg = lv.menu.reduce(function (s, id) { return s + DISHES[id].price; }, 0) / lv.menu.length;
    const n = lv.tempo ? lv.tempo / ((lv.int[0] + lv.int[1]) / 2) : 10;
    lv.pot = Math.round(n * avg);
    if (!lv.stars) lv.stars = [0.18, 0.36, 0.55].map(function (f) { return Math.max(20, Math.round(lv.pot * f / 10) * 10); });
    return lv;
  }
  function autoExtra(menu) {
    const cnt = {};
    menu.forEach(function (id) { DISHES[id].parts.forEach(function (p) { Object.keys(CC.needs(p).apps).forEach(function (a) { cnt[a] = (cnt[a] || 0) + 1; }); }); });
    const ex = {}; Object.keys(cnt).forEach(function (a) { ex[a] = cnt[a] > 14 ? 3 : cnt[a] > 5 ? 2 : 1; });
    return ex;
  }
  const CLASSIC = ['lanche', 'salada', 'cafe', 'pizza', 'sopa', 'br', 'mar', 'mex', 'ita', 'doce', 'bebida'];
  CC.makeEndless = function () {
    const r = rngf(Date.now() % 100000);
    const menu = shuffle(all.filter(function (id) { return CLASSIC.indexOf(DISHES[id].cat) >= 0; }), r).slice(0, 22);
    return prep({ id: 'endless', nome: 'Modo Infinito', e: '♾️', cor: '#8e44ad', tip: 'Sem relógio: você tem 3 vidas ❤️. Cada pedido perdido custa uma — e os pedidos aceleram com o tempo!', menu: menu, tempo: 0, endless: true, lives: 3, int: [16, 22], max: 5, pat: 1, layout: 'ilha', plates: 6, seasP: 0.3, extra: autoExtra(menu), stars: [300, 700, 1300] });
  };
  CC.dailyKey = function () { const d = new Date(); return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate(); };
  CC.makeDaily = function () {
    const key = CC.dailyKey(), r = rngf(key * 31);
    const cats = shuffle(Object.keys(CC.CATS), r).slice(0, 4);
    const menu = shuffle(all.filter(function (id) { return cats.indexOf(DISHES[id].cat) >= 0; }), r).slice(0, 16);
    const layouts = ['ilha', 'livre', 'divisao'];
    const d = new Date();
    return prep({ id: 'daily', key: key, nome: 'Desafio do Dia ' + ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2), e: '📅', cor: '#e67e22', tip: 'Mesmo cardápio para todo mundo hoje: ' + cats.map(function (c) { return CC.CATS[c][0]; }).join(', ') + '.', menu: menu, tempo: 240, int: [12, 17], max: 6, pat: 0.95, layout: layouts[Math.floor(r() * 3)], plates: 6, seasP: 0.4, extra: autoExtra(menu) });
  };
  CC.makeCustom = function (cfg) {
    const menu = cfg.ids.filter(function (id) { return DISHES[id]; });
    const pace = cfg.pace == null ? 1 : cfg.pace;
    const INT = [[22, 28], [15, 20], [9, 13]], PAT = [1.35, 1, 0.8];
    return prep({ id: 'custom', nome: cfg.nome || 'Meu Restaurante', e: '🏪', cor: '#2980b9', tip: 'Seu restaurante, suas regras.', menu: menu, tempo: cfg.tempo, endless: !cfg.tempo, lives: 3, practice: false, int: INT[pace], max: 3 + pace * 2 + Math.min(3, Math.floor(menu.length / 12)), pat: PAT[pace], layout: cfg.layout || 'ilha', plates: 6, seasP: cfg.seasP == null ? 0.3 : cfg.seasP, extra: autoExtra(menu), stars: cfg.tempo ? null : [300, 700, 1300] });
  };
})(window.CC);


/* ---------- modos de gestão: estoque, janelas e loja ---------- */
(function (CC) {
  'use strict';
  const DISHES = CC.DISHES, all = Object.keys(DISHES);
  function rngf(seed) { let s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function shuffle(a, r) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function prep(lv) {
    lv.w = lv.w || 15; lv.h = lv.h || 9;
    const avg = lv.menu.reduce(function (s, id) { return s + DISHES[id].price; }, 0) / lv.menu.length;
    const n = lv.tempo ? lv.tempo / ((lv.int[0] + lv.int[1]) / 2) : 10;
    lv.pot = Math.round(n * avg);
    if (!lv.stars) lv.stars = [0.18, 0.36, 0.55].map(function (f) { return Math.max(20, Math.round(lv.pot * f / 10) * 10); });
    return lv;
  }
  function autoExtra(menu) {
    const cnt = {};
    menu.forEach(function (id) { DISHES[id].parts.forEach(function (p) { Object.keys(CC.needs(p).apps).forEach(function (a) { cnt[a] = (cnt[a] || 0) + 1; }); }); });
    const ex = {}; Object.keys(cnt).forEach(function (a) { ex[a] = cnt[a] > 14 ? 3 : cnt[a] > 5 ? 2 : 1; });
    return ex;
  }
  const CLASSIC = ['lanche', 'salada', 'cafe', 'pizza', 'sopa', 'br', 'mar', 'mex', 'ita', 'doce', 'bebida'];
  const pick = function (cats, n, seed) { return shuffle(all.filter(function (id) { return cats.indexOf(DISHES[id].cat) >= 0; }), rngf(seed)).slice(0, n); };
  CC.WIN_FAST = ['Balcão', 'Drive-thru', 'Delivery', 'Salão'];
  CC.WIN_SALON = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4'];

  CC.makeEndless = function () {
    const menu = pick(CLASSIC, 22, Date.now() % 100000);
    return prep({ id: 'endless', nome: 'Modo Infinito', e: '♾️', cor: '#8e44ad', tip: 'Sem relógio: 3 vidas ❤️. Gerencie o estoque 💻, atenda 2 janelas e compre melhorias na loja!', menu: menu, tempo: 0, endless: true, lives: 3, int: [16, 22], max: 5, pat: 1, layout: 'ilha', plates: 6, seasP: 0.3, windows: 2, winNames: CC.WIN_FAST, stock: { initial: 8 }, cash: 250, extra: autoExtra(menu), stars: [300, 700, 1300] });
  };
  CC.makeFastFood = function () {
    const menu = pick(['fastfood'], 22, 777);
    return prep({ id: 'fastfood', nome: 'Fast Food', e: '🍟', cor: '#e74c3c', tip: '3 janelas: entregue cada pedido na janela certa. O estoque acaba — use o computador 💻 para chamar o caminhão!', menu: menu, tempo: 330, int: [11, 15], max: 7, pat: 0.9, layout: 'divisao', plates: 8, seasP: 0.35, windows: 3, winNames: CC.WIN_FAST, stock: { initial: 8 }, cash: 400, extra: autoExtra(menu), w: 19, h: 11 });
  };
  CC.makeSalon = function () {
    const menu = pick(CLASSIC.concat(['sand', 'deli', 'cafeteria', 'padaria']), 26, 4242);
    return prep({ id: 'salon', nome: 'Salão de Restaurante', e: '🪟', cor: '#2c7a7b', tip: 'Cada mesa é uma janela: o prato precisa ir para a janela da mesa que pediu. Estoque e loja ativos.', menu: menu, tempo: 300, int: [12, 17], max: 6, pat: 1, layout: 'ilha', plates: 8, seasP: 0.4, windows: 3, winNames: CC.WIN_SALON, stock: { initial: 8 }, cash: 400, extra: autoExtra(menu), w: 19, h: 11 });
  };
  CC.makePests = function () {
    const menu = pick(CLASSIC, 18, 31337);
    return prep({ id: 'pests', nome: 'Infestação!', e: '🪳', cor: '#5d4037', tip: 'Baratas, moscas e formigas invadem a cozinha e estragam comida! Mate com R (ou clique no inseto). A loja tem mata-moscas, lâmpada, telas e inseticida.', menu: menu, tempo: 300, int: [13, 18], max: 5, pat: 1.05, layout: 'ilha', plates: 6, seasP: 0.25, windows: 1, stock: { initial: 8 }, cash: 250, cfg: { bugs: 2 }, extra: autoExtra(menu), w: 17, h: 10 });
  };
  CC.makeEntomo = function () {
    const menu = pick(['inseto'], 20, 5150);
    return prep({ id: 'entomo', nome: 'Restaurante Entomológico', e: '🦗', cor: '#6b8e23', tip: 'Cardápio 100% de insetos comestíveis: grilos, larvas, gafanhoto e formigas! (E ainda tem praga solta…)', menu: menu, tempo: 300, int: [12, 17], max: 5, pat: 1, layout: 'livre', plates: 6, seasP: 0.4, windows: 1, stock: { initial: 8 }, cash: 300, cfg: { bugs: 1 }, extra: autoExtra(menu), w: 17, h: 10 });
  };
  CC.makeBlackout = function () {
    const menu = pick(CLASSIC, 16, 2077);
    return prep({ id: 'blackout', nome: 'Noite de Apagões', e: '💡', cor: '#1a237e', tip: 'A luz cai de vez em quando — só os chefs têm lanterna! No rush os pedidos aceleram. Compre um gerador na loja.', menu: menu, tempo: 300, int: [14, 19], max: 5, pat: 1.1, layout: 'ilha', plates: 6, seasP: 0.3, windows: 1, cash: 100, cfg: { dark: true, rush: true }, extra: autoExtra(menu), w: 17, h: 10 });
  };
  CC.makeDuel = function () {
    const menu = pick(CLASSIC, 14, 8080);
    return prep({ id: 'duel', nome: 'Duelo de Chefs', e: '⚔️', cor: '#b71c1c', tip: 'Todos contra todos! Cada prato entregue vale pontos para QUEM entregou. Dash em outro chef derruba ele por um instante. Maior pontuação vence!', menu: menu, tempo: 240, int: [8, 12], max: 6, pat: 0.8, layout: 'livre', plates: 6, seasP: 0.2, shop: false, versus: 'ffa', minPlayers: 2, cfg: { pvp: true, tips: true }, extra: autoExtra(menu), w: 17, h: 10 });
  };
  CC.makeRace = function () {
    const menu = pick(CLASSIC, 12, 9191);
    return prep({ id: 'race', nome: 'Corrida de Pedidos', e: '🏁', cor: '#f57f17', tip: 'O primeiro chef a entregar 8 pratos vence a corrida! Os pedidos são de todos — seja mais rápido que os outros.', menu: menu, tempo: 420, goal: 8, int: [7, 10], max: 6, pat: 0.85, layout: 'ilha', plates: 6, seasP: 0.2, shop: false, versus: 'ffa', minPlayers: 2, cfg: { pvp: true }, extra: autoExtra(menu), w: 17, h: 10 });
  };
  CC.makeTeams = function () {
    const menu = pick(CLASSIC, 16, 7007);
    return prep({ id: 'teams', nome: 'Batalha de Equipes', e: '🛡️', cor: '#283593', tip: 'Equipe 🔴 (chefs 1 e 3) contra equipe 🔵 (chefs 2 e 4). A equipe que somar mais pontos vence. Dash derruba os rivais!', menu: menu, tempo: 300, int: [8, 12], max: 7, pat: 0.8, layout: 'divisao', plates: 7, seasP: 0.25, shop: false, versus: 'teams', minPlayers: 2, cfg: { pvp: true }, extra: autoExtra(menu), w: 19, h: 11 });
  };
  CC.dailyKey = CC.dailyKey;
  const baseCustom = CC.makeCustom;
  CC.makeCustom = function (cfg) {
    const lv = baseCustom(cfg);
    lv.windows = cfg.windows || 1; lv.winNames = cfg.windows > 1 ? (cfg.winStyle === 'salao' ? CC.WIN_SALON : CC.WIN_FAST) : null;
    if (cfg.stock) { lv.stock = { initial: cfg.stockInit || 8 }; lv.cash = 400; }
    lv.shop = cfg.shop !== false;
    lv.lives = lv.endless ? (cfg.lives || 3) : (cfg.lives || 0);
    if (cfg.versus && cfg.versus !== 'coop') { lv.versus = cfg.versus; lv.minPlayers = 2; lv.goal = cfg.goal || 0; }
    lv.cfg = { utensils: cfg.utensils !== false, utUses: cfg.utUses || 1, pvp: !!cfg.pvp, bugs: cfg.bugs || 0, speed: cfg.speed || 1, burn: cfg.burn != null ? cfg.burn : 1, vip: cfg.vip != null ? cfg.vip : 0.08, rush: !!cfg.rush, dark: !!cfg.dark, priceMul: cfg.priceMul || 1, truckMul: cfg.truckMul || 1, chef: cfg.chef || 1, noCollide: !!cfg.noCollide, tips: cfg.tips !== false };
    const SZ = { small: [13, 8], medium: [15, 9], large: [19, 11], huge: [23, 13] }, z = SZ[cfg.size || 'medium'];
    lv.w = z[0]; lv.h = z[1];
    if (cfg.cash != null) lv.cash = cfg.cash;
    if (cfg.maxOrders) lv.max = cfg.maxOrders;
    if (cfg.interval && cfg.interval !== 1) lv.int = [lv.int[0] * cfg.interval, lv.int[1] * cfg.interval];
    if (cfg.patience && cfg.patience !== 1) lv.pat = lv.pat * cfg.patience;
    if (cfg.initial) lv.initial = cfg.initial;
    return lv;
  };
})(window.CC);
