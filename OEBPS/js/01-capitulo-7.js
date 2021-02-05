var surdas = [];
var sonoras = [];
var surdasCorretas = ['cato', 'chato', 'faca', 'pato', 'selo', 'tato'];
var sonorasCorretas = ['bato', 'dado', 'gato', 'jato', 'vaca', 'zelo'];
var qtdPalavrasSelecionadas = 0;

$(init);

function init() {
  limparTela();

  surdasCorretas.forEach(function (surdaCorreta, i) {
    $('<div />')
      .prop('id', surdaCorreta)
      .text(surdaCorreta)
      .appendTo('#palavras');

    $('<div />')
      .prop('id', sonorasCorretas[i])
      .text(sonorasCorretas[i])
      .appendTo('#palavras');
  });

  var palavras = $("#palavras");
  var divs = palavras.children();
  while (divs.length) {
      palavras.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
  }

  $('#palavras div').draggable({
    containment: '#quadro',
    cursor: 'move',
    revert: true
  });

  for (i = 0; i < surdasCorretas.length; i++) {
    $('<div></div>').data('palavra-surda', i).appendTo('#surdas').droppable({
      drop: addPalavra,
      hoverClass: 'hovered'
    });
  }

  for (i = 0; i < sonorasCorretas.length; i++) {
    $('<div></div>').data('palavra-sonora', i).appendTo('#sonoras').droppable({
      drop: addPalavra,
      hoverClass: 'hovered'
    });
  }
}

function limparTela() {
  $('#mensagem').hide();
  $('#surdas').html('Surdos');
  $('#sonoras').html('Sonoros');
  $('#palavras').html('');
  qtdPalavrasSelecionadas = 0;
  surdas = [];
  sonoras = [];
}

function addPalavra(evento, ui) {
  var coluna = $(this).context.parentElement.id;
  console.log(coluna);
  console.log(surdas.length);
  console.log(surdasCorretas.length);
  if (coluna == 'surdas' && surdas.length < surdasCorretas.length) {
    surdas.push(ui.draggable.text().trim());
  } else {
    sonoras.push(ui.draggable.text().trim());
  }
  ui.draggable.draggable('option', { disabled: true, revert: false })
              .position({of: $(this), my: 'left top', at: 'left top'});
  $(this).droppable({disabled: true});
  qtdPalavrasSelecionadas++;
  verificarResposta();
}

function verificarResposta() {
  if (qtdPalavrasSelecionadas == 12) {
    respostaCorreta = true;
    surdas.sort();
    surdasCorretas.sort();
    sonoras.sort();
    sonorasCorretas.sort();
    $.each(surdas, function(chave, valor) {
      if (surdas[chave] != surdasCorretas[chave]) {
        respostaCorreta = false;
        $('#' + surdas[chave]).addClass('associacaoIncorreta');
      }else {
        $('#' + surdas[chave]).addClass('associacaoCorreta');
      }
    });
    $.each(sonoras, function(chave, valor) {
      if (sonoras[chave] != sonorasCorretas[chave]) {
        respostaCorreta = false;
        $('#' + sonoras[chave]).addClass('associacaoIncorreta');
      }else {
        $('#' + sonoras[chave]).addClass('associacaoCorreta');
      }
    });
    var mensagem = respostaCorreta ? 'Parabéns, você acertou!' : 'Tente outra vez';
    $('#mensagem h2').text(mensagem);
    $('#mensagem').show();
  }
}
