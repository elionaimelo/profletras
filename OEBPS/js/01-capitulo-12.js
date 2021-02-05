var texto = 'Na minha escola tem biblioteca, cantina, banheiro, sala de professores';
texto += ' e muitas outras coisas. O que eu mais gosto em minha escola é a hora';
texto += ' da leitura. Gosto também dos colegas, das professoras e da minha namorada.';

var nasais = [];
var nasalizadas = [];
var nasaisCorretas = ['na', 'minha', 'cantina', 'banheiro', 'muitas', 'mais',
                      'namorada'];
var nasalizadasCorretas = ['minha', 'tem', 'cantina', 'banheiro', 'muitas',
                           'em', 'também'];
$(init);

function init() {
  limparTela();
  var palavras = texto.split(' ');
  var palavrasHtml = '';
  $.each(palavras, function(chave, valor) {
    var palavra = apenasAlfanumericos(valor).toLowerCase();
    var elemento = '<span class="' + palavra + '" data-palavra="' + palavra + '">' + valor + ' </span>';
    $(elemento).appendTo('#texto p');
  });
  $('#texto span').click(selecionaPalavra);
  $('#completar').removeClass('desabilitado');
}

function apenasAlfanumericos(texto) {
  return texto.toString().replace(/[^a-zA-Z0-9áéíóúâêôãẽõçÁÉÍÓÚÂÊÔÃẼÕÇ]/gi, '');
}

function selecionaPalavra() {
  $('.' + $(this).attr('class')).addClass('selecionada').addClass('ativa');
  $('#texto p').addClass('desabilitado');
  $('#opcoes').show();
}

function addPalavra() {
  var opcoesSelecionadas = [];
  if ($('#nasal').prop('checked')) {
    opcoesSelecionadas.push('nasal');
    nasais.push($('.ativa').data('palavra'));
    // alert($('.ativa').attr('data-palavra'));
  }
  if ($('#nasalizada').prop('checked')) {
    opcoesSelecionadas.push('nasalizada');
    nasalizadas.push($('.ativa').data('palavra'));
  }
  if (opcoesSelecionadas.length !== 0) {
    $('.ativa').removeClass('ativa');
    $('#opcoes').hide();
    $('#opcoes :checkbox').prop('checked', false);
    $('#texto p').removeClass('desabilitado');
  }
}

function cancelar() {
  $('.ativa').removeClass('ativa').removeClass('selecionada');
  $('#opcoes').hide();
  $('#opcoes :checkbox').prop('checked', false);
  $('#texto p').removeClass('desabilitado');
}

function completar() {
  if (nasais.length === 0 && nasalizadas.length === 0) {
    return false;
  }

  var resultado = $('#mensagem p, #mensagem ul');
  if (resultado) {
    resultado.remove();
  }

  $('#texto p').addClass('desabilitado');
  $('#completar').addClass('desabilitado');

  var respostaCorreta = true;
  var nasaisCorretasMarcadas = [];
  var nasalizadasCorretasMarcadas = [];
  var qtdNasaisCorretas = 0;
  var qtdNasalizadasCorretas = 0;

  nasais.forEach(function(nasal) {
    if (nasaisCorretas.indexOf(nasal) < 0) {
      respostaCorreta = false;
    } else {
      nasaisCorretasMarcadas.push(nasal);
      qtdNasaisCorretas++;
    }
  });

  nasalizadas.forEach(function(nasalizada) {
    if (nasalizadasCorretas.indexOf(nasalizada) < 0) {
      respostaCorreta = false;
    } else {
      nasalizadasCorretasMarcadas.push(nasalizada);
      qtdNasalizadasCorretas++;
    }
  });

  if (qtdNasaisCorretas !== nasaisCorretas.length ||
      qtdNasalizadasCorretas !== nasalizadasCorretas
  ) {
    respostaCorreta = false;
  }

  var mensagem = '';
  if (respostaCorreta) {
    mensagem = 'Parabéns, você acertou!';
  } else {
    mensagem = 'Tente outra vez';

    if (nasaisCorretasMarcadas.length) {
      var pNasais = $('<p />').text('Nasais marcadas corretamente:');
      var listaNasaisCorretas = $('<ul />');
      nasaisCorretasMarcadas.forEach(function(nasal) {
        listaNasaisCorretas.append($('<li />').text(nasal));
      });
      $('#mensagem').append(pNasais, listaNasaisCorretas);
    }

    if (nasalizadasCorretasMarcadas.length) {
      var pNasalizadas = $('<p />').text('Nasalizadas marcadas corretamente:');
      var listaNasalizadasCorretas = $('<ul />');
      nasalizadasCorretasMarcadas.forEach(function(nasalizada) {
        listaNasalizadasCorretas.append($('<li />').text(nasalizada));
      });
      $('#mensagem').append(pNasalizadas, listaNasalizadasCorretas);
    }
  }
  $('#mensagem h2').text(mensagem);
  $('#mensagem').show();
}

function limparTela() {
  $('#texto').html('<p></p>');
  $('#mensagem').hide();
  $('#opcoes').hide();
  nasais = [];
  nasalizadas = [];
  $('.selecionada').removeClass('.selecionada');
}
