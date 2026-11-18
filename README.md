# 🍳 Cozinha Caos

Jogo de cozinha cooperativo no estilo Overcooked, feito em HTML/JS com React (sem build).

- **678 pratos**, **139 ingredientes**, **18 temperos**, **27 equipamentos**, **5 tipos de corte** (tábua, ralador, pilão, espremedor, descascador) e **760+ receitas**
- **22 fases** de campanha + Modo Infinito, Desafio do Dia, Restaurante Personalizado e Treino Livre
- **Até 4 jogadores no mesmo computador** (teclado e/ou controles) e **online** (PeerJS/WebRTC, sala por código)
- **Fast Food** e **Salão** com várias janelas de entrega (cada pedido vai na janela certa), **estoque** que acaba, **computador** para chamar o caminhão (4 caixas × 4 unidades) e **loja** de melhorias (bandeja, carrinho de pratos, lava-louças…)
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
