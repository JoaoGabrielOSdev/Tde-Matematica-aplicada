# Trabalhos de Matemática Aplicada e Computação Gráfica

Este repositório reúne os exemplos desenvolvidos para as atividades da disciplina.

## TDE 02 — Framework Phaser

Foi criado um exemplo interativo de jogo 2D com o Phaser. Para ver a documentação, os conceitos demonstrados e as instruções de execução, acesse [`phaser/README.md`](phaser/README.md).

O jogo **Geometria em Ação** demonstra renderização 2D, teclado, física Arcade, colisões, animações e cenas.

## Entrega

Os arquivos finais do seminário estão na pasta [`entrega/`](entrega/), incluindo o PDF para o AVA, o PPTX editável e o checklist de envio.

## TDE 01 — java.lang.Math

Trabalho da disciplina **Matemática Aplicada à Computação** sobre a classe matemática `java.lang.Math`, da linguagem Java.

## Aluno

- **Nome:** João Gabriel Oliveira Silva
- **Matrícula:** 20231130007
- **Professor:** Alexsandro Oliveira Alexandrino

## Objetivo

Demonstrar o uso da classe `java.lang.Math` para realizar operações matemáticas em Java.

O exemplo apresenta:

- raiz quadrada com `Math.sqrt()`;
- potenciação com `Math.pow()`;
- valor absoluto com `Math.abs()`;
- maior e menor valor com `Math.max()` e `Math.min()`;
- arredondamento com `Math.round()`;
- trigonometria com `Math.sin()` e `Math.cos()`;
- conversão de graus para radianos com `Math.toRadians()`;
- constantes `Math.PI` e `Math.E`;
- uma aplicação matemática para calcular a distância entre dois pontos.

## Estrutura do projeto

```text
Tde-Matematica-aplicada/
├── README.md
├── phaser/
│   ├── index.html
│   ├── style.css
│   ├── game.js
│   └── README.md
└── src/
    └── ExemploMath.java
```

## Requisitos

É necessário ter o **Java JDK** instalado.

Para verificar:

```bash
java -version
javac -version
```

## Como executar

No terminal, entre na pasta do projeto e compile:

```bash
javac src/ExemploMath.java
```

Depois execute:

```bash
java -cp src ExemploMath
```

## Aplicação matemática

O programa calcula a distância entre dois pontos no plano cartesiano.

Para os pontos:

- A = (2, 3)
- B = (8, 11)

É utilizada a fórmula:

```text
d = √[(x2 - x1)² + (y2 - y1)²]
```

No Java, a raiz quadrada é calculada com `Math.sqrt()` e as potências com `Math.pow()`.

Resultado:

```text
Distância entre os pontos: 10.0
```

## Biblioteca utilizada

`java.lang.Math` faz parte da biblioteca padrão do Java. Seus métodos matemáticos são estáticos, portanto podem ser utilizados diretamente com chamadas como `Math.sqrt()`, `Math.pow()` e `Math.sin()`.
