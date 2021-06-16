//Declaracion de automata
const automata = {
    k: [], //estados = q0, q1, q2....
    s: [], //alfabeto = a, b....
    g: [], //caminos = ((q0,a)q1), ((q1,b)q0)...
    label: [], //nombre de los caminos
    f: [], //final = q0, q1, q2....
    afd: null // afnd o afd
} //No modificar o correra la sangre...


//Se crean 2 automatas
const automata1 = Object.assign(automata);
const automata2 = Object.assign(automata);

//Variables
let tamañoAlfa = 0;

//Constantes HTML

//Automata1
const caminos1 = document.querySelector("#tablaTransicion1");
const conFinal1 = document.querySelector("#finalIn1");
const zonImg1 = document.querySelector("#imagen1");
let estados1 = 0
//variables auxiliares
let afd1 = null; //asignado
let trans1 = []; //asignado
let alfabeto1 = []; //asginado
let final1 = []; //asignado
let estadosQ1 = []; //asignado
let estadosCaminoAfnd1 = [];


//Automata2
const caminos2 = document.querySelector("#tablaTransicion2");
const conFinal2 = document.querySelector("#finalIn2");
const zonImg2 = document.querySelector("#imagen2");
let estados2 = 0;
//variables auxiliares
let afd2 = null; //asignado
let trans2 = []; //asignado
let alfabeto2 = []; //asignado
let final2 = []; //asignado
let estadosQ2 = []; //asignado
let estadosCaminoAfnd2 = [];

//Funciones Formulario

function iniciarAutomata(automatas, bol, tabla, enlace) { //Funcion para iniciar automatas
    if (tamañoAlfa == 0) {
        alert("Debes Ingresar primero el alfabeto");
    } else {
        enlace.disabled = 'disabled';
        automatas.afd = afd();
        if (bol == 1) {
            afd1 = afd();
        }
        if (bol == 2) {
            afd2 = afd();
        }

        asignarAlfabeto(automatas, bol);
        let tamañoQs = verificarEstados(bol);
        if (bol == 1) {
            estados1 = tamañoQs;
        }
        if (bol == 2) {
            estados2 = tamañoQs;
        }
        rellenarEstados(automatas, tamañoQs, bol);
        imprimirEstados(tamañoQs, bol);
        inputCaminos(tamañoQs, tabla, bol);
    }
}

function iniciarCamino(bol, enlace) { // inicia el camino
    if (leerInputs(bol) == false) {
        alert(err);
    } else {
        enlace.disabled = 'disabled';
        leerInputs(bol);

        if (bol == 1) {
            inputFinales(bol, conFinal1);
        }
        if (bol == 2) {
            inputFinales(bol, conFinal2);
        }

    }
}

function inputFinales(bol, conten) { // crea el input final
    let estadosc = [];
    if (bol == 1) {
        estadosc = estadosQ1;
    }
    if (bol == 2) {
        estadosc = estadosQ2;
    }

    var texto1 = document.createElement("h4"); //crea linea de texto
    texto1.innerHTML = `5.Seleccione los estados finales.`; //formato linea
    conten.appendChild(texto1); //agrega la linea

    for (let i = 0; i < estadosc.length; i++) {
        var salto = document.createElement("br");
        var inp = document.createElement("input");
        var p = document.createElement("p");
        p.innerHTML = `Q${i}:`;
        inp.setAttribute("type", "checkbox");
        inp.setAttribute("id", `q-${i}-${bol}`);
        conten.appendChild(p);
        conten.appendChild(inp);
        conten.appendChild(salto);
    }
    var btn = document.createElement("BUTTON"); // Create a <button> element
    btn.innerHTML = "Continuar";
    if (bol == 1) {
        btn.setAttribute("onclick", "iniciarImagen(1,this)"); // Insert text
    }
    if (bol == 2) {
        btn.setAttribute("onclick", "iniciarImagen(2,this)"); // Insert text
    }
    // Insert text
    conten.appendChild(btn);
}

function iniciarImagen(bol, enlace) { // se activa al seleccionar el boton
    if (asignarFinales(bol) == false) {
        alert("Se debe ingresar al menos un final");
    } else {
        enlace.disabled = 'disabled';
        asignarFinales(bol);
        if (bol == 1) {
            console.log(automata1);
            imprimirImagen(automata1, zonImg1)
        }
        if (bol == 2) {
            console.log(automata2);
            imprimirImagen(automata2, zonImg2)

        }
    }
}

