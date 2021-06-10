//k= estados q1,q2
//sumatoria = alfabeto = a,b
//gama = caminos = ((q0,a)q1)
// F = estados = finales


//Declaracion de automata
const automata = {
    k : [], //estados = q0, q1, q2....
    s : [], //alfabeto = a, b....
    g : [], //caminos = ((q0,a)q1), ((q1,b)q0)...
    f : [], //final = q0, q1, q2....
    afd: null // afnd o afd
}

let tamañoAlfa = 0;

//Se crean 2 automatas
const automata1 = Object.assign(automata);
const automata2 = Object.assign(automata);




function iniciarAutomata(automatas){//Funcion para iniciar automatas
    automatas.afd = afd();
    asignarAlfabeto(automatas);
    console.log(automatas);
}

function estados(automatas, di){
    const aux = document.getElementById(di).value;
    console.log(aux);

}

function tamañoAlfabeto(){
    const aux = document.getElementById("alfabeto").value;
    return aux;
}

function asignarAlfabeto(automatas){
    let aux = tamañoAlfa, i;
    var tipo = tipo_alfa(), cont = 0;

    automatas.s = []

    if(tipo == false) {
        for(i = 0; i < aux; i++) {
            automatas.s.push(String.fromCharCode(97+i))
        }
    } else {
        for(i = 0; i < aux; i++) {
            automatas.s.push(cont);
            cont++;
        }
    }    
}

function imprimirAlfabeto(){
    let aux = tamañoAlfabeto();
    tamañoAlfa = aux;
    var tipo = tipo_alfa(), i;
    let letra = String.fromCharCode(97)
    document.getElementById("alfabetoDescripcion").innerHTML += ` El alfabeto es:`;

    if(tipo == false) {
        for(i = 0; i<aux; i++){
            letra = String.fromCharCode(97+i);
            document.getElementById("alfabetoDescripcion").innerHTML += ` ${letra},`;
        }
    } else {
        var cont = 0;
        for(i = 0; i < aux; i++) {
            document.getElementById("alfabetoDescripcion").innerHTML += ` ${cont},`;
            cont++;
        }
    }
}

function afd(){ //Funcion que define AFD o AFND
    const aux = document.getElementById("AFD").value;
    if(aux == 0){
        return true;//AFD      
    }
    else return false;//AFND
}

function tipo_alfa() {
    var aux = document.getElementById("alfab").value;
    return aux == 0; //letra
}



//funciones html

function desactiva_enlace(enlace)
{
      enlace.disabled='disabled';
}

window.addEventListener("load", () => {

});