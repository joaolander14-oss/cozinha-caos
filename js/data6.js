/* Cozinha Caos — expansão 3: insetos comestíveis, carnes, frutos do mar, ingredientes do mundo e regionais */
(function (CC) {
  'use strict';
  [
    // insetos comestíveis
    ['grilo', 'Grilo', '🦗', 'sem pernas', 2], ['larva', 'Larva', '🐛', 'limpa', 2], ['gafanhoto', 'Gafanhoto', '🦗+🟢', null], ['formiga', 'Formiga', '🐜', null],
    ['bicho_seda', 'Bicho-da-seda', '🐛+⚪', null], ['cigarra', 'Cigarra', '🪲+🟤', null],
    // carnes e caça
    ['picanha', 'Picanha', '🥩+🔴', 'em fatias', 4], ['fraldinha', 'Fraldinha', '🥩+🟤', 'em tiras', 4], ['cupim', 'Cupim', '🥩+🟠', 'em cubos', 4], ['coelho', 'Coelho', '🐇', 'em pedaços', 3.5],
    ['codorna', 'Codorna', '🐦', null], ['javali', 'Javali', '🐗', 'em cubos', 4], ['pernil', 'Pernil', '🍖+🟤', 'em fatias', 4], ['presunto_cru', 'Presunto cru', '🍖+🔴', 'em fatias', 2], ['chorizo', 'Chorizo', '🌭+🔴', 'fatiado', 2.5],
    // mar
    ['siri', 'Siri', '🦀+🔵', null], ['tilapia', 'Tilápia', '🐟+🟢', 'em filé', 3], ['robalo', 'Robalo', '🐟+⚪', 'em filé', 3.5], ['truta', 'Truta', '🐟+🟤', 'em filé', 3.5], ['anchova', 'Anchova', '🐟+⚫', null], ['lagostim', 'Lagostim', '🦞+🟠', null],
    // legumes e do mundo
    ['bok_choy', 'Bok choy', '🥬+⚪', 'picado', 2], ['lotus', 'Raiz de lótus', '🪷', 'fatiada', 2.5], ['bambu', 'Broto de bambu', '🎍', 'fatiado', 2], ['miso', 'Pasta de miso', '🟤+🥣', null], ['tahine', 'Tahine', '⚪+🥣', null],
    ['feta', 'Queijo feta', '🧀+⚪', 'em cubos', 2], ['halloumi', 'Halloumi', '🧀+🟡', 'fatiado', 2], ['alcachofra', 'Alcachofra', '🥬+🟣', 'em fundos', 3], ['couve_bruxelas', 'Couve-de-bruxelas', '🥬+🟢', 'cortada', 2.5],
    ['erva_doce', 'Erva-doce', '🌿+⚪', 'picada', 2], ['nabo', 'Nabo', '⚪+🥕', 'em cubos', 3], ['mandioquinha', 'Mandioquinha', '🥕+🟡', 'em cubos', 3], ['pimenta_dedo', 'Pimenta-de-cheiro', '🌶️+🟡', 'picada', 2],
    ['massa_wonton', 'Massa de wonton', '🥟+⚪', null], ['massa_lasanha', 'Massa de lasanha', '🟨', null], ['arroz_arboreo', 'Arroz arbóreo', '🍚+⚪', null], ['cuscuz_marroquino', 'Cuscuz marroquino', '🌾+🟠', null],
    ['pao_sirio', 'Pão sírio', '🫓+⚪', null], ['farinha_mandioca', 'Farinha de mandioca', '🌾+🟡', null], ['dende', 'Azeite de dendê', '🟠', null],
    // frutas e doces
    ['jaca', 'Jaca', '🍈+🟡', 'em gomos', 3], ['pequi', 'Pequi', '🟡', null], ['cupuacu', 'Cupuaçu', '🍈+🟤', 'em polpa', 2.5], ['graviola', 'Graviola', '🍈+⚪', 'em polpa', 2.5], ['caju', 'Caju', '🍎+🟡', 'fatiado', 2],
    ['jabuticaba', 'Jabuticaba', '🫐+⚫', null], ['tangerina', 'Tangerina', '🍊+🟠', 'em gomos', 2], ['caqui', 'Caqui', '🍅+🟠', 'fatiado', 2], ['roma', 'Romã', '🍎+🔴', 'debulhada', 2.5],
    ['chocolate_branco', 'Chocolate branco', '🍫+⚪', 'picado', 2], ['avela', 'Avelã', '🌰+🟤', 'triturada', 2], ['amendoa', 'Amêndoa', '🌰+⚪', 'laminada', 2], ['pistache', 'Pistache', '🌰+🟢', 'triturado', 2], ['noz', 'Noz', '🌰+🟫', 'picada', 2]
  ].forEach(function (a) { CC.addIng(a); });
  [['jaca', 'descascada', 3], ['tangerina', 'sem casca', 2], ['caqui', 'descascado', 2], ['nabo', 'descascado', 2], ['mandioquinha', 'descascada', 2.5]].forEach(function (a) { CC.setCut(a[0], 'peeler', a[1], a[2]); });
  [['tangerina', 'espremida', 2], ['caju', 'espremido', 2], ['graviola', 'espremida', 2.5], ['cupuacu', 'espremido', 2.5]].forEach(function (a) { CC.setCut(a[0], 'juicer', a[1], a[2]); });
  [['pistache', 'em pó', 2.5], ['amendoa', 'em pó', 2.5], ['noz', 'em pó', 2.5], ['grilo', 'em pó', 3], ['pimenta_dedo', 'macerada', 2]].forEach(function (a) { CC.setCut(a[0], 'mortar', a[1], a[2]); });
  CC.setGrate('chocolate_branco', 'ralado', 2.5); CC.setGrate('halloumi', 'ralado', 2.5);
  [['bbq', 'Molho barbecue', '🟫', '#6e2c00'], ['ingles', 'Molho inglês', '🍾', '#3b2a20'], ['gergelim', 'Gergelim', '⚪', '#e8dcc0'], ['cravo', 'Cravo', '🟤', '#5d4037'], ['chimichurri', 'Chimichurri', '🟢', '#2e8b57'], ['vinagre', 'Vinagre', '🧪', '#c9b037']].forEach(function (a) {
    CC.SEAS[a[0]] = { id: a[0], n: a[1], e: a[2], color: a[3] }; CC.ITEMS[a[0]] = { id: a[0], n: a[1], e: a[2], season: true, color: a[3] };
  });
  CC.ITEMS.infestado = { id: 'infestado', n: 'Infestado!', e: '🪳', burnt: true, infested: true };
  // preços
  const P = { 18: ['picanha', 'lagostim', 'caviar'], 14: ['fraldinha', 'cupim', 'coelho', 'codorna', 'javali', 'pernil', 'presunto_cru', 'chorizo', 'siri', 'robalo', 'truta', 'tilapia', 'anchova', 'pequi'],
    8: ['feta', 'halloumi', 'alcachofra', 'miso', 'tahine', 'pistache', 'noz', 'amendoa', 'avela', 'chocolate_branco', 'jabuticaba', 'cupuacu', 'graviola', 'lotus', 'bambu', 'bok_choy'],
    3: ['grilo', 'larva', 'gafanhoto', 'formiga', 'bicho_seda', 'cigarra', 'massa_wonton', 'massa_lasanha', 'arroz_arboreo', 'cuscuz_marroquino', 'pao_sirio', 'farinha_mandioca', 'dende'] };
  const old = CC.priceOf;
  CC.priceOf = function (id) { for (const k in P) if (P[k].indexOf(id) >= 0) return +k; return old(id); };

  function RR(lines) { lines.forEach(function (l) { const p = l.split('|'); CC.R(p[0], p[1].split(','), p[2], p[3], p[4], +p[5], p[6] === '1'); }); }
  RR([
    // ---- insetos
    'fryer|grilo_c|grilo_frito|Grilo frito|🦗+🍟|6', 'fryer|larva_c|larva_frita|Larva frita|🐛+🍟|6', 'grill|gafanhoto|gafanhoto_g|Gafanhoto na brasa|🦗+🔥|6', 'pan|chocolate_c,formiga|formiga_choco|Formiga com chocolate|🐜+🍫|6',
    'wok|alho_c,cebola_c,larva_c|larva_wok|Larva ao alho|🐛+🥘|8', 'mixer|farinha,grilo_m,ovo|massa_proteica|Massa proteica|🥣+🦗|8', 'oven|massa_proteica|pao_proteico|Pão proteico|🍞+🦗|12', 'processor|castanha_c,grilo_c,tomate_c|pasta_grilo|Pasta de grilo|🦗+🥣|7',
    'sushi|arroz_c,grilo_c,nori|sushi_grilo|Maki de grilo|🍣+🦗|8', 'steamer|bicho_seda|bicho_seda_v|Bicho-da-seda no vapor|🐛+♨️|7', 'smoker|cigarra|cigarra_def|Cigarra defumada|🪲+💨|10', 'breader|farinha_rosca,gafanhoto,ovo|gafanhoto_emp|Gafanhoto empanado|🦗+🥣|5',
    'fryer|gafanhoto_emp|gafanhoto_crocante|Gafanhoto crocante|🦗+🟤|7', 'torch|acucar,formiga|formiga_caramelo|Formiga caramelizada|🐜+🔥|6', 'icecream|creme,formiga,leite|sorvete_formiga|Sorvete de formiga|🍦+🐜|9', 'popper|grilo_c,milho_pipoca|pipoca_grilo|Pipoca com grilo|🍿+🦗|7',
    'press|grilo_c,pao_c,queijo_c|sand_grilo_p|Sanduíche de grilo|🥪+🦗|7', 'dehydrator|grilo_c|grilo_seco|Grilo desidratado|🦗+☀️|10', 'fountain|chocolate_c,grilo_c|grilo_choco|Grilo com chocolate|🦗+🍫|6', 'ricecooker|arroz,larva_c|arroz_larva|Arroz com larva|🍚+🐛|9',
    // ---- carnes e caça
    'grill|picanha_c|picanha_g|Picanha grelhada|🥩+🔥|9', 'grill|fraldinha_c|fraldinha_g|Fraldinha grelhada|🥩+🔥|9', 'grill|cupim_c|cupim_g|Cupim na chapa|🥩+🔥|12', 'smoker|cupim_c|cupim_def|Cupim defumado|🥩+💨|16',
    'pressure|batata_c,cenoura_c,cupim_c|cupim_panela|Cupim de panela|🥩+🥫|14', 'pan|coelho_c|coelho_g|Coelho salteado|🐇+🔥|9', 'oven|alho_c,coelho|coelho_assado|Coelho assado|🐇+♨️|15', 'pan|codorna|codorna_g|Codorna dourada|🐦+🔥|8',
    'oven|codorna,limao_c|codorna_assada|Codorna assada|🐦+♨️|12', 'grill|javali_c|javali_g|Javali grelhado|🐗+🔥|10', 'pressure|batata_c,cebola_c,javali_c|javali_panela|Javali de panela|🐗+🥫|14', 'oven|alho_c,pernil|pernil_assado|Pernil assado|🍖+♨️|16',
    'smoker|pernil|pernil_def|Pernil defumado|🍖+💨|15', 'pan|presunto_cru_c|presunto_cru_g|Presunto cru selado|🍖+🔥|4', 'pan|chorizo_c|chorizo_g|Chorizo frito|🌭+🔥|6', 'grill|chorizo_c,pao_c|choripan|Choripán|🌭+🥖|8',
    'fryer|chorizo_c,massa_pastel|pastel_chorizo|Pastel de chorizo|🥟+🌭|8', 'pressure|feijao,presunto_cru_c,cebola_c|feijao_presunto|Feijão com presunto cru|🫘+🍖|12', 'dehydrator|picanha_c|picanha_seca|Picanha seca|🥩+☀️|18',
    // ---- mar
    'pan|tilapia_c|tilapia_g|Tilápia grelhada|🐟+🔥|7', 'fryer|tilapia_c|tilapia_frita|Tilápia frita|🐟+🍟|8', 'oven|limao_c,tilapia|tilapia_assada|Tilápia assada|🐟+🍋|11', 'steamer|robalo_c|robalo_v|Robalo no vapor|🐟+♨️|8',
    'pan|robalo_c|robalo_g|Robalo selado|🐟+🔥|8', 'torch|truta_c|truta_macarico|Truta maçaricada|🐟+🔥|6', 'oven|alho_c,truta|truta_assada|Truta assada|🐟+♨️|12', 'pan|anchova|anchova_g|Anchova frita|🐟+🔥|6',
    'pot|siri,tomate_c|siri_molho|Siri ao molho|🦀+🍅|10', 'steamer|siri|siri_v|Siri no vapor|🦀+♨️|9', 'pot|coco_c,siri,tomate_c|moqueca_siri|Moqueca de siri|🍲+🦀|13|1', 'grill|lagostim|lagostim_g|Lagostim grelhado|🦞+🔥|9',
    'steamer|lagostim|lagostim_v|Lagostim no vapor|🦞+♨️|9', 'pot|coco_c,dende,peixe_c|moqueca_dende|Moqueca com dendê|🍲+🟠|14|1',
    // ---- Ásia / mundo
    'wok|bok_choy_c,gengibre_c,tofu_c|bokchoy_tofu|Bok choy com tofu|🥬+⬜|8', 'steamer|bok_choy_c|bokchoy_v|Bok choy no vapor|🥬+♨️|5', 'wok|bambu_c,carne_c,pimentao_c|carne_bambu|Carne com bambu|🥘+🎍|9', 'wok|camarao_c,gengibre_c,lotus_c|lotus_camarao|Raiz de lótus com camarão|🪷+🦐|9',
    'pot|cebola_c,miso,tofu_c|sopa_miso|Sopa de miso|🥣+🟤|9|1', 'pot|gengibre_c,miso,peixe_c|miso_peixe|Sopa de miso com peixe|🥣+🐟|10|1', 'steamer|camarao_c,massa_wonton|wonton_v|Wonton de camarão no vapor|🥟+🦐|8', 'fryer|carne_c,massa_wonton|wonton_frito|Wonton frito|🥟+🍟|7',
    'pot|cebola_c,frango_c,massa_wonton|sopa_wonton|Sopa de wonton|🥣+🥟|11|1', 'oven|massa_lasanha,molho_bolonhesa,mussarela_c|lasanha_seca|Lasanha de massa seca|🥘+🟨|15', 'oven|massa_lasanha,molho_branco,presunto_c|lasanha_presunto|Lasanha de presunto|🥘+🍖|14',
    'oven|espinafre_c,massa_lasanha,molho_branco|lasanha_espinafre|Lasanha de espinafre|🥘+🌿|14', 'grill|halloumi_c|halloumi_g|Halloumi grelhado|🧀+🔥|5', 'pan|feta_c,ovo|omelete_feta|Omelete de feta|🍳+🧀|8', 'processor|grao,limao_j,tahine|homus_tahine|Homus com tahine|🟡+🥣|7',
    'processor|alho_c,berinjela_c,tahine|babaganuche|Babaganuche|🍆+🥣|7', 'oven|alcachofra_c,creme,queijo_c|alcachofra_grat|Alcachofra gratinada|🥬+🧀|12', 'pan|bacon_c,couve_bruxelas_c|bruxelas_bacon|Couve-de-bruxelas com bacon|🥬+🥓|7', 'grill|couve_bruxelas_c|bruxelas_g|Couve-de-bruxelas grelhada|🥬+🔥|6',
    'pot|alho_c,arroz_arboreo,cogumelo_c|risoto_cogumelo|Risoto de cogumelos|🍚+🍄|12', 'pot|arroz_arboreo,manteiga,queijo_c|risoto_queijo|Risoto de queijo|🍚+🧀|11', 'pot|abobora_c,arroz_arboreo,cebola_c|risoto_abobora|Risoto de abóbora|🍚+🎃|12', 'pot|alho_c,arroz_arboreo,camarao_c|risoto_camarao|Risoto de camarão|🍚+🦐|12',
    'pot|cenoura_c,cuscuz_marroquino,grao_c|cuscuz_marroq|Cuscuz marroquino|🌾+🟠|9', 'toaster|pao_sirio|pao_sirio_t|Pão sírio tostado|🫓+🟤|4', 'press|carne_c,pao_sirio,tomate_c|kebab|Kebab|🌯+🥩|8', 'press|frango_c,pao_sirio,pepino_c|shawarma|Shawarma de frango|🌯+🍗|8',
    'press|falafel,pao_sirio,tahine|sirio_falafel|Pão sírio de falafel|🌯+🟡|7', 'fermenter|cenoura_c,nabo_c|picles_nabo|Picles de nabo|⚪+🫙|12', 'fermenter|pimenta_dedo_c,tomate_c|molho_pimenta|Molho de pimenta fermentado|🌶️+🫙|13', 'fermenter|erva_doce_c,repolho_c|erva_fermentada|Chucrute de erva-doce|🌿+🫙|12',
    // ---- Brasil regional
    'pot|cebola_c,jaca_c,tomate_c|jaca_refogada|Jaca refogada|🍈+🟡|11', 'fryer|jaca_c|jaca_frita|Jaca frita|🍈+🍟|8', 'pot|arroz,frango_c,pequi|arroz_pequi|Arroz com pequi e frango|🍚+🟡|12', 'pan|cebola_c,dende,farinha_mandioca|farofa_dende|Farofa de dendê|🌾+🟠|7',
    'pan|bacon_c,farinha_mandioca,ovo|farofa_bacon|Farofa de bacon|🌾+🥓|7', 'pan|farinha_mandioca,linguica_c|farofa_linguica|Farofa de linguiça|🌾+🌭|7', 'pan|banana_c,farinha_mandioca|farofa_banana|Farofa de banana|🌾+🍌|7',
    'pot|acucar,cupuacu_j,leite|creme_cupuacu|Creme de cupuaçu|🍈+🟤|8|1', 'blender|cupuacu_j,leite|suco_cupuacu|Suco de cupuaçu|🍈+🥤|7|1', 'blender|graviola_j,leite|suco_graviola|Suco de graviola|🍈+🥛|7|1', 'blender|caju_j,caju_j|suco_caju|Suco de caju|🍎+🥤|6|1',
    'blender|gelo,jabuticaba|jabuticaba_gelada|Jabuticaba gelada|🫐+🧊|7|1', 'blender|tangerina_j,tangerina_j|suco_tangerina|Suco de tangerina|🍊+🥤|6|1', 'icecream|creme,graviola_c,leite|sorvete_graviola|Sorvete de graviola|🍦+🍈|9', 'icecream|caju_c,creme,leite|sorvete_caju|Sorvete de caju|🍦+🍎|9',
    'pot|acucar,caqui_c|doce_caqui|Doce de caqui|🍅+🥫|9', 'oven|massa_torta,tangerina_c|torta_tangerina|Torta de tangerina|🥧+🍊|14', 'oven|massa_torta,roma_c|torta_roma|Torta de romã|🥧+🔴|14', 'fountain|chocolate_branco_c,morango_c|morango_branco|Morango com chocolate branco|🍓+⚪|6',
    'bainmarie|chocolate_branco_c,creme|ganache_branca|Ganache branca|⚪+🥣|7', 'mixer|acucar,amendoa_m,farinha,ovo|massa_amendoa|Massa de amêndoa|🥣+🌰|8', 'oven|massa_amendoa|bolo_amendoa|Bolo de amêndoa|🍰+🌰|14', 'oven|massa_bolo,pistache_c|bolo_pistache|Bolo de pistache|🍰+🟢|15',
    'oven|massa_bolo,noz_c|bolo_noz|Bolo de nozes|🍰+🟫|15', 'processor|avela_c,chocolate_c,leite|creme_avela|Creme de avelã|🍫+🌰|7', 'waffler|creme_avela,massa_crepe|crepe_avela|Crepe de avelã|🥞+🌰|7', 'toaster|creme_avela,pao_c|tosta_avela|Tosta de avelã|🍞+🌰|5',
    'pan|acucar,noz_c|noz_caramelizada|Nozes caramelizadas|🟫+🔥|6', 'dehydrator|caju_c|caju_seco|Caju seco|🍎+☀️|13', 'dehydrator|caqui_c|caqui_seco|Caqui seco|🍅+☀️|13', 'dehydrator|jaca_c|jaca_seca|Jaca seca|🍈+☀️|14', 'dehydrator|tangerina_c|tangerina_seca|Tangerina seca|🍊+☀️|12',
    'icecream|creme,leite,pistache_m|sorvete_pistache|Sorvete de pistache|🍦+🟢|9'
  ]);
  CC.finalize();
})(window.CC);
