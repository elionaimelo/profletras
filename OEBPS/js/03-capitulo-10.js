// EXERCÍCIO 01

var respostas = ['obstruinte', 'labial', 'soante', 'coronal', 'anterior'];
var alternativas = ['a', 'b', 'c', 'd', 'e'];

$(':radio').change(selecionarResposta);

function selecionarResposta() {
    var qtdRespostasSelecionadas = alternativas.reduce(function(total, vogal) {
        if ($('input[name="' + vogal + '1"]:checked').attr('id')) {
           return total += 1;
        }
        return total;
    }, 0);

    if (qtdRespostasSelecionadas === 5) {
        alternativas.forEach(function(alternativa, i) {
            var alternativaTexto = $('input[name="' + alternativa + '1"]:checked')
                                      .attr('id').split('-').shift();

            var boxShadowColor = '';
            if (alternativaTexto === respostas[i]) {
                boxShadowColor = '#4593e6';
            } else {
                boxShadowColor = 'red';
            }

            $('input[name="' + alternativa + '1"]').parent()
                .css({
                    'border-radius': '10px',
                    'box-shadow': '0 0 8px ' + boxShadowColor
                });
        });
    }
}

// EXERCÍCIO 02

var soante = ['a', 't', 'k', 'w', 's', 'l', 'r', 'v', 'ɔ'];
var soanteRespostas = ['a', 'w', 'r', 'l','ɔ'];

var lateral = ['p', 'g', 'y', 'l', 'z', 'ʎ', 'z', 'i', 't', 's'];
var lateralRespostas = ['p', 'g', 'y', 'z', 'i', 't', 's'];

var sonoro = ['v', 't', 'o', 'a', 'p', 'k', 'd', 'l', 'r', 'f'];
var sonoroRespostas = ['t', 'p', 'k', 'f'];

var anterior = ['i', 'a', 'k', 'x', 'g', 'b', 'p', 's', 't', 'o'];
var anteriorRespostas = ['b', 'p', 's', 't'];

var coronal = ['l', 'k', 'u', 'w', 'y', 's', 'z', 'n', 'r', 'a'];
var coronalRespostas = ['l', 'y', 's', 'z', 'n', 'r'];

adicionarSom(soante, soanteRespostas, '#soante');
adicionarSom(lateral, lateralRespostas, '#lateral');
adicionarSom(sonoro, sonoroRespostas, '#sonoro');
adicionarSom(anterior, anteriorRespostas, '#anterior');
adicionarSom(coronal, coronalRespostas, '#coronal');

function adicionarSom(sons, respostas, id) {
    sons.forEach(function(som) {
        var divSom = $('<div />').text(som).data('som', som).click(function(somSelecionado) {
            selecionarSom(somSelecionado, respostas);
        });
        $(id).append(divSom);
    });
}

function selecionarSom(somSelecionado, respostas) {
    var som = $(somSelecionado.target).data('som');
    var style = {}
    if (respostas.indexOf(som) !== -1) {
        style = { background: '#4593e6', color: 'white' };
    } else {
        style = { background: '#e35454' };
    }
    $(somSelecionado.target).css(style);
}
