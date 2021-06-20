function interseccion(automata1, automata2) {
    if(automata1.afd != true || automata2.afd != true) {
        alert("Autómata no es AFD");
        return 0;
    }

    if(automata1.s.length%2 != 0 || automata2.s.length%2 != 0) {
        alert("Alfabeto no es par");
        return 0;
    }

    if(automata1.k.length%2 != 0 && automata2.k.length%2 != 0) {
        alert("Números de a no son pares");
        return 0;
    }

    var automatac1 = JSON.parse( JSON.stringify( automata1 ) );
    console.table(automatac1);

    var automatac2 = JSON.parse( JSON.stringify( automata2 ) );
    console.table(automatac2);

    // for(automatac)

    

    var automataco1 = add_complemento(automatac1);
    var automataco2 = add_complemento(automatac2);
    console.table(automataco1);
    console.table(automataco2);

    // if(automata1.)
}

function add_complemento(automatas) {
    var finals = JSON.parse( JSON.stringify( automatas.f ) );
    var new_finals = [];
    let i, j;
    var aux;

    console.log(finals);

    for(i = 0; i < automatas.k.length; i++) {
        for(j = 0; j < finals.length; j++) {
            if(automatas.k[i] != finals[j]) {
                aux = automatas.k[i];
                new_finals.push(aux);
            }
        }
    }
    console.log("Nuevos finales: ");
    console.table(new_finals);
    

    automatas.f = [];
    
    for(i = 0; i < new_finals; i++) {
        aux = new_finals[i];
        automatas.f.push(aux);
    }

    console.log("Automata modificado: ");
    console.table(automatas);
    return automatas;
}