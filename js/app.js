//k= estados q1,q2
//sumatoria = alfabeto = a,b
//gama = caminos = ((q0,a)q1)
// F = estados = finales


//declaracion de automata
const automata = {
    k : [], //estados 
    s : [], //alfabeto
    g : [], //caminos
    f : [], //final
    afd: null // afnd o afd
}


const automata1 = Object.assign(automata);
const automata2 = Object.assign(automata);


function iniciarAutomata(automatas){
    automatas.afd = afd();
    console.log(automatas);
    

}


function afd(){ //Funcion que define AFD o AFND
    const aux = document.getElementById("AFD").value;
    if(aux == 0){
        return true;//AFD      
    }
    else return false;//AFND
}

window.addEventListener("load", () => {

  });