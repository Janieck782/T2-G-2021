//Declaracion de automata

class automata{
    constructor(k,s,g,label,f,afd){
        this.k = [];//estados
        this.s = [];//alfabeto
        this.g = [];//caminos inputs
        this.label = [];//nombre aristas solo afnd
        this.f = [];//finales
        this.afd = null;//tipo afd
    }
}

//Se crean 2 automatas
let automata1 = new automata;

let automata2 = new automata;

let automataUnion = new automata;

let automataCon = new automata;



//Variables
let tamañoAlfa = 0;
let automataFinalizado = 0;
let complemento = [];

//Constantes HTML
const res = document.querySelector("#Resultados");

//Automata1
const caminos1 = document.querySelector("#tablaTransicion1");
const conFinal1 = document.querySelector("#finalIn1");
const zonImg1 = document.querySelector("#imagen1");
const res1 = document.querySelector("#Resultados1");
let estados1 = 0
//variables auxiliares
let afd1 = null; //asignado
let trans1 = []; //asignado
let alfabeto1 = []; //asginado
let final1 = []; //asignado
let estadosQ1 = []; //asignado
let estadosCaminoAfnd1 = [];
let complemeto1 = [];//asginado


//Automata2
const caminos2 = document.querySelector("#tablaTransicion2");
const conFinal2 = document.querySelector("#finalIn2");
const zonImg2 = document.querySelector("#imagen2");
const res2 = document.querySelector("#Resultados2");
let estados2 = 0;
//variables auxiliares
let afd2 = null; //asignado
let trans2 = []; //asignado
let alfabeto2 = []; //asignado
let final2 = []; //asignado
let estadosQ2 = []; //asignado
let estadosCaminoAfnd2 = [];
let complemeto2 = [];//asignado

//logs
// Creamos el almacenamiento. De momento el único almacenamiento persistente es 
// LocalStorage, pero es fácil definir alternativas basadas en WebSQL, IndexedDB, etc.
var storage = new plog.storages.LocalStorage({maxSize: 200})
 
// Configuramos plog para que use el almacenamiento que acabamos de crear
plog.useStorage(storage);
 
// Establecemos el nivel de detalle que queramos entre DEBUG, INFO, WARN, ERROR, FATAL
//plog.setLevel(plog.level.INFO);
 
// Escribimos mensajes en el log
//plog.debug('debug message');
//plog.info('info message');
//plog.warn('warn message');
//plog.error('error message');
//plog.fatal('fatal message');


 
// Cuando queramos, podemos recuperar los mensajes que se han añadido al log
var events = storage.getEvents();
console.log(events);

//Funciones Formulario

function iniciarAutomata(automatas, bol, tabla, enlace) { //Funcion para iniciar automatas
    if (tamañoAlfa == 0) {
        alert("Debes Ingresar primero el alfabeto");
        plog.warn("Se intento continuar sin alfabeto");
    } else {
        enlace.disabled = 'disabled';
        automatas.afd = asignarAFD(bol);

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
        plog.info("Se creo un automata");
    }
}