function imprimirImagen(automatas, zonaImg) { // Funcion que imprime automatas sus parametros son un automata y un contenedor con direccion HTML
    let graph = "digraph{";
    var img = document.createElement("img");
    let salto = "%20";
    let espacio = "%0A%09"
    let espacio1 = "%20%5Bshape%3Ddoublecircle%5D%3B"
    let o = 0;
    let esAfd = automata.afd;


    if (esAfd == true) {
        if (automatas.k.length == 1) {
            for (let p = 0; p < automatas.s.length; p++) { //alfabeto
                graph += `q0 -> q0 [label="${automatas.s[p]}"] ${salto} `;
            }

        } else {
            for (let i = 0; i < automatas.k.length; i++) { //estados
                for (let j = 0; j < automatas.s.length; j++) { //alfabeto
                    graph += `${automatas.k[i]} -> ${automatas.g[o]} [label="${automatas.s[j]}"] ${salto} `;
                    o++;
                }
            }
        }
    }

    if (esAfd == false) {
        if (automatas.k.length == 1) {
            for (let p = 0; p < automatas.s.length; p++) { //alfabeto
                if(automatas.g[p] == 0){
                    graph += `q0`;
                }else{
                    graph += `q0 -> q0 [label="${automatas.label[p]}"] ${salto} `;
                }
                
            }

        } else {
            for (let i = 0; i < automatas.k.length; i++) { //estados
                 for( let j = 0 ; j < automatas.s.length; j++){//alfabeto
                    if(automatas.g[o] == 0){
                        
                    }if(automatas.g[o] != 0){
                        //k estados, s alfabeto, g caminos, label nombre arista, f final
                        graph += `${automatas.k[i]} -> ${automatas.g[o]} [label="${automatas.label[o]}"] ${salto} `;
                        
                        console.log(o);
                        console.log(i);
                        console.log(j);

                    }
                    o++;
                }    
            }
        }

    }

    for (let q = 0; q < automatas.f.length; q++) {//final
        graph += ` ${espacio} ${automatas.f[q]} ${espacio1}${salto}`
    }
    graph += "}";

    var texto1 = document.createElement("h4"); //crea linea de texto
    texto1.innerHTML = `6. El resultado es:`; //formato linea
    zonaImg.appendChild(texto1); //agrega la linea
    img.setAttribute("src", `https://quickchart.io/graphviz?format=png&width=auto&height=auto&graph=${graph}`);
    zonaImg.appendChild(img);
}

function asignarFinales(bol) { // registra finales
    let finales = [];
    let estadosf;
    if (bol == 1) {
        estadosf = estados1;
    }
    if (bol == 2) {
        estadosf = estados2;
    }
    for (let i = 0; i < estadosf; i++) {
        let aux = document.getElementById(`q-${i}-${bol}`).checked;
        if (aux == true) {
            finales.push(`q${i}`);
        }
    }

    if (finales.length == 0) {
        return false
    } else {

        if (bol == 1) {
            automata1.f = [];
            automata1.f = finales;
            final1 = finales;
        }
        if (bol == 2) {
            automata2.f = [];
            automata2.f = finales;
            final2 = finales;
        }
    }
}


