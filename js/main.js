const arrayPersonajes = [
    {
        nombre: "abra",
        rutaImagen: "img/abra.png"
    },
    {
        nombre: "bullbasaur",
        rutaImagen: "img/bullbasaur.png"
    },
    {
        nombre: "charmander",
        rutaImagen: "img/charmander.png"
    },
    {
        nombre: "dratini",
        rutaImagen: "img/dratini.png"
    },
    {
        nombre: "eevee",
        rutaImagen: "img/eevee.png"
    },
    {
        nombre: "jigglypuff",
        rutaImagen: "img/jigglypuff.png"
    },
    {
        nombre: "mankey",
        rutaImagen: "img/mankey.png"
    },
    {
        nombre: "meowth",
        rutaImagen: "img/meowth.png"
    },
    {
        nombre: "pidgey",
        rutaImagen: "img/pidgey.png"
    },
    {
        nombre: "pikachu-2",
        rutaImagen: "img/pikachu-2.png"
    },
    {
        nombre: "psyduck",
        rutaImagen: "img/psyduck.png"
    },
    {
        nombre: "squirtle",
        rutaImagen: "img/squirtle.png"
    } 
]

const game = document.getElementById("game");
const rejilla = document.createElement("section");

const btnInicio = document.getElementById("inicio");
const reloj = document.getElementById("reloj");
const ganador = document.getElementById("ganador");
const cartelGameOver = document.getElementById("game-over");

const bounce = document.getElementById("bounce");
const clic = document.getElementById("clic");
const fail = document.getElementById("fail");
const song = document.getElementById("song");
const winner = document.getElementById("winner");

var contador = 0;
var primerSeleccionado = ""; // inicializa variable en vacío
var segundoSeleccionado = "";
var selPrevio = null; // inicializa con valor 'null' (vacío)
var eliminados = 0;



// Creación de sección rejilla rejilla y elementos 'div' para cada personaje a partir de array

rejilla.setAttribute("class","rejilla"); // 'setAttribute('atributo','valor')' establece atributo y su valor (en este caso asigna clase '.rejilla' a elemento 'section' almacenado en 'rejilla')
game.appendChild(rejilla); // establece 'rejilla' (elemento 'section') como hijo de 'game' (elemento 'div')

function baraja() { // se introduce código de creación de personajes (imágenes) dentro de una función para que cada vez que se esta llame al reiniciar partida, aquellos se vuelvan a crear y reordenar aleatoriamente (página nace vacía de elementos); esta función también resetea propiedades establecidas durante la partida anterior para que cada vez que se inicia una nueva partida pulsando el botón, el juego funcione como la primera vez, tras la carga de página

    const doblePersonajes = arrayPersonajes.concat(arrayPersonajes).sort(()=> 0.5 - Math.random()); // array 'doblePersonajes' es la suma (concatenación) de 'arrayPersonajes' consigo mismo (duplicado) | ('Math.random()': genera número aleatorio distinto cada vez que se carga página) | 'sort()' ordena objetos según un criterio definido en valor (positivo sentido ascendente y negativo descendente); '0.5 - Math.random()' devuelve valor distinto (módulo y signo) cada vez que se carga la partida, por lo que ordena aleatoriamente

    doblePersonajes.forEach(personaje => { // sintaxis de función flecha (equivale a 'function(personaje){}')
        const {nombre, rutaImagen} = personaje;
        tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta"); // añade clase '.tarjeta' a objeto 'tarjeta'
        tarjeta.dataset.name = nombre; // se establece para cada elemento ('div') de 'tarjeta' un atributo 'dataset' cuyo valor ('name') es igual a variable 'nombre' ('<div class="tarjeta" dataset="'nombre de personaje'"</div>')

        anverso = document.createElement("div"); // declaración de variable 'anverso' (recoge imagen pokéball desde estilos.css)
        anverso.classList.add("anverso"); // añade clase '.anverso' a variable 'anverso'

        reverso = document.createElement("div"); // declaración de variable 'reverso' (recoge imágenes pokémon en línea siguiente)
        reverso.classList.add("reverso"); // añade clase '.reverso' a variable 'reverso'
        reverso.style.backgroundImage = `url(${rutaImagen})`; // establece para cada elemento ('div') de 'reverso' un estilo CSS de 'backgroundImage' enlazado desde URL ('rutaImagen') | '${}' garantiza que valor entre llaves es dato tipo 'string'

        rejilla.appendChild(tarjeta); // establece 'tarjeta' (elemento 'div') como hijo de 'rejilla' (elemento 'section')
        tarjeta.appendChild(anverso); // establece 'anverso' (elemento 'div') como hijo de 'tarjeta' (elemento 'div')
        tarjeta.appendChild(reverso); // establece 'reverso' (elemento 'div') como hijo de 'tarjeta' (elemento 'div')
    });

    rejilla.classList.remove("fuera"); // remueve clase '.fuera' de 'rejilla' (añadida en partida anterior si se pierde)
    btnInicio.style.display = "none"; // establece estilo CSS 'display = "none"' para 'btnInicio' (botón de inicio)
    reloj.style.display = "initial"; // establece estilo CSS 'display = "initial"' para 'reloj' (cuenta atrás)
    ganador.classList.remove("open"); // elimina clase '.open' de 'ganador' (añadida en partida anterior si se gana)
    cartelGameOver.style.opacity= "0"; // establece estilo CSS 'opacity = "0"' para 'cartelGameOver' (mensaje de fin de partida)
    eliminados = 0; // establece variable 'eliminados' a cero para que  se reinicie la cuenta que llevaba de la partida anterior 
    winner.pause(); // detiene reproducción de la canción de victoria (si seguía sonando de la partida anterior)
    fail.pause(); // detiene reproducción de la canción de derrota (si seguía sonando de la partida anterior)
    song.currentTime = 0; // pone a cero la repoducción de la canción de fondo (si seguía sonando de partida anterior) 
    song.play(); // reproduce canción de fondo
    song.volume = 0.5; // reduce volumen un 50% (máximo valor: '1')
}



