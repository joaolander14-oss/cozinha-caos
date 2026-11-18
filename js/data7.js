/* Cozinha Caos — pratos da expansão 3 */
(function (CC) {
  'use strict';
  Object.assign(CC.CATS, { inseto: ['Entomofagia', '🦗'], mundo: ['Cozinha do Mundo', '🌍'] });
  const SH = { $P: 'sal,pimenta', $M: 'ketchup,mostarda,maionese', $I: 'parmesao,pimenta,azeite', $D: 'calda,chantilly,mel', $A: 'sal,azeite,pimenta,ervas', $H: 'molho_picante,pimenta,sal', $J: 'shoyu,molho_picante,pimenta,gergelim', $S: 'shoyu,wasabi,molho_picante,gergelim', $C: 'chantilly,mel,calda,caramelo',
    $B: 'bbq,ingles,chimichurri,pimenta,sal', $G: 'gergelim,shoyu,molho_picante', $V: 'vinagre,azeite,sal', $E: 'canela,mel,chantilly', $N: '', $K: 'maionese,mostarda,paprica', $X: 'sal,molho_picante,paprica,limao', $Z: 'chimichurri,sal,pimenta' };
  function DD(lines) { lines.forEach(function (l) { const p = l.split('|'); const sh = SH[p[5]] != null ? SH[p[5]] : (p[5] || ''); CC.D(p[0], p[1], p[2], p[3], p[4].split(','), sh ? sh.split(',').filter(function (s) { return CC.SEAS[s]; }) : []); }); }
  DD([
    // ---- Entomofagia
    'in_grilo|inseto|Grilo Frito Crocante|🦗+🍟|grilo_frito|$X', 'in_larva|inseto|Larva Frita|🐛+🍟|larva_frita|$X', 'in_gafanhoto|inseto|Gafanhoto na Brasa com Limão|🦗+🔥|gafanhoto_g,limao_c|$X', 'in_formiga|inseto|Formiga com Chocolate|🐜+🍫|formiga_choco|chantilly',
    'in_larva_wok|inseto|Larva ao Alho com Arroz|🐛+🥘|larva_wok,arroz_c|$G', 'in_pao|inseto|Pão Proteico com Queijo|🍞+🦗|pao_proteico,queijo_c|$K', 'in_pasta|inseto|Pasta de Grilo com Torrada|🦗+🥣|pasta_grilo,torrada|$A', 'in_maki|inseto|Maki de Grilo|🍣+🦗|sushi_grilo|$S',
    'in_seda|inseto|Bicho-da-seda no Vapor com Arroz|🐛+♨️|bicho_seda_v,arroz_c|$G', 'in_cigarra|inseto|Cigarra Defumada|🪲+💨|cigarra_def|$B', 'in_gaf_c|inseto|Gafanhoto Crocante com Fritas|🦗+🟤|gafanhoto_crocante,batata_frita|$K', 'in_form_car|inseto|Formiga Caramelizada|🐜+🔥|formiga_caramelo|$C',
    'in_sorv|inseto|Sorvete de Formiga|🍦+🐜|sorvete_formiga|$C', 'in_pipoca|inseto|Pipoca com Grilo|🍿+🦗|pipoca_grilo|sal,paprica', 'in_sand|inseto|Sanduíche de Grilo|🥪+🦗|sand_grilo_p|$K', 'in_seco|inseto|Petisco de Grilo e Manga Seca|🦗+🥭|grilo_seco,manga_seca|mel',
    'in_fonte|inseto|Grilo com Chocolate|🦗+🍫|grilo_choco|chantilly', 'in_arroz|inseto|Arroz com Larva|🍚+🐛|arroz_larva|$G', 'in_taco|inseto|Taco de Grilo|🌮+🦗|tortilla,grilo_frito,guacamole,alface_c|molho_picante', 'in_degust|inseto|Degustação de Insetos|🦗+🐛|grilo_frito,larva_frita,gafanhoto_g|$X',
    'in_combo2|inseto|Combo Crocante|🦗+🥤|grilo_frito,gafanhoto_crocante,refrigerante|$X', 'in_seco2|inseto|Petisco Seco Misto|🦗+☀️|grilo_seco,banana_chips,uva_passa|mel',
    // ---- Carnes e caça
    'ca_picanha|churras|Picanha na Chapa com Mandioca|🥩+🔴|picanha_g,mandioca_frita|$B', 'ca_fralda|churras|Fraldinha com Farofa|🥩+🟤|fraldinha_g,farofa_bacon|$B', 'ca_cupim|churras|Cupim na Chapa com Arroz|🥩+🟠|cupim_g,arroz_c|$B', 'ca_cupim_def|churras|Cupim Defumado com Purê|🥩+💨|cupim_def,pure_cremoso|$B',
    'ca_cupim_pan|churras|Cupim de Panela|🥩+🥫|cupim_panela,arroz_c|$B', 'ca_coelho|gourmet|Coelho Salteado com Purê|🐇+🔥|coelho_g,pure_cremoso|$A', 'ca_coelho_a|gourmet|Coelho Assado|🐇+♨️|coelho_assado,batata_assada|$A', 'ca_codorna|gourmet|Codorna Dourada com Arroz|🐦+🔥|codorna_g,arroz_c|$A',
    'ca_codorna_a|gourmet|Codorna Assada|🐦+♨️|codorna_assada,pure_cremoso|$A', 'ca_javali|churras|Javali Grelhado|🐗+🔥|javali_g,mandioca_frita|$B', 'ca_javali_p|churras|Javali de Panela|🐗+🥫|javali_panela,arroz_c|$B', 'ca_pernil|br|Pernil Assado com Farofa|🍖+♨️|pernil_assado,farofa_bacon|$B',
    'ca_pernil_d|churras|Pernil Defumado|🍖+💨|pernil_def,batata_assada|$B', 'ca_presunto_cru|deli|Presunto Cru Selado com Melão|🍖+🍈|presunto_cru_g,melao_c|$A', 'ca_chorizo|churras|Chorizo Frito com Pão|🌭+🔥|chorizo_g,torrada|$Z', 'ca_choripan|churras|Choripán|🌭+🥖|choripan|$Z',
    'ca_pastel_chorizo|br|Pastel de Chorizo|🥟+🌭|pastel_chorizo|$H', 'ca_feijao_pc|br|Feijão com Presunto Cru|🫘+🍖|feijao_presunto,arroz_c|$H', 'ca_picanha_s|deli|Picanha Seca|🥩+☀️|picanha_seca,mandioca_frita|$H',
    // ---- Mar
    'mr_tilapia_g|mar|Tilápia Grelhada com Arroz|🐟+🔥|tilapia_g,arroz_c|$A', 'mr_tilapia_f|mar|Tilápia Frita com Fritas|🐟+🍟|tilapia_frita,batata_frita|$A', 'mr_tilapia_a|mar|Tilápia Assada com Limão|🐟+🍋|tilapia_assada,legumes_salt|$A', 'mr_robalo_v|mar|Robalo no Vapor|🐟+♨️|robalo_v,brocolis_v|$J',
    'mr_robalo_g|mar|Robalo Selado com Purê|🐟+🔥|robalo_g,pure_cremoso|$A', 'mr_truta_m|gourmet|Truta Maçaricada|🐟+🔥|truta_macarico,arroz_c|$A', 'mr_truta_a|gourmet|Truta Assada com Batata|🐟+♨️|truta_assada,batata_assada|$A', 'mr_anchova|mar|Anchova Frita|🐟+🔥|anchova_g,limao_c|$A',
    'mr_siri|mar|Siri ao Molho com Arroz|🦀+🍅|siri_molho,arroz_c|$H', 'mr_siri_v|mar|Siri no Vapor|🦀+♨️|siri_v,milho_cozido|$H', 'mr_moq_siri|mar|Moqueca de Siri|🍲+🦀|moqueca_siri,arroz_c|$H', 'mr_lagostim_g|gourmet|Lagostim Grelhado|🦞+🔥|lagostim_g,pure_cremoso|$A',
    'mr_lagostim_v|gourmet|Lagostim no Vapor|🦞+♨️|lagostim_v,arroz_c|$A', 'mr_moq_dende|mar|Moqueca com Dendê|🍲+🟠|moqueca_dende,arroz_c,farofa_dende|$H',
    // ---- Cozinha do mundo
    'mu_bokchoy|asia|Bok Choy com Tofu|🥬+⬜|bokchoy_tofu,arroz_vapor|$J', 'mu_bokchoy_v|asia|Bok Choy no Vapor|🥬+♨️|bokchoy_v,tofu_g|$J', 'mu_bambu|asia|Carne com Broto de Bambu|🥘+🎍|carne_bambu,arroz_c|$J', 'mu_lotus|asia|Raiz de Lótus com Camarão|🪷+🦐|lotus_camarao,arroz_vapor|$J',
    'mu_miso|japa|Sopa de Miso|🥣+🟤|sopa_miso|gergelim,shoyu', 'mu_miso_p|japa|Sopa de Miso com Peixe|🥣+🐟|miso_peixe|gergelim,shoyu', 'mu_wonton_v|asia|Wonton de Camarão no Vapor|🥟+🦐|wonton_v|$S', 'mu_wonton_f|asia|Wonton Frito|🥟+🍟|wonton_frito|$S',
    'mu_wonton_s|asia|Sopa de Wonton|🥣+🥟|sopa_wonton|$J', 'mu_lasanha_s|ita|Lasanha de Massa Seca|🥘+🟨|lasanha_seca|$I', 'mu_lasanha_p|ita|Lasanha de Presunto|🥘+🍖|lasanha_presunto|$I', 'mu_lasanha_e|ita|Lasanha de Espinafre|🥘+🌿|lasanha_espinafre|$I',
    'mu_halloumi|mundo|Halloumi Grelhado com Mel|🧀+🔥|halloumi_g,tosta_abacate|mel,pimenta', 'mu_feta|mundo|Omelete de Feta|🍳+🧀|omelete_feta|$A', 'mu_homus_t|mundo|Homus com Tahine e Pão Sírio|🟡+🫓|homus_tahine,pao_sirio_t|$A', 'mu_babaganuche|mundo|Babaganuche com Pão Sírio|🍆+🫓|babaganuche,pao_sirio_t|$A',
    'mu_alcachofra|mundo|Alcachofra Gratinada|🥬+🧀|alcachofra_grat|$A', 'mu_bruxelas_b|mundo|Couve-de-bruxelas com Bacon|🥬+🥓|bruxelas_bacon|$A', 'mu_bruxelas_g|mundo|Couve-de-bruxelas Grelhada|🥬+🔥|bruxelas_g,halloumi_g|$A', 'mu_risoto_c|ita|Risoto de Cogumelos|🍚+🍄|risoto_cogumelo|$I',
    'mu_risoto_q|ita|Risoto de Queijo|🍚+🧀|risoto_queijo|$I', 'mu_risoto_a|ita|Risoto de Abóbora|🍚+🎃|risoto_abobora|$I', 'mu_risoto_ca|ita|Risoto de Camarão|🍚+🦐|risoto_camarao|$I', 'mu_cuscuz|mundo|Cuscuz Marroquino|🌾+🟠|cuscuz_marroq,frango_g|$A',
    'mu_cuscuz_c|mundo|Cuscuz Marroquino com Cordeiro|🌾+🐑|cuscuz_marroq,costeleta_cordeiro|$A', 'mu_kebab|mundo|Kebab|🌯+🥩|kebab|$Z', 'mu_shawarma|mundo|Shawarma de Frango|🌯+🍗|shawarma|$Z', 'mu_sirio_f|mundo|Pão Sírio de Falafel|🌯+🟡|sirio_falafel|$A',
    'mu_picles_n|deli|Picles de Nabo|⚪+🫙|picles_nabo,picles_pepino|$V', 'mu_pimenta_f|deli|Molho de Pimenta com Torrada|🌶️+🫙|molho_pimenta,torrada,queijo_c|$N', 'mu_erva_f|deli|Chucrute de Erva-doce com Salsicha|🌿+🫙|erva_fermentada,salsicha_g,pao_t|mostarda',
    // ---- Brasil regional
    'rg_jaca|br|Jaca Refogada com Arroz|🍈+🟡|jaca_refogada,arroz_c|$H', 'rg_jaca_f|br|Jaca Frita|🍈+🍟|jaca_frita|$H', 'rg_pequi|br|Arroz com Pequi e Frango|🍚+🟡|arroz_pequi|$H', 'rg_farofa_d|br|Farofa de Dendê com Camarão|🌾+🟠|farofa_dende,camarao_frito|$H',
    'rg_farofa_b|br|Farofa de Bacon com Ovo|🌾+🥓|farofa_bacon,ovo_f|$H', 'rg_farofa_l|br|Farofa de Linguiça|🌾+🌭|farofa_linguica,arroz_c|$H', 'rg_farofa_ba|br|Farofa de Banana com Bife|🌾+🍌|farofa_banana,bife|$H', 'rg_cupuacu|doce|Creme de Cupuaçu|🍈+🟤|creme_cupuacu|$D',
    'rg_suco_cup|bebida|Suco de Cupuaçu|🍈+🥤|suco_cupuacu|mel', 'rg_suco_gra|bebida|Suco de Graviola|🍈+🥛|suco_graviola|mel', 'rg_suco_caju|bebida|Suco de Caju|🍎+🥤|suco_caju|mel', 'rg_jabuticaba|bebida|Jabuticaba Gelada|🫐+🧊|jabuticaba_gelada|mel',
    'rg_tangerina|bebida|Suco de Tangerina|🍊+🥤|suco_tangerina|mel', 'rg_sorv_gra|doce|Sorvete de Graviola|🍦+🍈|sorvete_graviola|$C', 'rg_sorv_caju|doce|Sorvete de Caju|🍦+🍎|sorvete_caju|$C', 'rg_sorv_pist|doce|Sorvete de Pistache|🍦+🟢|sorvete_pistache|$C',
    'rg_caqui|doce|Doce de Caqui com Sorvete|🍅+🍦|doce_caqui,sorvete_creme|$E', 'rg_torta_tan|doce|Torta de Tangerina|🥧+🍊|torta_tangerina|$D', 'rg_torta_rom|doce|Torta de Romã|🥧+🔴|torta_roma|$D', 'rg_morango_b|doce|Morango com Chocolate Branco|🍓+⚪|morango_branco|chantilly',
    'rg_ganache_b|doce|Ganache Branca com Frutas|⚪+🍓|ganache_branca,framboesa,morango_c|chantilly', 'rg_bolo_am|doce|Bolo de Amêndoa|🍰+🌰|bolo_amendoa|$D', 'rg_bolo_pi|doce|Bolo de Pistache|🍰+🟢|bolo_pistache|$D', 'rg_bolo_noz|doce|Bolo de Nozes|🍰+🟫|bolo_noz|$D',
    'rg_crepe_av|doce|Crepe de Avelã|🥞+🌰|crepe_avela|$C', 'rg_tosta_av|cafeteria|Tosta de Avelã com Café|🍞+🌰|tosta_avela,cafe_preto|$N', 'rg_noz_car|doce|Nozes Caramelizadas com Sorvete|🟫+🔥|noz_caramelizada,sorvete_baunilha|$C', 'rg_caju_seco|deli|Caju e Jaca Secos|🍎+☀️|caju_seco,jaca_seca,caqui_seco|mel',
    'rg_tang_seca|deli|Tangerina Seca com Queijo|🍊+☀️|tangerina_seca,queijo_g|mel'
  ]);
  CC.finalize();
})(window.CC);
