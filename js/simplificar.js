function TablaEstados(automatas) {
    let i, j;
    var abc, aux2 = 0;
    console.log("Inicio función tabla de estados");
    const cant = automatas.k.length;
    console.log("Cantidad de estados: " + cant);
    const aux = [];
    console.log("Tabla de estados vacía: ");
    console.log(aux);

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
            console.log("aca");
            abc++;
        }
        aux2++;
    }
    console.log(aux);

    // let finales = JSON.parse(JSON.stringify(automatas.f))
    // var variable = automatas.f;
    var validador = [];

    //-------Verificadores--------
    console.log(automatas.k.length);
    console.log(automatas.k);

    console.log(automatas.f.length);
    console.log(automatas.f);
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
    console.log(validador); //false son los estados finales

    for (i = 1; i < automatas.k.length; i++) {
        for(j = 0; j < automatas.k.length - 1;j++) {
            if(aux[i][j] == null && aux[i][j] != "x") {
                console.log("nulo");
                if(validador[i] != validador[j]) {
                    aux[i][j] = "X";
                }
            }
        }
    }

    console.log("Matriz con x: ");
    console.table(aux);

    //------Deja los datos solo con números--------------
    var camino_num = JSON.parse( JSON.stringify( automatas.g ) );
    camino_num = Separador_caracter(camino_num);
    var estados_num = Separador_caracter(automatas.k);
    estados_num = Separador_caracter(estados_num);
    //----------------------------------------------------

    var camino = tabla_caminos(camino_num, automatas);
    console.log(camino);

    console.log(aux);

    var arr_estado = [];
    var sum = 0;

    for(i = 0; i < automatas.k.length; i++) {   //Multiplica los estados por la cantidad de alfabetos
        for(let cont = 0; cont < automatas.s.length; cont++) {
            arr_estado[sum] = estados_num[i];
            sum++;
        }
    }

    var caminosky = tabla_caminos(automatas.g, automatas);
    console.table(caminosky);

    var tabla_mezclada;

    tabla_mezclada = creacion_conj(caminosky, automatas.f);
    console.table(tabla_mezclada);

    for(i = 1; i < aux.length; i++) {
        for(j = 1; j < aux.length; j++) {
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

    var auxilio = [];
    for(i = 0; i < caminosky.length; i++) {
        auxilio[i] = [];
    }

    console.table(aux);

    for(i = 0; i < aux.length; i++) {
        for(j = 0; j < aux.length; j++) {
            if(aux[i][j] == null) {
                var aux1 = "q" + i;

                removeItemFromArr(automatas.k , aux1);
                removeItemFromArr(automatas.f , aux1);

                for(let a = 0; a < caminosky.length; a++) {
                    for(let b = 0; b < automatas.s.length; b++) {
                        if(caminosky[a][b] == aux1) {
                            caminosky[a][b] = "q" + a;
                        }
                    }
                }
            }
        }
    }

    for(i = 0; i < caminosky.length; i++) {
        for(j = 0; j < caminosky.length; j++) {
            
        }
    }

    removeItemFromArr(automatas.f , aux1);

    console.log("estados: ");
    console.table(automatas.k);

    console.log("finales: ");
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