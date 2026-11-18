/* Cozinha Caos — expansão 2: +48 ingredientes, 5 tipos de corte, +8 equipamentos, +6 temperos, receitas */
(function (CC) {
  'use strict';
  /* ---------- ingredientes ---------- */
  [
    ['cana', 'Cana-de-açúcar', '🎋', null], ['mortadela', 'Mortadela', '🥩+🟣', 'em fatias', 2], ['salame', 'Salame', '🥓+🔴', 'em fatias', 2],
    ['salsicha', 'Salsicha', '🌭+🟠', 'em rodelas', 2], ['bacalhau', 'Bacalhau', '🐟+⚪', 'em lascas', 3], ['sardinha', 'Sardinha', '🐟+🔵', null],
    ['mexilhao', 'Mexilhão', '🦪+⚫', null], ['vieira', 'Vieira', '🐚', null], ['enguia', 'Enguia', '🐍', 'em filé', 3], ['caviar', 'Caviar', '⚫', null],
    ['abobrinha', 'Abobrinha', '🥒+🟢', 'fatiada', 2.5], ['couve', 'Couve', '🥬+🟢', 'em tiras', 2], ['couveflor', 'Couve-flor', '🥦+⚪', 'em buquês', 2.5],
    ['aspargo', 'Aspargo', '🌿+🟢', 'picado', 2], ['shiitake', 'Shiitake', '🍄+🟤', 'fatiado', 2], ['palmito', 'Palmito', '🌴', 'em rodelas', 2],
    ['quiabo', 'Quiabo', '🥒+🟩', 'fatiado', 2], ['rucula', 'Rúcula', '🥬+🌿', 'picada', 1.5], ['alho_poro', 'Alho-poró', '🧅+🟢', 'fatiado', 2.5],
    ['chuchu', 'Chuchu', '🥒+⚪', 'em cubos', 2.5], ['inhame', 'Inhame', '🍠+🟤', 'em cubos', 3], ['hortela', 'Hortelã', '🌿+🟢', 'picada', 1.5],
    ['quinoa', 'Quinoa', '🌾+🟤', null], ['cuscuz', 'Cuscuz (flocos)', '🌽+🟡', null], ['tapioca', 'Goma de tapioca', '⚪+🌾', null], ['polvilho', 'Polvilho', '🌾+⚪', null],
    ['arroz_integral', 'Arroz integral', '🍚+🟤', null], ['macarrao_arroz', 'Macarrão de arroz', '🍜+⚪', null], ['leite_condensado', 'Leite condensado', '🥛+🟡', null],
    ['queijo_minas', 'Queijo minas', '🧀+⬜', 'fatiado', 2], ['provolone', 'Provolone', '🧀+🟡', 'fatiado', 2], ['cream_cheese', 'Cream cheese', '🧀+🟦', null],
    ['framboesa', 'Framboesa', '🍓+🟣', null], ['amora', 'Amora', '🫐+🟣', null], ['goiaba', 'Goiaba', '🍐+🔴', 'fatiada', 2.5], ['acai', 'Polpa de açaí', '🟣+🥣', null],
    ['mamao', 'Mamão', '🍈+🟠', 'fatiado', 2.5], ['figo', 'Figo', '🟣+🍎', 'fatiado', 2], ['ameixa', 'Ameixa', '🟣+🍑', 'fatiada', 2], ['pitaya', 'Pitaya', '🐉', 'fatiada', 2.5],
    ['refrigerante', 'Refrigerante', '🥤+🔴', null], ['agua_gas', 'Água com gás', '💧+🫧', null], ['leite_coco', 'Leite de coco', '🥥+🥛', null], ['matcha', 'Matcha', '🍵+🟢', null],
    ['baunilha', 'Baunilha', '🌼', null], ['milho_pipoca', 'Milho de pipoca', '🌽+🍿', null]
  ].forEach(function (a) { CC.addIng(a); });

  /* ---------- novos cortes (ralar / pilar / espremer / descascar) ---------- */
  [['mandioca', 'amassada', 3], ['alho', 'amassado', 2], ['gengibre', 'amassado', 2], ['grao', 'em pasta', 3], ['amendoim', 'em pasta', 3], ['castanha', 'em pó', 3], ['coentro', 'macerado', 2],
    ['manjericao', 'macerado', 2], ['banana', 'amassada', 2], ['abacate', 'em pasta', 2.5], ['batata', 'amassada', 3], ['feijao', 'amassado', 3], ['milho', 'moído', 3], ['batata_doce', 'amassada', 3],
    ['abobora', 'amassada', 3], ['cacau', 'em pó', 2], ['ervilha', 'amassada', 2.5]].forEach(function (a) { CC.setCut(a[0], 'mortar', a[1], a[2]); });
  [['laranja', 'espremida', 2.5], ['limao', 'espremido', 2], ['maracuja', 'espremido', 2], ['abacaxi', 'espremido', 3], ['melancia', 'espremida', 3], ['uva', 'espremida', 2.5], ['cenoura', 'espremida', 3],
    ['tomate', 'espremido', 2.5], ['coco', 'espremido', 3], ['manga', 'espremida', 3], ['goiaba', 'espremida', 2.5], ['cana', 'espremida', 3]].forEach(function (a) { CC.setCut(a[0], 'juicer', a[1], a[2]); });
  [['batata', 'descascada', 2.5], ['cenoura', 'descascada', 2.5], ['mandioca', 'descascada', 3], ['maca', 'descascada', 2], ['pera', 'descascada', 2], ['pepino', 'descascado', 2], ['abobora', 'descascada', 3],
    ['batata_doce', 'descascada', 3], ['laranja', 'sem casca', 2], ['manga', 'sem casca', 2.5], ['kiwi', 'sem casca', 2], ['abacaxi', 'sem casca', 3], ['pessego', 'sem casca', 2], ['camarao', 'descascado', 3],
    ['beterraba', 'descascada', 2.5], ['alho', 'descascado', 1.5], ['cebola', 'descascada', 2], ['gengibre', 'descascado', 1.5], ['inhame', 'descascado', 3], ['chuchu', 'descascado', 2]].forEach(function (a) { CC.setCut(a[0], 'peeler', a[1], a[2]); });
  [['mussarela', 'queijo_minas', 'provolone', 'cream_cheese'].slice(1, 3)].forEach(function () { });
  CC.setGrate('queijo_minas', 'ralado', 2.5); CC.setGrate('provolone', 'ralado', 2.5); CC.setGrate('cacau', 'em raspas', 2); CC.setGrate('amendoim', 'moído', 2.5);

  /* ---------- temperos ---------- */
  [['canela', 'Canela', '🟫', '#a0522d'], ['curry', 'Curry', '🟨', '#d4a017'], ['paprica', 'Páprica', '🟧', '#d35400'], ['ervas', 'Ervas finas', '🌿', '#2e8b57'], ['wasabi', 'Wasabi', '🟩', '#7fb23a'], ['caramelo', 'Calda de caramelo', '🍮', '#c47a2c']].forEach(function (a) {
    CC.SEAS[a[0]] = { id: a[0], n: a[1], e: a[2], color: a[3] }; CC.ITEMS[a[0]] = { id: a[0], n: a[1], e: a[2], season: true, color: a[3] };
  });

  /* ---------- novos equipamentos ---------- */
  Object.assign(CC.APPS, {
    ricecooker: { n: 'Arrozeira', e: '🍚', cap: 3, verb: 'Cozinhar grãos', col: '#b0bec5' },
    waffler: { n: 'Chapa de crepe/waffle', e: '🧇', cap: 3, verb: 'Prensar', col: '#8d6e63' },
    popper: { n: 'Pipoqueira', e: '🍿', cap: 2, verb: 'Estourar', col: '#c0392b' },
    press: { n: 'Sanduicheira', e: '🥪', cap: 3, verb: 'Prensar sanduíche', col: '#607d8b' },
    fountain: { n: 'Fonte de chocolate', e: '🍫', cap: 3, verb: 'Banhar', col: '#5d4037' },
    fermenter: { n: 'Fermentação', e: '🫙', cap: 3, verb: 'Fermentar', col: '#7b8d3a' },
    bainmarie: { n: 'Banho-maria', e: '🫕', cap: 3, verb: 'Banho-maria', col: '#c9a35b' },
    dehydrator: { n: 'Desidratador', e: '☀️', cap: 3, verb: 'Desidratar', col: '#b9770e' }
  });

  /* ---------- preço de cada ingrediente no estoque ---------- */
  const PRICE = { 18: ['caviar'], 14: ['lagosta', 'ostra', 'caranguejo', 'polvo', 'pato', 'salmao', 'atum', 'cordeiro', 'costela', 'vieira', 'bacalhau', 'enguia', 'lula', 'mexilhao', 'peru'],
    8: ['carne', 'frango', 'peixe', 'queijo', 'presunto', 'bacon', 'linguica', 'gorgonzola', 'cheddar', 'mussarela', 'provolone', 'queijo_minas', 'cogumelo', 'shiitake', 'abacate', 'aspargo', 'salsicha', 'mortadela', 'salame', 'tofu', 'nori', 'creme', 'requeijao', 'cream_cheese', 'chocolate', 'cacau', 'castanha', 'camarao', 'sardinha', 'acai', 'framboesa', 'amora', 'mirtilo', 'cereja'],
    3: ['farinha', 'acucar', 'arroz', 'ovo', 'leite', 'agua', 'gelo', 'feijao', 'massa', 'tortilla', 'polvilho', 'fuba', 'aveia', 'cuscuz', 'quinoa', 'milho_pipoca', 'tapioca', 'macarrao_arroz', 'arroz_integral', 'farinha_rosca', 'manteiga', 'alho', 'cebola', 'cafe', 'cha', 'refrigerante', 'agua_gas', 'baunilha'] };
  CC.priceOf = function (id) { for (const k in PRICE) if (PRICE[k].indexOf(id) >= 0) return +k; return 5; };

  /* ---------- receitas (app|entradas|saída|nome|emoji|segundos|liq) ---------- */
  function RR(lines) { lines.forEach(function (l) { const p = l.split('|'); CC.R(p[0], p[1].split(','), p[2], p[3], p[4], +p[5], p[6] === '1'); }); }
  RR([
    // ---- Arrozeira
    'ricecooker|arroz_integral|arroz_int_c|Arroz integral cozido|🍚+🟤|9', 'ricecooker|quinoa|quinoa_c|Quinoa cozida|🌾+♨️|8', 'ricecooker|cuscuz|cuscuz_c|Cuscuz|🌽+♨️|7',
    'ricecooker|arroz,cenoura_c,ervilha|arroz_legumes|Arroz de legumes|🍚+🥕|9', 'ricecooker|arroz,leite_coco|arroz_coco|Arroz de coco|🍚+🥥|9', 'ricecooker|arroz,cebola_c,cogumelo_c|arroz_cogumelo|Arroz de cogumelos|🍚+🍄|10',
    'ricecooker|arroz,cenoura_c,frango_c|arroz_frango|Arroz com frango|🍚+🍗|10', 'ricecooker|alho_c,arroz,camarao_c|arroz_camarao_r|Arroz de camarão|🍚+🦐|10', 'ricecooker|macarrao_arroz|noodles_c|Macarrão de arroz cozido|🍜+⚪|6',
    'ricecooker|arroz,lentilha|arroz_lentilha|Arroz com lentilha|🍚+🟤|10', 'ricecooker|cebola_c,cuscuz,tomate_c|cuscuz_tomate|Cuscuz de tomate|🌽+🍅|8', 'ricecooker|cuscuz,milho_c,ovo|cuscuz_ovo|Cuscuz com milho e ovo|🌽+🥚|8',
    'ricecooker|leite_coco,tapioca|tapioca_coco_c|Pudim de tapioca|⚪+🥥|8', 'ricecooker|arroz_integral,brocolis_c,cenoura_c|arroz_int_leg|Arroz integral com legumes|🍚+🥦|10',
    // ---- Crepe / waffle
    'waffler|massa_crepe|crepe|Crepe|🥞+🧇|6', 'waffler|massa_crepe,presunto_c,queijo_c|crepe_misto|Crepe misto|🥞+🍖|7', 'waffler|banana_c,chocolate_c,massa_crepe|crepe_banana_choco|Crepe de banana e chocolate|🥞+🍌|7',
    'waffler|creme,massa_crepe,morango_c|crepe_morango|Crepe de morango|🥞+🍓|7', 'waffler|frango_c,massa_crepe,requeijao|crepe_frango|Crepe de frango|🥞+🍗|8', 'waffler|cogumelo_c,massa_crepe,queijo_c|crepe_cogumelo|Crepe de cogumelo|🥞+🍄|8',
    'waffler|acucar,maca_c,massa_crepe|crepe_maca|Crepe de maçã|🥞+🍎|7', 'waffler|massa_waffle|waffle_belga|Waffle belga|🧇|6', 'waffler|massa_waffle,morango_c|waffle_morango|Waffle de morango|🧇+🍓|7',
    'waffler|queijo_c,tapioca|tapioca_queijo|Tapioca de queijo|⚪+🧀|6', 'waffler|coco_c,tapioca|tapioca_coco|Tapioca de coco|⚪+🥥|6', 'waffler|frango_c,requeijao,tapioca|tapioca_frango|Tapioca de frango|⚪+🍗|7',
    'waffler|acucar,banana_c,tapioca|tapioca_banana|Tapioca de banana|⚪+🍌|6', 'waffler|massa_crepe,salmao_c,cream_cheese|crepe_salmao|Crepe de salmão|🥞+🐠|8',
    // ---- Pipoqueira
    'popper|milho_pipoca|pipoca|Pipoca|🍿|6', 'popper|acucar,milho_pipoca|pipoca_doce|Pipoca doce|🍿+🍬|7', 'popper|manteiga,milho_pipoca|pipoca_manteiga|Pipoca de manteiga|🍿+🧈|7',
    'popper|chocolate_c,milho_pipoca|pipoca_choco|Pipoca de chocolate|🍿+🍫|8', 'popper|milho_pipoca,queijo_r|pipoca_queijo|Pipoca de queijo|🍿+🧀|7', 'popper|acucar,amendoim_c|amendoim_doce|Amendoim doce|🥜+🍬|6',
    // ---- Sanduicheira
    'press|pao_c,presunto_c,queijo_c|misto_p|Misto prensado|🥪+🥪|6', 'press|frango_c,pao_c,requeijao|sand_frango_p|Sanduíche de frango prensado|🥪+🍗|7', 'press|mussarela_c,pao_c,tomate_c|sand_caprese_p|Caprese prensado|🥪+🍅|6',
    'press|atum_c,pao_c,queijo_c|sand_atum_p|Sanduíche de atum|🥪+🐡|7', 'press|pao_c,peru_c,queijo_c|sand_peru_p|Sanduíche de peru|🥪+🦃|7', 'press|bacon_c,ovo,pao_c|sand_ovo_bacon_p|Sanduíche de ovo e bacon|🥪+🥓|7',
    'press|abacate_c,pao_c,tomate_c|sand_veg_p|Sanduíche vegetariano|🥪+🥑|6', 'press|carne_c,pao_c,queijo_c|sand_carne_p|Sanduíche de carne|🥪+🥩|8', 'press|bacon_c,cheddar_c,pao_c|sand_cheddar_p|Sanduíche cheddar bacon|🥪+🟠|7',
    'press|mussarela_c,pao_c,salame_c|sand_salame_p|Sanduíche de salame|🥪+🥓|7', 'press|mortadela_c,pao_c,queijo_c|sand_mortadela_p|Sanduíche de mortadela|🥪+🟣|7', 'press|frango_c,queijo_c,tortilla|wrap_p|Wrap de frango|🌯+🍗|7',
    'press|carne_c,cheddar_c,tortilla|wrap_carne_p|Wrap de carne|🌯+🥩|8', 'press|feijao_c,queijo_c,tortilla|burrito_p|Burrito de feijão|🌯+🫘|7', 'press|pao_c,salmao_c,cream_cheese|bagel_p|Sanduíche de salmão|🥪+🐠|7',
    // ---- Fonte de chocolate
    'fountain|chocolate_c|choco_fonte|Chocolate derretido|🍫+💧|5', 'fountain|chocolate_c,morango_c|morango_choco|Morango com chocolate|🍓+🍫|6', 'fountain|banana_c,chocolate_c|banana_choco|Banana com chocolate|🍌+🍫|6',
    'fountain|abacaxi_c,chocolate_c|abacaxi_choco|Abacaxi com chocolate|🍍+🍫|6', 'fountain|chocolate_c,uva_c|uva_choco|Uva com chocolate|🍇+🍫|6', 'fountain|chocolate_c,pessego_c|pessego_choco|Pêssego com chocolate|🍑+🍫|6',
    'fountain|leite,mussarela_c,queijo_c|fondue_queijo|Fondue de queijo|🫕+🧀|8', 'fountain|cheddar_c,leite|queijo_fonte|Fonte de cheddar|🧀+🟠|6', 'fountain|chocolate_c,framboesa|framboesa_choco|Framboesa com chocolate|🍓+🟣|6',
    // ---- Fermentação
    'fermenter|cenoura_c,repolho_c|chucrute|Chucrute|🥬+🫙|14', 'fermenter|alho_c,pepino_c|picles_pepino|Picles de pepino|🥒+🫙|12', 'fermenter|beterraba_c,cebola_c|picles_cebola|Picles de cebola roxa|🧅+🫙|12',
    'fermenter|leite|iogurte_caseiro|Iogurte caseiro|🥣+🥛|14', 'fermenter|leite,morango_c|iogurte_morango_f|Iogurte de morango caseiro|🥣+🍓|14', 'fermenter|farinha,leite|massa_fermentada|Massa fermentada|🥣+🫙|12',
    'fermenter|gengibre_c,pimentao_c,repolho_c|kimchi|Kimchi|🥬+🌶️|14', 'fermenter|cenoura_c,couve_c|couve_fermentada|Couve fermentada|🥬+🟢|12', 'fermenter|leite,queijo|queijo_curado|Queijo curado|🧀+🫙|16',
    'fermenter|farinha,leite,manteiga|massa_brioche|Massa de brioche|🥣+🥐|13',
    // ---- Banho-maria
    'bainmarie|chocolate_c,creme|ganache|Ganache|🍫+🥣|7', 'bainmarie|acucar,leite,ovo|creme_ingles|Creme inglês|🥛+🟡|8', 'bainmarie|chocolate_c,leite_condensado|brigadeiro_cremoso|Brigadeiro cremoso|🍫+🥛|8',
    'bainmarie|leite,queijo_c|queijo_derretido|Queijo derretido|🧀+💧|5', 'bainmarie|manteiga,ovo|ovos_mexidos|Ovos mexidos|🍳+🧈|7', 'bainmarie|leite,leite_condensado,ovo|pudim_cond|Pudim de leite condensado|🍮+🥛|11',
    'bainmarie|acucar,leite|doce_leite|Doce de leite|🥛+🟤|10', 'bainmarie|acucar,limao_c,ovo|curd_limao|Creme de limão|🍋+🥣|8', 'bainmarie|acucar,maracuja_c,ovo|curd_maracuja|Creme de maracujá|🟡+🥣|8',
    'bainmarie|acucar,leite_coco|creme_coco|Creme de coco|🥥+🥣|7', 'bainmarie|cacau,leite,ovo|creme_cacau|Creme de cacau|🍫+🥣|9',
    // ---- Desidratador
    'dehydrator|manga_c|manga_seca|Manga seca|🥭+☀️|14', 'dehydrator|banana_c|banana_chips|Banana desidratada|🍌+☀️|12', 'dehydrator|maca_c|maca_chips|Chips de maçã|🍎+☀️|12', 'dehydrator|tomate_c|tomate_seco|Tomate seco|🍅+☀️|13',
    'dehydrator|carne_c|charque|Carne seca|🥩+☀️|18', 'dehydrator|abacaxi_c|abacaxi_seco|Abacaxi seco|🍍+☀️|13', 'dehydrator|morango_c|morango_seco|Morango seco|🍓+☀️|12', 'dehydrator|uva_c|uva_passa|Uva-passa|🍇+☀️|13',
    'dehydrator|pera_c|pera_seca|Pera seca|🍐+☀️|12', 'dehydrator|cogumelo_c|cogumelo_seco|Cogumelo seco|🍄+☀️|12', 'dehydrator|pimentao_c|pimentao_seco|Pimentão seco|🫑+☀️|12', 'dehydrator|ameixa_c|ameixa_seca|Ameixa seca|🟣+☀️|13',
    'dehydrator|banana_c,coco_c,manga_c|mix_tropical|Mix tropical seco|🥭+🥥|16', 'dehydrator|peixe_c|peixe_seco|Peixe seco|🐟+☀️|15',
    // ---- Panela (novos)
    'pot|cebola_c,couveflor_c,batata_c|sopa_couveflor|Sopa de couve-flor|🥣+🥦|10|1', 'pot|abobrinha_c,cebola_c,leite|sopa_abobrinha|Sopa de abobrinha|🥣+🥒|10|1', 'pot|alho_poro_c,batata_c,creme|creme_alho_poro|Creme de alho-poró|🥣+🧅|11|1',
    'pot|cebola_c,creme,palmito_c|creme_palmito|Creme de palmito|🥣+🌴|10|1', 'pot|alho_c,mexilhao,tomate_c|mexilhao_molho|Mexilhão ao molho|🦪+🍅|9', 'pot|alho_c,manteiga,vieira|vieira_manteiga|Vieira na manteiga|🐚+🧈|9',
    'pot|batata_c,bacalhau_c,cebola_c|bacalhau_cozido|Bacalhau com batatas|🐟+🥔|12', 'pot|frango_c,quiabo_c,tomate_c|frango_quiabo|Frango com quiabo|🍗+🥒|12', 'pot|leite,manteiga,milho_m|polenta_fresca|Polenta fresca|🌽+🥣|9',
    'pot|bacon_c,cebola_c,feijao_m|tutu_feijao|Tutu de feijão|🫘+🥣|11', 'pot|leite,manteiga,batata_m|pure_cremoso|Purê cremoso|🥔+🥣|8', 'pot|acucar,goiaba_c|goiabada|Goiabada|🍐+🟥|10', 'pot|acucar,figo_c|doce_figo|Doce de figo|🟣+🍎|10',
    'pot|acucar,ameixa_c|doce_ameixa|Doce de ameixa|🟣+🍑|10', 'pot|acucar,framboesa|calda_framboesa|Calda de framboesa|🍓+🥫|7', 'pot|acucar,amora|geleia_amora|Geleia de amora|🫐+🥫|7', 'pot|cebola_c,coentro_c,frango_c|frango_coentro|Frango ao coentro|🍗+🌱|10',
    'pot|cebola_c,cordeiro_c,grao_c|cordeiro_grao|Ensopado de cordeiro e grão|🐑+🟡|13|1', 'pot|alho_c,tomate_j,tomate_j|molho_fresco|Molho de tomate fresco|🥫+🧃|8', 'pot|batata_d,cebola_d,cenoura_d|sopa_rustica|Sopa rústica|🥣+🥔|10|1',
    'pot|massa_verde,queijo_c|massa_verde_queijo|Massa verde ao queijo|🍝+🌿|6', 'pot|ravioli_cogu_cru|ravioli_cogumelo|Ravioli de cogumelo|🥟+🍄|6', 'pot|ravioli_abobora_cru|ravioli_abobora|Ravioli de abóbora|🥟+🎃|6',
    'pot|ravioli_camarao_cru|ravioli_camarao|Ravioli de camarão|🥟+🦐|6', 'pot|cenoura_c,lentilha_c,linguica_c|lentilha_linguica_p|Lentilha com linguiça|🟤+🌭|9',
    // ---- Frigideira (novos)
    'pan|abobrinha_c,alho_c|abobrinha_s|Abobrinha salteada|🥒+🔥|6', 'pan|alho_c,couve_c|couve_refogada|Couve refogada|🥬+🔥|5', 'pan|aspargo_c,manteiga|aspargo_s|Aspargo na manteiga|🌿+🔥|6',
    'pan|alho_c,shiitake_c|shiitake_s|Shiitake salteado|🍄+🔥|6', 'pan|salsicha_c|salsicha_g|Salsicha salteada|🌭+🔥|6', 'pan|mortadela_c|mortadela_g|Mortadela frita|🥩+🔥|5', 'pan|salame_c|salame_g|Salame frito|🥓+🔥|5',
    'pan|sardinha|sardinha_g|Sardinha frita|🐟+🔥|7', 'pan|bacalhau_c|bacalhau_g|Bacalhau selado|🐟+🔥|8', 'pan|vieira|vieira_selada|Vieira selada|🐚+🔥|6', 'pan|mexilhao|mexilhao_s|Mexilhão salteado|🦪+🔥|6',
    'pan|enguia_c|enguia_g|Enguia grelhada|🐍+🔥|8', 'pan|cuscuz_c,ovo|cuscuz_frito|Cuscuz com ovo|🌽+🍳|7', 'pan|abobrinha_c,ovo,queijo_r|omelete_abobrinha|Omelete de abobrinha|🍳+🥒|8', 'pan|alho_m,camarao_c,manteiga|camarao_alho_pan|Camarão ao alho e manteiga|🦐+🧈|7',
    'pan|acucar,maca_d|maca_rustica|Maçã rústica caramelizada|🍎+🔥|7', 'pan|acucar,pitaya_c|pitaya_car|Pitaya caramelizada|🐉+🔥|7', 'pan|figo_c,acucar|figo_car|Figo caramelizado|🟣+🔥|7',
    // ---- Chapa (novos)
    'grill|sardinha|sardinha_grelhada|Sardinha na brasa|🐟+🔥|8', 'grill|salsicha_c|salsicha_chapa|Salsicha na chapa|🌭+🔥|6', 'grill|abobrinha_c|abobrinha_g|Abobrinha grelhada|🥒+🔥|6', 'grill|couveflor_c|couveflor_g|Couve-flor grelhada|🥦+🔥|7',
    'grill|shiitake_c|shiitake_g|Shiitake grelhado|🍄+🔥|6', 'grill|palmito_c|palmito_g|Palmito grelhado|🌴+🔥|6', 'grill|aspargo|aspargo_g|Aspargo grelhado|🌿+🔥|6', 'grill|queijo_minas_c|minas_g|Queijo minas na chapa|🧀+🔥|5',
    'grill|provolone_c|provolone_g|Provolone na chapa|🧀+🔥|5', 'grill|mortadela_c,pao_c,queijo_c|sand_mortadela_chapa|Sanduíche de mortadela na chapa|🥪+🟣|8', 'grill|figo_c|figo_g|Figo grelhado|🟣+🔥|6',
    'grill|abobrinha_c,pimentao_c,tofu_c|espetinho_veg|Espetinho vegetariano|🍢+🥒|9', 'grill|cebola_c,pimentao_c,salsicha_c|espetinho_salsicha|Espetinho de salsicha|🍢+🌭|8',
    // ---- Fritadeira (novos)
    'fryer|sardinha|sardinha_frita|Sardinha frita crocante|🐟+🍟|8', 'fryer|batata_c,bacalhau_c|bolinho_bacalhau|Bolinho de bacalhau|🐟+🟤|9', 'fryer|couveflor_c|couveflor_frita|Couve-flor frita|🥦+🍟|7',
    'fryer|abobrinha_c|abobrinha_frita|Abobrinha frita|🥒+🍟|7', 'fryer|quiabo_c|quiabo_frito|Quiabo frito|🥒+🍟|7', 'fryer|massa_pastel,salsicha_c|enroladinho|Enroladinho de salsicha|🌭+🥟|8',
    'fryer|queijo_minas_c|minas_frito|Queijo minas frito|🧀+🍟|6', 'fryer|massa_pastel,palmito_c|pastel_palmito|Pastel de palmito|🥟+🌴|8', 'fryer|massa_pastel,mortadela_c|pastel_mortadela|Pastel de mortadela|🥟+🟣|8',
    'fryer|batata_m,queijo_c|bolinho_queijo|Bolinho de batata e queijo|🧀+🥔|8', 'fryer|batata_d|batata_rustica_frita|Batata rústica frita|🥔+🍟|7', 'fryer|inhame_c|inhame_frito|Inhame frito|🍠+🍟|8',
    'fryer|mussarela_empanada|mussarela_frita|Mussarela crocante|🧀+🟤|6', 'fryer|couveflor_empanada|couveflor_crocante|Couve-flor crocante|🥦+🟤|8', 'fryer|abobrinha_empanada|abobrinha_crocante|Abobrinha crocante|🥒+🟤|8',
    'fryer|sardinha_empanada|sardinha_crocante|Sardinha crocante|🐟+🟤|8', 'fryer|bacalhau_empanado|bacalhau_crocante|Bacalhau crocante|🐟+🟤|9', 'fryer|minas_empanado|minas_crocante|Minas crocante|🧀+🟤|6',
    'fryer|salsicha_empanada|salsicha_crocante|Salsicha crocante|🌭+🟤|7', 'fryer|camarao_d|camarao_frito_d|Camarão descascado frito|🦐+🍟|7',
    // ---- Forno (novos)
    'oven|couveflor_c,creme,queijo_c|couveflor_gratinada|Couve-flor gratinada|🥦+🧀|12', 'oven|abobrinha_c,molho_tomate,mussarela_c|abobrinha_parmegiana|Abobrinha à parmegiana|🥒+🧀|12', 'oven|batata_c,bacalhau_c,cebola_c|bacalhau_forno|Bacalhau ao forno|🐟+♨️|14',
    'oven|batata_c,bacalhau_c,creme|bacalhau_natas|Bacalhau com natas|🐟+🥛|14', 'oven|limao_c,sardinha|sardinha_assada|Sardinha assada|🐟+🍋|11', 'oven|massa_pizza,molho_tomate,mussarela_c,rucula_c|pizza_rucula|Pizza de Rúcula|🍕+🥬|14',
    'oven|massa_pizza,molho_tomate,mussarela_c,salame_c|pizza_salame|Pizza de Salame|🍕+🥓|15', 'oven|massa_pizza,molho_tomate,mussarela_c,provolone_c|pizza_provolone|Pizza de Provolone|🍕+🟡|14',
    'oven|massa_pizza,molho_tomate,mussarela_c,palmito_c|pizza_palmito|Pizza de Palmito|🍕+🌴|14', 'oven|goiabada,massa_pizza,queijo_minas_c|pizza_romeu|Pizza Romeu e Julieta|🍕+🍐|13', 'oven|massa_bolo,maracuja_c|bolo_maracuja|Bolo de maracujá|🍰+🟡|15',
    'oven|framboesa,massa_torta|torta_framboesa|Torta de framboesa|🥧+🍓|14', 'oven|amora,massa_torta|torta_amora|Torta de amora|🥧+🫐|14', 'oven|figo_c,massa_torta|torta_figo|Torta de figo|🥧+🟣|14', 'oven|ameixa_c,massa_torta|torta_ameixa|Torta de ameixa|🥧+🟣|14',
    'oven|goiaba_c,massa_torta|torta_goiaba|Torta de goiaba|🥧+🍐|14', 'oven|massa_torta,queijo_minas_c,tomate_c|quiche_minas|Quiche de queijo minas|🥧+🧀|13', 'oven|bacon_c,massa_torta,queijo_c|quiche_lorraine|Quiche Lorraine|🥧+🥓|13',
    'oven|cogumelo_c,massa_torta,queijo_c|quiche_cogumelo|Quiche de cogumelo|🥧+🍄|13', 'oven|espinafre_c,massa_torta,requeijao|quiche_espinafre|Quiche de espinafre|🥧+🌿|13', 'oven|creme,massa_torta,salmao_c|quiche_salmao|Quiche de salmão|🥧+🐠|14',
    'oven|massa_fermentada|pao_fermentacao|Pão de fermentação natural|🍞+🫙|14', 'oven|massa_brioche|brioche|Brioche|🥐+🍞|13', 'oven|massa_fermentada,mussarela_c,tomate_c|focaccia|Focaccia|🫓+🍅|13',
    'oven|folhado_cogumelo_cru|folhado_cogumelo|Folhado de cogumelo|🥐+🍄|11', 'oven|folhado_caprese_cru|folhado_caprese|Folhado caprese|🥐+🍅|11', 'oven|folhado_romeu_cru|folhado_romeu|Folhado Romeu e Julieta|🥐+🍐|11',
    'oven|folhado_frango_cru|folhado_frango|Folhado de frango|🥐+🍗|11', 'oven|folhado_framboesa_cru|folhado_framboesa|Folhado de framboesa|🥐+🍓|11', 'oven|enroladinho_cru|enroladinho_forno|Enroladinho assado|🥐+🌭|10',
    'oven|massa_brownie|brownie|Brownie|🍫+🟫|13', 'oven|massa_bolo_cond|bolo_condensado|Bolo de leite condensado|🍰+🥛|14', 'oven|massa_polvilho|biscoito_polvilho|Biscoito de polvilho|🥨+⚪|9',
    'oven|ravioli_cogumelo,molho_tomate,mussarela_c|ravioli_cogumelo_forno|Ravioli de cogumelo gratinado|🥟+🍄|12', 'oven|ravioli_abobora,creme,queijo_c|ravioli_abobora_forno|Ravioli de abóbora gratinado|🥟+🎃|12',
    // ---- Liquidificador (novos)
    'blender|acai,aveia,banana_c|acai_bowl|Açaí na tigela|🟣+🥣|7', 'blender|acai,gelo,morango_c|suco_acai|Açaí batido|🟣+🥤|7|1', 'blender|goiaba_c,goiaba_c|suco_goiaba|Suco de goiaba|🍐+🥤|6|1', 'blender|leite,mamao_c|vitamina_mamao|Vitamina de mamão|🍈+🥤|7|1',
    'blender|framboesa,iogurte|iogurte_framboesa|Iogurte de framboesa|🍓+🥛|7|1', 'blender|amora,leite|vitamina_amora|Vitamina de amora|🫐+🥛|7|1', 'blender|gelo,leite,matcha|matcha_gelado|Matcha gelado|🍵+🧊|7|1',
    'blender|gelo,leite_coco,manga_c|manga_coco|Manga com leite de coco|🥭+🥥|8|1', 'blender|refrigerante,sorvete_creme|sorvete_refri|Float de refrigerante|🥤+🍦|6|1', 'blender|laranja_j,laranja_j|suco_espremido|Suco espremido na hora|🍊+🧃|6|1',
    'blender|limao_j,melancia_j|agua_melancia|Água de melancia com limão|🍉+🧃|7|1', 'blender|uva_j,uva_j|suco_uva_integral|Suco de uva integral|🍇+🧃|6|1', 'blender|acucar,gelo,maracuja_j|maracuja_gelado|Maracujá gelado|🟡+🧊|7|1',
    'blender|abacaxi_j,gelo,hortela_c|abacaxi_hortela|Abacaxi com hortelã|🍍+🌿|7|1', 'blender|acucar,hortela_c,limao_j|mojito_sem|Mojito sem álcool|🍋+🌿|7|1', 'blender|agua_gas,acucar,limao_j|soda_limao|Soda de limão|🍋+🫧|6|1',
    'blender|cana_j,gelo,limao_j|garapa|Caldo de cana gelado|🎋+🧊|7|1', 'blender|cana_j,cana_j|caldo_cana|Caldo de cana|🎋+🥤|6|1', 'blender|coco_j,coco_j|agua_coco_fresca|Água de coco fresca|🥥+💧|6|1', 'blender|manga_d,manga_d|suco_manga_fresco|Suco de manga fresco|🥭+🥤|6|1',
    // ---- Batedeira (novos)
    'mixer|farinha,leite,leite_condensado,ovo|massa_bolo_cond|Massa de bolo de leite condensado|🥣+🥛|8', 'mixer|cacau,farinha,manteiga,ovo|massa_brownie|Massa de brownie|🥣+🍫|8', 'mixer|ovo,polvilho,queijo_r|massa_polvilho|Massa de polvilho|🥣+⚪|7',
    // ---- Wok (novos)
    'wok|couve_c,frango_c,noodles_c|noodles_frango|Noodles de frango|🍜+🍗|9', 'wok|brocolis_c,camarao_c,noodles_c|noodles_camarao|Noodles de camarão|🍜+🦐|9', 'wok|carne_c,noodles_c,pimentao_c|noodles_carne|Noodles de carne|🍜+🥩|9',
    'wok|aspargo_c,noodles_c,tofu_c|noodles_tofu|Noodles de tofu|🍜+⬜|9', 'wok|arroz_c,cebola_c,enguia_c|unagi_don|Unagi don|🍚+🐍|10', 'wok|abobrinha_c,pimentao_c,quinoa_c|quinoa_legumes|Quinoa com legumes|🌾+🥒|9',
    'wok|alho_c,camarao_c,cuscuz_c|cuscuz_camarao|Cuscuz de camarão|🌽+🦐|9', 'wok|abobrinha_c,cebola_c,tofu_c|refogado_tofu|Refogado de tofu|⬜+🥒|8',
    // ---- Vaporeira (novos)
    'steamer|mexilhao|mexilhao_vapor|Mexilhão no vapor|🦪+♨️|6', 'steamer|vieira|vieira_vapor|Vieira no vapor|🐚+♨️|6', 'steamer|couveflor_c|couveflor_v|Couve-flor no vapor|🥦+♨️|6', 'steamer|aspargo_c|aspargo_v|Aspargo no vapor|🌿+♨️|5',
    'steamer|abobrinha_c|abobrinha_v|Abobrinha no vapor|🥒+♨️|5', 'steamer|massa_pastel,tofu_c,cogumelo_c|bao_veg|Bao vegetariano|🥟+⬜|9', 'steamer|cogumelo_c,massa_pastel,repolho_c|dumpling_veg|Dumpling vegetariano|🥟+🥬|9', 'steamer|bacalhau_c|bacalhau_vapor|Bacalhau no vapor|🐟+♨️|8',
    // ---- Defumador (novos)
    'smoker|queijo_minas|minas_defumado|Queijo minas defumado|🧀+💨|9', 'smoker|provolone|provolone_def|Provolone defumado|🧀+💨|9', 'smoker|tofu_c|tofu_def|Tofu defumado|⬜+💨|9', 'smoker|salsicha|salsicha_def|Salsicha defumada|🌭+💨|9',
    'smoker|bacalhau|bacalhau_def|Bacalhau defumado|🐟+💨|12', 'smoker|pato|pato_def|Pato defumado|🦆+💨|15',
    // ---- Torradeira (novos)
    'toaster|cream_cheese,pao_c,salmao_c|bagel_salmao|Bagel de salmão|🥯+🐠|6', 'toaster|cream_cheese,pao_c,tomate_c|tosta_cream|Tosta de cream cheese|🍞+🟦|5', 'toaster|mussarela_c,pao_c,rucula_c|tosta_rucula|Tosta de rúcula|🍞+🥬|5',
    // ---- Cafeteira (novos)
    'coffee|agua,matcha|cha_matcha|Chá matcha|🍵+🟢|6|1', 'coffee|agua,cafe,leite_coco|cafe_coco|Café com leite de coco|☕+🥥|7|1', 'coffee|agua,cha,framboesa|cha_framboesa|Chá de framboesa|🍵+🍓|7|1', 'coffee|agua,cha,maca_c|cha_maca|Chá de maçã|🍵+🍎|7|1',
    'coffee|agua,cafe,leite_condensado|cafe_vietnamita|Café vietnamita|☕+🟡|8|1',
    // ---- Processador (novos)
    'processor|couveflor_c,creme,queijo_r|pure_couveflor|Purê de couve-flor|🥦+🥣|7', 'processor|alho_c,castanha_c,rucula_c|pesto_rucula|Pesto de rúcula|🥬+🥣|7', 'processor|alho_c,beterraba_c,grao|homus_beterraba|Homus de beterraba|🟣+🥣|7',
    'processor|abobora_c,alho_c,grao|homus_abobora|Homus de abóbora|🎃+🥣|7', 'processor|acucar,framboesa,iogurte|mousse_framboesa|Mousse de framboesa|🍓+🥣|7', 'processor|acucar,creme,maracuja_c|mousse_maracuja|Mousse de maracujá|🟡+🥣|7',
    'processor|acucar,cacau,creme|mousse_choco|Mousse de chocolate|🍫+🥣|7', 'processor|abacate_c,cacau,leite_condensado|mousse_abacate|Mousse de abacate|🥑+🍫|7', 'processor|abacate_m,limao_j,tomate_c|guacamole_fresco|Guacamole fresco|🥑+🧃|6',
    // ---- Sorveteira (novos)
    'icecream|creme,framboesa,leite_condensado|sorvete_framboesa|Sorvete de framboesa|🍦+🍓|9', 'icecream|creme,leite,matcha|sorvete_matcha|Sorvete de matcha|🍦+🍵|9', 'icecream|baunilha,creme,leite|sorvete_baunilha|Sorvete de baunilha|🍦+🌼|9',
    'icecream|acai,banana_c,gelo|sorvete_acai|Sorvete de açaí|🍦+🟣|8', 'icecream|acucar,gelo,goiaba_c|raspa_goiaba|Raspadinha de goiaba|🍧+🍐|7', 'icecream|gelo,leite_coco,manga_c|sorvete_manga_coco|Sorvete de manga e coco|🍦+🥭|9',
    'icecream|acucar,framboesa,iogurte|frozen_framboesa|Frozen de framboesa|🍨+🍓|8', 'icecream|cacau,creme,leite|sorvete_cacau|Sorvete de cacau|🍦+🍫|9', 'icecream|cafe,creme,leite|sorvete_cafe|Sorvete de café|🍦+☕|9', 'icecream|acucar,gelo,pitaya_c|raspa_pitaya|Raspadinha de pitaya|🍧+🐉|7',
    // ---- Mesa de sushi (novos)
    'sushi|arroz_c,enguia_c,nori|sushi_enguia|Maki de enguia|🍣+🐍|9', 'sushi|arroz_c,cream_cheese,nori|sushi_cream|Maki de cream cheese|🍣+🟦|7', 'sushi|arroz_c,aspargo_c,nori|sushi_aspargo|Maki de aspargo|🍣+🌿|7',
    'sushi|arroz_c,caviar|gunkan_caviar|Gunkan de caviar|🍙+⚫|6', 'sushi|arroz_c,vieira|nigiri_vieira|Nigiri de vieira|🍙+🐚|6', 'sushi|arroz_c,enguia_c|nigiri_enguia|Nigiri de enguia|🍙+🐍|6', 'sushi|arroz_c,manga_c,nori|sushi_manga|Maki de manga|🍣+🥭|7',
    // ---- Empanadora (novos)
    'breader|farinha_rosca,mussarela_c,ovo|mussarela_empanada|Mussarela empanada|🧀+🥣|4', 'breader|farinha_rosca,ovo,sardinha|sardinha_empanada|Sardinha empanada|🐟+🥣|5', 'breader|couveflor_c,farinha_rosca,ovo|couveflor_empanada|Couve-flor empanada|🥦+🥣|5',
    'breader|abobrinha_c,farinha_rosca,ovo|abobrinha_empanada|Abobrinha empanada|🥒+🥣|5', 'breader|farinha_rosca,ovo,salsicha_c|salsicha_empanada|Salsicha empanada|🌭+🥣|5', 'breader|bacalhau_c,farinha_rosca,ovo|bacalhau_empanado|Bacalhau empanado|🐟+🥣|6',
    'breader|farinha_rosca,ovo,queijo_minas_c|minas_empanado|Queijo minas empanado|🧀+🥣|4',
    // ---- Mesa de massa (novos)
    'roller|cogumelo_c,massa_folhada,queijo_c|folhado_cogumelo_cru|Folhado de cogumelo (cru)|🥐+🍄|5', 'roller|massa_folhada,mussarela_c,tomate_c|folhado_caprese_cru|Folhado caprese (cru)|🥐+🍅|5',
    'roller|goiaba_c,massa_folhada,queijo_minas_c|folhado_romeu_cru|Folhado Romeu e Julieta (cru)|🥐+🍐|5', 'roller|frango_c,massa_folhada,requeijao|folhado_frango_cru|Folhado de frango (cru)|🥐+🍗|5',
    'roller|creme,framboesa,massa_folhada|folhado_framboesa_cru|Folhado de framboesa (cru)|🥐+🍓|5', 'roller|massa_folhada,salsicha_c|enroladinho_cru|Enroladinho (cru)|🥐+🌭|4',
    'roller|cogumelo_c,massa_fresca,queijo_c|ravioli_cogu_cru|Ravioli de cogumelo (cru)|🥟+🍄|6', 'roller|abobora_c,massa_fresca,queijo_c|ravioli_abobora_cru|Ravioli de abóbora (cru)|🥟+🎃|6',
    'roller|camarao_c,cream_cheese,massa_fresca|ravioli_camarao_cru|Ravioli de camarão (cru)|🥟+🦐|6',
    // ---- Maçarico (novos)
    'torch|acucar,figo_c|figo_brulee|Figo brûlée|🟣+🔥|7', 'torch|acucar,framboesa|framboesa_brulee|Framboesa brûlée|🍓+🔥|7', 'torch|acucar,maracuja_c,ovo|maracuja_brulee|Maracujá brûlée|🟡+🔥|8', 'torch|vieira|vieira_macarico|Vieira maçaricada|🐚+🔥|6',
    'torch|queijo_minas_c|minas_macarico|Queijo minas maçaricado|🧀+🔥|5', 'torch|provolone_c|provolone_macarico|Provolone maçaricado|🧀+🔥|5', 'torch|banana_c,leite_condensado|banana_cond_macarico|Banana com leite condensado|🍌+🔥|7',
    // ---- Panela de pressão (novos)
    'pressure|cenoura_c,lentilha,linguica_c|lentilha_linguica|Lentilha com linguiça|🟤+🌭|10', 'pressure|cebola_c,cordeiro_c,grao|cordeiro_grao_p|Cordeiro com grão-de-bico|🐑+🟡|13', 'pressure|carne_c,cebola_c,mandioca_c|escondidinho_base|Carne com mandioca|🥩+🍠|12',
    'pressure|abobora_c,carne_c,cebola_c|carne_abobora|Carne com abóbora|🥩+🎃|12', 'pressure|bacalhau_c,cebola_c,grao|bacalhau_grao|Bacalhau com grão-de-bico|🐟+🟡|13', 'pressure|charque,feijao,linguica_c|feijoada_charque|Feijoada de charque|🫘+☀️|14'
  ]);
  CC.finalize();
})(window.CC);
