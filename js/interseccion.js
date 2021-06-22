var cont;

function interseccion(automata1, automata2) {
    // if(automata1.afd != true || automata2.afd != true) {
    //     alert("Simplificación: Autómata no es AFD");
        
    //     return 0;
    // }
    

    if(automata1.s.length%2 != 0 || automata2.s.length%2 != 0) {
        cont = 1;
    }

    if(automata1.k.length%2 != 0 && automata2.k.length%2 != 0) {
        cont = 2;
    }


    //Comprueba si las funciones son AFD y si no las transforma
    if(automata1.afd == false) {
        automata1.afd = transformarAFDi(automata1.afd);
    }
    if(automata2.afd == false) {
        automata2.afd = transformarAFDi(automata2.afd);
    }

    //Crea variable alterna
    var automatac1 = JSON.parse( JSON.stringify( automata1 ) );
    var automatac2 = JSON.parse( JSON.stringify( automata2 ) );

    //Se calcula el complemento de cada automata
    var automataco1 = add_complemento(automatac1); 
    var automataco2 = add_complemento(automatac2);

    //Se unen los automatas
    var union_autos = Union(automataco1, automataco2);

    //Se transforma a AFD el automata
    var union_afd = transformarAFDi(union_autos);

    //Se calcula el complemento de todos
    var inter_autos = add_complemento(union_afd);

    //Se simplifica
    return inter_autos;
}

function add_complemento(automatas) {
    var finals = JSON.parse( JSON.stringify( automatas.f ) );
    var new_finals = [];
    let i, j;
    var aux;

    for(i = 0; i < automatas.k.length; i++) {
        for(j = 0; j < finals.length; j++) {
            if(automatas.k[i] != finals[j]) {
                aux = automatas.k[i];
                new_finals.push(aux);
            }
        }
    }

    automatas.f = JSON.parse( JSON.stringify( new_finals ) );
    
    automatas.f = automatas.f.filter((item,index)=>{
        return automatas.f.indexOf(item) === index;
      })

    return automatas;
}

function Union(automataA,automataB){
    let largoEstados = automataA.k.length+automataB.k.length;
    let largoAlfabeto = 0;
    // let largoCaminos = automataA.g.length+automataB.g.length;
    
    //automataUnion
    let contQ = 0;
    //let letra = (String.fromCharCode(97 + i));
    let q, i, v, l, y, t;

    var automataUnion = new automata;

    if( automataA.s.length > automataB.s.length ){
        largoAlfabeto = automataA.s.length;
    }else{
        largoAlfabeto = automataB.s.length;
    }

    for (q = 0; q < largoAlfabeto; q ++){
        let letra = (String.fromCharCode(97 + q));
        automataUnion.s.push(`${letra}`);
    }

    for (i = 0; i < largoEstados+1; i++){
        automataUnion.k.push(`q${i}`);
    }

    automataUnion.g.push(`q1`);//recorremos el automata 1
    automataUnion.g.push(`q${automata1.k.length+1}`);//recorremos el automata 1
    automataUnion.label.push(`Eu`);//recorremos el automata 1
    automataUnion.label.push(`Eu`);//recorremos el automata 1
    for (v = 0 ; v < largoAlfabeto-2; v++ ){
        automataUnion.label.push(0);
    }

    for (l = 0 ; l < largoAlfabeto-2; l++ ){
        automataUnion.g.push(0);
    }

    for (v = 0 ; v < automata1.g.length; v++ ){
        automataUnion.g.push(`q${Number.parseInt(automata1.g[v].charAt(1))+1}`);
        contQ++;
    }
    
    for (u = 0 ; u < automata2.g.length; u++ ){
        automataUnion.g.push(`q${Number.parseInt(automata2.g[u].charAt(1))+automata1.k.length+1}`);
    }


    for(y = 0; y < largoEstados; y++){
        for(t = 0 ; t < largoAlfabeto; t++){
            automataUnion.label.push(automataUnion.s[t]);
        }
    }

    for (v = 0 ; v < automata1.f.length; v++ ){
        automataUnion.f.push(`q${Number.parseInt(automata1.f[v].charAt(1))+1}`);
        contQ++;
    }
    
    for (u = 0 ; u < automata2.f.length; u++ ){
        automataUnion.f.push(`q${Number.parseInt(automata2.f[u].charAt(1))+automata1.k.length+1}`);
    }

    automataUnion.f = automataUnion.f.filter((item,index)=>{
        return automataUnion.f.indexOf(item) === index;
      })

    automataUnion.afd = false;

    return automataUnion;
}

function transformarAFDi(automatas){
    let c = 0;
    let k = automatas.k.length;
    for(let i = 0; i < automatas.g.length;i++ ){
        if(automatas.g[i]  == 0){
            if(c == 0){
                automatas.k.push(`q${k}`)
                c++;
                for(let j = 0 ; j < automatas.s.length; j++){
                    automatas.g.push(`q${k}`);
                }
            }
            automatas.g[i] = `q${k}`
        }       
    }
    automatas.afd = true;
    return automatas;
}

function Imprimir_interseccion(automata1, automata2) {
    var union = interseccion(automata1, automata2);
    const res3 = document.querySelector("#ResultadosInter");
    var texto3 = document.createElement("h4");
    console.log("alo");
    console.log(cont);

    if(cont == 1) {
        texto3.innerHTML = ` La interseccion no es posible. El alfabeto es impar`;
        console.log("Ala");
        res3.appendChild(texto3);
    } else if(cont == 2) {
        texto3.innerHTML = ` La intersección no es posible. La cantidad de a es impar`;
        res3.appendChild(texto3);
    } else {
        texto3.innerHTML = ` La interseccion es:`; //formato linea
        res3.appendChild(texto3);

        imprimirImagen(union, res3);
    }
}

