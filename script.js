var DISPLAY = '';
var OP = ''
var firstNum;
const mainDisplay = document.body.querySelector('#display-main');
const subDisplay = document.body.querySelector('#display-sub');
const AC = document.body.querySelector('#AC');
const C = document.body.querySelector('#C');

// from https://stackoverflow.com/questions/9539513/is-there-a-reliable-way-in-javascript-to-obtain-the-number-of-decimal-places-of/44815797#44815797
function decimalPlaces(n) {
    function hasFraction(n) {
        return Math.abs(Math.round(n) - n) > 1e-10;
    }
    let count = 0;
    while (hasFraction(n * (10 ** count)) && isFinite(10 ** count)) {
        count += 1;
    }
    return count;
}

function add(a,b) {
    ans = a + b;
    return ans > 9999999999999 ? ans.toExponential(2) : ans.toString().length > 13 ? ans.toFixed(13 - (ans.toString().length - decimalPlaces(ans))) : ans;
}

function subtract(a,b) {
    ans = a - b;
    return ans > 9999999999999 ? ans.toExponential(2) : ans.toString().length > 13 ? ans.toFixed(13 - (ans.toString().length - decimalPlaces(ans))) : ans;
}

function multiply(a,b) {
    ans = a * b;
    return ans > 9999999999999 ? ans.toExponential(2) : ans.toString().length > 13 ? ans.toFixed(13 - (ans.toString().length - decimalPlaces(ans))) : ans;
}

function divide(a,b) {
    if (b == 0) {
        return 	'(凸ಠ益ಠ)凸';
    }
    ans = a / b;
    return ans > 9999999999999 ? ans.toExponential(2) : ans.toString().length > 13 ? ans.toFixed(13 - (ans.toString().length - decimalPlaces(ans))) : ans;

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
    if (e.target.id == 'ac') {
        DISPLAY = '';
        firstNum = undefined;
        OP = '';
        mainDisplay.innerText = DISPLAY ? DISPLAY : '0';
        subDisplay.innerText = '';
    } else if (e.target.id == 'c') {
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