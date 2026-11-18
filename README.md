# 🍳 Cozinha Caos

Jogo de cozinha cooperativo no estilo Overcooked, feito em HTML/JS com React (sem build).

- **909 pratos**, **233 ingredientes** (inclusive insetos comestíveis), **31 temperos**, **27 equipamentos**, **5 tipos de corte** (tábua, ralador, pilão, espremedor, descascador) e **1000+ receitas** de dezenas de cozinhas do mundo
- **22 fases** de campanha + Modo Infinito, Desafio do Dia, Restaurante Personalizado e Treino Livre
- **Até 4 jogadores no mesmo computador** (teclado e/ou controles) e **online** (PeerJS/WebRTC, sala por código)
- **Fast Food** e **Salão** com várias janelas de entrega (cada pedido vai na janela certa), **estoque** que acaba, **computador** para chamar o caminhão (4 caixas × 4 unidades) e **loja** de melhorias (bandeja, carrinho de pratos, lava-louças…)
- **Utensílios**: todos os 27 equipamentos de preparo (menos os cortes) precisam do seu recipiente (panela, frigideira, grelha, assadeira, jarra, cesto, ramequim…). Eles se carregam como pratos, sujam depois de alguns usos e precisam ser lavados na pia; há uma prateleira de utensílios limpos
- **Competição entre chefs**: Duelo de Chefs, Corrida de Pedidos e Batalha de Equipes (2 a 4 chefs, local ou online), com placar, ranking e dash que derruba o rival
- **Modo Infestação**: baratas, moscas, formigas, besouros, vespas e lagartas invadem a cozinha e estragam comida e estoque (mate com **R** ou clicando). Também há **Restaurante Entomológico** (cardápio de insetos) e **Noite de Apagões**
- **⚙️ Ajustes de pedidos** em qualquer modo: quantos pedidos aparecem ao mesmo tempo, o intervalo entre eles, a duração de cada um e quantos já começam na abertura
- **Meu Restaurante** com ~25 configurações: velocidade do jogo, vidas, VIP, queima, estoque e preços, caminhão, janelas, pragas, rush, apagões, tamanho da cozinha…
- **Loja com 32 melhorias** (mata-moscas, lâmpada mata-insetos, telas, inseticida, geladeira grande, relógio extra, gerador…)
- Sons procedurais para cada forma de preparo
- Livro de receitas dentro da partida (tecla **B** ou clique no pedido), skins, conquistas e estatísticas

## Controles
| Ação | Teclas |
|---|---|
| Mover | WASD / setas |
| Pegar / colocar / usar | Espaço / Enter |
| Cortar, ralar, lavar (segurar) | E |
| Dash | Q / Shift |
| Receitas / Pausa | B / P |

P2: setas, Enter, Shift direito, `/`. P3: IJKL, U, O, Y. P4: teclado numérico. Controles (gamepad) também funcionam.

## Rodar localmente
Qualquer servidor estático serve:

```bash
python -m http.server 8320
```

Depois abra http://localhost:8320. Para o online, os jogadores precisam abrir o mesmo site (ex.: o GitHub Pages).