function inputCaminos(estados, tabla, bol) { //Funcion que determina los camninos de q 
    let alf = tamañoAlfabeto();
    // let letra = (String.fromCharCode(97));
    let g = 0;
    let esAfd = null

    if (bol == 1) {
        esAfd = automata1.afd;
    }
    if (bol == 2) {
        esAfd = automata2.afd;
    }


    if (esAfd == true) {

        var texto1 = document.createElement("h4"); //crea linea de texto
        texto1.innerHTML = `4.Ingrese el estado a recorrer de llegada por cada camino.`; //formato linea
        tabla.appendChild(texto1); //agrega la linea

        for (let i = 0; i < estados; i++) {
            for (let j = 0; j < alf; j++) {
                let letra = (String.fromCharCode(97 + j));
                var texto = document.createElement("p"); //crea linea de texto
                texto.innerHTML = `${g+1}.(q${i}, ${letra}) :`; //formato linea
                tabla.appendChild(texto); //agrega la linea
                const inputNewQ = document.createElement('input'); //crea linea de texto
                inputNewQ.type = "text"; //formato
                if (i != estados - 1) {
                    inputNewQ.setAttribute('value', `q${i+1}`);
                } else {
                    inputNewQ.setAttribute('value', `q0`);
                }
                inputNewQ.setAttribute("id", `res-${i}-${j}-${bol}`); //id ¿res-q0-a-automata1?
                tabla.appendChild(inputNewQ); //agrega
                var salto = document.createElement("br"); //salto de linea (no hay pa que)
                tabla.appendChild(salto); //agrega
                g++;
            }
        }
    }
    if (esAfd == false) {
        var texto1 = document.createElement("h4"); //crea linea de texto
        var texto2 = document.createElement("h5"); //crea linea de texto
        var texto3 = document.createElement("h5"); //crea linea de texto
        var salto = document.createElement("br");
        texto1.innerHTML = `4.Ingrese el estado a recorrer de llegada por cada camino.`; //formato linea
        texto2.innerHTML = `"*0 = vacio"`; //formato linea
        texto3.innerHTML = `Seleccione la casilla euler para intercambiar alfabeto por euler`; //formato linea

        tabla.appendChild(texto1); //agrega la linea
        tabla.appendChild(salto);
        tabla.appendChild(texto3);
        tabla.appendChild(salto);
        tabla.appendChild(texto2); //agrega la linea
        tabla.appendChild(salto);

        for (let i = 0; i < estados; i++) {
            for (let j = 0; j < alf; j++) {
                let letra = (String.fromCharCode(97 + j));
                var texto = document.createElement("p"); //crea linea de texto
                var euler = document.createElement("p");
                var inp = document.createElement("input");
                euler.innerHTML = "Euler: ";
                inp.setAttribute("type", "checkbox");
                inp.setAttribute("id", `euler-${i}-${j}-${bol}`);

                texto.innerHTML = `${g+1}.(q${i}, ${letra}) :`; //formato linea
                tabla.appendChild(texto); //agrega la linea
                const inputNewQ = document.createElement('input'); //crea linea de texto
                inputNewQ.type = "text"; //formato
                if (i != estados - 1) {
                    if (j % 2 == 0) {
                        inputNewQ.setAttribute('value', `q${i+1}`);
                    } else {
                        inputNewQ.setAttribute('value', `0`);
                    }
                } else {
                    inputNewQ.setAttribute('value', `q0`);
                }
                inputNewQ.setAttribute("id", `res-${i}-${j}-${bol}`); //id ¿res-q0-a-automata1?
                tabla.appendChild(inputNewQ); //agrega
                tabla.appendChild(euler);
                tabla.appendChild(inp); //agrega
                var salto = document.createElement("br"); //salto de linea (no hay pa que)
                tabla.appendChild(salto); //agrega
                g++;
            }
        }

    }

    var btn = document.createElement("BUTTON"); // Create a <button> element
    btn.innerHTML = "Continuar";
    if (bol == 1) {
        btn.setAttribute("onclick", "iniciarCamino(1,this)"); // Insert text

    }
    if (bol == 2) {
        btn.setAttribute("onclick", "iniciarCamino(2,this)"); // Insert text

    }
    // Insert text
    tabla.appendChild(btn); // Append <button> to <body>  
}

function leerInputs(bol) { //lee y recolecta los inputs --- standBy

    let alf = tamañoAlfabeto();
    let estadoss = 0;

    if (bol == 1) {
        estadoss = estados1;
        trans1 = [];
    }
    if (bol == 2) {
        estadoss = estados2;
        trans1 = [];
    }

    if (bol == 1) {
        esAfd = automata1.afd;
    }
    if (bol == 2) {
        esAfd = automata2.afd;
    }

    if (esAfd == true) {
        for (let i = 0; i < estadoss; i++) {
            for (let j = 0; j < alf; j++) {
                let letra = (String.fromCharCode(97 + j));
                let aux = document.getElementById(`res-${i}-${j}-${bol}`).value;

                if (bol == 1) {
                    if (verificaQInputs(aux, estadosQ1) == true) {
                        trans1.push(aux);
                    }
                    if (verificaQInputs(aux, estadosQ1) == false) {
                        alert(`Q ingresado para (Q${i},${letra}) no es valido`);
                        trans1 = [];
                        return false;
                    }
                }
                if (bol == 2) {
                    if (verificaQInputs(aux, estadosQ2) == true) {
                        trans2.push(aux);
                    }
                    if (verificaQInputs(aux, estadosQ2) == false) {
                        alert(`Q ingresado para (Q${i},${letra}) no es valido`);
                        trans2 = [];
                        return false;
                    }
                }
            }
        }
    }
    if (esAfd == false) {
        for (let i = 0; i < estadoss; i++) {
            for (let j = 0; j < alf; j++) {
                let letra = (String.fromCharCode(97 + j));
                let aux = document.getElementById(`res-${i}-${j}-${bol}`).value;
                let casilla = document.getElementById(`euler-${i}-${j}-${bol}`).checked;

                if (bol == 1) {
                    if (verificaQInputsAfnd(aux, estadosQ1) == true) {
                        trans1.push(aux);
                        if (casilla == true) {
                            estadosCaminoAfnd1.push("e")
                        }
                        if (casilla == false) {
                            estadosCaminoAfnd1.push(automata1.s[j]);
                        }
                    }
                    if (verificaQInputsAfnd(aux, estadosQ1) == false) {
                        alert(`Q ingresado para (Q${i},${letra}) no es valido`);
                        trans1 = [];
                        estadosCaminoAfnd1 = [];
                        return false;
                    }
                }
                if (bol == 2) {
                    if (verificaQInputsAfnd(aux, estadosQ2) == true) {
                        trans2.push(aux);
                        if (casilla == true) {
                            estadosCaminoAfnd2.push("e")
                        }
                        if (casilla == false) {
                            estadosCaminoAfnd2.push(automata2.s[j]);
                        }

                    }
                    if (verificaQInputsAfnd(aux, estadosQ2) == false) {
                        alert(`Q ingresado para (Q${i},${letra}) no es valido`);
                        trans2 = [];
                        estadosCaminoAfnd2 = [];
                        return false;
                    }
                }
            }
        }

    }



    if (bol == 1) {
        automata1.g = trans1;
        automata1.label = estadosCaminoAfnd1;
        return true;
    }
    if (bol == 2) {
        automata2.g = trans2;
        automata2.label = estadosCaminoAfnd2;
        return true;
    }

}

