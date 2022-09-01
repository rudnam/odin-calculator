var DISPLAY = '';
var STORE = [];
const mainDisplay = document.body.querySelector('#display-main');
const AC = document.body.querySelector('#AC');
const C = document.body.querySelector('#C');

function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

function operate(operator,a,b) {
    if (operator == '+') {
        return add(a,b);
    } else if (operator == '-') {
        return subtract(a,b);
    } else if (operator == '*') {
        return multiply(a,b);
    } else if (operator == '/') {
        return divide(a,b);
    }
}

function updateDisplay(e) {
    if (e.target.innerText == 'AC') {
        DISPLAY = '';
    } else if (e.target.innerText == 'C') {
        DISPLAY = DISPLAY.slice(0,-1);
    } else {
        DISPLAY += e.target.innerText;
    }
    mainDisplay.innerText = DISPLAY;
}

let btns = document.body.getElementsByClassName('btn');
for (let i=0; i < btns.length; ++i) {
    btns[i].addEventListener('click', updateDisplay);
}