'Use strict'; 

const nodoCalendario          = document.querySelector("#calendario"); 
let   fecha                   = new Date(); 
let   año                     = fecha.getFullYear(); 
let   diaHoy                  = fecha.getDate(); 
let   mesHoy                  = fecha.getMonth();
// let   fechaEnero;
let   fechaEnero              = new Date(`Jan 1, ${año} 00:00:00`);
let   comienzoEnero           = fechaEnero.getDay();  
let   calendarioHtml          = ""; 
const mes                     = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]; 
const meses31Dias             = ["Enero", "Marzo", "Mayo", "Julio", "Agosto", "Octubre", "Diciembre"]; 
const meses30Dias             = [ "Abril", "Junio", "Septiembre", "Noviembre"]
const semana                  = [ "Lun", "Mar", "Mier", "Jue" , "Vie", "Sab", "Dom" ]; 
//Crear Año
function elementoAño(){
    calendarioHtml = `<div id="año"><button id="btnMenos"><i class="fas fa-chevron-left"></i></button><h2 class="titulo">${ año }</h2><button id="btnMas"><i class="fas fa-chevron-right"></i></button></div>`; 
    elementoMes(); 
    pintar(); 
}
//Crear meses 
function elementoMes(){
    for ( let i = 0; i < mes.length; i++ ){
        calendarioHtml += `
        <div class="meses">
        <h3 class="meses-titulo">${ mes[i] }</h3>
        `; 
        let indiceMes = i; 
        elementoSemana();  
        elementoDiasMes( mes[i], indiceMes );
    }  
}
//Crear días de la  semana
function elementoSemana(){
    for ( let i = 0; i < semana.length; i++){
        calendarioHtml += `<div class="dia-semana">${ semana[i] }</div>`; 
    }
}
//Calcular años bisiestos
function añoBisiesto(){
    return año % 4 === 0; 
}
//Calcular cuántos días tiene cada mes
function getDiasCadaMes(mes){
    let   cantidadDiasMes;
    if (  meses31Dias.includes(mes)){
        cantidadDiasMes = 31; 
    } else if ( meses30Dias.includes(mes)){
        cantidadDiasMes = 30; 
    } else if ( mes === "Febrero" && !añoBisiesto()){
        cantidadDiasMes = 28; 
    } else {
        cantidadDiasMes = 29; 
    }
    return cantidadDiasMes; 
}
// Crear días del mes
function elementoDiasMes ( mes, indiceMes ){
    let mesActual = mes; 
    let mesActualIndice = indiceMes; 
    let cantidadDiasMes =  getDiasCadaMes( mesActual ); 
    for (let i = 1; i <= cantidadDiasMes ; i++ ){
        let id = '';
        let diaDestacado =''; 
        if ( mesActualIndice === mesHoy && i === diaHoy){
            diaDestacado = `diaDestacado`; 
        } 
        if ( i === 1 ){
            id = `id="primer-dia${ mes }"`;
        }
        calendarioHtml += `<div ${id} class="dias-mes ${ diaDestacado }">${ i }</div>`; 
    }
    calendarioHtml += `</div>`; 
}
//organizar según los días de la semana
function organizarDiasMes ( ){
    let   contadorPosicionInicial = comienzoEnero; 
    for ( i = 0; i < mes.length - 1; i++){
        let mesActual            = mes[i]; 
        let mesSiguiente         = mes[i + 1]; 
        let dias                 = getDiasCadaMes( mesActual ); 
        let posicionFinalGeneral = dias % 7; 
        let puntoFinalMes        = contadorPosicionInicial + posicionFinalGeneral; 
        if( puntoFinalMes > 7 ){
            puntoFinalMes = puntoFinalMes % 7; 
        }
        if ( mesActual === "Enero" ){
            if ( contadorPosicionInicial === 0 ){
                contadorPosicionInicial = 7; 
            }
            let nodoPrimerDia = document.querySelector(`#primer-dia${mesActual}`);
            nodoPrimerDia.style.gridColumnStart = contadorPosicionInicial;
        }
        contadorPosicionInicial = puntoFinalMes; 
        let columnStart   = puntoFinalMes; 
        let nodoPrimerDia = document.querySelector(`#primer-dia${mesSiguiente}`); 
        nodoPrimerDia.style.gridColumnStart = columnStart; 
    }
}
//Pintar el calendario
function pintar (){
    nodoCalendario.innerHTML = calendarioHtml; 
}
elementoAño(); 
organizarDiasMes(); 
//Sumar o restar años 
const nodoBtnMas = document.querySelector("#btnMas"); 
const nodoBtnMenos = document.querySelector("#btnMenos");  
function añoMas (){
    año            += 1; 
    fechaEnero     = new Date(`Jan 1, ${ año } 00:00:00`);
    comienzoEnero  = fechaEnero.getDay();   
    elementoAño ();  
    organizarDiasMes (); 
    const nodoBtnMas   = document.querySelector("#btnMas"); 
    const nodoBtnMenos = document.querySelector("#btnMenos");  
    nodoBtnMas.onclick =  añoMas; 
    nodoBtnMenos.onclick = añoMenos;
}
function añoMenos (){
    año            -= 1; 
    fechaEnero     = new Date(`Jan 1, ${ año } 00:00:00`);
    comienzoEnero  = fechaEnero.getDay();   
    elementoAño ();  
    organizarDiasMes (); 
    const nodoBtnMas   = document.querySelector("#btnMas"); 
    const nodoBtnMenos = document.querySelector("#btnMenos");      
    nodoBtnMas.onclick =  añoMas; 
    nodoBtnMenos.onclick = añoMenos;
}
nodoBtnMas.onclick =  añoMas; 
nodoBtnMenos.onclick = añoMenos; 