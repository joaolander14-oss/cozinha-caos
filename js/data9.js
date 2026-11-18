/* Cozinha Caos — pratos da expansão 4 */
(function (CC) {
  'use strict';
  const SH = { $P: 'sal,pimenta', $A: 'sal,azeite,pimenta,ervas', $I: 'parmesao,pimenta,azeite', $D: 'calda,chantilly,mel,caramelo', $IN: 'garam,cardamomo,acafrao,molho_picante,sal', $TH: 'molho_peixe,molho_picante,gergelim', $KR: 'gochujang,gergelim,shoyu,molho_picante',
    $MX: 'chipotle,molho_picante,sal,pimenta', $FR: 'ervas,pimenta,sal,azeite', $US: 'ketchup,mostarda,maionese,bbq', $SW: 'canela,mel,xarope,chantilly,caramelo', $J: 'shoyu,wasabi,molho_picante,gergelim', $N: '' };
  function DD(lines) { lines.forEach(function (l) { const p = l.split('|'); const sh = SH[p[5]] != null ? SH[p[5]] : (p[5] || ''); CC.D(p[0], p[1], p[2], p[3], p[4].split(','), sh ? sh.split(',').filter(function (s) { return CC.SEAS[s]; }) : []); }); }
  DD([
    // ---- Índia
    'ind_paneer|mundo|Paneer Salteado com Naan|🧀+🔥|paneer_salteado,naan|$IN', 'ind_paneer_t|mundo|Paneer ao Molho de Tomate|🧀+🍅|paneer_tomate,arroz_pilau|$IN', 'ind_masala|mundo|Frango Masala com Naan|🍗+🥘|frango_masala,naan|$IN', 'ind_grao|mundo|Curry de Grão-de-bico com Arroz|🟡+🥘|curry_grao,arroz_pilau|$IN',
    'ind_aloo|mundo|Aloo Gobi com Naan|🥔+🥦|aloo_gobi,naan|$IN', 'ind_dal|mundo|Dal de Lentilha com Naan|🟤+🥣|dal,naan|$IN', 'ind_tandoori|mundo|Frango Tandoori com Arroz|🍗+🔥|frango_tandoori,arroz_pilau,molho_hortela|$IN', 'ind_cordeiro|mundo|Cordeiro Tandoori com Naan|🐑+🔥|cordeiro_tandoori,naan|$IN',
    'ind_paneer_g|mundo|Paneer Grelhado com Molho de Hortelã|🧀+🔥|paneer_g,molho_hortela|$IN', 'ind_samosa|mundo|Samosas|🥟+🥔|samosa,samosa|$IN', 'ind_bhaji|mundo|Bhaji de Cebola|🧅+🍟|bhaji,molho_hortela|$IN', 'ind_lassi|bebida|Lassi Salgado|🥛+🍋|lassi_salgado|cardamomo',
    'ind_naan|mundo|Pão Naan com Molho de Hortelã|🫓+🌿|naan,molho_hortela|$IN', 'ind_banquete|mundo|Banquete Indiano|🍛+🫓|naan,frango_masala,arroz_pilau,dal|$IN',
    // ---- Tailândia e Vietnã
    'tai_tomkha|asia|Sopa Tom Kha|🥣+🥥|tom_kha|$TH', 'tai_tomyum|asia|Sopa Tom Yum|🥣+🍤|tom_yum|$TH', 'tai_curry_f|asia|Curry Verde de Frango com Arroz|🍗+🟢|curry_verde,arroz_c|$TH', 'tai_curry_c|asia|Curry Verde de Camarão com Arroz|🦐+🟢|curry_camarao,arroz_c|$TH',
    'tai_seew|asia|Pad See Ew|🍜+🥬|pad_see_ew|$TH', 'tai_manj|asia|Frango ao Manjericão com Arroz|🍗+🍃|frango_manjericao,arroz_vapor|$TH', 'vn_rolinho_c|asia|Rolinho Fresco de Camarão|🥬+🦐|rolinho_camarao|$TH', 'vn_rolinho_t|asia|Rolinho Fresco de Tofu|🥬+⬜|rolinho_tofu|$TH',
    'vn_primavera|asia|Rolinho Primavera|🌯+🍟|rolinho_primavera,molho_hortela|$TH', 'vn_pho|asia|Pho de Carne|🍜+🥩|pho|$TH', 'vn_pho_f|asia|Pho de Frango|🍜+🍗|pho_frango|$TH', 'vn_rolinhos|asia|Rolinhos Frescos Mistos|🥬+🌿|rolinho_camarao,rolinho_tofu|$TH',
    // ---- Coreia
    'kr_bulgogi|asia|Bulgogi com Arroz|🥩+🔥|bulgogi,arroz_c|$KR', 'kr_bibim|asia|Bibimbap|🍚+🌶️|bibimbap|$KR', 'kr_tteok|asia|Tteokbokki|🍡+🌶️|tteokbokki|$KR', 'kr_kimchi_tofu|asia|Tofu com Kimchi e Arroz|⬜+🌶️|kimchi_tofu,arroz_c|$KR',
    'kr_daikon|asia|Carne com Daikon|🥩+⚪|carne_daikon,arroz_c|$KR', 'kr_picles|deli|Picles de Daikon e Kimchi|⚪+🌶️|picles_daikon,kimchi|$KR', 'kr_sopa|asia|Sopa de Daikon|🥣+⚪|sopa_daikon|$KR',
    // ---- México
    'mx_quesadilla|mex|Quesadilla de Jalapeño|🫓+🌶️|quesadilla_jalapeno|$MX', 'mx_nopal_ovo|mex|Ovos com Nopal|🍳+🌵|nopal_ovo,tortilla_t|$MX', 'mx_nopal_g|mex|Nopal Grelhado com Guacamole|🌵+🔥|nopal_g,tortilla_t,guacamole|$MX', 'mx_salsa|mex|Salsa Verde com Chips|🟢+🌽|salsa_verde,tortilla_chips|$MX',
    'mx_pico|mex|Pico de Gallo com Chips|🍅+🌽|pico_gallo,tortilla_chips|$MX', 'mx_enchilada_f|mex|Enchilada de Frango|🌯+🧀|enchilada_frango|$MX', 'mx_enchilada_c|mex|Enchilada de Carne|🌯+🥩|enchilada_carne|$MX', 'mx_pupusa|mex|Pupusa de Queijo|🫓+🧀|pupusa|$MX',
    'mx_pupusa_f|mex|Pupusa de Feijão|🫓+🫘|pupusa_feijao|$MX', 'mx_chips|mex|Nachos Completos|🌽+🥑|tortilla_chips,guacamole,salsa_verde|$MX', 'mx_empanada|mex|Empanada Frita de Queijo|🥟+🧀|empanada_queijo|$MX', 'mx_chili|mex|Chili con Carne|🌶️+🥘|chili,arroz_c,tortilla_chips|$MX',
    'mx_sopa|mex|Sopa de Feijão e Milho|🥣+🫘|sopa_feijao_milho|$MX', 'mx_rancheros|mex|Huevos Rancheros|🍳+🌮|huevos_rancheros|$MX', 'mx_mesa|mex|Mesa Mexicana|🌮+🌽|tortilla_chips,guacamole,salsa_verde,pico_gallo|$MX',
    // ---- França, Espanha, Grécia
    'fr_brie|gourmet|Brie Assado em Massa|🧀+🥐|brie_assado|$FR', 'fr_camembert|gourmet|Camembert Assado com Torrada|🧀+🍞|camembert_assado,torrada|$FR', 'fr_escargot_m|gourmet|Escargot na Manteiga|🐌+🧈|escargot_manteiga,pao_t|$FR', 'fr_escargot_f|gourmet|Escargot Gratinado|🐌+♨️|escargot_forno|$FR',
    'fr_cogumelo|gourmet|Cogumelos à Crème|🍄+🥛|cogumelo_creme,pao_t|$FR', 'fr_confit|gourmet|Confit de Pato com Gratin|🦆+🥔|pato_confit,gratin_dauphinois|$FR', 'fr_gratin|gourmet|Gratin Dauphinois|🥔+🧀|gratin_dauphinois|$FR', 'fr_trufa|gourmet|Massa à Trufa|🍝+🍄|massa_trufa|$FR',
    'fr_tartine|gourmet|Tartine de Brie|🥖+🧀|tartine_brie|$FR', 'fr_bruschetta|gourmet|Bruschetta de Baguete|🥖+🍅|bruschetta_baguete|$FR', 'fr_fondant|doce|Petit Gâteau com Sorvete|🍫+🎂|fondant,sorvete_baunilha|$D', 'fr_tatin|doce|Tarte Tatin com Sorvete|🥧+🍎|tarte_tatin,sorvete_creme|$D',
    'es_tortilla|mundo|Tortilla Espanhola|🍳+🥔|tortilla_espanhola|$A', 'es_paella_m|mundo|Paella de Frutos do Mar|🥘+🦐|paella_mar|$A', 'es_paella_x|mundo|Paella Mista|🥘+🍗|paella_mista|$A', 'es_gambas|mundo|Gambas ao Alho com Pão|🦐+🧄|gambas_pil,pao_t|$A',
    'gr_feta|mundo|Feta com Tomate e Pão Sírio|🧀+🍅|feta_tomate,pao_sirio_t|$A', 'gr_moussaka|mundo|Moussaka|🍆+🥩|moussaka|$A', 'gr_gyros_c|mundo|Gyros de Cordeiro|🌯+🐑|gyros_cordeiro|$A', 'gr_gyros_f|mundo|Gyros de Frango|🌯+🍗|gyros_frango|$A', 'gr_tzatziki|mundo|Tzatziki com Pão Sírio|🥒+🫓|tzatziki,pao_sirio_t|$A',
    // ---- EUA e Alemanha
    'de_salsicha|mundo|Salsicha com Batata|🌭+🥔|salsicha_batata|$US', 'de_ensopado|mundo|Ensopado de Repolho|🥣+🥬|ensopado_repolho|$P', 'de_pretzel|mundo|Pretzel com Salsicha|🥨+🌭|pretzel,salsicha_g|$US', 'us_strudel|doce|Strudel de Maçã com Sorvete|🥧+🍎|strudel,sorvete_baunilha|$SW',
    'us_peru|gourmet|Peru com Cranberry e Purê|🦃+🍒|peru_cranberry,molho_cranberry,pure_cremoso|$A', 'us_marshmallow|doce|Marshmallow com Chocolate|⚪+🍫|marshmallow_choco|$SW', 'us_smore|doce|S\'more|🍪+🔥|smore|$SW', 'us_corndog|lanche|Corn Dog|🌭+🍟|corn_dog|$US', 'us_loaded|lanche|Batata Loaded|🥔+🧀|batata_loaded|$US',
    // ---- África e vegetal
    'af_banana|br|Banana-da-terra Frita com Arroz e Feijão|🍌+🔥|banana_terra_f,arroz_c,feijao_c|$H', 'af_chips|deli|Chips de Banana-da-terra|🍌+🍟|banana_terra_chips|$A', 'af_amendoim|mundo|Ensopado de Amendoim com Sorgo|🥜+🥘|ensopado_amendoim,sorgo_c|$A', 'af_inhame|mundo|Ensopado de Inhame|🍠+🥘|inhame_ensopado|$A',
    've_tempeh|veg|Tempeh Grelhado com Arroz Integral|🟫+🔥|tempeh_g,arroz_int_c|$A', 've_seitan|veg|Seitan Grelhado com Legumes|🟤+🔥|seitan_g,legumes_wok|$A', 've_seitan_w|veg|Seitan no Wok|🟤+🥘|seitan_wok,arroz_c|$A', 've_tempeh_w|veg|Tempeh no Wok|🟫+🥘|tempeh_wok,arroz_c|$A',
    've_porcini_t|veg|Torta de Porcini|🥧+🍄|torta_porcini|$A', 've_porcini_s|veg|Porcini Salteado com Purê|🍄+🔥|porcini_s,pure_cremoso|$A', 'af_doce|doce|Banana-da-terra em Calda|🍌+🥥|doce_banana_terra,sorvete_creme|$SW',
    // ---- Itália e Japão
    'it_tiramisu|ita|Tiramisù|🍰+☕|creme_mascarpone,savoiardi,cafe_preto|cacau_s,chantilly', 'it_massa_ricota|ita|Massa com Ricota e Espinafre|🍝+🧀|massa_ricota|$I', 'it_canelone|ita|Canelone de Ricota|🥟+🧀|canelone_ricota|$I',
    'pz_presunto_cru|pizza|Pizza de Presunto Cru|🍕+🍖|pizza_presunto_cru|$A', 'pz_trufa|pizza|Pizza de Trufa e Porcini|🍕+🍄|pizza_trufa|$A', 'pz_figo|pizza|Pizza de Figo e Gorgonzola|🍕+🟣|pizza_figo|$A', 'pz_jalapeno|pizza|Pizza de Jalapeño|🍕+🌶️|pizza_jalapeno|$MX',
    'jp_tobiko|japa|Maki de Tobiko|🍣+🟠|sushi_tobiko|$J', 'jp_wakame|japa|Maki de Wakame|🍣+🟢|sushi_wakame|$J', 'jp_nig_dourado|japa|Nigiri de Dourado|🍙+🐟|nigiri_dourado|$J', 'jp_sashimi_d|japa|Sashimi de Dourado|🐟+🔪|sashimi_dourado|$J', 'jp_miso_w|japa|Sopa de Miso com Wakame|🥣+🟢|miso_wakame|gergelim,shoyu',
    'mr_sepia|mar|Sépia Grelhada com Arroz|🦑+🔥|sepia_g,arroz_c|$A', 'mr_pescada_f|mar|Pescada Frita com Fritas|🐟+🍟|pescada_frita,batata_frita|$A', 'mr_dourado_a|mar|Dourado ao Limão com Legumes|🐟+🍋|dourado_assado,legumes_wok|$A', 'mr_dourado_g|mar|Dourado Selado com Purê|🐟+🔥|dourado_g,pure_cremoso|$A', 'mr_pescada_v|mar|Pescada no Vapor com Arroz|🐟+♨️|pescada_vapor,arroz_vapor|$J',
    // ---- Doces e bebidas
    'bb_bubble_l|bebida|Bubble Tea de Leite|🧋|bubble_leite|mel', 'bb_bubble_m|bebida|Bubble Tea de Matcha|🧋+🟢|bubble_matcha|mel', 'bb_bubble_ma|bebida|Bubble Tea de Manga|🧋+🥭|bubble_manga|mel', 'bb_bubble_mo|bebida|Bubble Tea de Morango|🧋+🍓|bubble_morango|mel',
    'sb_gelatina|doce|Gelatina Cremosa|🍮+🟥|pudim_gelatina|$SW', 'sb_gelatina_m|doce|Mousse Gelada de Morango|🍓+🍮|gelatina_morango|$SW', 'sb_cheesecake|doce|Cheesecake|🍰+🧀|cheesecake|$D', 'sb_cheesecake_f|doce|Cheesecake de Framboesa|🍰+🍓|cheesecake_framboesa|$D', 'sb_cheesecake_m|doce|Cheesecake de Morango|🍰+🍓|cheesecake_morango|$D',
    'sb_festival|mundo|Festival de Entradas do Mundo|🌍+🥟|samosa,rolinho_primavera,empanada_queijo|$A'
  ]);
  CC.finalize();
})(window.CC);
