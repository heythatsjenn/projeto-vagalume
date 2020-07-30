var botaozinho = document.getElementById('botaozinho');
var pesquisaArtista =document.getElementById('pesquisa-artista');
var pesquisaMusica = document.getElementById('pesquisa-musica');


function achaMusica (callback){
    var xhr = new XMLHttpRequest();
    var artista = formataPesquisa(pesquisaArtista.value);
    var musica = formataPesquisa(pesquisaMusica.value);
    xhr.open("GET", 'https://api.vagalume.com.br/search.php?art='+ artista + '&mus='+ musica + '&extra=rank,artpic,relmus,relart,alb' + '&apikey={0c0a63c0c555dd3208db2deb2a46c9df}');

    var infoDaMusica;

    xhr.addEventListener("load", ()=>{
        infoDaMusica = JSON.parse(xhr.responseText);
        console.log(infoDaMusica);
        callback(infoDaMusica);
    });

    xhr.send();

    return infoDaMusica;
}


function printaTela(){
    achaMusica(infoDaMusica =>{

        var containerLetra = document.querySelector(".conteudo-letra");
        containerLetra.textContent = "";

        console.log(infoDaMusica);

        if (infoDaMusica.type == "notfound") {
            containerLetra.textContent = "Artista não encontrado :/";
            var containerArtistas = document.querySelector(".artistas-recomendados");
            containerArtistas.innerText = "";
        }
        else{
            if (infoDaMusica.type == "song_notfound") {
                containerLetra.innerHTML = "<h1 class='not-found'>Música não encontrada :/</h1>";
                printaArtistas (pesquisaArtista.value,pesquisaMusica.value);
            }
            else{
                printaLetra(containerLetra,infoDaMusica);
                printaArtistas (pesquisaArtista.value,pesquisaMusica.value);
            }
        }

        pesquisaArtista.value ="";
        pesquisaMusica.value ="";

    });
}

function printaLetra(containerLetra, infoDaMusica){
    var letra = document.createElement("p");
    var nome = document.createElement("h1");
    var artista = document.createElement("h2");

    artista.innerText = infoDaMusica.art.name;
    nome.innerText = infoDaMusica.mus[0].name;
    letra.innerText = infoDaMusica.mus[0].text;

    containerLetra.appendChild(nome);
    containerLetra.appendChild(artista);
    containerLetra.appendChild(letra); 
}


function formataPesquisa(string){
    var novaString = string.replace(/[^a-zA-Z ]/g,"").split(" ").join("-").toLowerCase();
    console.log(novaString);
    return novaString;
};



function printaLetraTraduzida(){
    console.log("cu");
}

function buscaElemento(artistaDado, musicaDada,callback){
    var xhr = new XMLHttpRequest();
    var artista = formataPesquisa(artistaDado);
    var musica = formataPesquisa(musicaDada);

    var url = 'https://api.vagalume.com.br/search.php?art='+ artista + '&mus='+ musica + '&extra=rank,artpic,relmus,relart,alb'+ '&nolyrics=1' +'&apikey={0c0a63c0c555dd3208db2deb2a46c9df}'
        
    console.log(url);
    xhr.open("GET", url);
    
    xhr.addEventListener("load", ()=>{
        var infosExtras = JSON.parse(xhr.responseText);
        callback(infosExtras);
    });
    xhr.send();

}



function printaArtistas (artistaDado,musicaDada){


    var containerArtistas = document.querySelector(".artistas-recomendados");
    containerArtistas.innerText = "";

    var titulo = document.createElement("h2");
    titulo.innerText = "Artistas Recomendados";

    containerArtistas.appendChild(titulo);

    buscaElemento(artistaDado, musicaDada, infosExtras=>{

        var artistasRecomendados = infosExtras.art.related;

        artistasRecomendados.forEach(artista => {
            console.log(artista.name)
            var containerArtista = document.createElement("div");
            containerArtista.classList.add("container-artista")

            buscaElemento(artista.name, musicaDada, infosExtras =>{
                var fotoDoArtista = document.createElement("img");
                fotoDoArtista.src = infosExtras.art.pic_medium;
                containerArtista.appendChild(fotoDoArtista);

                var nomeDoArtista = document.createElement("p");
                nomeDoArtista.innerText = artista.name;
                containerArtista.appendChild(nomeDoArtista);
            })

            containerArtistas.appendChild(containerArtista);

        });
    });
};



botaozinho.addEventListener("click", printaTela);

function carregaSlick(){
    var script = document.createElement('script');
    script.src = "slickScript.js";
    script.async = true;
    document.head.appendChild(script);    
}

function descarregaSlick(){
    var script = document.createElement('script');
    script.src = "slickunScript.js";
    script.async = true;
    document.head.appendChild(script);   
}
