// A ordem das palavras deve ser de cima para baixo, da esquerda para a direita
var palavras = ['Lábio inferior',
    'Língua (ponta)',
    'Língua (corpo)',
    'Língua (corpo)',
    'Língua (raiz)',
    'Língua (corpo)',
    'Língua (ponta)',
    'Lábio inferior',

    'Lábio superior',
    'Dentes',
    'Alvéolos',
    'Palato duro',
    'Palato mole',
    'Palato duro',
    'Alvéolos',
    'Dentes superiores'];

var topoDrop = 180;
var esquerdaDrop = 48;

var topoDrag = 580;
var esquerdaDrag = 48;

var cont = 0;



$(init);

function init() {
    // limparTela();
    // var palavras = texto.split(' ');
    // var palavrasHtml = '';
    // $.each(palavras, function(chave, valor) {
    //     var palavra = apenasAlfanumericos(valor).toLowerCase();
    //     var elemento = '<span class="' + palavra + '" data-palavra="' + palavra + '">' + valor + ' </span>';
    //     $(elemento).appendTo('#texto p');
    // });
    // $('#texto span').click(selecionaPalavra);
    // $('#completar').removeClass('desabilitado');
}

for (var i = 0; i < 8; i++) {
    addDroppable(palavras[i], palavras[8 + i], i);
}

for (var i = 0; i < 8; i++) {
    addDroppable(palavras[8 + i], palavras[i], 8 + i);
}

// palavras.forEach(function(palavra, i) {
//     addDroppable(palavra, i);
// });

randomSort(palavras).forEach(function(palavra, i) {
    addDraggable(palavra, i);
});

console.log(palavras);

function addDroppable(palavra1, palavra2, i) {
    if (i === palavras.length / 2) {
        topoDrop = 180;
        esquerdaDrop = 550;
    }

    var container = $('<div></div>')
        .addClass('drop')
        .data('palavra1', slug(palavra1))
        .data('palavra2', slug(palavra2))
        .css({ top: topoDrop + 'px', left: esquerdaDrop + 'px' })
        .droppable({
            drop: addPalavra,
            hoverClass: 'hovered',
        });

    $('#quadro').append(container);

    topoDrop += 52;
}

function addPalavra(evento, ui) {
    console.log($(this).data('palavra1'));
    console.log($(this).data('palavra2'));
    console.log(ui.draggable.data('palavra'));

    var palavrasCoincidem = $(this).data('palavra1') === ui.draggable.data('palavra') || $(this).data('palavra2') === ui.draggable.data('palavra');

    if (palavrasCoincidem) {
        // var coluna = $(this).context.parentElement.id;
        // if (coluna == 'surdas' && surdas.length < surdasCorretas.length) {
        //   surdas.push(ui.draggable.text().trim());
        // } else {
        //   sonoras.push(ui.draggable.text().trim());
        // }
        ui.draggable.draggable('option', { disabled: true, revert: false })
            .position({of: $(this), my: 'left top', at: 'left top'});
        $(this).droppable({disabled: true});
        // qtdPalavrasSelecionadas++;
        // verificarResposta();
        cont++;
        if(cont == 16){
            alert("Parabéns você acertou tudo.");
        }
    }
}

function addDraggable(palavra, i) {
    if (i % 4 === 0) {
        topoDrag += 50;
        esquerdaDrag = 48;
    }

    var container = $('<div></div>')
        .addClass('drag')
        .text(palavra)
        .data('palavra', slug(palavra))
        .css({ top: topoDrag + 'px', left: esquerdaDrag + 'px' })
        .draggable({
            cursor: 'move',
            revert: true
        });

    $('#quadro').append(container);

    esquerdaDrag += container.width();
}