function iniciarCamino(bol, enlace) { // inicia el camino
    if (leerInputs(bol) == false) {
        alert("Uno de los datos ingresados no es correcto");
        plog.warn("Uno de los datos ingresado no es correcto");
    } else {
        enlace.disabled = 'disabled';
        leerInputs(bol);
        plog.info("Se almacenaron los datos ingresados");

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
        if( i+1 ==  estadosc.length){
            inp.setAttribute("checked", "true");
        }
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
    var texto1 = document.createElement("h4");
    texto1.innerHTML = `6. El resultado es:`; //formato linea
    var texto2 = document.createElement("h4");
    texto2.innerHTML = ` La transformacion a AFD es:`; //formato linea
    var texto3 = document.createElement("h4");
    texto3.innerHTML = ` La simplificacion es:`; //formato linea
    var texto4 = document.createElement("h4");
    texto4.innerHTML = ` La simplificacion es:`; //formato linea
    
    
    if (asignarFinales(bol) == false) {
        alert("Se debe ingresar al menos un final");
        plog.warn("Se intento contninuar sin al menos un final");
    } else {
        enlace.disabled = 'disabled';
        asignarFinales(bol);
        if (bol == 1) {
            console.log(automata1);
            zonImg1.appendChild(texto1); //agrega la linea
            imprimirImagen(automata1, zonImg1);
            imprimirComplemento(automata1, res1,1);

            if(automata1.afd == false){
                transformarAFD(automata1);
                res1.appendChild(texto2);
                imprimirImagen(automata1, res1);
            
            }

            
            
        }
        if (bol == 2) {
            console.log(automata2);
            zonImg2.appendChild(texto1); //agrega la linea
            imprimirImagen(automata2, zonImg2);
            imprimirComplemento(automata2,res2,2);
            if(automata2.afd == false){
                transformarAFD(automata2);
                res2.appendChild(texto2);
                imprimirImagen(automata2, res2);
            }
            //simplificacion
            

        }
        automataFinalizado++;
        plog.info(`Se finalizo el automata N°${bol}`);

        if(automataFinalizado == 2 ){
            
            //here mati

            imprimirUnion(automata1,automata2,res);
            plog.info("Se genero la union de dos automatas");
            imprimirConcatenacion(automata1,automata2,res);

            Imprimir_interseccion(automata1, automata2);
            //simplificaciion

            //1
            TablaEstados(automata1);
            TablaEstados(automata2);
            res1.appendChild(texto3);
            res2.appendChild(texto4);
            plog.info("Se simplificaron los automatas");
            imprimirImagen(automata1, res1);
            imprimirImagen(automata2, res2);

            //2            

        }
    }
}

function transformarAFD(automatas){
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
}

function imprimirConcatenacion(automataA,automataB,imgZone){
    let largoEstados = automataA.k.length+automataB.k.length;
    let definirFinal =[];
    //automataCon
    for(let i = 0; i < largoEstados; i ++){
        automataCon.k.push(`q${i}`);
    }   //estados

    automataCon.s = automata1.s;//alfabeto
    automataCon.afd = true;
    

    for(let u = 0; u < automata1.f.length ; u++){
        for(let v  = 0; v < automataCon.k.length ; v++){
            if (automata1.f[u]==automataCon.k[v]){
                for(let l = 0; l < automataCon.s.length ;l++){
                    definirFinal.push(true);
                }
            }else{
                for(let f = 0; f < automataCon.s.length ;f++){
                    definirFinal.push(false);
                }
            }
        }
    }


    for(let w = 0 ; w < automata1.g.length ; w++ ){
        if(definirFinal[w] == true){
            automataCon.g.push(`q${automata1.k.length}`);
        }
        if(definirFinal[w] == false){
            automataCon.g.push(automata1.g[w]);    
        }
    }

    for(let y = 0; y < automata2.g.length; y++){
        automataCon.g.push(`q${Number.parseInt (automata2.g[y].charAt(1)) + automata1.k.length}`);
    }

    for(let z = 0 ; z < automata2.f.length ; z++) {
        automataCon.f.push(`q${Number.parseInt(automata2.f[z].charAt(1))+automata1.k.length}`);
    }

    var texto2 = document.createElement("h4");
    texto2.innerHTML = ` La concatenacion es:`; //formato linea
    res.appendChild(texto2);

    console.log("info")
    console.log(automataCon);
    console.log(definirFinal);

    imprimirImagen(automataCon,imgZone);

    //[0:55 p. m., 19/6/2021] Luciano Donoso: Los finales del 1 apuntan al inicial del 2
    //[0:55 p. m., 19/6/2021] Luciano Donoso: Después de eso dejan de ser finales


}


function imprimirUnion(automataA,automataB,imgZon){
    let largoEstados = automataA.k.length+automataB.k.length;
    let largoAlfabeto = 0;
  //  let largoCaminos = automataA.g.length+automataB.g.length;  ELIMINAR NO USO
    
    //automataUnion
    let contQ = 0;
    //let letra = (String.fromCharCode(97 + i));

    if( automataA.s.length > automataB.s.length ){
        largoAlfabeto = automataA.s.length;
    }else{
        largoAlfabeto = automataB.s.length;
    }

    for (let q = 0; q < largoAlfabeto; q ++){
        let letra = (String.fromCharCode(97 + q));
        automataUnion.s.push(`${letra}`);
    }

    for (let i = 0; i < largoEstados+1; i++){
        automataUnion.k.push(`q${i}`);
    }


    automataUnion.g.push(`q1`);//recorremos el automata 1
    automataUnion.g.push(`q${automata1.k.length+1}`);//recorremos el automata 1
    automataUnion.label.push(`Eu`);//recorremos el automata 1
    automataUnion.label.push(`Eu`);//recorremos el automata 1
    for (let v = 0 ; v < largoAlfabeto-2; v++ ){
        automataUnion.label.push(0);
    }

    for (let l = 0 ; l < largoAlfabeto-2; l++ ){
        automataUnion.g.push(0);
    }

    for (let v = 0 ; v < automata1.g.length; v++ ){
        automataUnion.g.push(`q${Number.parseInt(automata1.g[v].charAt(1))+1}`);
        contQ++;
    }
    
    for (let u = 0 ; u < automata2.g.length; u++ ){
        automataUnion.g.push(`q${Number.parseInt(automata2.g[u].charAt(1))+automata1.k.length+1}`);


        
    }


    for(let y = 0; y < largoEstados; y++){
        for(let  t = 0 ; t < largoAlfabeto; t++){
            automataUnion.label.push(automataUnion.s[t]);
        }
    }

    for (let v = 0 ; v < automata1.f.length; v++ ){
        automataUnion.f.push(`q${Number.parseInt(automata1.f[v].charAt(1))+1}`);
        contQ++;
    }
    
    for (let u = 0 ; u < automata2.f.length; u++ ){
        automataUnion.f.push(`q${Number.parseInt(automata2.f[u].charAt(1))+automata1.k.length+1}`);

    }

    automataUnion.afd = false;


    console.log(automataUnion);
    var texto2 = document.createElement("h4");
    texto2.innerHTML = ` La union es:`; //formato linea
    res.appendChild(texto2)

    imprimirImagen(automataUnion,imgZon);
    
}



function imprimirComplemento(automatas,zonaImg,bol){
    var img = document.createElement("img");
    let salto = "%20";
    let espacio = "%0A%09"
    let espacio1 = "%20%5Bshape%3Ddoublecircle%5D%3B"
    let graph = `digraph{ poi -> q0 [color=red,style=dotted] ${salto}`;
    let o = 0;
    let esAfd = automatas.afd;


    

 


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
                if (automatas.g[p] == 0) {
                    graph += `q0`;
                } else {
                    graph += `q0 -> q0 [label="${automatas.label[p]}"] ${salto} `;
                }

            }

        } else {
            for (let i = 0; i < automatas.k.length; i++) { //estados
                for (let j = 0; j < automatas.s.length; j++) { //alfabeto
                    if (automatas.g[o] != 0) {
                        //k estados, s alfabeto, g caminos, label nombre arista, f final
                        graph += `${automatas.k[i]} -> ${automatas.g[o]} [label="${automatas.label[o]}"] ${salto} `;

                    }
                    o++;
                }
            }
        }

    }

    for (let q = 0; q < complemento.length; q++) { //final
        graph += ` ${espacio} ${complemento[q]} ${espacio1}${salto}`
    }
    graph += "poi[shape=point]}";

   
    var texto2 = document.createElement("h4");

    texto2.innerHTML = `7.Resultados Automata N°${bol}:`; //formato linea
    zonaImg.appendChild(texto2); //agrega la linea

    var texto1 = document.createElement("h4");

    texto1.innerHTML = `El complemento es:`; //formato linea
    zonaImg.appendChild(texto1); //agrega la linea
    img.setAttribute("src", `https://quickchart.io/graphviz?format=png&width=auto&height=auto&graph=${graph}`);
    zonaImg.appendChild(img);
}