// Función de reloj cuenta atrás //

var segundos = 120;

function cuentaAtras(){ 
    var s = parseInt(segundos % 60); 
    var ss = ("0" + s).slice(-2); 
    var m = parseInt(segundos / 60);
    var mm = ("0" + m).slice(-2);

    reloj.innerHTML = mm + ":" + ss;

    if (eliminados === 24) {
        return; // detiene reloj cuando se gana el juego
    }

    if (segundos > 0){  
        var t = setTimeout(function(){
            cuentaAtras(); 
        }, 1000); 
    } else { 
        gameOver(); // cuando se establecen funciones dentro de lógicas complejas (condicional asociada a evento de reloj), es preferible simplemente invocar a dicha función y definirla en otro bloque para optimizar código
    }
    segundos--; 
}



// Función para ejecutar la lógica de Game Over //

function gameOver() {
    segundos = 120; // pone la cuenta atrás a tiempo de inicio
    rejilla.classList.add("fuera"); // añade  clase '.fuera' a 'rejilla' (desborda las imágenes por el borde superior de la pantalla)
    reloj.style.display = "none"; // establece estilo CSS 'display = "none"' para 'reloj' (cuenta atrás)
    cartelGameOver.style.opacity= "1"; // establece estilo CSS 'opacity = "1"' para 'cartelGameOver' (mensaje de fin de partida)
    song.pause(); // detiene reproducción de la canción de fondo  (si seguía sonando de partida anterior)
    fail.currentTime = "0"; // pone a cero la reproducción de canción de derrota (si seguía sonando de la partida anterior) 
    fail.play(); // reproduce canción de derrota
    setTimeout(function(){ // establece un retraso de 750 milisegundos a la función para que botón de inicio  no aparezca hasta que todos los elementos de la rejilla se hayan desbordado por el borde superior de la pantalla (animación de derrota)
        btnInicio.style.display = "initial"; 
    }, 750);
    setTimeout(function(){ // establece un retraso de 1000 milisegundos a la función para que los elementos de la rejilla no se eliminen (ciclo 'while') hasta que se haya visualizado la animación en la que estos se desbordan por el borde superior de la pantalla (es decir, se eliminan después de desbordarse y no justo a llegar a cero el contador)
        while(rejilla.firstChild) { 
            rejilla.removeChild(rejilla.firstChild); // mientras 'rejilla' tenga un primer hijo (imagen de personaje) lo elimina; como segundo hijo pasa a ser primero cuando este se elimina, el ciclo continúa hasta que no queda ninguno; eliminar todos los elementos imágenes permite volver a crearlos y que se distribuyan aleatoriamente con cada partida al pulsar el botón de inicio (sin tener que recargar la página)
            }        
    }, 1000);
}



