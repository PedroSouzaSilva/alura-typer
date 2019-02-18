var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var qtdPalavras = frase.split(" ");
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(qtdPalavras.length);
}

function inicializaContadores() {
    campo.on("input", function(){
        var conteudo = campo.val();
        var qtdPalavras =  conteudo.split(/\s+/).length;
        $("#contador-palavras").text(qtdPalavras);
        
        var qtdCaracteres = conteudo.replace(/\s+/g, '');
        $("#contador-caracteres").text(qtdCaracteres.length);
        
    });
}

function inicializaCronometro() {
    var tempoRestante =  $("#tempo-digitacao").text();
    
    campo.one("focus", function(){
        var cronometroID = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1){
                campo.attr("disabled",  true);
                clearInterval(cronometroID);
                $("#botao-reiniciar").attr("disabled", false);
                campo.toggleClass("campo-desativado");
            }
        }, 1000);
    });
    $("#botao-reiniciar").attr("disabled",true);
}

function reiniciaJogo(){
    campo.attr("disabled", false);
    //inicializando os campos
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha"); //novo
    campo.removeClass("borda-verde"); //novo
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function() {
        var digitado = campo.val();
        if(frase.startsWith(digitado)) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}