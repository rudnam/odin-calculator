var DISPLAY = '';
var OP = ''
var firstNum;
const mainDisplay = document.body.querySelector('#display-main');
const subDisplay = document.body.querySelector('#display-sub');
const AC = document.body.querySelector('#AC');
const C = document.body.querySelector('#C');

function add(a,b) {
    ans = a + b;
    return ans.toString().includes('e') ? ans.toExponential(2) : ans;
}

function subtract(a,b) {
    ans = a - b;
    return ans.toString().includes('e') ? ans.toExponential(2) : ans;
}

function multiply(a,b) {
    ans = a * b;
    return ans.toString().includes('e') ? ans.toExponential(2) : ans;
}

function divide(a,b) {
    if (b == 0) {
        return 	'(凸ಠ益ಠ)凸';
    }
    ans = a / b;
    return ans.toString().includes('e') ? ans.toExponential(2) : ans;

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
        firstNum = undefined;
        OP = '';
        mainDisplay.innerText = DISPLAY ? DISPLAY : '0';
        subDisplay.innerText = '';
    } else if (e.target.innerText == 'C') {
        DISPLAY = DISPLAY.slice(0,-1);
        mainDisplay.innerText = DISPLAY ? DISPLAY : '0';
    } else if (e.target.innerText == '=') {
        if (firstNum) {
            subDisplay.innerText = String(firstNum) + ' ' + OP + ' ' + DISPLAY + ' =';
            DISPLAY = operate(OP,firstNum,Number(DISPLAY));
            mainDisplay.innerText = DISPLAY ? DISPLAY : '0';
        }
    } else if (isNaN(e.target.innerText)) {
        if (DISPLAY && firstNum) {
            DISPLAY = operate(OP,firstNum,Number(DISPLAY));
            mainDisplay.innerText = DISPLAY ? DISPLAY : '0';
            firstNum = Number(DISPLAY);
            DISPLAY = '';
            OP = e.target.innerText;
            subDisplay.innerText = String(firstNum) + ' ' + OP;
        } else {
            firstNum = Number(DISPLAY);
            OP = e.target.innerText;
            DISPLAY = '';
            subDisplay.innerText = String(firstNum) + ' ' + OP;
        }
    } else {
        if (DISPLAY.length < 13) {
            DISPLAY += e.target.innerText;
            mainDisplay.innerText = DISPLAY ? DISPLAY : '0';
        }
    }
}

let btns = document.body.getElementsByClassName('btn');
for (let i=0; i < btns.length; ++i) {
    btns[i].addEventListener('click', updateDisplay);
}