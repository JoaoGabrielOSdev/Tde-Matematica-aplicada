# TDE 02 — Framework Phaser

Exemplo de jogo 2D desenvolvido para o seminário de **Computação Gráfica**.

## Geometria em Ação

O jogador controla um círculo azul, coleta oito fragmentos amarelos, evita os inimigos vermelhos e entra no portal roxo para concluir a fase.

O exemplo demonstra:

- criação e configuração de uma cena Phaser;
- renderização de formas e elementos 2D;
- entrada de teclado com setas e teclas W, A, S e D;
- física Arcade sem gravidade;
- colisão entre jogador, obstáculos e inimigos;
- sobreposição para coletar itens e concluir a fase;
- tweens para animação dos fragmentos, inimigos e portal;
- HUD com pontuação, status e vidas;
- escala responsiva para diferentes tamanhos de tela.

## Como executar

O navegador bloqueia alguns recursos quando um arquivo HTML é aberto diretamente. Por isso, execute um servidor local na pasta `phaser`.

### Opção 1 — Python

```bash
cd phaser
python3 -m http.server 8080
```

Depois, acesse <http://localhost:8080>.

### Opção 2 — VS Code

Instale a extensão **Live Server**, abra `phaser/index.html` e clique em **Go Live**.

O Phaser é carregado pelo CDN jsDelivr no arquivo `index.html`, portanto é necessário ter acesso à internet na primeira execução.

## Controles

| Tecla | Ação |
|---|---|
| Setas ou W/A/S/D | Movimentar o jogador |
| R | Reiniciar a fase |

## Estrutura

```text
phaser/
├── index.html  # página e carregamento do Phaser
├── style.css   # identidade visual da página
├── game.js     # cena, entidades, controles e regras do jogo
└── README.md   # documentação do exemplo
```

## Biblioteca

Este exemplo utiliza o **Phaser 3**, um framework open source para criação de jogos HTML5 em JavaScript. Ele oferece recursos para cenas, entrada de usuário, animações, sprites e física 2D.
