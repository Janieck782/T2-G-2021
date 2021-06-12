//Declaracion de automata
const automata = {
    k: [], //estados = q0, q1, q2....
    s: [], //alfabeto = a, b....
    g: [], //caminos = ((q0,a)q1), ((q1,b)q0)...
    f: [], //final = q0, q1, q2....
    afd: null // afnd o afd
}//No modificar

//Se crean 2 automatas
const automata1 = Object.assign(automata);
const automata2 = Object.assign(automata);

//Variables
let tamañoAlfa = 0;

//Constantes HTML

//Automata1
const caminos1 = document.querySelector("#tablaTransicion1");
let estados1 = 0

//Automata2
const caminos2 = document.querySelector("#tablaTransicion2");
let estados2 = 0

//Funciones Formulario
function iniciarAutomata(automatas,bol,tabla) { //Funcion para iniciar automatas
    automatas.afd = afd();
    asignarAlfabeto(automatas);
    let tamañoQs = verificarEstados(bol);
    rellenarEstados(automatas,tamañoQs);
    imprimirEstados(tamañoQs,bol);
    caminos(automata,tamañoQs,tabla,bol);
    console.log(automatas);
}

function caminos(automata,estados,tabla,bol){//Funcion que determina los camninos de q STANDBY
    let alf = tamañoAlfabeto();
    var tablas = document.createElement('table');
    let transiciones = alf * estados;
    var tablaPadre = document.createElement('table'),
    filaTitulo = document.createElement('tr');

    for(let g = 0 ; g < transiciones ; g++ ){

    }

    
    for(let i = 0 ; i < estados ; i++ ){
        for(let j = 0 ; j < alf ; j++ ){
        const inputNewQ = document.createElement('input');
        inputNewQ.type = "text";
        tabla.appendChild(inputNewQ);


        } 
    }
} 


function verificarEstados(bol){//Funcion que verifica la cantidad de estados
    aux = tamañoEstados(bol);
    if(aux>10){
        return 10;
    }else{
    
    if(aux<1){
        return 1;
    }
    else return aux;
}
}


function imprimirEstados(estados,bol){//imprime los estados en el html
    if(bol == 1){
        document.getElementById("imCami1").innerHTML += `Los estados son:`;
        for(let i = 0 ; i < estados ; i++){
            document.getElementById("imCami1").innerHTML += `, q${i}`;
        }
        document.getElementById("imCami1").innerHTML += `\n`;
        
    }
    if(bol == 2){
        document.getElementById("imCami2").innerHTML += `Los estados son:`;
        for(let j = 0 ; j < estados ; j++){
            document.getElementById("imCami2").innerHTML += `, q${j}`;
        }
        document.getElementById("imCami2").innerHTML += `\n`;
    }
}

function rellenarEstados(automatas,estados){//Funcion que rellena los estados
    automatas.k = [];

    for(let i = 0;i < estados ; i++ ){
        automata.k.push(`q${i}`);
    }
}

function tamañoEstados(bol){//Funcion que retorna Qs segun automata
    let g = bol;
    let aux = 9;
    if(g == 1 ){
        aux = document.getElementById("entrada1").value;
        return aux;
    }
    if(g == 2 ){
        aux = document.getElementById("entrada2").value;
        return aux;
    }
} 

function tamañoAlfabeto() {//Funcion que recupera el tamaño del alfabeto 
    let aux = document.getElementById("alfabeto").value;
    if(aux>10){
        aux=10;
        return aux;
    }else{
    if(aux<1){
        aux=1;
        return aux;
    }
    else return aux;
    
}
}

function asignarAlfabeto(automatas) {//Funcion que asigna el alfabeto
    let aux = tamañoAlfa,
        i;
    //var tipo = tipo_alfa(),
        cont = 0;
    automatas.s = []
   // if (tipo == false) {
        for (i = 0; i < aux; i++) {
            automatas.s.push(String.fromCharCode(97 + i))
        }
    /*} else {
        for (i = 0; i < aux; i++) {
            automatas.s.push(cont);
            cont++;
        }
    }*/
}

function imprimirAlfabeto(){//Funcion que da a conocer el alfabeto
    let aux = tamañoAlfabeto();
    tamañoAlfa = aux;
    //let tipo = tipo_alfa(),
      let  i;
    let letra = String.fromCharCode(97)
    document.getElementById("alfabetoDescripcion").innerHTML += ` El alfabeto es:`;

    //if (tipo == false) {
        for (i = 0; i < aux; i++) {
            letra = String.fromCharCode(97 + i);
            document.getElementById("alfabetoDescripcion").innerHTML += `, ${letra}`;
        }
    }

    /*} else {
        var cont = 0;
        for (i = 0; i < aux; i++) {
            document.getElementById("alfabetoDescripcion").innerHTML += ` ${cont},`;
            cont++;
        }
    }*/


function afd() { //Funcion que define AFD o AFND
    const aux = document.getElementById("AFD").value;
    if (aux == 0) {
        return true; //AFD      
    } else return false; //AFND
}

/*function tipo_alfa() {
    var aux = document.getElementById("alfab").value;
    return aux == 0; //letra
}*/

//Funciones HTML

function desactiva_enlace(enlace) {
    enlace.disabled = 'disabled';
}

window.addEventListener("load", () => {

});