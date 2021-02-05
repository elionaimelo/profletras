var respostas = [
  '[-nasal] → [+nasal]',
  '[+silábico, -consonantal] → [-silábico]',
  '[-contínuo] → [+contínuo]',
  '[-alta] → [+alta]',
  '[-sonora] → [+sonora]',
  '[-contínua] → [+contínua]',
  '[-anterior] → [+anterior]',
  '[+anterior] → [- anterior]'
];

$(init);

function init() {
  respostas.forEach(function (resposta, i) {
    $('<div />')
      .attr('data-resposta', resposta)
      .text(resposta)
      .appendTo('#respostas');
  });

  var respostasDiv = $('#respostas');
  var divs = respostasDiv.children();
  while (divs.length) {
      respostasDiv.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
  }

  $('#respostas div').draggable({
    containment: '#quadro',
    cursor: 'move',
    revert: true
  });

  respostas.forEach(function(resposta) {
    $('<div></div>')
      .attr('data-resposta', resposta)
      .appendTo('#lacunas')
      .droppable({
        drop: addPalavra,
        hoverClass: 'hovered'
      });
  });
}

function addPalavra(evento, ui) {
  if ($(this).attr('data-resposta') === ui.draggable.attr('data-resposta')) {
    ui.draggable.draggable('option', { disabled: true, revert: false })
                .position({ of: $(this), my: 'left top', at: 'left top' });

    $(this).droppable({ disabled: true });
  }
}
