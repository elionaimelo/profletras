// EXERCÍCIO 03

$('.resultado span').click(selecionarFonema);

function selecionarFonema(fonemaSelecionado) {
    var fonema = $(fonemaSelecionado.target);
    fonema.siblings().css({
        background: '#97d3ba',
        color: 'black'
    });
    if (fonema.parent().attr('data-resposta') === fonema.text()) {
        fonema.css({
          background: '#4593e6',
          color: 'white'
        });
    } else {
        fonema.css({
          background: '#e35454',
          color: 'black'
        });
    }
}

// EXERCÍCIO 04

var obstruintes1 = ['t', 'k', 'f', 's', 'n', 'p', 'b', 'g'];
var obstruintes1Resposta = ['n'];
var vogais = ['e', 'ɛ', 'o', 'ɔ', 'a'];
var vogaisResposta = ['a']
var obstruintes2 = ['p', 'b', 't', 'd', 'k', 'g', 'l', 'ʃ', 'ʒ'];
var obstruintes2Resposta = ['l']
var naocontinuas = ['d', 'g', 'v', 'b', 'k'];
var naocontinuasResposta = ['v']
var continuas = ['f', 'v', 's', 'z', 'p'];
var continuasResposta = ['p']
var soantes = ['l', 'r', 'm', 'n', 'g', 'ʎ', 'ɲ'];
var soantesResposta = ['g'];

adicionarSom(obstruintes1, obstruintes1Resposta, '#obstruintes1');
adicionarSom(vogais, vogaisResposta, '#vogais');
adicionarSom(obstruintes2, obstruintes2Resposta, '#obstruintes2');
adicionarSom(naocontinuas, naocontinuasResposta, '#naocontinuas');
adicionarSom(continuas, continuasResposta, '#continuas');
adicionarSom(soantes, soantesResposta, '#soantes');

function adicionarSom(sons, respostas, id) {
    sons.forEach(function(som) {
        var divSom = $('<div />').text(som).data('som', som).click(function(somSelecionado) {
            selecionarSom(somSelecionado, respostas);
        });
        $(id + ' .fonemas').append(divSom);
    });
}

function selecionarSom(somSelecionado, respostas) {
    var som = $(somSelecionado.target);
    som.siblings().css({
        background: '#97d3ba',
        color: 'black'
    });
    var style = {};
    if (respostas.indexOf(som.data('som')) !== -1) {
        style = { background: '#4593e6', color: 'white' };
    } else {
        style = { background: '#e35454' };
    }
    $(somSelecionado.target).css(style);
}
