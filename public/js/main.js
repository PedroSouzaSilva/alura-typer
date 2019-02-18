var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
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
}