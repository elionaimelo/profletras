// A ordem das palavras deve ser de cima para baixo, da esquerda para a direita
var palavras = ['Arcada Alveolar', 'Língua', 'Fossas nasais', 'Lábios', 'Dentes',
                'Maxilar Inferior', 'Pulmões', 'Diafragma', 'Palato Duro',
                'Palato Mole', 'Abertura Velofaringal', 'Úvula', 'Faringe',
                'Epiglote', 'Cordas Vocais', 'Laringe'];

var topoDrop = 250;
var esquerdaDrop = 48;

var topoDrag = 680;
var esquerdaDrag = 48;

palavras.forEach(function(palavra, i) {
    addDroppable(palavra, i);
});

randomSort(palavras).forEach(function(palavra, i) {
    addDraggable(palavra, i);
});

console.log(palavras);

function addDroppable(palavra, i) {
    if (i === palavras.length / 2) {
        topoDrop = 250;
        esquerdaDrop = 550;
    }

    var container = $('<div></div>')
                      .addClass('drop')
                      .data('palavra', slug(palavra))
                      .css({ top: topoDrop + 'px', left: esquerdaDrop + 'px' })
                      .droppable({
                          drop: addPalavra,
                          hoverClass: 'hovered'
                      });

    $('#quadro').append(container);

    topoDrop += 52;
}

function addPalavra(evento, ui) {
    var palavrasCoincidem = $(this).data('palavra') === ui.draggable.data('palavra');
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
        $(".ui-draggable-disabled").addClass( "correta" );
        // qtdPalavrasSelecionadas++;
        // verificarResposta();
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
