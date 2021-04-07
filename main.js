'use strict'

const nodoCalendar    = document.querySelector('#calendar'); 
const date            = new Date; 
let   year            = date.getFullYear(); 
let   today           = date.getDate(); 
let   actualMonth     = date.getMonth(); 
const monthList       = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]; 
const month31Days     = ["Enero", "Marzo", "Mayo", "Julio", "Agosto", "Octubre", "Diciembre" ]; 
const month30Days     = ["Abril", "Junio", "Septiembre", "Noviembre"]; 
const week            = ["Lun", "Mar", "Mier", "Jue" , "Vie", "Sab", "Dom"]; 
let   elementCalendar = ''; 

//elemento año
let elementYear = function(){
    elementCalendar =`<div class="calendarContainer"> 
                        <div class="yearTitle">
                            <button id="subtract"><i class="fas fa-arrow-left"></i></button>
                            <h1>${year}</h1>
                            <button id="add"><i class="fas fa-arrow-right"></i></button>
                        </div>`; 
}
//elementos meses
let elementMonth = function(){
    for( let i = 0; i < monthList.length; i++ ){
        elementCalendar +=`<div class="month">
                                <div class="monthTitle">${monthList[i]}</div>`; 
        elementWeek(); 
        elementDays( monthList[i], i ); 
    }
}
//elementos días de la semana 
let elementWeek = function(){
    for ( let i = 0; i < week.length; i++){
        elementCalendar += `<div class="weekDay">${ week[i] }</div>`; 
    }
}
//año bisiesto
let getLeapYear = function(){
    return year % 4 === 0; 
}
//días por mes
let getDays = function( month ){
    let howManyDays; 
    if ( month31Days.includes( month )){
        howManyDays = 31; 
    } else if ( month30Days.includes( month )){
        howManyDays = 30; 
    } else if ( month === "Febrero" && !getLeapYear()){
        howManyDays = 28; 
    } else{
        howManyDays = 29; 
    }
    return howManyDays; 
}
//elementos días
let elementDays = function( month, monthIndex ){
    let actualMonth = month; 
    let actualMonthIndex = monthIndex; 
    let howManyDays = getDays(actualMonth); 
    for( let i = 1; i <= howManyDays; i++ ){
        let firstDay = getfirstDay( i, actualMonth ); 
        let actualDay = getActualDay( i, actualMonthIndex ); 
        elementCalendar += `<div ${ firstDay } class="monthDay ${ actualDay }">${i}</div>`; 
    }
    elementCalendar += `</div>`; 
}
//clase día actual
let getActualDay = function( day, month){
    let actualDayClass = ''; 
    console.log( today, day, actualMonth, month)
    if ( today === day && actualMonth  === month ){
        return actualDayClass = 'actualDay'; 
    } else{
        return actualDayClass; 
    }    
}
//id primer día de cada mes
let getfirstDay = function( index, month ){
    let firstDay = ''; 
    if (index === 1){
        firstDay = `id="firstDay${ month }"`; 
        return firstDay; 
    } else{
        return firstDay; 
    }
}
//unir elementCalendar
let mergeCalendarElements = function(){
    elementYear(); 
    elementMonth(); 
}
//recoger el primer día de enero
let get1January = function(){
    let jan=  new Date(`Jan 1, ${year} 00:00:00`);
    return jan.getDay(); 
}
//pintar el calendario
let paintCalendar= function(){
    nodoCalendar.innerHTML = elementCalendar; 
}
mergeCalendarElements(); 
paintCalendar(); 
//añadir año
let addYear = function(){
    return year += 1; 
}
//restar año
let subtractYear = function(){
    return year -= 1; 
}

let nodoBtnAdd = document.querySelector('#add'); 
let nodoBtnSubtract = document.querySelector('#subtract'); 

