/*
A letra "e" é convertida para "enter"
A letra "i" é convertida para "imes"
A letra "a" é convertida para "ai"
A letra "o" é convertida para "ober"
A letra "u" é convertida para "ufat"
*/


function limparTexto(texto) {
    texto = document.getElementById('texto_cripto');
    texto.value = '';
}

function exibirTextoNaTela(id, texto) {
    let campo = document.getElementById(id);
    campo.innerHTML = texto;
}

function avisoPadrao(){
    let textoAviso = document.getElementById('aviso');
    exibirTextoNaTela("aviso", "Utilize apenas letras minusculas sem acento.");
    textoAviso.style.color = "gray";
}

function avisoCriptoVazio(){
    let textoAviso = document.getElementById('aviso');
    exibirTextoNaTela("aviso", "Nenhuma mensagem foi encontrada. Insira seu texto acima.");
    textoAviso.style.color = "red";
}

function avisoMaiusculo(){
    let textoAviso = document.getElementById('aviso');
    exibirTextoNaTela("aviso", "Esse texto contém letras maiúsculas.");
    textoAviso.style.color = "red";
}

function avisoNumeroOuEspecial(){
    let textoAviso = document.getElementById('aviso');
    exibirTextoNaTela("aviso", "Esse texto contém números ou caracteres especiais.");
    textoAviso.style.color = "red";
}

function avisoDescriptoVazio(){
    let textoAviso = document.getElementById('aviso');
    exibirTextoNaTela("aviso", "Nenhuma mensagem foi encontrada. Clique no botão Copiar para inserir o texto descriptografado");
    textoAviso.style.color = "red";
}





//Esta função verifica se o texto atende os requisitos para ser criptografado, senão um aviso é mostrado e o botão de criptografar é desabilitado
function verificaTexto() {
    let botao = document.getElementById('botao_cripto');
    let texto = document.getElementById('texto_cripto').value;
    
    //Se o texto possui alguma letra maiúscula
    if(texto !== texto.toLowerCase()){
        avisoMaiusculo();
        botao.disabled = true;
    // Se o texto possui algum numero ou caractere especial
    } else if (/[0-9!çãáàâéèêíïóôõöúçñ@#$%^&*()_+={}[\]:;<>,."'´`~?\/\\|-]/.test(texto)) {
        avisoNumeroOuEspecial();
        botao.disabled = true;
    } else {
    // Se o texto está de acordo com os requisitos
        avisoPadrao();
        botao.disabled = false;
    } 

}

function criptografar(){
    let textASerCripto = document.getElementById("texto_cripto").value;
   console.log(textASerCripto);


    //Se a o texto estiver vazio
    if(textASerCripto.trim()=== ''){
        avisoCriptoVazio();
        return;
    }



    let cache = [];
    for( let i = 0; i<textASerCripto.length; i++){
        let letraCheck = textASerCripto[i];
        switch(letraCheck){
            case "a":
                cache.push("ai");
                break;
            case "e":
                cache.push("enter");
                break;
            case "i":
                cache.push("imes");
                break;
            case "o":
                cache.push("ober");
                break;
            case "u":
                cache.push("ufat");
                break;
            default :
                cache.push(textASerCripto[i]);
        }
        
    }
    console.log(cache);

    let textoCripto = cache.toString();

    for(let j = 0; j<textoCripto.length; j++){
        if(textoCripto[j] == ","){
            textoCripto= textoCripto.replace(",","");
        }
    }
    
    console.log(textoCripto);
    limparTexto(textASerCripto);


    document.getElementById("botao_descripto").removeAttribute("disabled");
    
    let imagem = document.getElementById("imagem_mensagem");
    let conteudo = document.getElementById("descripto_conteudo");


    // este if verifica se os componentes iniciais ainda estão na pagina
    if(document.body.contains(imagem) && document.body.contains(conteudo) ){

        //Substituição dos componentes anteriores, criação dos novos componentes e seus styles e inserção deles dentro da Area DesCripto


        let DivDescripto = document.createElement('p');
        DivDescripto.id = 'texto_descripto';
        DivDescripto.textContent = textoCripto;
        DivDescripto.classList.add('conteiner__areaDescripto__textoDescripto'); 

        let CopiarDescripto = document.createElement('button');
        CopiarDescripto.id = 'botao_Copiar';
        CopiarDescripto.textContent = 'Copiar';
        CopiarDescripto.classList.add('conteiner__areaDescripto__botaoCopiar'); 
        CopiarDescripto.addEventListener('click', copiar);

        //
        let conteinerDescripto = document.getElementById('descripto_conteiner');

        conteinerDescripto.classList.replace('conteiner__areaDescripto','conteiner__areaDescripto2');
        
        conteinerDescripto.appendChild(DivDescripto)
        conteinerDescripto.appendChild(CopiarDescripto)

        conteinerDescripto.replaceChild(DivDescripto,imagem);
        conteinerDescripto.replaceChild(CopiarDescripto,conteudo);

    }

    let DivDescriptoJaExiste = document.getElementById('texto_descripto');
    DivDescriptoJaExiste.textContent = textoCripto ;


}

function descriptografar(){
    let textASerDecripto = document.getElementById('texto_cripto').value ;
        
    cache = textASerDecripto.replace(/ai/g,"a")
                            .replace(/enter/g,"e")
                            .replace(/imes/g,"i")
                            .replace(/ober/g,"o")
                            .replace(/ufat/g,"u");
   
    console.log(cache);
    limparTexto(textASerDecripto);

    let textoDescripto = document.getElementById('texto_descripto');

    textoDescripto.innerHTML = cache; 



}

function copiar (){
    let botaoCopiar = document.getElementById('botao_copiar')
    let textoDescripto = document.getElementById('texto_descripto');
    let textoCripto = document.getElementById('texto_cripto');

    textoCripto.value = textoDescripto.innerHTML;
    textoDescripto.innerHTML = 'Sem mensagens para descriptografar.';

    botaoCopiar.disabled = true;


}



