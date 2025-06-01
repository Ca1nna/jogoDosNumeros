let numeroDelista = [];//comando de lista
let nivelMaximo = 1.000;
let Numero = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextonaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
function exibirMensagemInicial() {
    exibirTextonaTela('h1', 'jogo dos numeros');
    exibirTextonaTela('p', 'escolha um numero entre 1 e 100');
    
}
    exibirMensagemInicial();

function verificarChute() {
    let cosmo = parseInt(document.querySelector('input').value); // Convertendo para número

    if (cosmo === Numero) { // Usando === para comparação estrita
        exibirTextonaTela('h1', 'acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `voce descobriu o numero com ${tentativas} ${palavraTentativa}`;
        exibirTextonaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (cosmo > Numero) {
            exibirTextonaTela('p', 'o numero é menor');
        } else {
            exibirTextonaTela('p', 'o numero é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroAleatorio = parseInt(Math.random() * nivelMaximo + 1);
    let quantidadeDeElementosNalista = numeroDelista.length;

    if(quantidadeDeElementosNalista == nivelMaximo){

        numeroDelista = [];
    }

    if (numeroDelista.includes(numeroAleatorio)) {
        return gerarNumeroAleatorio();
    } else {
        numeroDelista.push(numeroAleatorio);
        console.log(numeroDelista);
        return numeroAleatorio;
    }
}

function limparCampo() {
    let cosmo = document.querySelector('input');
    cosmo.value = '';
}

function reiniciarJogo(){
    Numero = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
     document.getElementById('reiniciar').setAttribute('disabled', true);
    
}