// Lógica para evento click de selección de cada personaje

rejilla.addEventListener("click", function(evento){
    var seleccionado = evento.target; // 'target' define elemento (objetivo) sobre el que usuario hace click

// NOTA IMPORTANTE: variable 'seleccionado' recoge (selecciona) imágenes pokémon sobre las que se hace click y, mediante ejecución de función 'evento', asigna clase '.seleccionado' al elemento que las recoge; originalmente elemento 'div' con clase '.tarjeta' era quien recibía cada imagen pokémon, por lo que clase '.seleccionado' se asignaba directamente sobre él al hacer click; sin embargo al crear variables (que almacenan elementos hijos de '.tarjeta') 'anverso' (frontal) y 'reverso' (posterior) para recoger las imágenes (pokéball y pokémon respectivamente) hay que añadir 'parentNode' a 'seleccionado' para que clase '.seleccionado' se asigne a elemento padre (clase '.tarjeta') y no a elemento imagen sobre el que se hace click (clases '.anverso' y '.reverso'), lo cual impediría el correcto funcionamiento de la clase (giro de 180 grados se tiene que aplicar a 'div' de '.tarjeta', que engloba a ambos '.anverso' y '.reverso')


    if (seleccionado.nodeName === "SECTION" || seleccionado.parentNode === selPrevio || seleccionado.parentNode.classList.contains("eliminado")) { // condición se establece para detener ejecución de función: 'seleccionado.nodeName === "SECTION"' para evitar que se establezca estilo de clase '.seleccionado' (giro de 180 grados) sobre cualquier otro elemento que no sea imagen de rejilla (pokémon) al hacer click; '||':  operador Ó lógico; 'seleccionado.parentNode === selPrevio' para evitar que al pulsar dos veces sobre misma imagen, esta desaparezca; '||':  operador Ó lógico; 'seleccionado.parentNode.classList.contains("eliminado")' para evitar que al pulsar imagen sobre la que se ya ha hecho click y ya ha sido eliminada, esta vuelva a aparecer
        return; // return sin valor (devuelve vacío) equivale a 'break' (simplemente detiene ejecución de función) 
    }

    clic.currentTime = 0; // pone a cero la repoducción del sonido de click (para que sonido de click se vuelva a escuchar si pulsan imágenes con rapidez, antes de que termine el sonido del anterior click)
    clic.play(); // reproduce sonido de click

    if (contador < 2) { // condición añade clase '.seleccionado' solo a dos primeras imágenes de rejilla sobre la que se hace click (cuenta si misma imagen es seleccionada dos veces)

        contador++;

        if (contador === 1) {
            primerSeleccionado = seleccionado.parentNode.dataset.name; // almacena nombre (atributo 'dataset' se asoció a variable 'nombre' en 'tarjeta.dataset.name = nombre') del primer personaje seleccionado en variable 'primerSeleccionado'; 'parentNode' establece propiedad (almacén de nombre) a elemento 'div' padre ('tarjeta') de elemento imagen seleccionado ('anverso' o 'reverso')
            seleccionado.parentNode.classList.add("seleccionado"); // añade clase '.seleccionado' a objeto 'seleccionado' (imagen rejilla); 'parentNode' establece propiedad (añadidura de clase) a elemento 'div' padre ('tarjeta') de elemento imagen seleccionado ('anverso' o 'reverso')
            // selPrevio = seleccionado.parentNode; /* establecer esta propiedad dentro de este bloque permite volver seleccionar el mismo elemento que se ha seleccionado anteriormente cuando se haya fallado al emparejar */
        } else {
            segundoSeleccionado = seleccionado.parentNode.dataset.name; // almacena nombre del segundo personaje seleccionado en variable 'segundoSeleccionado'
            seleccionado.parentNode.classList.add("seleccionado");
        }

        if (primerSeleccionado !== "" && segundoSeleccionado !== "") { // '""' representa vacío
            if(primerSeleccionado === segundoSeleccionado) { // si primer elemento seleccionado es igual a segundo elemento seleccionado (emparejarmiento exitoso)
                setTimeout(eliminar, 1200); // ejecuta variable 'eliminar' (función anónima que añade clase '.eliminado' --> borra imagen); 'setTimeout()' retrasa ejecución 1200 milisegundos para que no se elimine inmediatamente y dé tiempo a que se produzca animación de giro de clase '.seleccionado'
                setTimeout(resetSelec, 1200); // ejecuta variable 'resetSelec' (función anónima que elimina clase '.seleccionado' --> giro de 180 grados)
                contEliminados(); // ejecuta variable 'contEliminados' (función que cuenta imágenes eliminadas)
            } else { // si primer elemento seleccionado NO es igual a segundo elemento seleccionado (emparejamiento erróneo)
                setTimeout(resetSelec, 1200);
                // selPrevio = null; /* esta propiedad se tiene que añadir conjuntamente al establecer 'selPrevio = seleccionado.parentNode' dentro de bloque 'if (contador === 1)' para evitar que desaparezca mismo elemento seleccionado dos veces */
            }
        }

        selPrevio = seleccionado.parentNode; // variable 'seleccionado' selecciona elemento sobre el que se hace click (esta línea se tiene que borrar si se quiere establecer dentro de bloque 'if (contador ===1)')
    }
});