function imprimirImagen(automatas, zonaImg) { // Funcion que imprime automatas sus parametros son un automata y un contenedor con direccion HTML
    
    var img = document.createElement("img");
    let salto = "%20";
    let espacio = "%0A%09"
    let espacio1 = "%20%5Bshape%3Ddoublecircle%5D%3B"
    let graph = `digraph{ poi -> q0 [color=red,style=dotted] ${salto}`;
    let o = 0;
    let esAfd = automatas.afd;
    


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
                if (automatas.g[p] == 0) {
                    graph += `q0`;
                } else {
                    graph += `q0 -> q0 [label="${automatas.label[p]}"] ${salto} `;
                }

            }

        } else {
            for (let i = 0; i < automatas.k.length; i++) { //estados
                for (let j = 0; j < automatas.s.length; j++) { //alfabeto
                  
                    if (automatas.g[o] != 0) {
                        //k estados, s alfabeto, g caminos, label nombre arista, f final
                        graph += `${automatas.k[i]} -> ${automatas.g[o]} [label="${automatas.label[o]}"] ${salto} `;

                    }
                    o++;
                }
            }
        }

    }

    for (let q = 0; q < automatas.f.length; q++) { //final
        graph += ` ${espacio} ${automatas.f[q]} ${espacio1}${salto}`
    }
    graph += "poi[shape=point]}";

   


    img.setAttribute("src", `https://quickchart.io/graphviz?format=png&width=auto&height=auto&graph=${graph}`);
    zonaImg.appendChild(img);
}

