# Jogo Whac-A-Mole

Este é um jogo simples de Whac-A-Mole desenvolvido na aula de paginação web da PUC Rio em HTML, CSS e JavaScript, com um backend em Node.js e SQLite para salvar os recordes dos jogadores.

## Regras do Jogo

- O objetivo do jogo é acertar o maior número de toupeiras possível.
- Cada acerto vale 10 pontos.
- As toupeiras aparecem aleatoriamente nos buracos do tabuleiro.
- O tempo de aparição das toupeiras diminui a cada acerto, tornando o jogo mais difícil.
- Se você errar 3 vezes, o jogo termina e uma mensagem de "Game Over" é exibida.
- Ao final do jogo, você pode salvar seu recorde inserindo seu nickname.
- Os recordes são exibidos na página de recordes, ordenados pelo número de acertos.

## Estrutura do Projeto

- `index.html`: Página inicial onde o jogador insere seu nickname.
- `regras.html`: Página que exibe as regras do jogo.
- `tabuleiro.html`: Página do tabuleiro onde o jogo é jogado.
- `recordes.html`: Página que exibe os recordes dos jogadores.
- `css/style.css`: Arquivo de estilos CSS.
- `javascript/jogo.js`: Arquivo JavaScript com a lógica do jogo.
- `server.js`: Servidor Node.js para salvar e obter os recordes dos jogadores.
- `recordes.db`: Banco de dados SQLite para armazenar os recordes.

## Configuração e Execução

### Pré-requisitos

- Node.js instalado
- npm (Node Package Manager) instalado

### Passos para Configuração

1. Clone o repositório para o seu ambiente local:
    ```sh
    git clone https://github.com/jaugustoguerra/meu-site-puc.git

    ```

2. Instale as dependências do projeto:
    ```sh
    npm install
    ```

3. Inicie o servidor Node.js:
    ```sh
    node server.js
    ```

4. Abra o arquivo [index.html] no seu navegador para iniciar o jogo.

### Estrutura do Banco de Dados

O banco de dados SQLite (`recordes.db`) contém uma tabela chamada `recordes` com as seguintes colunas:

- `id`: INTEGER PRIMARY KEY AUTOINCREMENT
- `nickname`: TEXT NOT NULL
- `acertos`: INTEGER NOT NULL
- `data`: TEXT NOT NULL