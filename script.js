var DISPLAY = '';
var OP = ''
var FIRSTNUM = null;
const mainDisplay = document.body.querySelector('#display-main');
const subDisplay = document.body.querySelector('#display-sub');

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

function square(a) {
    ans = a ** 2;
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
        FIRSTNUM = null;
        OP = '';
        mainDisplay.innerText = DISPLAY ? DISPLAY : '0';
        subDisplay.innerText = '';
    } else if (e.target.id == 'back') {
        DISPLAY = DISPLAY.slice(0,-1);
        mainDisplay.innerText = DISPLAY ? DISPLAY : '0';
    } else if (e.target.id == 'sign') {
        if (Number(DISPLAY) != 0) {
            DISPLAY = -DISPLAY;
            mainDisplay.innerText = DISPLAY ? DISPLAY : '0';
        }
    } else if (e.target.id == 'sqr') {
        if (DISPLAY) {
            subDisplay.innerText = 'sqr( ' + DISPLAY + ' )'; 
            DISPLAY = square(Number(DISPLAY));
            mainDisplay.innerText = DISPLAY ? DISPLAY : '0';
        }
    } else if (e.target.id == 'dec') {
        if (!DISPLAY.includes('.')) {
            DISPLAY += '.';
            mainDisplay.innerText = DISPLAY ? DISPLAY : '0';
        }
    } else if (e.target.id == 'equal') {
        if (FIRSTNUM !== null) {
            subDisplay.innerText = String(FIRSTNUM) + ' ' + OP + ' ' + Number(DISPLAY) + ' =';
            DISPLAY = operate(OP,FIRSTNUM,Number(DISPLAY));
            mainDisplay.innerText = DISPLAY ? DISPLAY : '0';
        } else if (DISPLAY.toString().includes('.')) {
            DISPLAY = Number(DISPLAY);
            subDisplay.innerText = Number(DISPLAY) + ' =';
            mainDisplay.innerText = DISPLAY ? DISPLAY : '0';
        }
    } else if (isNaN(e.target.innerText)) {
        if (DISPLAY && (FIRSTNUM !== null)) {
            DISPLAY = operate(OP,FIRSTNUM,Number(DISPLAY));
            mainDisplay.innerText = DISPLAY ? DISPLAY : '0';
            FIRSTNUM = Number(DISPLAY);
            DISPLAY = '';
            OP = e.target.innerText;
            subDisplay.innerText = String(FIRSTNUM) + ' ' + OP;
        } else {
            FIRSTNUM = Number(DISPLAY);
            OP = e.target.innerText;
            DISPLAY = '';
            subDisplay.innerText = String(FIRSTNUM) + ' ' + OP;
        }
    } else {
        if (DISPLAY.length < 13) {
            if (e.target.innerText != '0' || DISPLAY || FIRSTNUM != null) {
                DISPLAY += e.target.innerText;
                mainDisplay.innerText = DISPLAY ? DISPLAY : '0';
            }
        }
    }
}


let btns = document.body.getElementsByClassName('btn');
for (let i=0; i < btns.length; ++i) {
    btns[i].addEventListener('click', updateDisplay);
}

document.addEventListener('keydown', function(event) {
    var dict = {'Backspace': 'back', '^': 'sqr', 'Enter': 'equal', '=': 'equal', 'Escape': 'ac', '/': 'div', '*': 'mult', '-': 'sub', '+': 'add', '.': 'dec'};
    for (let i=0; i < 10; i++) {
        dict[i] = i;
    }
    if (Object.keys(dict).includes(event.key)) {
        document.getElementById(dict[event.key]).click();
    }
    console.log(event);
});