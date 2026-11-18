/* Cozinha Caos — expansão 4: Índia, Tailândia, Vietnã, Coreia, México, França, Espanha, Grécia, EUA, África, vegetal, doces */
(function (CC) {
  'use strict';
  [
    ['paneer', 'Paneer', '🧀+⬜', 'em cubos', 2.5], ['capim_limao', 'Capim-limão', '🌿+🍋', 'picado', 1.5], ['pasta_curry', 'Pasta de curry verde', '🟢+🥣', null], ['daikon', 'Daikon', '⚪', 'em palitos', 2.5],
    ['bolinho_arroz', 'Bolinho de arroz (tteok)', '🍡', null], ['papel_arroz', 'Papel de arroz', '⚪+📄', null], ['broto_feijao', 'Broto de feijão', '🌱+⚪', null], ['nopal', 'Nopal', '🌵', 'fatiado', 2.5],
    ['jalapeno', 'Jalapeño', '🌶️+🟢', 'picado', 2], ['tomatillo', 'Tomatillo', '🍅+🟢', 'picado', 2], ['oaxaca', 'Queijo oaxaca', '🧀+🟡', 'desfiado', 2.5], ['masa_milho', 'Massa de milho', '🌽+🫓', null],
    ['brie', 'Brie', '🧀+⚪', 'fatiado', 2], ['camembert', 'Camembert', '🧀+🟡', null], ['escargot', 'Escargot', '🐌', null], ['tomilho', 'Tomilho', '🌿+🟤', 'picado', 1.5], ['alecrim', 'Alecrim', '🌿+🟣', 'picado', 1.5],
    ['echalota', 'Echalota', '🧅+🟣', 'picada', 2], ['baguete', 'Baguete', '🥖', 'fatiada', 2], ['trufa', 'Trufa', '🍄+⚫', 'laminada', 2.5], ['pretzel_massa', 'Massa de pretzel', '🥨+🥣', null],
    ['cranberry', 'Cranberry', '🍒+🔴', null], ['marshmallow', 'Marshmallow', '⚪+🍬', null], ['bolacha', 'Bolacha', '🍪+🟤', null], ['banana_terra', 'Banana-da-terra', '🍌+🟠', 'fatiada', 2],
    ['sorgo', 'Sorgo', '🌾+🟫', null], ['tempeh', 'Tempeh', '🟫', 'em fatias', 2.5], ['seitan', 'Seitan', '🟤', 'em tiras', 2.5], ['mascarpone', 'Mascarpone', '🧀+🥣', null],
    ['savoiardi', 'Biscoito champagne', '🍪+🟡', null], ['perola_tapioca', 'Pérola de tapioca', '⚫+🧋', null], ['gelatina', 'Gelatina', '🟥', null], ['porcini', 'Cogumelo porcini', '🍄+🟫', 'fatiado', 2.5],
    ['ricota', 'Ricota', '🧀+⬜', 'em cubos', 2], ['wakame', 'Wakame', '🟢+🌊', null], ['tobiko', 'Tobiko', '🟠+⚫', null], ['sepia', 'Sépia', '🦑+⬛', 'em anéis', 3],
    ['dourado', 'Dourado', '🐟+🟡', 'em filé', 3.5], ['pescada', 'Pescada', '🐟+⬜', 'em filé', 3]
  ].forEach(function (a) { CC.addIng(a); });
  CC.setCut('daikon', 'peeler', 'descascado', 2); CC.setCut('capim_limao', 'mortar', 'macerado', 2); CC.setCut('porcini', 'mortar', 'em pó', 2.5); CC.setCut('trufa', 'mortar', 'em pó', 2.5);
  [['garam', 'Garam masala', '🟧', '#c0722a'], ['cardamomo', 'Cardamomo', '🟩', '#7a9a4a'], ['acafrao', 'Açafrão', '🟨', '#e8a317'], ['chipotle', 'Chipotle', '🌶️', '#7b2d1a'], ['gochujang', 'Gochujang', '🔴', '#b5281c'], ['molho_peixe', 'Molho de peixe', '🟫', '#8a5a2b'], ['xarope', 'Xarope de bordo', '🍁', '#c98a3a']].forEach(function (a) {
    CC.SEAS[a[0]] = { id: a[0], n: a[1], e: a[2], color: a[3] }; CC.ITEMS[a[0]] = { id: a[0], n: a[1], e: a[2], season: true, color: a[3] };
  });
  const P = { 18: ['trufa'], 14: ['escargot', 'dourado', 'porcini', 'camembert', 'brie', 'sepia'], 8: ['paneer', 'oaxaca', 'mascarpone', 'ricota', 'tempeh', 'seitan', 'cranberry', 'wakame', 'tobiko', 'pescada', 'cream_cheese'],
    3: ['masa_milho', 'pretzel_massa', 'papel_arroz', 'bolinho_arroz', 'perola_tapioca', 'gelatina', 'marshmallow', 'bolacha', 'savoiardi', 'sorgo', 'broto_feijao', 'pasta_curry'] };
  const old = CC.priceOf;
  CC.priceOf = function (id) { for (const k in P) if (P[k].indexOf(id) >= 0) return +k; return old(id); };

  function RR(lines) { lines.forEach(function (l) { const p = l.split('|'); CC.R(p[0], p[1].split(','), p[2], p[3], p[4], +p[5], p[6] === '1'); }); }
  RR([
    // ---- Índia
    'pan|cebola_c,paneer_c,pimentao_c|paneer_salteado|Paneer salteado|🧀+🔥|8', 'pot|creme,paneer_c,tomate_c|paneer_tomate|Paneer ao molho de tomate|🧀+🍅|11', 'pot|frango_c,iogurte,tomate_c|frango_masala|Frango masala|🍗+🥘|13',
    'pot|cebola_c,grao_c,tomate_c|curry_grao|Curry de grão-de-bico|🟡+🥘|11', 'pot|batata_c,couveflor_c,tomate_c|aloo_gobi|Aloo gobi|🥔+🥦|11', 'pot|cebola_c,lentilha,tomate_c|dal|Dal de lentilha|🟤+🥣|10|1',
    'mixer|farinha,iogurte,leite|massa_naan|Massa de naan|🥣+🫓|6', 'oven|massa_naan|naan|Pão naan|🫓+♨️|8', 'grill|frango_c,iogurte|frango_tandoori|Frango tandoori|🍗+🔥|11', 'grill|cordeiro_c,iogurte|cordeiro_tandoori|Cordeiro tandoori|🐑+🔥|12',
    'grill|paneer_c|paneer_g|Paneer grelhado|🧀+🔥|6', 'fryer|batata_c,massa_pastel|samosa|Samosa|🥟+🥔|9', 'fryer|cebola_c,massa_pastel|bhaji|Bhaji de cebola|🧅+🍟|7', 'blender|gelo,iogurte,limao_j|lassi_salgado|Lassi salgado|🥛+🍋|6|1',
    'ricecooker|arroz,cebola_c,ervilha|arroz_pilau|Arroz pilau|🍚+🫛|9', 'processor|coentro_c,hortela_c,iogurte|molho_hortela|Molho de hortelã|🌿+🥣|6',
    // ---- Tailândia e Vietnã
    'pot|camarao_c,capim_limao_c,leite_coco|tom_kha|Sopa tom kha|🥣+🥥|11|1', 'pot|camarao_c,capim_limao_c,tomate_c|tom_yum|Sopa tom yum|🥣+🍤|11|1', 'pot|frango_c,leite_coco,pasta_curry|curry_verde|Curry verde de frango|🍗+🟢|12',
    'pot|camarao_c,leite_coco,pasta_curry|curry_camarao|Curry verde de camarão|🦐+🟢|12', 'wok|broto_feijao,frango_c,noodles_c|pad_see_ew|Pad see ew|🍜+🥬|9', 'wok|alho_c,frango_c,manjericao_c|frango_manjericao|Frango ao manjericão|🍗+🍃|9',
    'roller|camarao_c,hortela_c,papel_arroz|rolinho_camarao|Rolinho fresco de camarão|🥬+🦐|6', 'roller|cenoura_c,papel_arroz,tofu_c|rolinho_tofu|Rolinho fresco de tofu|🥬+⬜|6', 'roller|carne_c,cenoura_c,papel_arroz|rolinho_primavera_cru|Rolinho primavera (cru)|🌯+⚪|6',
    'fryer|rolinho_primavera_cru|rolinho_primavera|Rolinho primavera|🌯+🍟|7', 'pot|carne_c,cebola_c,noodles_c|pho|Pho de carne|🍜+🥩|12|1', 'pot|frango_c,gengibre_c,noodles_c|pho_frango|Pho de frango|🍜+🍗|11|1',
    // ---- Coreia
    'pan|carne_c,cebola_c,kimchi|bulgogi|Bulgogi|🥩+🔥|10', 'pan|arroz_c,kimchi,ovo|bibimbap|Bibimbap|🍚+🌶️|10', 'pan|bolinho_arroz,cebola_c|tteokbokki|Tteokbokki|🍡+🌶️|9', 'pan|kimchi,tofu_c|kimchi_tofu|Tofu com kimchi|⬜+🌶️|8',
    'grill|carne_c,daikon_c|carne_daikon|Carne com daikon|🥩+🔥|9', 'fermenter|daikon_c,pimentao_c|picles_daikon|Picles de daikon|⚪+🫙|12', 'pot|daikon_c,miso,tofu_c|sopa_daikon|Sopa de daikon|🥣+⚪|9|1',
    // ---- México
    'pan|jalapeno_c,queijo_c,tortilla|quesadilla_jalapeno|Quesadilla de jalapeño|🫓+🌶️|8', 'pan|nopal_c,ovo|nopal_ovo|Ovos com nopal|🍳+🌵|8', 'grill|nopal_c|nopal_g|Nopal grelhado|🌵+🔥|6', 'processor|coentro_c,jalapeno_c,tomatillo_c|salsa_verde|Salsa verde|🟢+🥣|6',
    'processor|cebola_c,jalapeno_c,tomate_c|pico_gallo|Pico de gallo|🍅+🥣|5', 'oven|frango_c,oaxaca_c,tortilla|enchilada_frango|Enchilada de frango|🌯+🧀|11', 'oven|carne_c,oaxaca_c,tortilla|enchilada_carne|Enchilada de carne|🌯+🧀|11',
    'waffler|masa_milho,queijo_c|pupusa|Pupusa de queijo|🫓+🧀|7', 'waffler|feijao_c,masa_milho|pupusa_feijao|Pupusa de feijão|🫓+🫘|7', 'fryer|masa_milho|tortilla_chips|Tortilla chips|🌽+🍟|6', 'fryer|masa_milho,queijo_c|empanada_queijo|Empanada frita de queijo|🥟+🧀|8',
    'pot|carne_c,feijao,jalapeno_c|chili|Chili con carne|🌶️+🥘|13', 'pot|feijao,milho_c,pimentao_c|sopa_feijao_milho|Sopa de feijão e milho|🥣+🫘|11|1', 'pan|chorizo_c,ovo,tortilla|huevos_rancheros|Huevos rancheros|🍳+🌮|9',
    // ---- França
    'roller|brie_c,massa_folhada|brie_cru|Brie em massa (cru)|🧀+🥐|5', 'oven|brie_cru|brie_assado|Brie assado em massa|🧀+🥐|11', 'oven|alho_c,camembert|camembert_assado|Camembert assado|🧀+♨️|10', 'pan|alho_c,escargot,manteiga|escargot_manteiga|Escargot na manteiga|🐌+🧈|8',
    'oven|escargot,manteiga,tomilho_c|escargot_forno|Escargot gratinado|🐌+♨️|10', 'pan|creme,cogumelo_c,echalota_c|cogumelo_creme|Cogumelos à crème|🍄+🥛|8', 'pressure|pato,tomilho_c|pato_confit|Confit de pato|🦆+🥫|14', 'oven|batata_c,creme,queijo_c|gratin_dauphinois|Gratin dauphinois|🥔+🧀|13',
    'pan|creme,massa_c,trufa_c|massa_trufa|Massa à trufa|🍝+🍄|9', 'toaster|baguete_c,brie_c|tartine_brie|Tartine de brie|🥖+🧀|5', 'toaster|baguete_c,manjericao_c,tomate_c|bruschetta_baguete|Bruschetta de baguete|🥖+🍅|5',
    'bainmarie|chocolate_c,manteiga,ovo|fondant_massa|Massa de fondant|🍫+🥣|8', 'oven|fondant_massa|fondant|Petit gâteau|🍫+🎂|10', 'oven|acucar,maca_c,massa_folhada|tarte_tatin|Tarte tatin|🥧+🍎|13',
    // ---- Espanha e Grécia
    'pan|batata_c,chorizo_c,ovo|tortilla_espanhola|Tortilla espanhola|🍳+🥔|9', 'pot|arroz,lula_c,mexilhao|paella_mar|Paella de frutos do mar|🥘+🦐|13', 'pot|arroz,chorizo_c,frango_c|paella_mista|Paella mista|🥘+🍗|13', 'pan|alho_c,camarao_c,pimentao_c|gambas_pil|Gambas ao alho|🦐+🧄|7',
    'pan|feta_c,tomate_c|feta_tomate|Feta com tomate|🧀+🍅|6', 'oven|berinjela_c,carne_c,molho_branco|moussaka|Moussaka|🍆+🥩|15', 'press|cordeiro_c,pao_sirio,tomate_c|gyros_cordeiro|Gyros de cordeiro|🌯+🐑|8', 'press|feta_c,frango_c,pao_sirio|gyros_frango|Gyros de frango|🌯+🍗|8',
    'processor|alho_c,iogurte,pepino_c|tzatziki|Tzatziki|🥒+🥣|6',
    // ---- Alemanha, Polônia, EUA
    'pan|batata_c,cebola_c,salsicha_c|salsicha_batata|Salsicha com batata|🌭+🥔|8', 'pot|batata_c,repolho_c,salsicha_c|ensopado_repolho|Ensopado de repolho|🥣+🥬|11|1', 'oven|pretzel_massa|pretzel|Pretzel|🥨|9',
    'oven|maca_c,massa_folhada,noz_c|strudel|Strudel de maçã|🥧+🍎|13', 'oven|cranberry,peru|peru_cranberry|Peru com cranberry|🦃+🍒|16', 'pot|acucar,cranberry|molho_cranberry|Molho de cranberry|🍒+🥫|8', 'fountain|chocolate_c,marshmallow|marshmallow_choco|Marshmallow com chocolate|⚪+🍫|6',
    'torch|bolacha,marshmallow|smore|S\'more|🍪+🔥|6', 'fryer|massa_pastel,salsicha|corn_dog|Corn dog|🌭+🍟|8', 'oven|bacon_c,batata_c,cheddar_c|batata_loaded|Batata loaded|🥔+🧀|13',
    // ---- África e vegetal
    'pan|banana_terra_c|banana_terra_f|Banana-da-terra frita|🍌+🔥|6', 'fryer|banana_terra_c|banana_terra_chips|Chips de banana-da-terra|🍌+🍟|7', 'pot|amendoim_c,carne_c,quiabo_c|ensopado_amendoim|Ensopado de amendoim|🥜+🥘|13', 'pot|sorgo|sorgo_c|Sorgo cozido|🌾+♨️|10',
    'pot|carne_c,inhame_c,tomate_c|inhame_ensopado|Ensopado de inhame|🍠+🥘|12', 'pan|tempeh_c|tempeh_g|Tempeh grelhado|🟫+🔥|7', 'grill|seitan_c|seitan_g|Seitan grelhado|🟤+🔥|8', 'wok|brocolis_c,gengibre_c,seitan_c|seitan_wok|Seitan no wok|🟤+🥘|9',
    'wok|bok_choy_c,pimentao_c,tempeh_c|tempeh_wok|Tempeh no wok|🟫+🥘|9', 'oven|massa_torta,porcini_c,queijo_c|torta_porcini|Torta de porcini|🥧+🍄|13', 'pan|alho_c,porcini_c|porcini_s|Porcini salteado|🍄+🔥|6', 'pot|acucar,banana_terra_c,leite_coco|doce_banana_terra|Banana-da-terra em calda|🍌+🥥|10',
    // ---- Itália e Japão extras
    'mixer|acucar,mascarpone,ovo|creme_mascarpone|Creme de mascarpone|🥣+🧀|6', 'pan|espinafre_c,massa_c,ricota_c|massa_ricota|Massa com ricota e espinafre|🍝+🧀|8', 'oven|massa_fresca_c,molho_tomate,ricota_c|canelone_ricota|Canelone de ricota|🥟+🧀|13',
    'oven|massa_pizza,molho_tomate,mussarela_c,presunto_cru_c|pizza_presunto_cru|Pizza de presunto cru|🍕+🍖|15', 'oven|massa_pizza,mussarela_c,porcini_c,trufa_c|pizza_trufa|Pizza de trufa e porcini|🍕+🍄|15', 'oven|figo_c,gorgonzola_c,massa_pizza|pizza_figo|Pizza de figo e gorgonzola|🍕+🟣|14',
    'oven|jalapeno_c,massa_pizza,molho_tomate,mussarela_c|pizza_jalapeno|Pizza de jalapeño|🍕+🌶️|14', 'sushi|arroz_c,nori,tobiko|sushi_tobiko|Maki de tobiko|🍣+🟠|8', 'sushi|arroz_c,nori,wakame|sushi_wakame|Maki de wakame|🍣+🟢|7', 'sushi|arroz_c,dourado_c|nigiri_dourado|Nigiri de dourado|🍙+🐟|6',
    'sushi|dourado_c|sashimi_dourado|Sashimi de dourado|🐟+🔪|4', 'pot|miso,tofu_c,wakame|miso_wakame|Sopa de miso com wakame|🥣+🟢|9|1', 'pan|sepia_c|sepia_g|Sépia grelhada|🦑+🔥|6', 'fryer|pescada_c|pescada_frita|Pescada frita|🐟+🍟|8',
    'oven|dourado,limao_c|dourado_assado|Dourado ao limão|🐟+🍋|12', 'pan|dourado_c|dourado_g|Dourado selado|🐟+🔥|8', 'steamer|gengibre_c,pescada_c|pescada_vapor|Pescada no vapor|🐟+♨️|8',
    // ---- Doces e bebidas
    'blender|acucar,leite,perola_tapioca|bubble_leite|Bubble tea de leite|🧋|8|1', 'blender|leite,matcha,perola_tapioca|bubble_matcha|Bubble tea de matcha|🧋+🟢|8|1', 'blender|gelo,manga_c,perola_tapioca|bubble_manga|Bubble tea de manga|🧋+🥭|8|1',
    'blender|leite,morango_c,perola_tapioca|bubble_morango|Bubble tea de morango|🧋+🍓|8|1', 'bainmarie|acucar,gelatina,leite|pudim_gelatina|Gelatina cremosa|🍮+🟥|10', 'icecream|creme,gelatina,morango_c|gelatina_morango|Mousse gelada de morango|🍓+🍮|9',
    'mixer|bolacha,manteiga|base_bolacha|Base de bolacha|🥣+🍪|5', 'oven|base_bolacha,cream_cheese,ovo|cheesecake|Cheesecake|🍰+🧀|14', 'oven|base_bolacha,cream_cheese,framboesa|cheesecake_framboesa|Cheesecake de framboesa|🍰+🍓|14', 'oven|base_bolacha,cream_cheese,morango_c|cheesecake_morango|Cheesecake de morango|🍰+🍓|14'
  ]);
  CC.finalize();
})(window.CC);
