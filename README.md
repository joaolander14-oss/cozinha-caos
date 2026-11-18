# 🍳 Cozinha Caos

Jogo de cozinha cooperativo no estilo Overcooked, feito em HTML/JS com React (sem build).

- **395 pratos**, **93 ingredientes**, **12 temperos**, **19 equipamentos**, **450+ receitas**
- **22 fases** de campanha + Modo Infinito, Desafio do Dia, Restaurante Personalizado e Treino Livre
- **Até 4 jogadores no mesmo computador** (teclado e/ou controles) e **online** (PeerJS/WebRTC, sala por código)
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