// Función para asignar clase '.eliminado' cuando existan dos coincidencias

var eliminar = function () { // 'eliminar' (y más abajo 'resetSelec') se crea como variable asociada a función anónima y no directamente como función porque método 'setTimeout()' solo funciona con funciones anónimas
    eliminados = document.querySelectorAll(".seleccionado"); // 'querySelectorAll()' selecciona todos elementos del HTML con una determinada condición (en este caso, elementos con 'class="seleccionado"')

    eliminados.forEach(eliminado => {
        eliminado.classList.add("eliminado"); // establece clase '.eliminado' a objeto 'eliminado'

        bounce.currentTime = "0"; // pone a cero la repoducción del sonido de emparejado 
        bounce.play(); // reproduce sonido de emparejado (sonido de última pareja no suena porque elemento de rejilla se elimina con ciclo 'while' al terminar la partida)    
    });
}



// Función para resetear los seleccionados cuando no coincidan

var resetSelec = function () {
    primerSeleccionado = ""; // deja 'primerSeleccionado' vacío
    segundoSeleccionado = ""; // deja 'segundoSeleccionado' vacío
    contador = 0; // pone 'contador' a cero (cuando 'contador' es mayor que 2 deja de funcionar)

    var seleccionados = document.querySelectorAll(".seleccionado"); // 'querySelectorAll(".seleccionado")' selecciona todos los elementos con clase '.seleccionado'
    seleccionados.forEach(seleccionado => {
        seleccionado.classList.remove("seleccionado"); // elimina clase '.seleccionado' (giro de 180 grados) a cada par de elementos ('contador < 2') sobre los que se hace click ('seleccionados')
    });
}



// Función para contar los eliminados y determinar cuándo acaba el juego con éxito

var contEliminados = function () {
    eliminados = document.querySelectorAll(".eliminado").length +2; // ' querySelectorAll(".eliminado").length' selecciona (cuenta) número elementos ('length') de array 'eliminados' (hay que añadir '+2' porque está indexado a cero y cuenta pares de elementos)
    if (eliminados === 24) { // cuando contador de 'eliminados' llegua a 24 se gana la partida
        ganador.classList.add("open"); // añade clase '. open' a 'ganador' (logo de victoria)
        segundos = 120; // pone la cuenta atrás a tiempo de inicio  
        rejilla.classList.add("fuera"); // añade clase '.fuera' a 'rejilla' (desborda las imágenes por el borde superior de la pantalla)
        reloj.style.display = "none"; // establece estilo CSS 'display = "none"' para 'reloj' (cuenta atrás)
        
        song.pause(); // detiene reproducción de la canción de fondo (si seguía sonando de partida anterior)
        winner.currentTime = "0"; // pone a cero la repoducción de la canción de victoria (si seguía sonando de partida anterior) 
        winner.play(); // reproduce canción de victoria
        setTimeout(function(){
            btnInicio.style.display = "initial";
        }, 750);
        setTimeout(function(){
            while(rejilla.firstChild) {
                rejilla.removeChild(rejilla.firstChild); 
                }
        }, 1000);
    }
}