function TablaEstados(automatas) {
    let i, j;
    var abc, aux2 = 0;
    // console.log("Inicio función tabla de estados");
    const cant = automatas.k.length;
    // console.log("Cantidad de estados: " + cant);
    const aux = [];
    // console.log("Tabla de estados vacía: ");
    // console.log(aux);

    for (let i = 0; i < cant; i++) { //Se genera la tabla
        aux[i] = [];
        for (let j = 0; j < cant; j++) {
            aux[i][j] = null;
        }
    }

    for (i = 0; i < cant; i++) { //Llena con guinoes los espacios que no se utilizarán
        abc = aux2;
        while (abc < cant) {
            aux[i][abc] = "-";
            abc++;
        }
        aux2++;
    }

    // let finales = JSON.parse(JSON.stringify(automatas.f))
    // var variable = automatas.f;
    var validador = [];

    //-------Verificadores--------
    // console.log(automatas.k.length);
    // console.log(automatas.k);

    // console.log(automatas.f.length);
    // console.log(automatas.f);
    //-----------------------------

    var cont = 0;

    for (i = 0; i < automatas.k.length; i++) { //Genera un array con los estados finales (true/false)
        for (j = 0; j < automatas.f.length; j++) {
            if (automatas.k[i] == automatas.f[j]) {
                cont++;
            }
        }
        if (cont == 0) {
            validador.push(true);
        } else {
            validador.push(false);
        }
        cont = 0;
    }
    // console.log(validador); //false son los estados finales

    for (i = 0; i < automatas.k.length; i++) {
        for(j = 0; j < automatas.k.length - 1;j++) {
            if(aux[i][j] == null && aux[i][j] != "x") {
                if(validador[i] != validador[j]) {
                    aux[i][j] = "X";
                }
            }
        }
    }

    // console.log("Matriz con x: ");
    // console.table(aux);

    //------Deja los datos solo con números--------------
    var camino_num = JSON.parse( JSON.stringify( automatas.g ) );
    camino_num = Separador_caracter(camino_num);
    var estados_num = Separador_caracter(automatas.k);
    estados_num = Separador_caracter(estados_num);
    //----------------------------------------------------

    var arr_estado = [];
    var sum = 0;

    for(i = 0; i < automatas.k.length; i++) {   //Multiplica los estados por la cantidad de alfabetos
        for(let cont = 0; cont < automatas.s.length; cont++) {
            arr_estado[sum] = estados_num[i];
            sum++;
        }
    }

    var caminosky = tabla_caminos(automatas.g, automatas);

    var tabla_mezclada;

    tabla_mezclada = creacion_conj(caminosky, automatas.f);
    console.table(tabla_mezclada);

    var cont = 1;

    for(i = 0; i < aux.length; i++) {
        for(j = 0; j < aux.length; j++) {
            if (aux[i][j] != "-" && aux[i][j] != "X") {
                for(let a = 0; a < tabla_mezclada.length; a++) {
                    if(tabla_mezclada[i][a] != tabla_mezclada[j][a]) {
                        aux[i][j] = "X";
                        break;
                    }
                }
            }
        }
    }
    var aux2 = JSON.parse( JSON.stringify( aux ) );
    console.log("Aux 2");
    console.table(aux2);


    for(i = 0; i < aux.length; i++) {
        for(j = 0; j < aux.length; j++) {
            if(aux[i][j] == null) {
                for(let b = 0; b < automatas.s.length; b++) {
                    var pri = caminosky[i][b];
                    var seg = caminosky[j][b];
                    pri = pri.slice(1);
                    seg = seg.slice(1);
                    console.log(pri + " " + seg);

                    if(aux2[pri][seg] == "X" || aux2 [seg][pri] == "X") {
                        aux[i][j] = "X";
                    }
                }
            }
        }
    }

    console.table(aux);

 
    var aiuda = [];
    console.log("Caminos antes del problema: ");
    console.table(caminosky)

    for(i = 0; i < aux.length; i++) {
        for(j = 0; j < aux.length; j++) {
            if(aux[i][j] == null) {
                var aux1 = "q" + i;
                aiuda.push(i);

                removeItemFromArr(automatas.k , aux1);
                removeItemFromArr(automatas.f , aux1);

                for(let a = 0; a < caminosky.length; a++) {
                    for(let b = 0; b < automatas.s.length; b++) {
                        if(caminosky[a][b] == aux1) {
                            caminosky[a][b] = "q" + j;
                        }
                    }
                }
            }
        }
    }



    console.log("Caminos antes del problema: ");
    console.table(caminosky)

    //Crea una matriz bidemensional con una columna con id de cada camino
    caminosky2 = new Array(automatas.k.length);
    var cont = 0, aca = 0;

    let aiuda2 = aiuda.filter((item,index)=>{
        return aiuda.indexOf(item) === index;
    })
    console.log("Aiuda 2 normal: ");
    console.log(aiuda2);

    aiuda2.reverse();
    console.log("Aiuda2 reverso: ");
    console.log(aiuda2);

    for(i = 0; i < aiuda2.length; i++) {
        caminosky.splice(aiuda2[i], 1);
    }

    console.log("Estados: ");
    console.table(automatas.k);

    console.log("Finales: ");
    console.table(automatas.f);

    console.log("Caminosky: ");
    console.table(caminosky);

    automatas.g = [];

    for(i = 0; i < caminosky.length; i ++) {
        for(j = 0; j < automatas.s.length; j++) {
            automatas.g.push(caminosky[i][j]);
        }
    }
}

function removeItemFromArr ( arr, item ) {
    var i = arr.indexOf( item );
 
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
}

function tabla_caminos(camino, automatas) {
    var aux = [];
    var sum = 0;
    for (let i = 0; i < automatas.k.length; i++) { //Se genera la tabla
        aux[i] = [];
        for (let j = 0; j < automatas.s.length; j++) {
            aux[i][j] = camino[sum];
            sum++;
        }
    }

    return aux;
}


function creacion_conj(cam, final) {
    var aux = [];

    for (let i = 0; i < cam.length; i++) {
        aux[i] = [];
        for (let j = 0; j < cam[i].length; j++) { 
            aux[i][j] = "Y";
        }
    }

    for(let i = 0; i < cam.length; i++) {
        for(let j = 0; j < cam[i].length; j++) {
            for(let a = 0; a < final.length; a++) {
                if(cam[i][j] == final[a]) {
                    
                    aux[i][j] = "X";
                }
            }
        }
    }    
    return aux;
}

function tabla_camino_signos(camino, automatas) {
    var aux = [];
    var sum = 0;
    for (let i = 0; i < automatas.k.length; i++) { //Se genera la tabla
        aux[i] = [];
        for (let j = 0; j < automatas.s.length; j++) {
            aux[i][j] = camino[sum];
            sum++;
        }
    }

    return aux;
}

function Separador_caracter(array) {
    // var aux = JSON.parse( JSON.stringify( array ) );
    var aux = [];
    var poo;

    for(let i = 0; i < array.length; i++) {
        poo = array[i];
        aux[i] = poo.replace(/\D/g,'');
    }
    console.log(aux);

    return aux;
}