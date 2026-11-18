/* Cozinha Caos — pratos da expansão (id|cat|nome|emoji|partes|temperos) */
(function (CC) {
  'use strict';
  Object.assign(CC.CATS, { asia: ['Asiática', '🍜'], japa: ['Japonesa', '🍣'], churras: ['Churrasco & grelha', '🥩'], veg: ['Vegetariana', '🥦'], cafeteria: ['Cafeteria', '☕'], padaria: ['Padaria', '🥐'], gourmet: ['Gourmet', '🦞'] });
  const SH = { $P: 'sal,pimenta', $M: 'ketchup,mostarda,maionese', $I: 'parmesao,pimenta,azeite', $D: 'calda,chantilly,mel', $A: 'sal,azeite,pimenta', $H: 'molho_picante,pimenta,sal', $J: 'shoyu,molho_picante,pimenta', $S: 'shoyu,molho_picante,mel', $C: 'chantilly,mel,calda', $N: '' };
  function DD(lines) { lines.forEach(function (l) { const p = l.split('|'); const sh = SH[p[5]] != null ? SH[p[5]] : (p[5] || ''); CC.D(p[0], p[1], p[2], p[3], p[4].split(','), sh ? sh.split(',') : []); }); }
  DD([
    // Asiática
    'yaki_frango|asia|Yakisoba de Frango|🍜+🍗|yakisoba_frango|$J', 'yaki_carne|asia|Yakisoba de Carne|🍜+🥩|yakisoba_carne|$J', 'yaki_camarao|asia|Yakisoba de Camarão|🍜+🦐|yakisoba_camarao|$J',
    'arroz_chines|asia|Arroz Chinês|🍚+🥢|arroz_chines|$J', 'tofu_leg|asia|Tofu com Legumes|⬜+🥦|tofu_legumes|$J', 'carne_geng|asia|Carne com Gengibre e Arroz|🥘+🥩|carne_gengibre,arroz_vapor|$J',
    'frango_xadrez|asia|Frango Xadrez com Arroz|🥘+🥜|frango_amendoim,arroz_c|$J', 'camarao_alho_a|asia|Camarão ao Alho com Arroz|🥘+🦐|camarao_alho,arroz_vapor|$J', 'arroz_camarao_w|asia|Arroz Frito com Camarão|🍚+🦐|arroz_camarao_wok|$J',
    'arroz_carne_w|asia|Arroz Frito com Carne|🍚+🥩|arroz_carne_wok|$J', 'lula_s|asia|Lula Salteada com Arroz|🦑+🥘|lula_salteada,arroz_c|$J', 'pato_g|asia|Pato com Gengibre|🦆+🥘|pato_gengibre,arroz_vapor|$J',
    'pad_thai|asia|Pad Thai|🍜+🥜|pad_thai|$H', 'bao_combo|asia|Combo Bao|🥟+🥩|bao_carne,bao_frango|$S', 'dumplings|asia|Dumplings Mistos|🥟+🦐|dumpling_camarao,dumpling_carne|$S',
    'peixe_vapor|asia|Peixe no Vapor com Arroz|🐟+♨️|peixe_vapor,arroz_vapor,brocolis_v|$J', 'leg_vapor|asia|Legumes no Vapor|🥦+♨️|brocolis_v,batata_doce_v,abobora_v|$J', 'tofu_vapor|asia|Tofu no Vapor com Arroz|⬜+♨️|tofu_v,arroz_vapor|$J',
    'polvo_batata|asia|Polvo com Batatas|🐙+🥔|polvo_batata|$A', 'legumes_wok|asia|Legumes no Wok|🥦+🥕|legumes_wok|$J',
    // Japonesa
    'maki_salmao|japa|Maki de Salmão|🍣|sushi_salmao|$S', 'maki_atum|japa|Maki de Atum|🍣+🐡|sushi_atum|$S', 'maki_camarao|japa|Maki de Camarão|🍣+🦐|sushi_camarao|$S', 'maki_pepino|japa|Maki de Pepino|🍣+🥒|sushi_pepino|$S',
    'maki_abacate|japa|Maki de Abacate|🍣+🥑|sushi_abacate|$S', 'maki_polvo|japa|Maki de Polvo|🍣+🐙|sushi_polvo|$S', 'maki_tofu|japa|Maki de Tofu|🍣+⬜|sushi_tofu|$S', 'nigiri_salmao|japa|Nigiri de Salmão|🍙+🐠|nigiri_salmao|$S',
    'nigiri_atum|japa|Nigiri de Atum|🍙+🐡|nigiri_atum|$S', 'nigiri_camarao|japa|Nigiri de Camarão|🍙+🦐|nigiri_camarao|$S', 'phila|japa|Sushi Philadelphia|🍣+🧀|sushi_philadelphia|$S', 'sashimi_misto|japa|Sashimi Misto|🍱|sashimi_misto|$S',
    'sashimi_salmao|japa|Sashimi de Salmão|🐠+🔪|sashimi_salmao|$S', 'sashimi_atum|japa|Sashimi de Atum|🐡+🔪|sashimi_atum|$S', 'combo_sushi|japa|Combo Sushi|🍱+🍣|sushi_salmao,nigiri_atum,nigiri_camarao|$S',
    'barca_sushi|japa|Barca de Sushi|🚢+🍣|sushi_salmao,sushi_atum,sushi_camarao,sashimi_misto|$S', 'salmao_macarico|japa|Salmão Maçaricado|🐠+🔥|salmao_macarico,arroz_c|$S', 'atum_macarico|japa|Atum Maçaricado|🐡+🔥|atum_macarico,arroz_c|$S',
    // Churrasco & grelha
    'costela_def|churras|Costela Defumada|🦴+💨|costela_def,mandioca_frita|$H', 'costela_mand|churras|Costela com Mandioca|🦴+🍠|costela_mandioca|$H', 'brisket|churras|Brisket com Fritas|🥩+💨|brisket,batata_frita|$H',
    'costela_g|churras|Costela Grelhada|🦴+🔥|costela_g,mandioca_frita|$H', 'cordeiro_g|churras|Costeleta de Cordeiro|🐑+🔥|costeleta_cordeiro,batata_assada|$A', 'esp_cordeiro|churras|Espetinho de Cordeiro|🍢+🐑|espetinho_cordeiro|$H',
    'esp_salmao|churras|Espetinho de Salmão|🍢+🐠|espetinho_salmao|$A', 'esp_camarao|churras|Espetinho de Camarão|🍢+🦐|espetinho_camarao|$A', 'esp_peru|churras|Espetinho de Peru|🍢+🦃|espetinho_peru|$H',
    'esp_hawaii|churras|Espetinho Havaiano|🍢+🍍|espetinho_hawaii|$H', 'bbq_combo|churras|Combo Barbecue|🍖+💨|costela_def,linguica_def,milho_assado|$H', 'peru_def|churras|Peru Defumado com Purê|🦃+💨|peru_def,pure_batata|$A',
    'frango_def|churras|Frango Defumado com Arroz|🍗+💨|frango_def,arroz_c|$A', 'carne_panela|churras|Carne de Panela com Arroz|🥩+🥫|carne_panela,arroz_c|$P', 'feijao_costela|churras|Feijão com Costela|🫘+🦴|feijao_costela,arroz_c|$H',
    'burger_caseiro|churras|Burger Caseiro|🍔+🥣|pao_t,hamb_caseiro,queijo_c,cebola_car|maionese,mostarda,molho_picante', 'cordeiro_def|churras|Cordeiro Defumado|🐑+💨|cordeiro_def,pure_batata|$A', 'atum_chapa|churras|Atum na Chapa|🐡+🔥|atum_chapa,legumes_wok|$A',
    'lagosta_g|churras|Lagosta Grelhada com Purê|🦞+🔥|lagosta_g,pure_batata|$A', 'queijos_chapa|churras|Queijos na Chapa|🧀+🔥|mussarela_g,queijo_g|mel,molho_picante', 'salmao_chapa|churras|Salmão na Chapa com Legumes|🐠+🔥|salmao_grelhado,legumes_wok|$A',
    // Vegetariana
    'tofu_g|veg|Tofu Grelhado com Legumes|⬜+🔥|tofu_g,legumes_wok|$J', 'berinjela_g|veg|Legumes Grelhados|🍆+🔥|berinjela_g,abobora_g,mussarela_g|$A', 'falafel|veg|Falafel com Homus|🟡+🍟|falafel,homus|$H',
    'falafel_prato|veg|Prato de Falafel|🟡+🥗|falafel,homus,alface_c,tomate_c|$H', 'sopa_lentilha|veg|Sopa de Lentilha|🥣+🟤|sopa_lentilha|$I', 'sopa_grao|veg|Sopa de Grão-de-bico|🥣+🟡|sopa_grao|$I',
    'creme_brocolis|veg|Creme de Brócolis|🥣+🥦|creme_brocolis|$I', 'creme_abobora|veg|Creme de Abóbora|🥣+🎃|creme_abobora|$I', 'sopa_abobora|veg|Sopa de Abóbora|🥣+🎃|sopa_abobora|$I', 'sopa_brocolis|veg|Sopa de Brócolis|🥣+🥦|sopa_brocolis|$I',
    'borscht|veg|Borscht|🥣+🟣|borscht|$I', 'creme_bdoce|veg|Creme de Batata-doce|🥣+🍠|creme_batata_doce|$I', 'pure_brocolis|veg|Purê com Brócolis|🥔+🥦|pure_batata,brocolis_alho|$P', 'abobora_assada|veg|Abóbora Assada|🎃+🔥|abobora_assada|$A',
    'abobora_grat|veg|Abóbora Gratinada|🎃+🧀|abobora_gratinada|$P', 'berinjela_parm|veg|Berinjela à Parmegiana|🍆+🧀|berinjela_parmegiana,arroz_c|$I', 'polenta_grat|veg|Polenta Gratinada|🌽+🧀|polenta_gratinada|$I',
    'tofu_cogu|veg|Tofu com Cogumelos|⬜+🍄|tofu_cogumelo,arroz_c|$J', 'batata_doce_a|veg|Batata-doce Assada com Brócolis|🍠+🥦|batata_doce_assada,brocolis_v|$A', 'salada_grao|veg|Salada de Grão-de-bico|🟡+🥗|grao_c,tomate_c,pepino_c,cebola_c|$A',
    'salada_lentilha|veg|Salada de Lentilha|🟤+🥗|lentilha_c,cenoura_c,cebola_c|$A', 'salada_beterraba|veg|Salada de Beterraba|🟣+🥗|beterraba_c,queijo_c,alface_c|$A', 'berinjela_empanada|veg|Berinjela à Milanesa|🍆+🟤|berinjela_crocante,arroz_c|$P',
    'abobora_crocante|veg|Abóbora Crocante|🎃+🟤|abobora_crocante|$M', 'polenta_bolonhesa|veg|Polenta com Molho|🌽+🥫|polenta,molho_tomate|$I', 'ensopado_grao|veg|Ensopado de Grão-de-bico|🥣+🌿|caldo_verde_g|$I',
    'sopa_gengibre|veg|Creme de Cogumelo e Gengibre|🥣+🫚|sopa_gengibre|$I', 'abobora_frita|veg|Abóbora Frita|🎃+🍟|abobora_frita|$M', 'batata_doce_frita|veg|Batata-doce Frita|🍠+🍟|batata_doce_frita|$M',
    // Cafeteria
    'cafe_preto|cafeteria|Café|☕|cafe_preto|mel,chantilly', 'cafe_leite|cafeteria|Café com Leite|☕+🥛|cafe_leite|mel,chantilly', 'cha|cafeteria|Chá|🍵|cha_pronto|mel', 'cha_limao|cafeteria|Chá de Limão|🍵+🍋|cha_limao|mel',
    'mocha|cafeteria|Mocha|☕+🍫|mocha|chantilly,calda', 'cappuccino|cafeteria|Cappuccino|☕+🍦|cappuccino|chantilly,calda', 'cha_leite|cafeteria|Chá com Leite|🍵+🥛|cha_leite|mel', 'latte|cafeteria|Latte|☕+🥛|latte|chantilly,mel',
    'choco_cafe|cafeteria|Chocolate Cremoso|☕+🍫|chocolate_cafe|chantilly', 'cha_gengibre|cafeteria|Chá de Gengibre|🍵+🫚|cha_gengibre|mel', 'cafe_gelado|cafeteria|Café Gelado|☕+🧊|cafe_gelado|chantilly,calda', 'cha_gelado|cafeteria|Chá Gelado|🍵+🧊|cha_gelado|mel',
    'cafe_torrada|cafeteria|Café com Torrada|☕+🍞|cafe_preto,torrada|$N', 'cafe_pao|cafeteria|Café com Pão e Manteiga|☕+🧈|cafe_leite,pao_manteiga|$N', 'cafe_mista|cafeteria|Café com Tosta Mista|☕+🥪|cafe_leite,tosta_mista|$N',
    'cafe_bolo|cafeteria|Café com Bolo|☕+🍰|cafe_preto,bolo|$C', 'mocha_cookie|cafeteria|Mocha com Cookies|☕+🍪|mocha,cookies|$N', 'cha_biscoito|cafeteria|Chá com Biscoitos|🍵+🍪|cha_pronto,biscoitos|mel',
    'tosta_abacate|cafeteria|Tosta de Abacate|🍞+🥑|tosta_abacate|$A', 'tosta_caprese|cafeteria|Tosta Caprese|🍞+🍅|tosta_caprese|$A', 'tosta_queijo|cafeteria|Tosta de Queijo|🍞+🧀|tosta_queijo|$P', 'pao_requeijao|cafeteria|Pão com Requeijão|🍞+🥣|pao_requeijao|$N',
    'geleia_torrada|cafeteria|Torrada com Geleia de Morango|🍞+🍓|torrada,geleia_morango|$N', 'torrada_manga|cafeteria|Torrada com Geleia de Manga|🍞+🥭|torrada,geleia_manga|$N', 'torrada_amendoim|cafeteria|Torrada com Pasta de Amendoim|🍞+🥜|torrada,pasta_amendoim|mel',
    'cappuccino_cookie|cafeteria|Cappuccino com Cookie|☕+🍪|cappuccino,cookie_aveia|$N',
    // Padaria
    'pao_alho|padaria|Pão de Alho|🍞+🧄|pao_alho|$I', 'bolo_fuba|padaria|Bolo de Fubá|🍰+🌽|bolo_fuba|$N', 'folhado_queijo|padaria|Folhado de Queijo|🥐+🧀|folhado_queijo|$N', 'folhado_presunto|padaria|Folhado de Presunto|🥐+🍖|folhado_presunto|$N',
    'folhado_maca|padaria|Folhado de Maçã|🥐+🍎|folhado_maca|$D', 'folhado_choco|padaria|Folhado de Chocolate|🥐+🍫|folhado_choco|chantilly,calda', 'folhado_pera|padaria|Folhado de Pera|🥐+🍐|folhado_pera|$D', 'folhado_salmao|padaria|Folhado de Salmão|🥐+🐠|folhado_salmao|$A',
    'empada_carne|padaria|Empada de Carne|🥧+🥩|empada_carne|molho_picante', 'empada_frango|padaria|Empada de Frango|🥧+🍗|empada_frango|molho_picante', 'empada_frita|padaria|Empada Frita|🥧+🍟|empada_frita|molho_picante', 'pastel_camarao|padaria|Pastel de Camarão|🥟+🦐|pastel_camarao|molho_picante,maionese',
    'pastel_banana|padaria|Pastel de Banana|🥟+🍌|pastel_banana|mel,calda', 'pastel_choco|padaria|Pastel de Chocolate|🥟+🍫|pastel_choco|chantilly', 'pastel_catupiry|padaria|Pastel de Frango com Requeijão|🥟+🥣|pastel_catupiry|molho_picante', 'misto_chapa|padaria|Misto na Chapa|🥪+🔥|misto_chapa|maionese',
    'pao_chapa|padaria|Pão na Chapa com Queijo|🍞+🧀|pao_chapa|maionese', 'rabanada|padaria|Rabanada|🍞+🍳|rabanada|mel,calda,chantilly', 'waffle|padaria|Waffle|🧇|waffle|$C', 'waffle_sorvete|padaria|Waffle com Sorvete|🧇+🍦|waffle,sorvete_creme|$C',
    'waffle_frutas|padaria|Waffle com Frutas|🧇+🍓|waffle,morango_c,banana_c|$C', 'torta_cogumelo|padaria|Torta de Cogumelo|🥧+🍄|torta_cogumelo|$P', 'tosta_mista|padaria|Tosta Mista|🥪+🟤|tosta_mista|maionese', 'pao_manteiga|padaria|Pão com Manteiga|🍞+🧈|pao_manteiga|$N',
    // Gourmet
    'lagosta_v|gourmet|Lagosta no Vapor com Purê|🦞+♨️|lagosta_v,pure_batata|$A', 'lagosta_man|gourmet|Lagosta na Manteiga|🦞+🧈|lagosta_manteiga,arroz_c|$A', 'lagosta_grat|gourmet|Lagosta Gratinada|🦞+🧀|lagosta_gratinada|$A',
    'caranguejo_v|gourmet|Caranguejo com Milho|🦀+🌽|caranguejo_v,milho_cozido|$H', 'caranguejo_m|gourmet|Caranguejo ao Molho|🦀+🍅|caranguejo_molho,arroz_c|$H', 'ostras|gourmet|Ostras no Vapor|🦪+♨️|ostra_v|$A',
    'sopa_ostra|gourmet|Sopa de Ostras|🥣+🦪|sopa_ostra|$I', 'polvo_molho|gourmet|Polvo ao Molho com Arroz|🐙+🍅|polvo_molho,arroz_c|$A', 'polvo_g|gourmet|Polvo Grelhado com Batata|🐙+🔥|polvo_g,batata_assada|$A',
    'polvo_cozido|gourmet|Polvo com Brócolis|🐙+🥫|polvo_cozido,brocolis_alho|$A', 'lula_molho|gourmet|Lula ao Molho com Arroz|🦑+🍅|lula_molho,arroz_c|$A', 'lula_frita|gourmet|Lula Frita|🦑+🍟|lula_frita|$M', 'lula_crocante|gourmet|Lula à Dorê|🦑+🟤|lula_crocante,batata_frita|$M',
    'camarao_crocante|gourmet|Camarão Crocante|🦐+🟤|camarao_crocante,limao_c|$M', 'peixe_crocante|gourmet|Peixe Crocante com Fritas|🐟+🟤|peixe_crocante,batata_frita|$M', 'salmao_g|gourmet|Salmão Grelhado com Purê|🐠+🔥|salmao_g,pure_batata,brocolis_v|$A',
    'salmao_def|gourmet|Salmão Defumado na Torrada|🐠+💨|salmao_def,torrada|$A', 'salmao_assado|gourmet|Salmão ao Limão|🐠+🍋|salmao_assado,legumes_wok|$A', 'atum_g|gourmet|Atum Selado com Arroz|🐡+🔥|atum_g,arroz_c|$A',
    'pato_laranja|gourmet|Pato com Laranja|🦆+🍊|pato_laranja,pure_batata|$A', 'cordeiro_assado|gourmet|Cordeiro Assado|🐑+♨️|cordeiro_assado,batata_assada|$A', 'cordeiro_panela|gourmet|Cordeiro de Panela|🐑+🥫|cordeiro_panela,arroz_c|$A',
    'ensopado_cordeiro|gourmet|Ensopado de Cordeiro|🥣+🐑|ensopado_cordeiro|$I', 'peru_assado|gourmet|Peru Assado com Purê|🦃+♨️|peru_assado,pure_batata|$A', 'moqueca_carang|gourmet|Moqueca de Caranguejo|🍲+🦀|moqueca_caranguejo,arroz_c|$H',
    'moqueca_lula|gourmet|Moqueca de Lula|🍲+🦑|moqueca_lula,arroz_c|$H', 'moqueca_salmao|gourmet|Moqueca de Salmão|🍲+🐠|moqueca_salmao,arroz_c|$H', 'sopa_salmao|gourmet|Sopa de Salmão|🥣+🐠|sopa_salmao|$I',
    'costela_batata|gourmet|Costela Assada com Batata|🦴+🥔|costela_batata|$A', 'creme_brulee|gourmet|Crème Brûlée|🍮+🔥|creme_brulee|$N',
    // Lanches extras
    'frango_crocante|lanche|Frango Crocante|🍗+🟤|frango_crocante|$M', 'milanesa|lanche|Milanesa com Fritas|🥩+🟤|milanesa_frita,batata_frita|$M', 'carne_parm|lanche|Bife à Parmegiana com Arroz|🥩+🧀|carne_parmegiana,arroz_c|$P',
    'frango_parm|lanche|Frango à Parmegiana com Fritas|🍗+🧀|frango_parmegiana,batata_frita|$P', 'hotdog_def|lanche|Cachorro-quente Defumado|🌭+💨|pao_t,linguica_def|$M', 'sand_peru|lanche|Sanduíche de Peru|🥪+🦃|pao_t,peru_g,alface_c,tomate_c,queijo_c|$M',
    'sand_salmao|lanche|Sanduíche de Salmão|🥪+🐠|pao_t,salmao_g,alface_c|maionese,mostarda', 'sand_brisket|lanche|Sanduíche de Brisket|🥪+💨|pao_t,brisket,cebola_car|$M', 'xtudo|lanche|X-Tudo|🍔+🍳|pao_t,patty,queijo_c,bacon_f,ovo_f,alface_c,tomate_c|$M',
    'peixe_pao|lanche|Peixe Crocante no Pão|🥪+🐟|pao_t,peixe_crocante,alface_c|maionese,mostarda', 'nachos|lanche|Nachos|🌮+🥑|tortilla_t,salsa_mex,guacamole|molho_picante', 'homus_tortilla|lanche|Homus com Tortilla|🟡+🫓|homus,tortilla_t|$A',
    'ovo_pao2|lanche|Ovo no Pão|🍳+🍞|ovo_no_pao|$P', 'tortilla_ovo|lanche|Tortilla com Ovo e Bacon|🫓+🍳|tortilla_ovo|molho_picante',
    // Italiana extras
    'mac_pesto|ita|Macarrão ao Pesto|🍝+🍃|macarrao_pesto|$I', 'mac_gorgonzola|ita|Macarrão ao Gorgonzola|🍝+🧀|macarrao_gorgonzola|$I', 'mac_queijo|ita|Macarrão ao Cheddar|🍝+🟠|macarrao_queijo|$I', 'mac_salmao|ita|Macarrão com Salmão|🍝+🐠|macarrao_salmao|$I',
    'mac_lula|ita|Macarrão com Lula|🍝+🦑|macarrao_lula|$I', 'fresca_molho|ita|Massa Fresca ao Molho|🍝+🫓|fresca_molho|$I', 'verde_branco|ita|Massa Verde ao Molho Branco|🍝+🌿|verde_branco|$I', 'ravioli_molho|ita|Ravioli ao Molho|🥟+🍅|ravioli_molho|$I',
    'ravioli_forno|ita|Ravioli Gratinado|🥟+🔥|ravioli_forno|$I', 'lasanha_fresca|ita|Lasanha de Massa Fresca|🥘+🫓|lasanha_fresca|$I', 'caprese|ita|Caprese Gratinada|🍅+🧀|caprese_gratin|$A', 'mac_presunto|ita|Macarrão com Presunto Gratinado|🍝+🍖|macarrao_presunto_forno|$I',
    'ravioli_esp|ita|Ravioli de Espinafre ao Molho Branco|🥟+🌿|ravioli_espinafre,molho_branco|$I',
    // Pizzas extras
    'pizza_napolitana|pizza|Pizza Napolitana|🍕+🍃|pizza_napolitana|$A', 'pizza_quatro|pizza|Pizza Quatro Queijos|🍕+🧀|pizza_quatro|$A', 'pizza_bacon|pizza|Pizza de Bacon|🍕+🥓|pizza_bacon|$A', 'pizza_frango|pizza|Pizza de Frango|🍕+🍗|pizza_frango|$A',
    'pizza_azeitona|pizza|Pizza de Azeitona|🍕+🫒|pizza_azeitona|$A', 'pizza_pimentao|pizza|Pizza de Pimentão|🍕+🫑|pizza_pimentao|$A', 'pizza_carne|pizza|Pizza de Carne|🍕+🥩|pizza_carne|$A', 'pizza_camarao|pizza|Pizza de Camarão|🍕+🦐|pizza_camarao|$A',
    'pizza_choco|pizza|Pizza de Chocolate|🍕+🍫|pizza_choco|chantilly,calda', 'pizza_salmao|pizza|Pizza de Salmão|🍕+🐠|pizza_salmao|$A',
    // Sobremesas extras
    'pudim|doce|Pudim|🍮|pudim|calda,chantilly', 'merengue|doce|Merengue|🍥+🔥|merengue|$C', 'banana_flamb|doce|Banana Flambada com Sorvete|🍌+🔥|banana_flambada,sorvete_creme|$C', 'pera_brulee|doce|Pera Brûlée|🍐+🔥|pera_brulee|$C',
    'manga_brulee|doce|Manga Brûlée|🥭+🔥|manga_brulee|$C', 'morango_brulee|doce|Morango Brûlée|🍓+🔥|morango_brulee|$C', 'bolo_banana|doce|Bolo de Banana|🍰+🍌|bolo_banana|$D', 'bolo_laranja|doce|Bolo de Laranja|🍰+🍊|bolo_laranja|$D',
    'bolo_coco|doce|Bolo de Coco|🍰+🥥|bolo_coco|$D', 'bolo_morango|doce|Bolo de Morango|🍰+🍓|bolo_morango|$D', 'bolo_limao|doce|Bolo de Limão|🍰+🍋|bolo_limao|$D', 'torta_pera|doce|Torta de Pera|🥧+🍐|torta_pera|$D',
    'torta_pessego|doce|Torta de Pêssego|🥧+🍑|torta_pessego|$D', 'torta_limao|doce|Torta de Limão|🥧+🍋|torta_limao|$D', 'torta_cereja|doce|Torta de Cereja|🥧+🍒|torta_cereja|$D', 'torta_mirtilo|doce|Torta de Mirtilo|🥧+🫐|torta_mirtilo|$D',
    'cookie_amendoim|doce|Cookie de Amendoim|🍪+🥜|cookie_amendoim|chantilly', 'cookie_aveia|doce|Cookie de Aveia|🍪+🌾|cookie_aveia|mel', 'sorvete_creme|doce|Sorvete de Creme|🍦|sorvete_creme|$C', 'sorvete_choco|doce|Sorvete de Chocolate|🍦+🍫|sorvete_choco|$C',
    'sorvete_morango|doce|Sorvete de Morango|🍦+🍓|sorvete_morango|$C', 'sorvete_manga|doce|Sorvete de Manga|🍦+🥭|sorvete_manga|$C', 'sorvete_coco|doce|Sorvete de Coco|🍦+🥥|sorvete_coco|$C', 'sorvete_maracuja|doce|Sorvete de Maracujá|🍦+🟡|sorvete_maracuja|$C',
    'sorvete_pessego|doce|Sorvete de Pêssego|🍦+🍑|sorvete_pessego|$C', 'raspadinha|doce|Raspadinha de Laranja|🍧|raspadinha|mel', 'raspa_limao|doce|Raspadinha de Limão|🍧+🍋|raspa_limao|mel', 'raspa_melancia|doce|Raspadinha de Melancia|🍧+🍉|raspa_melancia|mel',
    'raspa_kiwi|doce|Raspadinha de Kiwi|🍧+🥝|raspa_kiwi|mel', 'frozen_iogurte|doce|Frozen Yogurt|🍨+🍓|frozen_iogurte|$C', 'sundae|doce|Sundae com Calda de Morango|🍨+🍓|sorvete_creme,calda_morango|chantilly', 'taca_manga|doce|Taça de Manga e Maracujá|🥭+🍨|sorvete_manga,manga_c,calda_maracuja|chantilly',
    'banana_split|doce|Banana Split|🍌+🍨|banana_c,sorvete_creme,sorvete_choco,sorvete_morango|$C', 'arroz_doce|doce|Arroz-doce|🍚+🥛|arroz_doce|mel', 'canjica|doce|Canjica|🌽+🥛|canjica|mel', 'doce_abobora|doce|Doce de Abóbora com Coco|🎃+🥥|doce_abobora|chantilly',
    'doce_banana|doce|Doce de Banana com Sorvete|🍌+🍨|doce_banana,sorvete_creme|$C', 'compota_pera|doce|Compota de Pera com Sorvete|🍐+🍨|compota_pera,sorvete_creme|$C', 'compota_pessego|doce|Compota de Pêssego com Sorvete|🍑+🍨|compota_pessego,sorvete_creme|$C',
    'mingau|doce|Mingau de Aveia|🥣+🌾|mingau|mel', 'mingau_banana|doce|Mingau de Banana|🥣+🍌|mingau_banana|mel', 'maca_car|doce|Maçã Caramelizada com Sorvete|🍎+🔥|maca_car,sorvete_creme|$C', 'pera_car|doce|Pera Caramelizada|🍐+🔥|pera_car,sorvete_creme|$C',
    'pessego_car|doce|Pêssego Caramelizado|🍑+🔥|pessego_car,sorvete_creme|$C', 'manga_car|doce|Manga Caramelizada|🥭+🔥|manga_car,sorvete_manga|$C', 'pera_grelhada|doce|Pera Grelhada com Mel|🍐+🔥|pera_g|mel,chantilly', 'pessego_grelhado|doce|Pêssego Grelhado|🍑+🔥|pessego_g,sorvete_creme|$C',
    'panqueca_aveia|doce|Panqueca de Aveia|🥞+🌾|panqueca_aveia,banana_c|$C', 'churros_choco|doce|Churros Recheado|🥨+🍫|churros_choco|calda,mel', 'cookies_sorvete|doce|Cookies com Sorvete|🍪+🍦|cookies,sorvete_choco|$C',
    // Bebidas extras
    'suco_manga|bebida|Suco de Manga|🥭+🥤|suco_manga|mel', 'suco_melancia|bebida|Suco de Melancia|🍉+🥤|suco_melancia|mel', 'suco_maracuja|bebida|Suco de Maracujá|🟡+🥤|suco_maracuja|mel', 'suco_uva|bebida|Suco de Uva|🍇+🥤|suco_uva|mel',
    'suco_pessego|bebida|Suco de Pêssego|🍑+🥤|suco_pessego|mel', 'suco_kiwi|bebida|Suco de Kiwi e Maçã|🥝+🥤|suco_kiwi|mel', 'suco_cenoura|bebida|Suco de Cenoura e Laranja|🥕+🥤|suco_cenoura|mel', 'suco_beterraba|bebida|Suco de Beterraba|🟣+🥤|suco_beterraba|mel',
    'limonada_gengibre|bebida|Limonada com Gengibre|🍋+🫚|limonada_gengibre|mel', 'suco_melao|bebida|Suco de Melão Gelado|🍈+🥤|suco_melao|mel', 'lassi_manga|bebida|Lassi de Manga|🥭+🥛|lassi_manga|mel', 'iogurte_morango|bebida|Iogurte Batido de Morango|🍓+🥛|iogurte_morango|mel',
    'smoothie_mirtilo|bebida|Smoothie de Mirtilo|🫐+🥤|smoothie_mirtilo|mel', 'frappe_choco|bebida|Frappé de Chocolate|🍫+🧊|frappe_choco|chantilly,calda', 'shake_amendoim|bebida|Shake de Amendoim|🥜+🥤|shake_amendoim|chantilly,calda', 'suco_detox|bebida|Suco Detox|🥬+🥤|suco_detox|mel',
    'refresco_melancia|bebida|Refresco de Melancia|🍉+🍋|refresco_melancia|mel', 'pina_colada|bebida|Piña Colada sem Álcool|🍍+🥥|pina_colada|chantilly', 'smoothie_cereja|bebida|Smoothie de Cereja|🍒+🥤|smoothie_cereja|mel', 'suco_gelado|bebida|Suco Gelado de Uva e Kiwi|🍇+🧊|suco_gelado|mel',
    'limonada_verde|bebida|Limonada Verde|🍋+🌱|limonada_verde|mel',
    // Brasileira extras
    'galinhada|br|Galinhada|🍚+🍗|galinhada|$H', 'feijao_tropeiro|br|Feijão com Linguiça Defumada|🫘+💨|feijao_pressao,arroz_c,ovo_f,linguica_def|$H', 'frango_panela|br|Frango de Panela com Arroz|🍗+🥫|frango_panela,arroz_c|$P',
    'costela_pressao|br|Costela com Mandioca e Feijão|🦴+🍠|costela_mandioca,feijao_c|$H', 'bolinho_peixe|br|Bolinho de Peixe|🐟+🟤|bolinho_peixe|$H', 'pastel_catu|br|Pastel Catupiry Duplo|🥟+🥣|pastel_catupiry,pastel_queijo|$H'
  ]);
  CC.finalize();
})(window.CC);