function asignarFinales(bol) { // registra finales
    let finales = [];
    let estadosf;
    complemento = [];

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
        if (aux == false){
            complemento.push(`q${i}`);
        }
    }

    if (finales.length == 0) {
        return false
    } else {

        if (bol == 1) {
            automata1.f = [];
            automata1.f = finales;
            final1 = finales;
            complemeto1 = complemento;
        }
        if (bol == 2) {
            automata2.f = [];
            automata2.f = finales;
            final2 = finales;
            complemeto2 = complemento;
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
        texto1 = document.createElement("h4"); //crea linea de texto
        var texto2 = document.createElement("h5"); //crea linea de texto
        var texto3 = document.createElement("h5"); //crea linea de texto
        salto = document.createElement("br");
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
                texto = document.createElement("p"); //crea linea de texto
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
                salto = document.createElement("br"); //salto de linea (no hay pa que)
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
    let esAfd;
    if (bol == 1) {
        estadoss = estados1;
        trans1 = [];
    }
    if (bol == 2) {
        estadoss = estados2;
        trans2 = [];
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
                            estadosCaminoAfnd1.push("Eu")
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
                            estadosCaminoAfnd2.push("Eu")
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
        automatas.k.push(`q${i}`);
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

    automatas.s = []

    for (i = 0; i < aux; i++) {
        automatas.s.push(String.fromCharCode(97 + i));
      
    }
    
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


function asignarAFD(bol) { //Funcion que define AFD o AFND
    const aux = document.getElementById(`AFD-${bol}`).value;

    if(aux == 0 ){
        return true;
    } 
    if(aux == 1){
        return false;
    }  
    

}


//función para descargar archivo
const DescargarLogs = () =>{
    var aux = "";
    var events = storage.getEvents();
    for (var i = 0; i < events.length - 1; i++) {
        aux = aux + JSON.stringify(events[i]) + "\n";
        }
  
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:events/plain;charset=utf-8," + encodeURIComponent(aux)
    );
    element.setAttribute("download", "log.txt");
    console.log(element);
    element.style.display = "none";
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
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