function verificaQInputsAfnd(valor, estadoQs) {
    for (let i = 0; i < estadoQs.length; i++) {
        if (estadoQs[i] == valor || 0 == valor) {
            return true;
        }
    }
    return false;
}


function verificaQInputs(valor, estadoQs) { //verifica que q este contenido en el automata
    for (let i = 0; i < estadoQs.length; i++) {
        if (estadoQs[i] == valor) {
            return true;
        }
    }
    return false;
}

function verificarEstados(bol) { //Funcion que verifica la cantidad de estados
    var aux = tamañoEstados(bol);
    if (aux > 10) {
        return 10;
    } else {

        if (aux < 1) {
            return 1;
        } else return aux;
    }
}


function imprimirEstados(estados, bol) { //imprime los estados en el html
    if (bol == 1) {
        document.getElementById("imCami1").innerHTML += `Los estados son:`;
        for (let i = 0; i < estados; i++) {
            document.getElementById("imCami1").innerHTML += `, q${i}`;
        }
        document.getElementById("imCami1").innerHTML += `\n`;

    }
    if (bol == 2) {
        document.getElementById("imCami2").innerHTML += `Los estados son:`;
        for (let j = 0; j < estados; j++) {
            document.getElementById("imCami2").innerHTML += `, q${j}`;
        }
        document.getElementById("imCami2").innerHTML += `\n`;
    }
}

function rellenarEstados(automatas, estados, bol) { //Funcion que rellena los estados
    automatas.k = [];

    for (let i = 0; i < estados; i++) {
        automata.k.push(`q${i}`);
        if (bol == 1) {
            estadosQ1.push(`q${i}`);
        }
        if (bol == 2) {
            estadosQ2.push(`q${i}`);
        }
    }
}

function tamañoEstados(bol) { //Funcion que retorna Qs segun automata
    let g = bol;
    let aux = 9;
    if (g == 1) {
        aux = document.getElementById("entrada1").value;
        return aux;
    }
    if (g == 2) {
        aux = document.getElementById("entrada2").value;
        return aux;
    }
}

function tamañoAlfabeto() { //Funcion que recupera el tamaño del alfabeto 
    let aux = document.getElementById("alfabeto").value;
    if (aux > 10) {
        aux = 10;
        return aux;
    } else {
        if (aux < 1) {
            aux = 1;
            return aux;
        } else return aux;

    }
}

function asignarAlfabeto(automatas, bol) { //Funcion que asigna el alfabeto
    let aux = tamañoAlfa,
        i;
    //var tipo = tipo_alfa(),
    // const cont = 0;
    automatas.s = []
    // if (tipo == false) {
    for (i = 0; i < aux; i++) {
        automatas.s.push(String.fromCharCode(97 + i));
        if (bol == 1) {
            alfabeto1.push(String.fromCharCode(97 + i));
        }
        if (bol == 2) {
            alfabeto2.push(String.fromCharCode(97 + i));
        }
    }

    /*} else {
        for (i = 0; i < aux; i++) {
            automatas.s.push(cont);
            cont++;
        }
    }*/
}

function imprimirAlfabeto() { //Funcion que da a conocer el alfabeto
    let aux = tamañoAlfabeto();
    tamañoAlfa = aux;
    //let tipo = tipo_alfa(),
    let i;
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
    return (aux == 0);
}

/*function tipo_alfa() {
    var aux = document.getElementById("alfab").value;
    return aux == 0; //letra
}*/

//Funciones de calculo


//Funciones HTML

function desactiva_enlace(enlace) {
    enlace.disabled = 'disabled';
}

window.addEventListener("load", () => {

});