/* Cozinha Caos — dados: ingredientes, temperos, receitas por equipamento, pratos */
(function () {
  'use strict';
  const CC = window.CC = {};
  const ITEMS = CC.ITEMS = {};
  const ING = CC.ING = {};
  const SEAS = CC.SEAS = {};

  /* ---------- ingredientes: [id, nome, emoji, adjetivo do corte, segundos para cortar] ---------- */
  CC.CUTS = {
    board: { n: 'Tábua', e: '✂️', suf: '_c', adj: 'chop', sec: 'sec', badge: '✂️' },
    grater: { n: 'Ralador', e: '🧀', suf: '_r', adj: 'grate', sec: 'gsec', badge: '🧀' },
    mortar: { n: 'Pilão', e: '🔨', suf: '_m', adj: 'mash', sec: 'msec', badge: '🔨' },
    juicer: { n: 'Espremedor', e: '🍊', suf: '_j', adj: 'juice', sec: 'jsec', badge: '🧃' },
    peeler: { n: 'Descascador', e: '🥔', suf: '_d', adj: 'peel', sec: 'psec', badge: '🪒' }
  };
  CC.setCut = function (id, kind, adj, sec) {
    const C = CC.CUTS[kind]; ING[id][C.adj] = adj; ING[id][C.sec] = sec;
    ITEMS[id + C.suf] = { id: id + C.suf, n: ING[id].n + ' ' + adj, e: ING[id].e + '+' + C.badge, base: id, sec: sec, st: kind };
  };
  CC.addIng = function (a) {
    const id = a[0];
    ING[id] = { id: id, n: a[1], e: a[2], chop: a[3], sec: a[4] || 0, cat: a[5] || '' };
    ITEMS[id] = { id: id, n: a[1], e: a[2], raw: true };
    if (a[3]) ITEMS[id + '_c'] = { id: id + '_c', n: a[1] + ' ' + a[3], e: a[2] + '+✂️', base: id, sec: a[4], st: 'board' };
  };
  /* ralador: segundo tipo de corte (id_r) */
  CC.setGrate = function (id, adj, sec) {
    ING[id].grate = adj; ING[id].gsec = sec;
    ITEMS[id + '_r'] = { id: id + '_r', n: ING[id].n + ' ' + adj, e: ING[id].e + '+🧀', base: id, sec: sec, st: 'grater' };
  };
  [
    ['tomate', 'Tomate', '🍅', 'picado', 2.5], ['alface', 'Alface', '🥬', 'picada', 2.5],
    ['cebola', 'Cebola', '🧅', 'picada', 3], ['cenoura', 'Cenoura', '🥕', 'picada', 3],
    ['batata', 'Batata', '🥔', 'cortada', 3.5], ['queijo', 'Queijo', '🧀', 'fatiado', 2],
    ['pao', 'Pão', '🍞', 'fatiado', 2], ['carne', 'Carne', '🥩', 'moída', 4],
    ['frango', 'Frango', '🍗', 'em cubos', 3.5], ['peixe', 'Peixe', '🐟', 'em filé', 3.5],
    ['camarao', 'Camarão', '🦐', 'limpo', 3], ['arroz', 'Arroz', '🍚', null],
    ['massa', 'Macarrão', '🍝', null], ['ovo', 'Ovo', '🥚', null],
    ['bacon', 'Bacon', '🥓', 'picado', 2.5], ['cogumelo', 'Cogumelo', '🍄', 'fatiado', 2.5],
    ['pimentao', 'Pimentão', '🫑', 'picado', 2.5], ['alho', 'Alho', '🧄', 'picado', 2],
    ['milho', 'Milho', '🌽', 'debulhado', 3], ['abacate', 'Abacate', '🥑', 'amassado', 3],
    ['banana', 'Banana', '🍌', 'fatiada', 2], ['maca', 'Maçã', '🍎', 'fatiada', 2.5],
    ['morango', 'Morango', '🍓', 'picado', 2], ['laranja', 'Laranja', '🍊', 'cortada', 2],
    ['limao', 'Limão', '🍋', 'cortado', 2], ['abacaxi', 'Abacaxi', '🍍', 'fatiado', 3],
    ['coco', 'Coco', '🥥', 'ralado', 3], ['chocolate', 'Chocolate', '🍫', 'picado', 2],
    ['farinha', 'Farinha', '🌾', null], ['leite', 'Leite', '🥛', null],
    ['manteiga', 'Manteiga', '🧈', null], ['acucar', 'Açúcar', '🍬', null],
    ['linguica', 'Linguiça', '🌭', 'fatiada', 2.5], ['tortilla', 'Tortilla', '🫓', null],
    ['pepino', 'Pepino', '🥒', 'fatiado', 2], ['espinafre', 'Espinafre', '🌿', 'picado', 2],
    ['presunto', 'Presunto', '🍖', 'fatiado', 2], ['feijao', 'Feijão', '🫘', null],
    ['mandioca', 'Mandioca', '🍠', 'cortada', 3.5], ['sorvete', 'Sorvete', '🍨', null]
  ].forEach(function (a) { CC.addIng(a); });

  /* ---------- temperos: [id, nome, emoji, cor] ---------- */
  [
    ['sal', 'Sal', '🧂', '#e8e8f0'], ['pimenta', 'Pimenta', '🌶️', '#c0392b'],
    ['ketchup', 'Ketchup', '🔴', '#d63031'], ['mostarda', 'Mostarda', '🟡', '#e1b12c'],
    ['maionese', 'Maionese', '⚪', '#f5f1e3'], ['azeite', 'Azeite', '🫒', '#8a9a2b'],
    ['shoyu', 'Shoyu', '🍶', '#3b2a20'], ['mel', 'Mel', '🍯', '#e1912c'],
    ['parmesao', 'Queijo ralado', '🔸', '#f0c14b'], ['calda', 'Calda de chocolate', '🟤', '#6b3f2a'],
    ['chantilly', 'Chantilly', '🍦', '#fff4f4'], ['molho_picante', 'Molho picante', '🔥', '#e8590c']
  ].forEach(function (a) {
    SEAS[a[0]] = { id: a[0], n: a[1], e: a[2], color: a[3] };
    ITEMS[a[0]] = { id: a[0], n: a[1], e: a[2], season: true, color: a[3] };
  });

  /* ---------- equipamentos ---------- */
  CC.APPS = {
    pot: { n: 'Panela', e: '🍲', cap: 4, verb: 'Ferver' },
    pan: { n: 'Frigideira', e: '🍳', cap: 3, verb: 'Fritar na frigideira' },
    grill: { n: 'Chapa', e: '🔥', cap: 3, verb: 'Grelhar' },
    fryer: { n: 'Fritadeira', e: '🍟', cap: 3, verb: 'Fritar' },
    oven: { n: 'Forno', e: '♨️', cap: 4, verb: 'Assar' },
    blender: { n: 'Liquidificador', e: '🥤', cap: 3, verb: 'Bater' },
    mixer: { n: 'Batedeira', e: '🥣', cap: 4, verb: 'Misturar' }
  };

  /* ---------- receitas dos equipamentos ---------- */
  const RECIPES = CC.RECIPES = [];
  CC.R = R;
  function R(app, ins, out, n, e, t, liq) {
    RECIPES.push({ app: app, in: ins.slice().sort(), out: out, t: t, liq: !!liq });
    ITEMS[out] = { id: out, n: n, e: e, made: true, liq: !!liq };
  }
  // Panela
  R('pot', ['arroz'], 'arroz_c', 'Arroz cozido', '🍚+♨️', 8);
  R('pot', ['massa'], 'massa_c', 'Macarrão cozido', '🍝+♨️', 8);
  R('pot', ['feijao'], 'feijao_c', 'Feijão cozido', '🫘+♨️', 9);
  R('pot', ['batata_c'], 'batata_cz', 'Batata cozida', '🥔+♨️', 7);
  R('pot', ['ovo'], 'ovo_cz', 'Ovo cozido', '🥚+♨️', 7);
  R('pot', ['tomate_c', 'tomate_c', 'cebola_c'], 'sopa_tomate', 'Sopa de tomate', '🥣+🍅', 10, 1);
  R('pot', ['cenoura_c', 'batata_c', 'cebola_c'], 'sopa_legumes', 'Sopa de legumes', '🥣+🥕', 11, 1);
  R('pot', ['milho_c', 'milho_c', 'leite'], 'creme_milho', 'Creme de milho', '🥣+🌽', 10, 1);
  R('pot', ['cogumelo_c', 'cebola_c', 'leite'], 'creme_cogumelo', 'Creme de cogumelos', '🥣+🍄', 11, 1);
  R('pot', ['frango_c', 'cenoura_c', 'batata_c'], 'sopa_frango', 'Sopa de frango', '🥣+🍗', 12, 1);
  R('pot', ['cebola_c', 'cebola_c', 'queijo_c'], 'sopa_cebola', 'Sopa de cebola', '🥣+🧅', 11, 1);
  R('pot', ['batata_c', 'bacon_c', 'leite'], 'creme_batata', 'Creme de batata c/ bacon', '🥣+🥓', 12, 1);
  R('pot', ['espinafre_c', 'leite', 'cebola_c'], 'creme_espinafre', 'Creme de espinafre', '🥣+🌿', 11, 1);
  R('pot', ['peixe_c', 'tomate_c', 'coco_c'], 'moqueca', 'Moqueca de peixe', '🍲+🐟', 14, 1);
  R('pot', ['camarao_c', 'coco_c', 'pimentao_c'], 'moqueca_camarao', 'Moqueca de camarão', '🍲+🦐', 14, 1);
  R('pot', ['feijao', 'linguica_c', 'bacon_c'], 'feijoada', 'Feijoada', '🍲+🫘', 16, 1);
  R('pot', ['leite', 'chocolate_c'], 'choco_quente', 'Chocolate quente', '☕+🍫', 8, 1);
  R('pot', ['leite', 'chocolate_c', 'manteiga'], 'brigadeiro', 'Brigadeiro', '🍫+🟤', 12);
  R('pot', ['tomate_c', 'tomate_c', 'alho_c'], 'molho_tomate', 'Molho de tomate', '🥫+🍅', 9);
  R('pot', ['leite', 'manteiga', 'farinha'], 'molho_branco', 'Molho branco', '🥫+🥛', 9);
  R('pot', ['tomate_c', 'carne_c', 'cebola_c'], 'molho_bolonhesa', 'Molho à bolonhesa', '🥫+🥩', 12);
  R('pot', ['maca_c', 'acucar'], 'compota_maca', 'Compota de maçã', '🍎+♨️', 9);
  // Frigideira
  R('pan', ['ovo'], 'ovo_f', 'Ovo frito', '🍳', 6);
  R('pan', ['ovo', 'queijo_c'], 'omelete_queijo', 'Omelete de queijo', '🍳+🧀', 8);
  R('pan', ['ovo', 'presunto_c'], 'omelete_presunto', 'Omelete de presunto', '🍳+🍖', 8);
  R('pan', ['ovo', 'cogumelo_c'], 'omelete_cogumelo', 'Omelete de cogumelo', '🍳+🍄', 8);
  R('pan', ['bacon'], 'bacon_f', 'Bacon frito', '🥓+🔥', 6);
  R('pan', ['cebola_c'], 'cebola_car', 'Cebola caramelizada', '🧅+🔥', 7);
  R('pan', ['cenoura_c', 'pimentao_c', 'cogumelo_c'], 'legumes_salt', 'Legumes salteados', '🥗+🔥', 9);
  R('pan', ['camarao_c'], 'camarao_s', 'Camarão salteado', '🦐+🔥', 6);
  R('pan', ['peixe_c'], 'peixe_g', 'Peixe grelhado', '🐟+🔥', 8);
  R('pan', ['massa_panq'], 'panqueca', 'Panqueca', '🥞', 6);
  R('pan', ['tortilla', 'queijo_c'], 'quesadilla', 'Quesadilla', '🫓+🧀', 7);
  R('pan', ['tortilla', 'queijo_c', 'frango_c'], 'quesadilla_frango', 'Quesadilla de frango', '🫓+🍗', 9);
  R('pan', ['banana_c', 'acucar'], 'banana_car', 'Banana caramelizada', '🍌+🔥', 7);
  R('pan', ['arroz_c', 'ovo', 'cenoura_c'], 'arroz_frito', 'Arroz frito', '🍚+🔥', 9);
  R('pan', ['massa_c', 'molho_tomate'], 'macarrao_molho', 'Macarrão ao molho', '🍝+🍅', 6);
  R('pan', ['massa_c', 'molho_bolonhesa'], 'macarrao_bolonhesa', 'Macarrão à bolonhesa', '🍝+🥩', 6);
  R('pan', ['massa_c', 'molho_branco'], 'macarrao_branco', 'Macarrão ao molho branco', '🍝+🥛', 6);
  R('pan', ['massa_c', 'ovo', 'bacon_c'], 'carbonara', 'Carbonara', '🍝+🥓', 8);
  R('pan', ['massa_c', 'camarao_c', 'alho_c'], 'macarrao_camarao', 'Macarrão com camarão', '🍝+🦐', 8);
  // Chapa
  R('grill', ['carne'], 'bife', 'Bife grelhado', '🥩+🔥', 9);
  R('grill', ['carne_c'], 'patty', 'Hambúrguer (carne)', '🥩+🟤', 8);
  R('grill', ['pao_c'], 'pao_t', 'Pão torrado', '🍞+🔥', 5);
  R('grill', ['frango_c'], 'frango_g', 'Frango grelhado', '🍗+🔥', 8);
  R('grill', ['linguica'], 'linguica_a', 'Linguiça assada', '🌭+🔥', 7);
  R('grill', ['milho'], 'milho_assado', 'Milho assado', '🌽+🔥', 8);
  R('grill', ['abacaxi_c'], 'abacaxi_g', 'Abacaxi grelhado', '🍍+🔥', 7);
  R('grill', ['queijo_c'], 'queijo_g', 'Queijo coalho', '🧀+🔥', 5);
  R('grill', ['carne_c', 'pimentao_c', 'cebola_c'], 'espetinho', 'Espetinho de carne', '🍢', 10);
  R('grill', ['frango_c', 'pimentao_c', 'cebola_c'], 'espetinho_frango', 'Espetinho de frango', '🍢+🍗', 10);
  // Fritadeira
  R('fryer', ['batata_c'], 'batata_frita', 'Batata frita', '🍟', 7);
  R('fryer', ['frango_c'], 'frango_frito', 'Frango frito', '🍗+🍟', 9);
  R('fryer', ['camarao_c'], 'camarao_frito', 'Camarão frito', '🍤', 7);
  R('fryer', ['peixe_c'], 'peixe_frito', 'Peixe frito', '🐟+🍟', 8);
  R('fryer', ['cebola_c'], 'onion_rings', 'Anéis de cebola', '🧅+🍟', 6);
  R('fryer', ['mandioca_c'], 'mandioca_frita', 'Mandioca frita', '🍠+🍟', 8);
  R('fryer', ['massa_pastel', 'queijo_c'], 'pastel_queijo', 'Pastel de queijo', '🥟+🧀', 8);
  R('fryer', ['massa_pastel', 'carne_c'], 'pastel_carne', 'Pastel de carne', '🥟+🥩', 8);
  R('fryer', ['massa_pastel', 'frango_c'], 'pastel_frango', 'Pastel de frango', '🥟+🍗', 8);
  R('fryer', ['massa_pastel', 'presunto_c', 'queijo_c'], 'pastel_misto', 'Pastel misto', '🥟+🍖', 9);
  R('fryer', ['massa_churros'], 'churros', 'Churros', '🥨', 8);
  // Forno
  R('oven', ['massa_pizza', 'molho_tomate', 'queijo_c'], 'pizza_marg', 'Pizza Margherita', '🍕', 14);
  R('oven', ['massa_pizza', 'molho_tomate', 'queijo_c', 'linguica_c'], 'pizza_calabresa', 'Pizza de Calabresa', '🍕+🌭', 15);
  R('oven', ['massa_pizza', 'molho_tomate', 'queijo_c', 'cogumelo_c'], 'pizza_cogumelo', 'Pizza de Cogumelo', '🍕+🍄', 15);
  R('oven', ['massa_pizza', 'molho_tomate', 'queijo_c', 'presunto_c'], 'pizza_presunto', 'Pizza de Presunto', '🍕+🍖', 15);
  R('oven', ['massa_pizza', 'molho_tomate', 'queijo_c', 'abacaxi_c'], 'pizza_abacaxi', 'Pizza Havaiana', '🍕+🍍', 15);
  R('oven', ['massa_pao'], 'pao_assado', 'Pão caseiro', '🥖', 12);
  R('oven', ['massa_bolo'], 'bolo', 'Bolo simples', '🍰', 14);
  R('oven', ['massa_bolo', 'chocolate_c'], 'bolo_choco', 'Bolo de chocolate', '🎂', 15);
  R('oven', ['massa_bolo', 'cenoura_c'], 'bolo_cenoura', 'Bolo de cenoura', '🍰+🥕', 15);
  R('oven', ['massa_biscoito'], 'biscoitos', 'Biscoitos', '🍪', 9);
  R('oven', ['massa_cookie'], 'cookies', 'Cookies de chocolate', '🍪+🍫', 10);
  R('oven', ['massa_paoqueijo'], 'pao_queijo', 'Pão de queijo', '🥯', 9);
  R('oven', ['massa_torta', 'maca_c'], 'torta_maca', 'Torta de maçã', '🥧', 14);
  R('oven', ['massa_torta', 'morango_c'], 'torta_morango', 'Torta de morango', '🥧+🍓', 14);
  R('oven', ['massa_torta', 'banana_c'], 'torta_banana', 'Torta de banana', '🥧+🍌', 14);
  R('oven', ['massa_c', 'molho_bolonhesa', 'molho_branco', 'queijo_c'], 'lasanha', 'Lasanha', '🥘', 16);
  R('oven', ['massa_c', 'molho_tomate', 'queijo_c'], 'macarrao_forno', 'Macarrão gratinado', '🍝+🧀', 11);
  R('oven', ['batata'], 'batata_assada', 'Batata assada', '🥔+🔥', 10);
  R('oven', ['batata', 'bacon_c', 'queijo_c'], 'batata_recheada', 'Batata recheada', '🥔+🧀', 13);
  R('oven', ['frango', 'alho_c'], 'frango_assado', 'Frango assado', '🍗+♨️', 15);
  R('oven', ['peixe', 'limao_c'], 'peixe_assado', 'Peixe ao limão', '🐟+🍋', 12);
  R('oven', ['pao_c', 'queijo_c', 'presunto_c'], 'misto_q', 'Misto quente', '🥪+🔥', 8);
  // Liquidificador
  R('blender', ['laranja_c', 'laranja_c'], 'suco_laranja', 'Suco de laranja', '🍊+🥤', 6, 1);
  R('blender', ['limao_c', 'acucar'], 'limonada', 'Limonada', '🍋+🥤', 6, 1);
  R('blender', ['abacaxi_c', 'abacaxi_c'], 'suco_abacaxi', 'Suco de abacaxi', '🍍+🥤', 6, 1);
  R('blender', ['banana_c', 'leite'], 'vitamina_banana', 'Vitamina de banana', '🍌+🥤', 7, 1);
  R('blender', ['morango_c', 'leite'], 'vitamina_morango', 'Vitamina de morango', '🍓+🥤', 7, 1);
  R('blender', ['abacate_c', 'leite', 'acucar'], 'vitamina_abacate', 'Vitamina de abacate', '🥑+🥤', 8, 1);
  R('blender', ['coco_c', 'coco_c'], 'agua_coco', 'Água de coco', '🥥+🥤', 6, 1);
  R('blender', ['morango_c', 'morango_c', 'banana_c'], 'smoothie', 'Smoothie de frutas', '🍓+🍌', 8, 1);
  R('blender', ['chocolate_c', 'leite', 'sorvete'], 'milkshake', 'Milkshake de chocolate', '🥤+🍫', 8, 1);
  R('blender', ['morango_c', 'leite', 'sorvete'], 'milkshake_morango', 'Milkshake de morango', '🥤+🍓', 8, 1);
  R('blender', ['espinafre_c', 'banana_c', 'leite'], 'suco_verde', 'Suco verde', '🥤+🌿', 8, 1);
  R('blender', ['tomate_c', 'pepino_c', 'pimentao_c'], 'gaspacho', 'Gaspacho', '🥣+🥒', 9, 1);
  R('blender', ['abacate_c', 'tomate_c', 'cebola_c'], 'guacamole', 'Guacamole', '🥑+🥣', 7);
  // Batedeira
  R('mixer', ['farinha', 'leite'], 'massa_pizza', 'Massa de pizza', '🥣+🍕', 7);
  R('mixer', ['farinha', 'leite', 'manteiga'], 'massa_pao', 'Massa de pão', '🥣+🍞', 8);
  R('mixer', ['farinha', 'ovo', 'acucar', 'manteiga'], 'massa_bolo', 'Massa de bolo', '🥣+🎂', 9);
  R('mixer', ['farinha', 'ovo', 'leite'], 'massa_panq', 'Massa de panqueca', '🥣+🥞', 6);
  R('mixer', ['farinha', 'manteiga'], 'massa_pastel', 'Massa de pastel', '🥣+🥟', 6);
  R('mixer', ['farinha', 'manteiga', 'acucar'], 'massa_biscoito', 'Massa de biscoito', '🥣+🍪', 7);
  R('mixer', ['farinha', 'manteiga', 'ovo'], 'massa_torta', 'Massa de torta', '🥣+🥧', 7);
  R('mixer', ['farinha', 'ovo', 'queijo_c'], 'massa_paoqueijo', 'Massa de pão de queijo', '🥣+🧀', 7);
  R('mixer', ['farinha', 'manteiga', 'acucar', 'chocolate_c'], 'massa_cookie', 'Massa de cookie', '🥣+🍫', 8);
  R('mixer', ['farinha', 'ovo', 'acucar'], 'massa_churros', 'Massa de churros', '🥣+🥨', 7);

  ITEMS.queimado = { id: 'queimado', n: 'Queimado!', e: '💨', burnt: true };

  const PROD = CC.PROD = {};
  RECIPES.forEach(function (r) { (PROD[r.out] = PROD[r.out] || []).push(r); });

  /* ---------- pratos ---------- */
  const DISHES = CC.DISHES = {};
  CC.CATS = {
    lanche: ['Lanches', '🍔'], salada: ['Saladas', '🥗'], cafe: ['Café da manhã', '🍳'], pizza: ['Pizzas', '🍕'],
    sopa: ['Sopas', '🥣'], br: ['Brasileira', '🍛'], mar: ['Frutos do mar', '🦐'], mex: ['Mexicana', '🌮'],
    ita: ['Italiana', '🍝'], doce: ['Sobremesas', '🍰'], bebida: ['Bebidas', '🥤']
  };
  CC.D = D;
  function D(id, cat, n, e, parts, seas) {
    DISHES[id] = { id: id, cat: cat, n: n, e: e, parts: parts.slice().sort(), seas: seas || [] };
  }
  const MOLHOS = ['ketchup', 'mostarda', 'maionese'];
  // Lanches
  D('hamburguer', 'lanche', 'Hambúrguer', '🍔', ['pao_t', 'patty', 'alface_c', 'tomate_c'], ['ketchup', 'mostarda', 'maionese', 'sal']);
  D('cheeseburger', 'lanche', 'Cheeseburger', '🍔+🧀', ['pao_t', 'patty', 'queijo_c'], MOLHOS);
  D('xbacon', 'lanche', 'X-Bacon', '🍔+🥓', ['pao_t', 'patty', 'queijo_c', 'bacon_f'], ['ketchup', 'mostarda', 'maionese', 'molho_picante']);
  D('xsalada', 'lanche', 'X-Salada', '🥪', ['pao_t', 'patty', 'queijo_c', 'alface_c', 'tomate_c'], MOLHOS);
  D('gourmet', 'lanche', 'Burger Gourmet', '🍔+🧅', ['pao_t', 'patty', 'queijo_c', 'cebola_car'], ['maionese', 'mostarda', 'molho_picante']);
  D('combo', 'lanche', 'Combo Burger + Fritas', '🍔+🍟', ['pao_t', 'patty', 'alface_c', 'tomate_c', 'batata_frita'], ['ketchup', 'maionese']);
  D('sand_frango', 'lanche', 'Sanduíche de Frango', '🥪+🍗', ['pao_t', 'frango_g', 'alface_c', 'tomate_c'], ['maionese', 'mostarda']);
  D('hotdog', 'lanche', 'Cachorro-quente', '🌭', ['pao_t', 'linguica_a'], MOLHOS);
  D('misto', 'lanche', 'Misto Quente', '🥪+🔥', ['misto_q'], ['maionese']);
  D('batata_frita', 'lanche', 'Batata Frita', '🍟', ['batata_frita'], ['sal', 'ketchup', 'maionese', 'molho_picante', 'pimenta']);
  D('batata_queijo', 'lanche', 'Batata com Queijo e Bacon', '🍟+🧀', ['batata_frita', 'queijo_c', 'bacon_c'], ['pimenta', 'maionese']);
  D('onion', 'lanche', 'Anéis de Cebola', '🧅+🍟', ['onion_rings'], ['maionese', 'ketchup', 'molho_picante']);
  D('nuggets', 'lanche', 'Frango Frito', '🍗+🍟', ['frango_frito'], ['ketchup', 'maionese', 'molho_picante', 'mel']);
  // Saladas
  D('salada', 'salada', 'Salada Verde', '🥗', ['alface_c', 'tomate_c', 'pepino_c'], ['sal', 'azeite']);
  D('caesar', 'salada', 'Salada Caesar', '🥗+🍗', ['alface_c', 'frango_g', 'pao_t'], ['parmesao', 'azeite']);
  D('grega', 'salada', 'Salada Grega', '🥗+🧀', ['tomate_c', 'pepino_c', 'queijo_c', 'cebola_c'], ['azeite', 'sal']);
  D('frutas', 'salada', 'Salada de Frutas', '🍓+🥗', ['maca_c', 'banana_c', 'morango_c', 'laranja_c'], ['mel', 'chantilly']);
  D('bruschetta', 'salada', 'Bruschetta', '🍞+🍅', ['pao_t', 'tomate_c', 'alho_c'], ['azeite', 'sal', 'pimenta']);
  D('salada_abacate', 'salada', 'Salada de Abacate', '🥑+🥗', ['alface_c', 'abacate_c', 'tomate_c'], ['sal', 'azeite', 'pimenta']);
  D('salada_ovo', 'salada', 'Salada com Ovo', '🥗+🥚', ['alface_c', 'ovo_cz', 'tomate_c'], ['sal', 'azeite']);
  D('salada_batata', 'salada', 'Salada de Batata', '🥔+🥗', ['batata_cz', 'ovo_cz', 'cebola_c'], ['maionese', 'sal', 'mostarda']);
  // Café da manhã
  D('ovo_pao', 'cafe', 'Ovo Frito com Torrada', '🍳+🍞', ['ovo_f', 'pao_t'], ['sal', 'pimenta']);
  D('omelete_q', 'cafe', 'Omelete de Queijo', '🍳+🧀', ['omelete_queijo'], ['sal', 'pimenta', 'ketchup']);
  D('omelete_p', 'cafe', 'Omelete de Presunto', '🍳+🍖', ['omelete_presunto'], ['sal', 'pimenta']);
  D('omelete_c', 'cafe', 'Omelete de Cogumelo', '🍳+🍄', ['omelete_cogumelo'], ['sal', 'pimenta']);
  D('cafe_completo', 'cafe', 'Café da Manhã Completo', '🍳+🥓', ['ovo_f', 'bacon_f', 'pao_t'], ['sal', 'pimenta']);
  D('panqueca', 'cafe', 'Panqueca com Mel', '🥞', ['panqueca'], ['mel', 'calda', 'chantilly']);
  D('panqueca_banana', 'cafe', 'Panqueca de Banana', '🥞+🍌', ['panqueca', 'banana_c'], ['mel', 'calda', 'chantilly']);
  D('torrada_abacate', 'cafe', 'Torrada de Abacate', '🥑+🍞', ['pao_t', 'abacate_c'], ['sal', 'pimenta', 'azeite']);
  D('torrada_ovo', 'cafe', 'Torrada com Abacate e Ovo', '🥑+🍳', ['pao_t', 'abacate_c', 'ovo_f'], ['sal', 'pimenta']);
  D('pao_queijo', 'cafe', 'Pão de Queijo', '🥯', ['pao_queijo'], []);
  D('pao_caseiro', 'cafe', 'Pão Caseiro', '🥖', ['pao_assado'], []);
  // Pizzas
  const PZ = ['azeite', 'pimenta', 'parmesao', 'molho_picante'];
  D('pizza_marg', 'pizza', 'Pizza Margherita', '🍕', ['pizza_marg'], PZ);
  D('pizza_calabresa', 'pizza', 'Pizza de Calabresa', '🍕+🌭', ['pizza_calabresa'], PZ);
  D('pizza_cogumelo', 'pizza', 'Pizza de Cogumelo', '🍕+🍄', ['pizza_cogumelo'], PZ);
  D('pizza_presunto', 'pizza', 'Pizza de Presunto', '🍕+🍖', ['pizza_presunto'], PZ);
  D('pizza_abacaxi', 'pizza', 'Pizza Havaiana', '🍕+🍍', ['pizza_abacaxi'], PZ);
  // Sopas
  const SP = ['sal', 'pimenta', 'azeite', 'parmesao'];
  D('sopa_tomate', 'sopa', 'Sopa de Tomate', '🥣+🍅', ['sopa_tomate'], SP);
  D('sopa_tomate_t', 'sopa', 'Sopa de Tomate com Torrada', '🥣+🍞', ['sopa_tomate', 'pao_t'], SP);
  D('sopa_legumes', 'sopa', 'Sopa de Legumes', '🥣+🥕', ['sopa_legumes'], SP);
  D('creme_milho', 'sopa', 'Creme de Milho', '🥣+🌽', ['creme_milho'], SP);
  D('creme_cogumelo', 'sopa', 'Creme de Cogumelos', '🥣+🍄', ['creme_cogumelo'], SP);
  D('sopa_frango', 'sopa', 'Sopa de Frango', '🥣+🍗', ['sopa_frango'], SP);
  D('sopa_cebola', 'sopa', 'Sopa de Cebola', '🥣+🧅', ['sopa_cebola'], SP);
  D('creme_batata', 'sopa', 'Creme de Batata com Bacon', '🥣+🥓', ['creme_batata'], SP);
  D('creme_espinafre', 'sopa', 'Creme de Espinafre', '🥣+🌿', ['creme_espinafre'], SP);
  D('gaspacho', 'sopa', 'Gaspacho', '🥣+🥒', ['gaspacho'], ['sal', 'azeite', 'pimenta']);
  // Brasileira / churrasco
  D('bife_fritas', 'br', 'Bife com Fritas', '🥩+🍟', ['bife', 'batata_frita'], ['sal', 'pimenta', 'ketchup']);
  D('pf', 'br', 'Prato Feito (PF)', '🍛', ['arroz_c', 'feijao_c', 'bife', 'batata_frita'], ['sal', 'pimenta', 'molho_picante']);
  D('pf_ovo', 'br', 'PF com Ovo', '🍛+🍳', ['arroz_c', 'feijao_c', 'bife', 'ovo_f'], ['sal', 'pimenta', 'molho_picante']);
  D('arroz_feijao_ovo', 'br', 'Arroz, Feijão e Ovo', '🍚+🫘', ['arroz_c', 'feijao_c', 'ovo_f'], ['sal', 'molho_picante']);
  D('frango_arroz', 'br', 'Frango com Arroz', '🍗+🍚', ['frango_g', 'arroz_c'], ['sal', 'pimenta']);
  D('espetinho', 'br', 'Espetinho de Carne', '🍢', ['espetinho'], ['sal', 'molho_picante']);
  D('espeto_frango', 'br', 'Espetinho de Frango', '🍢+🍗', ['espetinho_frango'], ['sal', 'molho_picante']);
  D('churrasco', 'br', 'Churrasco Misto', '🍖+🍢', ['espetinho', 'linguica_a', 'mandioca_frita'], ['sal', 'molho_picante']);
  D('linguica_mand', 'br', 'Linguiça com Mandioca', '🌭+🍠', ['linguica_a', 'mandioca_frita'], ['sal', 'molho_picante']);
  D('milho', 'br', 'Milho Assado', '🌽', ['milho_assado'], ['sal', 'maionese', 'parmesao']);
  D('feijoada', 'br', 'Feijoada Completa', '🍲+🫘', ['feijoada', 'arroz_c', 'laranja_c'], ['molho_picante', 'pimenta']);
  D('pastel_queijo', 'br', 'Pastel de Queijo', '🥟+🧀', ['pastel_queijo'], ['molho_picante', 'ketchup', 'maionese']);
  D('pastel_carne', 'br', 'Pastel de Carne', '🥟+🥩', ['pastel_carne'], ['molho_picante', 'ketchup', 'maionese']);
  D('pastel_frango', 'br', 'Pastel de Frango', '🥟+🍗', ['pastel_frango'], ['molho_picante', 'ketchup', 'maionese']);
  D('pastel_misto', 'br', 'Pastel Misto', '🥟+🍖', ['pastel_misto'], ['molho_picante', 'ketchup', 'maionese']);
  D('mandioca_frita', 'br', 'Mandioca Frita', '🍠+🍟', ['mandioca_frita'], ['sal', 'maionese']);
  D('frango_assado', 'br', 'Frango Assado', '🍗+♨️', ['frango_assado'], ['sal', 'pimenta']);
  D('frango_batata', 'br', 'Frango com Batata Assada', '🍗+🥔', ['frango_assado', 'batata_assada'], ['sal', 'pimenta']);
  D('batata_recheada', 'br', 'Batata Recheada', '🥔+🧀', ['batata_recheada'], ['sal', 'pimenta', 'maionese']);
  D('arroz_frito', 'br', 'Arroz Frito', '🍚+🔥', ['arroz_frito'], ['shoyu', 'pimenta', 'molho_picante']);
  D('queijo_coalho', 'br', 'Queijo Coalho', '🧀+🔥', ['queijo_g'], ['mel', 'molho_picante']);
  // Frutos do mar
  D('camarao_frito', 'mar', 'Camarão Frito com Limão', '🍤', ['camarao_frito', 'limao_c'], ['sal', 'maionese', 'molho_picante']);
  D('peixe_fritas', 'mar', 'Peixe com Fritas', '🐟+🍟', ['peixe_frito', 'batata_frita'], ['sal', 'maionese', 'ketchup']);
  D('moqueca', 'mar', 'Moqueca de Peixe com Arroz', '🍲+🐟', ['moqueca', 'arroz_c'], ['pimenta', 'molho_picante']);
  D('moqueca_camarao', 'mar', 'Moqueca de Camarão com Arroz', '🍲+🦐', ['moqueca_camarao', 'arroz_c'], ['pimenta', 'molho_picante']);
  D('peixe_assado', 'mar', 'Peixe ao Limão com Legumes', '🐟+🍋', ['peixe_assado', 'legumes_salt'], ['sal', 'azeite']);
  D('arroz_camarao', 'mar', 'Arroz com Camarão', '🍚+🦐', ['arroz_c', 'camarao_s'], ['sal', 'pimenta', 'azeite']);
  D('peixe_grelhado', 'mar', 'Peixe Grelhado com Legumes', '🐟+🥗', ['peixe_g', 'legumes_salt'], ['sal', 'azeite']);
  // Mexicana
  D('taco', 'mex', 'Taco de Carne', '🌮', ['tortilla', 'patty', 'alface_c', 'queijo_c'], ['molho_picante', 'pimenta']);
  D('taco_guac', 'mex', 'Taco com Guacamole', '🌮+🥑', ['tortilla', 'patty', 'alface_c', 'guacamole'], ['molho_picante', 'pimenta']);
  D('quesadilla', 'mex', 'Quesadilla', '🫓+🧀', ['quesadilla'], ['molho_picante']);
  D('quesadilla_frango', 'mex', 'Quesadilla de Frango', '🫓+🍗', ['quesadilla_frango'], ['molho_picante']);
  D('burrito', 'mex', 'Burrito', '🌯', ['tortilla', 'arroz_c', 'feijao_c', 'frango_g'], ['molho_picante', 'pimenta']);
  // Italiana
  const IT = ['parmesao', 'pimenta', 'azeite'];
  D('macarrao_molho', 'ita', 'Macarrão ao Molho', '🍝+🍅', ['macarrao_molho'], IT);
  D('macarrao_bolonhesa', 'ita', 'Macarrão à Bolonhesa', '🍝+🥩', ['macarrao_bolonhesa'], IT);
  D('macarrao_branco', 'ita', 'Macarrão ao Molho Branco', '🍝+🥛', ['macarrao_branco'], IT);
  D('carbonara', 'ita', 'Carbonara', '🍝+🥓', ['carbonara'], IT);
  D('macarrao_camarao', 'ita', 'Macarrão com Camarão', '🍝+🦐', ['macarrao_camarao'], IT);
  D('lasanha', 'ita', 'Lasanha', '🥘', ['lasanha'], IT);
  D('macarrao_forno', 'ita', 'Macarrão Gratinado', '🍝+🧀', ['macarrao_forno'], IT);
  // Sobremesas
  const DOC = ['calda', 'chantilly', 'mel'];
  D('bolo', 'doce', 'Bolo Simples', '🍰', ['bolo'], DOC);
  D('bolo_choco', 'doce', 'Bolo de Chocolate', '🎂', ['bolo_choco'], DOC);
  D('bolo_cenoura', 'doce', 'Bolo de Cenoura', '🍰+🥕', ['bolo_cenoura'], DOC);
  D('biscoitos', 'doce', 'Biscoitos', '🍪', ['biscoitos'], ['mel']);
  D('cookies', 'doce', 'Cookies de Chocolate', '🍪+🍫', ['cookies'], ['chantilly']);
  D('brigadeiro', 'doce', 'Brigadeiro', '🍫+🟤', ['brigadeiro'], []);
  D('torta_maca', 'doce', 'Torta de Maçã com Sorvete', '🥧', ['torta_maca', 'sorvete'], DOC);
  D('torta_morango', 'doce', 'Torta de Morango', '🥧+🍓', ['torta_morango'], DOC);
  D('torta_banana', 'doce', 'Torta de Banana', '🥧+🍌', ['torta_banana'], DOC);
  D('banana_sorvete', 'doce', 'Banana Caramelizada com Sorvete', '🍌+🍨', ['banana_car', 'sorvete'], ['chantilly', 'calda']);
  D('taca_sorvete', 'doce', 'Taça de Sorvete com Frutas', '🍨', ['sorvete', 'morango_c', 'banana_c'], DOC);
  D('churros', 'doce', 'Churros', '🥨', ['churros'], ['calda', 'mel']);
  D('compota', 'doce', 'Compota de Maçã com Sorvete', '🍎+🍨', ['compota_maca', 'sorvete'], ['chantilly', 'calda']);
  D('abacaxi_mel', 'doce', 'Abacaxi Grelhado com Mel', '🍍+🔥', ['abacaxi_g'], ['mel', 'chantilly']);
  // Bebidas
  D('suco_laranja', 'bebida', 'Suco de Laranja', '🍊+🥤', ['suco_laranja'], []);
  D('limonada', 'bebida', 'Limonada', '🍋+🥤', ['limonada'], []);
  D('suco_abacaxi', 'bebida', 'Suco de Abacaxi', '🍍+🥤', ['suco_abacaxi'], []);
  D('vitamina_banana', 'bebida', 'Vitamina de Banana', '🍌+🥤', ['vitamina_banana'], ['mel']);
  D('vitamina_morango', 'bebida', 'Vitamina de Morango', '🍓+🥤', ['vitamina_morango'], ['mel']);
  D('vitamina_abacate', 'bebida', 'Vitamina de Abacate', '🥑+🥤', ['vitamina_abacate'], ['mel']);
  D('agua_coco', 'bebida', 'Água de Coco', '🥥+🥤', ['agua_coco'], []);
  D('smoothie', 'bebida', 'Smoothie de Frutas', '🍓+🍌', ['smoothie'], ['mel']);
  D('milkshake', 'bebida', 'Milkshake de Chocolate', '🥤+🍫', ['milkshake'], ['chantilly', 'calda']);
  D('milkshake_morango', 'bebida', 'Milkshake de Morango', '🥤+🍓', ['milkshake_morango'], ['chantilly']);
  D('suco_verde', 'bebida', 'Suco Verde', '🥤+🌿', ['suco_verde'], ['mel']);
  D('choco_quente', 'bebida', 'Chocolate Quente', '☕+🍫', ['choco_quente'], ['chantilly']);

  /* ---------- utilidades ---------- */
  let wcache = {};
  function work(id) {
    if (wcache[id] != null) return wcache[id];
    let w;
    const it = ITEMS[id];
    if (PROD[id]) {
      const r = PROD[id][0];
      w = r.t + r.in.reduce(function (s, i) { return s + work(i); }, 0);
    } else if (it && it.base) w = it.sec + work(it.base);
    else w = 1.5;
    return (wcache[id] = w);
  }
  CC.work = work;
  CC.finalize = function () {
  wcache = {};
  Object.keys(CC.PROD).forEach(function (k) { delete CC.PROD[k]; });
  RECIPES.forEach(function (r) { (CC.PROD[r.out] = CC.PROD[r.out] || []).push(r); });
  Object.keys(DISHES).forEach(function (k) {
    const d = DISHES[k];
    d.work = 3 + d.parts.reduce(function (s, p) { return s + work(p); }, 0);
    d.price = Math.round((15 + d.work * 1.3) / 5) * 5;
    d.time = Math.max(50, Math.min(125, Math.round(40 + d.work * 1.3)));
  });
  };
  CC.finalize();

  // nomes/emojis de itens (prato em si)
  CC.itemName = function (id) { return (ITEMS[id] || { n: id }).n; };

  /* o que é preciso para fazer um item: estações e ingredientes crus */
  CC.needs = function (id, acc) {
    acc = acc || { raw: {}, apps: {}, board: false };
    const it = ITEMS[id];
    if (PROD[id]) {
      const r = PROD[id][0];
      acc.apps[r.app] = 1;
      r.in.forEach(function (i) { CC.needs(i, acc); });
    } else if (it && it.base) { acc.cuts = acc.cuts || {}; acc.cuts[it.st || 'board'] = true; if (it.st === 'grater') acc.grater = true; else if (!it.st || it.st === 'board') acc.board = true; acc.raw[it.base] = 1; }
    else if (it && it.raw) acc.raw[id] = 1;
    return acc;
  };

  /* passo a passo legível (para o livro de receitas) */
  CC.steps = function (id, out, depth, seen) {
    out = out || []; depth = depth || 0; seen = seen || {};
    const it = ITEMS[id];
    if (!it) return out;
    if (PROD[id]) {
      const r = PROD[id][0], A = CC.APPS[r.app];
      r.in.forEach(function (i) { if (!seen[i]) CC.steps(i, out, depth + 1, seen); });
      out.push({ d: depth, e: it.e, n: it.n, txt: A.e + ' ' + A.n + ' (' + r.t + 's): ' + r.in.map(CC.itemName).join(' + '), liq: r.liq });
    } else if (it.base) {
      out.push({ d: depth, e: it.e, n: it.n, txt: (CC.CUTS[it.st || 'board'].e + ' ' + CC.CUTS[it.st || 'board'].n + ' (') + it.sec + 's): ' + ITEMS[it.base].e + ' ' + ITEMS[it.base].n });
    } else out.push({ d: depth, e: it.e, n: it.n, txt: '📦 Pegue na caixa' });
    return out;
  };

  /* verificação de consistência dos dados */
  CC.validate = function () {
    const bad = [];
    Object.keys(RECIPES).forEach(function (k) {
      const r = RECIPES[k];
      r.in.forEach(function (i) { if (!ITEMS[i]) bad.push('receita ' + r.out + ' usa item inexistente ' + i); else if (!ITEMS[i].raw && !ITEMS[i].base && !PROD[i]) bad.push('item sem origem ' + i); });
    });
    Object.keys(DISHES).forEach(function (k) {
      DISHES[k].parts.forEach(function (p) { if (!ITEMS[p]) bad.push('prato ' + k + ' usa ' + p); else if (!ITEMS[p].raw && !ITEMS[p].base && !PROD[p]) bad.push('prato ' + k + ' item sem origem ' + p); });
      DISHES[k].seas.forEach(function (s) { if (!SEAS[s]) bad.push('prato ' + k + ' tempero ' + s); });
    });
    return bad;
  };
})();
