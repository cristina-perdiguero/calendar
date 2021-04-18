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
let nodoPopUp; 
let nodoList;

function createYear(){
    const nodoYear = document.createElement( 'div' ); 
    nodoYear.classList.add( 'yearTitle' ); 

    const nodoBtnSubtract = document.createElement( 'button'); 
    nodoBtnSubtract.innerHTML = `<i class="fas fa-chevron-left"></i>`; 
    nodoBtnSubtract.addEventListener( 'click', () =>{
        prevYear();  
    })
    
    const nodoBtnAdd = document.createElement( 'button'); 
    nodoBtnAdd.innerHTML= `<i class="fas fa-chevron-right"></i>`; 
    nodoBtnAdd.addEventListener( 'click', () =>{
        nextYear(); 
    })

    const nodoYearTitle = document.createElement( 'h1' ); 
    nodoYearTitle.innerHTML = `${year}`; 

    nodoYear.appendChild( nodoBtnSubtract ); 
    nodoYear.appendChild( nodoYearTitle ); 
    nodoYear.appendChild( nodoBtnAdd ); 

    nodoCalendar.appendChild( nodoYear ); 
}

function createMonth(){
    for( let i = 0; i < monthList.length; i++){
        const nodoMonth = document.createElement( 'div' ); 
        nodoMonth.classList.add( 'month' ); 

        const nodoMonthTitle = document.createElement( 'h2' ); 
        nodoMonthTitle.classList.add( 'monthTitle' ); 
        nodoMonthTitle.innerHTML = `${monthList[i]}`; 
        
        nodoMonth.appendChild( nodoMonthTitle ); 
        nodoCalendar.appendChild( nodoMonth ); 
        createWeek( nodoMonth ); 
        createDays( nodoMonth, monthList[i], i ); 
    } 
}

function createWeek( month ){
    for ( let i = 0; i < week.length;  i++ ){
        const nodoWeekDay = document.createElement( 'div' ); 
        nodoWeekDay.classList.add( 'weekDay' ); 
        nodoWeekDay.innerHTML = `${ week[i] }`; 
        month.appendChild( nodoWeekDay ); 
    }
}

function getLeapYear(){
    return year % 4 === 0; 
}

function getDays( month ){
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

function createDays ( element, month, monthIndex ){
    let actualMonth = month; 
    let actualMonthIndex = monthIndex; 
    let howManyDays = getDays( actualMonth ); 
    for ( let i = 1; i <= howManyDays; i++  ){
        const nodoDay = document.createElement( 'div' ); 
        nodoDay.classList.add( 'monthDay' ); 
        nodoDay.innerHTML = `${i}`; 
        nodoDay.addEventListener( 'click', () =>{
            openToDoList(); 
        })
        element.appendChild( nodoDay ); 
        if ( getActualDay( i, actualMonthIndex)){
            nodoDay.classList.add( 'actualDay' ); 
        }
        if ( getfirstDay( i )) {
            nodoDay.id = `firstDay${actualMonth}`; 
        }
    }
}

function getActualDay( day, month ){
    return today === day && actualMonth === month; 
}

function getfirstDay( day ){
    return day === 1; 
}

function get1January(){
    let jan=  new Date(`Jan 1, ${year} 00:00:00`);
    return jan.getDay(); 
}

function organizeMonth(){
    let counterInitial = get1January(); 
    for ( let i = 0; i < monthList.length -1; i++ ){
        let actualMonth = monthList[i]; 
        let nextMonth = monthList[i +1]; 
        let days = getDays( actualMonth ); 
        let finalPosition = days % 7; 
        let finalDayPosition = counterInitial + finalPosition;
        if ( finalDayPosition > 7 ){
            finalDayPosition = finalDayPosition % 7; 
        }
        if ( actualMonth === 'Enero' ){
            switch (counterInitial) {
                case 0:
                counterInitial = 7; 
                break;
            }
            let nodoFirstDay = document.querySelector(`#firstDay${actualMonth}`);
            nodoFirstDay.style.gridColumnStart = counterInitial;
        }
        counterInitial = finalDayPosition; 
        let columnStart = finalDayPosition; 
        let nodoFirstDay = document.querySelector(`#firstDay${nextMonth}`);
        nodoFirstDay.style.gridColumnStart = columnStart;
    }
}

function createCalendar(){
    createYear(); 
    createMonth();
    organizeMonth(); 
    createPopUp(); 
}

createCalendar(); 

function addYear(){
    return year += 1; 
}

function subtractYear(){
    return year -= 1; 
}

function nextYear(){
    year = addYear(); 
    nodoCalendar.innerHTML = ''; 
    createCalendar(); 
}
function prevYear(){
    year = subtractYear(); 
    nodoCalendar.innerHTML = ''; 
    createCalendar(); 
}

function createPopUp(){
    nodoPopUp = document.createElement( 'div' ); 
    nodoPopUp.classList.add( 'popUp' ); 
     
    nodoList = document.createElement( 'div' ); 
    nodoList.classList.add( 'todoList' ); 
    nodoList.addEventListener( 'click', (event)=>{
        event.stopPropagation(); 
    })
    
    nodoPopUp.appendChild( nodoList ); 
    nodoPopUp.addEventListener( 'click', ()=>{
        closeToDoList(); 
    })
    nodoCalendar.appendChild( nodoPopUp ); 
    
}

function openToDoList(){
    nodoPopUp.classList.add( 'visible' ); 
    nodoList.classList.add( 'open' );  
}

function closeToDoList(){
    nodoList.classList.add( 'close' ); 
    let ref_TimeOut =  setTimeout(() => {
        nodoPopUp.classList.remove( 'visible' ); 
        nodoList.classList.remove( 'open' ); 
        nodoList.classList.remove( 'close' ); 
    }, 500);
}