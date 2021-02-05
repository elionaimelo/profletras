/*global slug */
var questoes = ['pra.to','fal.ta','cau.le','re.ló.gio','pris.ma','es.col.ta',
                'po.mar','car.ta','brin.co','cas.ta','e.di.fí.cio','mes.mo'];

var respostas = ['024.04','042.04','043.24','03.3.0','0240.14','40.042.04',
                 '13.132','042.24','0241.04','040.04','4.04.04.04.4','140.14'];

$('#quadro').append($('<ol></ol>'));

questoes.forEach(function(questao, i) {
  var label = $('<div />').addClass('label').text(questao);
  var input = $('<div />').attr('data-resposta', respostas[i]).addClass('input')
                .attr('contenteditable', true);

  var item = $('<li />').append(label).append(input);
  $('#quadro ol').append(item);
});

$('.input').on('input', function(a) {
  var texto = $(this).text();
  var resposta = $(this).attr('data-resposta');

  if (
     (texto.indexOf('.') === -1 && texto.length >= resposta.length - 1) ||
     (texto.indexOf('.') !== -1 && texto.length >= resposta.length)
  ) {
    if (texto === resposta || texto === resposta.replace('.', '')) {
      $(this).addClass('sucesso');
    } else {
      $(this).addClass('erro');
    }
  } else {
    $(this).removeClass('sucesso').removeClass('erro');
  }
});
