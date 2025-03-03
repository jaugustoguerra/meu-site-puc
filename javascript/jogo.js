/** quantidade de acertos */
var acertos;
acertos = 0;    

/** quantidade de toupeiras perdidas */
var perdidos = 0;

/** quantidade de marteladas erradas */
var errados = 0;

/** tempo entre cada toupeira sair do buraco */
var intervalo = 5000;

/** tempo que a toupeira fica fora do buraco */
var janela = 2000;

/** timer que controla o tempo da toupeira fora do buraco */
var timer = null;

onload = function () {
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('idGramado').addEventListener('mousedown', marteloBaixo);
    document.getElementById('idGramado').addEventListener('mouseup', marteloCima);
    document.getElementById('buraco0').addEventListener('click', martelada);
    document.getElementById('buraco1').addEventListener('click', martelada);
    document.getElementById('buraco2').addEventListener('click', martelada);
    document.getElementById('buraco3').addEventListener('click', martelada);
    document.getElementById('buraco4').addEventListener('click', martelada);
};

/**
 * Sobe uma toupeira
 * Remove o evento do botão start
 */
function start() {
    var botao = document.getElementById('start')

    botao.removeEventListener('click', start);
    botao.disable = true;
    sobeToupeira();
}

/**
 * Coloca a toupeira para fora do buraco.
 * Recalcula o tempo que a toupeira fica fora do buraco.
 * @fires remover a toupeira
 * @fires próximo evento.
 */
function sobeToupeira() {
    var buraco = Math.floor(Math.random() * 5);
    var objBuraco = document.getElementById('buraco' + buraco);
    objBuraco.src = 'imagens/hole-mole.png';
    timer = setTimeout(tiraToupeira, janela, buraco);
    setTimeout(sobeToupeira, intervalo);
}

/**
 * Remove a toupeira de um buraco
 * 
 * @param {int} buraco número do buraco onde está a toupeira
 */
function tiraToupeira(buraco) {
    var objBuraco = document.getElementById('buraco' + buraco);
    objBuraco.src = 'imagens/hole.png';
    perdidos++;
    mostraPontuacao();
}

/**
 * Mostra a pontuação no display de 16 segmentos.
 * A função calcula e exibe o saldo.
 */
function mostraPontuacao() {
    mostraPontuacaoDe('acertos', acertos);
    mostraPontuacaoDe('perdidos', perdidos);
    mostraPontuacaoDe('errados', errados);
    mostraPontuacaoDe('saldo', Math.max(acertos - perdidos - errados, 0));
}

/**
 * Mostra um valor no display.
 * 
 * @param {object image} display imagens com display de 16 segmentos
 * @param {int} valor valor a ser exibido com até 3 dígitos
 */
function mostraPontuacaoDe(display, valor) {
    // pega as imagens
    let objCentena = document.getElementById(display).firstChild;
    let objDezena = objCentena.nextSibling;
    let objUnidade = objDezena.nextSibling;

    // calcula o valor de cada algarismo
    let centena = parseInt(valor/100);
    let dezena = parseInt((valor/10)%10)
    let unidade = (valor % 10)

    // muda a imagem e o valor do atributo para ledor de tela
    objCentena.src = 'imagens/caractere_' + centena + '.gif';
    objCentena.alt = centena;
    objDezena.src = 'imagens/caractere_' + dezena + '.gif';
    objDezena.alt = dezena;
    objUnidade.src = 'imagens/caractere_' + unidade + '.gif';
    objUnidade.alt = unidade;
}

/**
 * Coloca o martelo para baixo.
 */
function marteloBaixo() {
    document.getElementById('idGramado').style.cursor = 'url(imagens/hammerDown.png), default';
}

/**
 * Coloca o martelo para cima.
 */
function marteloCima() {
    document.getElementById('idGramado').style.cursor = 'url(imagens/hammer.png), default';
}

/**
 * Trata o evento de uma martelada, ou seja, um click do mouse sobre o gramado.
 * Ao final da martelada, exibe a pontuação atualizada.
 * 
 * @listens event:click
 * @param {event} evento 
 */
function martelada(evento) {
    if (evento.target.src.includes('hole-mole')) {
        // acertou
        acertos++;
        evento.target.src = 'imagens/hole.png';
        clearTimeout(timer);
        // Aumenta a velocidade das toupeiras
        intervalo = Math.max(intervalo - 200, 1000); // Reduz o intervalo, mas não menos que 1 segundo
        janela = Math.max(janela - 100, 500); // Reduz o tempo da janela, mas não menos que 0.5 segundo
    } else {
        // errou
        errados++;
        if (errados >= 3) {
            alert('Game Over');
            resetGame();
            return;
        }
    }
    mostraPontuacao();
}

/**
 * Salva o recorde do jogador
 * 
 * @param {string} nickname nome do jogador
 * @param {int} acertos quantidade de acertos
 */
function salvarRecorde(nickname, acertos) {
    const pontos = acertos * 10;
    fetch('http://localhost:3000/salvar-recorde', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nickname, acertos: pontos })
    })
    .then(response => response.json())
    .then(data => {
        console.log('%cRecorde salvo com sucesso!', 'color: green; font-weight: bold;');
        console.log('%cDetalhes do recorde:', 'color: blue; font-weight: bold;', data);
        alert('Recorde salvo com sucesso!');
        window.location.href = 'recordes.html';
    })
    .catch(error => {
        console.error('%cErro ao salvar recorde:', 'color: red; font-weight: bold;', error);
        alert('Erro ao salvar recorde. Por favor, tente novamente.');
    });
}

/**
 * Reseta o jogo
 */
function resetGame() {
    const nickname = prompt('Digite seu nickname:');
    if (nickname) {
        salvarRecorde(nickname, acertos);
    } else {
        alert('Nickname é obrigatório para salvar o recorde.');
    }

    acertos = 0;
    perdidos = 0;
    errados = 0;
    intervalo = 5000;
    janela = 2000;
    mostraPontuacao();
    document.getElementById('start').disable = false;
    document.getElementById('start').addEventListener('click', start);
}