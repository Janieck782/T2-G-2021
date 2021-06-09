//k= estados q1,q2
//sumatoria = alfabeto = a,b
//gama = caminos = ((q0,a)q1)
// F = estados = finales

const automata = {
    k : 0, //estados 
    s : "", //alfabeto
    g : 0, //caminos
    f : 0, //final
}

const automata1 = Object.assign(automata);
const automata2 = Object.assign(automata);

console.log(automata1);
console.log(automata2);