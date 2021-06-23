function Simplificar(automatas) {
    let i, j;
    var abc, aux2 = 0;
    const cant = automatas.k.length;
    const aux = [];

    // var automatas = JSON.parse( JSON.stringify( automatak ) );

    for (i = 0; i < cant; i++) { //Se genera la tabla
        aux[i] = [];
        for (j = 0; j < cant; j++) {
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

    var validador = [];

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

    for (i = 0; i < automatas.k.length; i++) {
        for (j = 0; j < automatas.k.length - 1; j++) {
            if (aux[i][j] == null && aux[i][j] != "x") {
                if (validador[i] != validador[j]) {
                    aux[i][j] = "X";
                }
            }
        }
    }

    var caminosky = tabla_caminos(automatas.g, automatas);

    var tabla_mezclada;

    tabla_mezclada = creacion_conj(caminosky, automatas.f);


    for (i = 0; i < aux.length; i++) {
        for (j = 0; j < aux.length; j++) {
            if (aux[i][j] != "-" && aux[i][j] != "X") {
                for (let a = 0; a < tabla_mezclada.length; a++) {
                    if (tabla_mezclada[i][a] != tabla_mezclada[j][a]) {
                        aux[i][j] = "X";
                        break;
                    }
                }
            }
        }
    }
    aux2 = JSON.parse(JSON.stringify(aux));

    for (i = 0; i < aux.length; i++) {
        for (j = 0; j < aux.length; j++) {
            if (aux[i][j] == null) {
                for (let b = 0; b < automatas.s.length; b++) {
                    var pri = caminosky[i][b];
                    var seg = caminosky[j][b];
                    pri = pri.slice(1);
                    seg = seg.slice(1);

                    if (aux2[pri][seg] == "X" || aux2[seg][pri] == "X") {
                        aux[i][j] = "X";
                    }
                }
            }
        }
    }

    var aiuda = [];

    for (i = 0; i < aux.length; i++) {
        for (j = 0; j < aux.length; j++) {
            if (aux[i][j] == null) {
                var aux1 = "q" + i;
                aiuda.push(i);

                removeItemFromArr(automatas.k, aux1);
                removeItemFromArr(automatas.f, aux1);

                for (let a = 0; a < caminosky.length; a++) {
                    for (let b = 0; b < automatas.s.length; b++) {
                        if (caminosky[a][b] == aux1) {
                            caminosky[a][b] = "q" + j;
                        }
                    }
                }
            }
        }
    }

    let aiuda2 = aiuda.filter((item, index) => {
        return aiuda.indexOf(item) === index;
    })

    aiuda2.reverse();

    for (i = 0; i < aiuda2.length; i++) {
        caminosky.splice(aiuda2[i], 1);
    }

    automatas.g = [];

    for (i = 0; i < caminosky.length; i++) {
        for (j = 0; j < automatas.s.length; j++) {
            automatas.g.push(caminosky[i][j]);
        }
    }
    plog.info("Se realizó la simplificación de un autómata");
}

function removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);

    if (i !== -1) {
        arr.splice(i, 1);
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

    for (let i = 0; i < cam.length; i++) {
        for (let j = 0; j < cam[i].length; j++) {
            for (let a = 0; a < final.length; a++) {
                if (cam[i][j] == final[a]) {

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
    var aux = [];
    var poo;

    for (let i = 0; i < array.length; i++) {
        poo = array[i];
        aux[i] = poo.replace(/\D/g, '');
    }

    return aux;
}