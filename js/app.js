//Declaracion de automata
const automata = {
    k: [], //estados = q0, q1, q2....
    s: [], //alfabeto = a, b....
    g: [], //caminos = ((q0,a)q1), ((q1,b)q0)...
    f: [], //final = q0, q1, q2....
    afd: null // afnd o afd
}//No modificar o correra la sangre...


//Se crean 2 automatas
const automata1 = Object.assign(automata);
const automata2 = Object.assign(automata);

//Variables
let tamañoAlfa = 0;

//Constantes HTML

//Automata1
const caminos1 = document.querySelector("#tablaTransicion1");
let estados1 = 0
//variables auxiliares
let afd1 = null;//asignado
let trans1 = [];//asignado
let alfabeto1 = [];//asginado
let final1 = [];
let estadosQ1 = [];//asignado


//Automata2
const caminos2 = document.querySelector("#tablaTransicion2");
let estados2 = 0;
//variables auxiliares
let afd2 = null;//asignado
let trans2 = [];//asignado
let alfabeto2 = [];//asignado
let final2 = [];
let estadosQ2 = [];//asignado

//Funciones Formulario

function iniciarAutomata(automatas,bol,tabla,enlace){ //Funcion para iniciar automatas
    if(tamañoAlfa==0){
        alert("Debes Ingresar primero el alfabeto");
    }
    else{
    enlace.disabled = 'disabled';
    automatas.afd = afd();
    if(bol==1){
        afd1 = afd();
    }
    if(bol==2){
        afd2 = afd();
    }

    asignarAlfabeto(automatas,bol);
    let tamañoQs = verificarEstados(bol);
        if(bol == 1){
            estados1 = tamañoQs;
        }
        if(bol == 2){
            estados2 = tamañoQs;
        }
    rellenarEstados(automatas,tamañoQs,bol);
    imprimirEstados(tamañoQs,bol);
    inputCaminos(tamañoQs,tabla,bol);
    console.log(automatas);
    }
}

function iniciarCamino(bol,enlace){
    if (leerInputs(bol) == false){

    }else{
        enlace.disabled = 'disabled';
        leerInputs(bol);


    }
}

function inputFinales(bol){
    
}

function inputCaminos(estados,tabla,bol){//Funcion que determina los camninos de q STANDBY
    let alf = tamañoAlfabeto();
    let letra = (String.fromCharCode(97));
    let g = 0;
    
    var texto1 = document.createElement("h4");  //crea linea de texto
    texto1.innerHTML = `4.Ingrese el estado a recorrer de llegada por cada camino.`;   //formato linea
    tabla.appendChild(texto1);//agrega la linea

    for(let i = 0 ; i < estados ; i++ ){
        for(let j = 0 ; j < alf ; j++ ){
            let letra = (String.fromCharCode(97+j));
            var texto = document.createElement("h4");  //crea linea de texto
            texto.innerHTML = `${g+1}.(q${i}, ${letra}) :`;   //formato linea
            tabla.appendChild(texto);//agrega la linea
            const inputNewQ = document.createElement('input');//crea linea de texto
            inputNewQ.type = "text";//formato
            if(i!= estados-1){inputNewQ.setAttribute('value',`q${i+1}`);}
            else{inputNewQ.setAttribute('value',`q0`);}
            inputNewQ.setAttribute("id",`res-${i}-${j}-${bol}`);//id ¿res-q0-a-automata1?
            tabla.appendChild(inputNewQ);//agrega
            var salto = document.createElement("br");//salto de linea (no hay pa que)
            tabla.appendChild(salto);//agrega
            g++;
        }
    } 
    //falta codigo del boton para confirmar estos datos, Funcion recolectora
    var btn = document.createElement("BUTTON");   // Create a <button> element
    btn.innerHTML = "Continuar";    
    if(bol==1){
    btn.setAttribute("onclick","iniciarCamino(1,this)");               // Insert text
    
    }
    if(bol==2){
    btn.setAttribute("onclick","iniciarCamino(2,this)");            // Insert text
    
    }
                // Insert text
    tabla.appendChild(btn);             // Append <button> to <body>  
}

