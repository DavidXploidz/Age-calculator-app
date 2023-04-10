//Globals
const submit = document.querySelector('.calculate__btn');

//Campos text visibles
const yearsText = document.querySelector('#years');
const monthsText = document.querySelector('#months');
const daysText = document.querySelector('#days');

const day = document.querySelector('#day').value;
const month = document.querySelector('#month').value;
const year = document.querySelector('#year').value;

const dayError = document.querySelector('#error-day');
const monthError = document.querySelector('#error-month');
const yearError = document.querySelector('#error-year');

const fieldLabel = document.querySelectorAll('.field__label');
const fieldInput = document.querySelectorAll('.field__input');

function obtenerFecha(date){
    //Array destructuring
    let [day, month, year] = date;

    //Convertir datos capturados a strings
    day.toString();
    month.toString();
    year.toString();

    //Crear cadena de fecha para pasarla a la clase Date
    let fechaNacimiento = year+"-"+month+"-"+day;

    //Convertir la fecha de nacimiento a una clase Date
    dateOfBirth = new Date(fechaNacimiento);

    //Instanciar fecha actual de  la clase Date
    const fechaActual = new Date();

    //Diferencia en milisegundos entre la fecha actual y la fecha de nacimiento
    const diffInMillis = fechaActual.getTime() - dateOfBirth.getTime();

    //Convertir la diferencia en milisegundos a años, meses y días
    const diffInYears = diffInMillis / (1000 * 60 * 60 * 24 * 365.25);
    const diffInMonths = (diffInYears - Math.floor(diffInYears)) * 12;
    const diffInDays = Math.floor((diffInMonths - Math.floor(diffInMonths)) * 30.44);
    //Asignar a nueva variable
    const years = Math.floor(diffInYears);
    const months = Math.floor(diffInMonths);
    const days = diffInDays;

    //Mostrar la edad en años, meses y días
    mostrarFecha(years, months, days);
}

//Funcion para mostrar la fecha en el DOM
function mostrarFecha(years, months, days){
   
    let contDays = 0;
    let contMonths = 0;
    let contYears = 0;

    //Animar los numeros de dias
    let animateDays = setInterval(() => {

        contDays ++;
        daysText.textContent = contDays;

        if(contDays === days){
            clearInterval(animateDays);
        }
    }, 100);

    //Animar los numeros de meses
    let animateMonths = setInterval(() => {

        contMonths ++;
        monthsText.textContent = contMonths;

        if(contMonths === months){
            clearInterval(animateMonths);
        }
    }, 100);

    //Animar los numeros de meses
    let animateYears = setInterval(() => {

        contYears ++;
        yearsText.textContent = contYears;

        if(contYears === years){
            clearInterval(animateYears);
        }
    }, 100);

}

//Funcion para validar las fechas
function validarFechas(){
    const day = document.querySelector('#day').value;
    const month = document.querySelector('#month').value;
    const year = document.querySelector('#year').value;
    
    const fecha = new Date();
    const anio = fecha.getFullYear();

    let mensajeAnio = '';
    let mensajeMonth = '';
    let mensajeDay = '';
    

    if(year === '' || month === '' || day === ''){
        mensajeAnio = "This file is required";
        mensajeMonth = "This file is required";
        mensajeDay = "This file is required";
        mostrarAlerta(mensajeAnio, mensajeMonth, mensajeDay);
        return;
    }
    if(year >= anio ){
        mensajeDay = "Must be a valid day";
        mensajeMonth = "Must be a valid month";
        mensajeAnio = "Must be in the past";
        mostrarAlerta(mensajeAnio, mensajeMonth, mensajeDay);
        return;
    }
    //Los valores salen de los imputs day,month,year de las globales
    const date = [day, month, year];
    obtenerFecha(date);
}

function mostrarAlerta(mensajeAnio, mensajeMonth, mensajeDay){
    limpiarHTML();
    //Escribe el mensaje de error segun sea el caso
    dayError.textContent = mensajeDay;
    monthError.textContent = mensajeMonth;
    yearError.textContent = mensajeAnio;

    //Pintar labels de texto cuando hay error
    fieldLabel.forEach(function(field){
        field.classList.add('field__label--error');
    });

    //Pintar inputs de texto cuando hay error
    fieldInput.forEach(function(input){
        input.classList.add('field__input--error');
    });

    setTimeout(() => {
        limpiarHTML();
    }, 3000);
    
}

function limpiarHTML(){
    dayError.textContent = '';
    monthError.textContent = '';
    yearError.textContent = '';

    fieldLabel.forEach(function(field){
        field.classList.remove('field__label--error');
    });

    fieldInput.forEach(function(input){
        input.classList.remove('field__input--error');
    });
}

submit.addEventListener('click', () => {
    validarFechas();
});