function leerInputs(bol){

    let alf = tamañoAlfabeto();
    let estadoss = 0;

    if(bol == 1){
        estadoss = estados1;
        trans1=[];
    }
    if(bol == 2){
        estadoss = estados2;
        trans1=[];
    }
    
    for(let i = 0 ; i < estadoss; i++){
        for(let j = 0; j < alf ; j++){
            let letra = (String.fromCharCode(97+j));
            let aux = document.getElementById(`res-${i}-${j}-${bol}`).value;
            console.log(aux);
            console.log(estadoss);
            console.log(estadosQ1); 
            if(bol == 1){
                if(verificaQInputs(aux,estadosQ1) == true){
                    trans1.push(aux);
                }
                if(verificaQInputs(aux,estadosQ1) == false){
                    alert(`Q ingresado para (Q${i},${letra}) no es valido`);
                    trans1=[];
                    return false;
                }
            }
            if(bol == 2){
                if(verificaQInputs(aux,estadosQ2) == true){
                    trans2.push(aux);
                }
                if(verificaQInputs(aux,estadosQ2) == false){
                    alert(`Q ingresado para (Q${i},${letra}) no es valido`);
                    trans2=[];
                    return false;
                }
            }      
        }
    }
    if(bol==1){
        automata1.g = trans1;
        console.log(automata1);
        return true;
    }
    if(bol==2){
        automata2.g = trans2;
        console.log(automata1);
        return true; 
    }

}

function verificaQInputs( valor,estadoQs){//verifica que q este contenido en el automata
for(let i = 0 ; i < estadoQs.length ; i ++ ){
    if (estadoQs[i] == valor){
        return true;
    }
}   
    return false;
}

function verificarEstados(bol){//Funcion que verifica la cantidad de estados
    aux = tamañoEstados(bol);
    if(aux>10){
        return 10;
    }else{
    
    if(aux<1){
        return 1;
    }
    else return aux;
}
}


function imprimirEstados(estados,bol){//imprime los estados en el html
    if(bol == 1){
        document.getElementById("imCami1").innerHTML += `Los estados son:`;
        for(let i = 0 ; i < estados ; i++){
            document.getElementById("imCami1").innerHTML += `, q${i}`;
        }
        document.getElementById("imCami1").innerHTML += `\n`;
        
    }
    if(bol == 2){
        document.getElementById("imCami2").innerHTML += `Los estados son:`;
        for(let j = 0 ; j < estados ; j++){
            document.getElementById("imCami2").innerHTML += `, q${j}`;
        }
        document.getElementById("imCami2").innerHTML += `\n`;
    }
}

function rellenarEstados(automatas,estados,bol){//Funcion que rellena los estados
    automatas.k = [];

    for(let i = 0;i < estados ; i++ ){
        automata.k.push(`q${i}`);
        if(bol==1){
            estadosQ1.push(`q${i}`);
        }
        if(bol==2){
            estadosQ2.push(`q${i}`);
        }
    }
}

function tamañoEstados(bol){//Funcion que retorna Qs segun automata
    let g = bol;
    let aux = 9;
    if(g == 1 ){
        aux = document.getElementById("entrada1").value;
        return aux;
    }
    if(g == 2 ){
        aux = document.getElementById("entrada2").value;
        return aux;
    }
} 

function tamañoAlfabeto() {//Funcion que recupera el tamaño del alfabeto 
    let aux = document.getElementById("alfabeto").value;
    if(aux>10){
        aux=10;
        return aux;
    }else{
    if(aux<1){
        aux=1;
        return aux;
    }
    else return aux;
    
}
}

function asignarAlfabeto(automatas,bol) {//Funcion que asigna el alfabeto
    let aux = tamañoAlfa,
        i;
    //var tipo = tipo_alfa(),
        cont = 0;
    automatas.s = []
   // if (tipo == false) {
        for (i = 0; i < aux; i++) {
            automatas.s.push(String.fromCharCode(97 + i));
            if(bol == 1){
                alfabeto1.push(String.fromCharCode(97 + i));
            }
            if(bol == 2){
                alfabeto1.push(String.fromCharCode(97 + i));
            }
        }
        
    /*} else {
        for (i = 0; i < aux; i++) {
            automatas.s.push(cont);
            cont++;
        }
    }*/
}

function imprimirAlfabeto(){//Funcion que da a conocer el alfabeto
    let aux = tamañoAlfabeto();
    tamañoAlfa = aux;
    //let tipo = tipo_alfa(),
      let  i;
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
    if (aux == 0) {
        return true; //AFD      
    } else return false; //AFND
}

/*function tipo_alfa() {
    var aux = document.getElementById("alfab").value;
    return aux == 0; //letra
}*/

//Funciones HTML

function desactiva_enlace(enlace){
    enlace.disabled = 'disabled';
}

window.addEventListener("load", () => {

});