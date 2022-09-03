var DISPLAY = '';
var SUBDISPLAY = '';
var OP = ''
var FIRSTNUM = null;
var SECONDNUM = null;
var CLEAR = false;
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
    return ans > 9999999999999 ? ans.toExponential(2) : ans.toString().length > 13 ? ans.toFixed(Math.abs(13 - (ans.toString().length - decimalPlaces(ans)))) : ans;
}

function subtract(a,b) {
    ans = a - b;
    return ans > 9999999999999 ? ans.toExponential(2) : ans.toString().length > 13 ? ans.toFixed(Math.abs(13 - (ans.toString().length - decimalPlaces(ans)))) : ans;
}

function multiply(a,b) {
    ans = a * b;
    return ans > 9999999999999 ? ans.toExponential(2) : ans.toString().length > 13 ? ans.toFixed(Math.abs(13 - (ans.toString().length - decimalPlaces(ans)))) : ans;
}

function divide(a,b) {
    if (b == 0) {
        return 	'(凸ಠ益ಠ)凸';
    }
    ans = a / b;
    return ans > 9999999999999 ? ans.toExponential(2) : ans.toString().length > 13 ? ans.toFixed(Math.abs(13 - (ans.toString().length - decimalPlaces(ans)))) : ans;
}

function square(a) {
    ans = a ** 2;
    return ans > 9999999999999 ? ans.toExponential(2) : ans.toString().length > 13 ? ans.toFixed(Math.abs(13 - (ans.toString().length - decimalPlaces(ans)))) : ans;
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
    if (e.target.classList.contains('number')) {
        // numbers
        if (DISPLAY.length < 13 || CLEAR) {
            if (DISPLAY === '' || DISPLAY == '0' || CLEAR) {
                DISPLAY = e.target.id;
                CLEAR = false;
            } else {
                DISPLAY += e.target.id;
            }
        }
    } else if (e.target.classList.contains('operation')) {
        // operations
        if (e.target.classList.contains('arithmetic')) {
            // arithmetic
            if (FIRSTNUM === null) {
                OP = e.target.innerText;
                FIRSTNUM = Number(DISPLAY);
                SUBDISPLAY = DISPLAY + ' ' + OP;
            } else if (SECONDNUM === null) {
                if (CLEAR) {
                    OP = e.target.innerText;
                    SUBDISPLAY = DISPLAY + ' ' + OP;
                } else {
                    SUBDISPLAY = OP ? String(operate(OP,FIRSTNUM,Number(DISPLAY))) : String(FIRSTNUM);
                    DISPLAY = SUBDISPLAY;
                    OP = e.target.innerText;
                    FIRSTNUM = Number(DISPLAY);
                    SUBDISPLAY += ' ' + OP;
                }
            } else {
                SUBDISPLAY = String(operate(OP,FIRSTNUM,SECONDNUM));
                DISPLAY = SUBDISPLAY;
                OP = e.target.innerText;
                FIRSTNUM = Number(DISPLAY);
                SECONDNUM = null;
                SUBDISPLAY += ' ' + OP;
            }
            CLEAR = true;
        } else {
            // other operations
            if (e.target.id == 'sign') {
                SUBDISPLAY = 'negate( ' + DISPLAY + ' )';
                FIRSTNUM = -Number(DISPLAY);
                SECONDNUM = null;
                DISPLAY = DISPLAY ? String(FIRSTNUM) : '0';
            } else if (e.target.id == 'dec') {
                if (CLEAR) {
                    CLEAR = false;
                    DISPLAY = '';
                    SUBDISPLAY = '';
                    OP = '';
                    FIRSTNUM = null;
                    SECONDNUM = null;
                }
                if (!DISPLAY.includes('.')) {
                    DISPLAY = DISPLAY ? DISPLAY + '.': '0.';
                }
            } else if (e.target.id == 'sqr') {
                SUBDISPLAY = 'sqr( ' + DISPLAY + ' )';
                FIRSTNUM = square(Number(DISPLAY));
                SECONDNUM = null;
                DISPLAY = String(FIRSTNUM);
            } else if (e.target.id == 'equal') {
                if (FIRSTNUM == null || !OP) {
                    FIRSTNUM = Number(DISPLAY);
                    SUBDISPLAY = String(FIRSTNUM) + ' =';
                } else if (SECONDNUM == null) {
                    SECONDNUM = DISPLAY ? Number(DISPLAY) : FIRSTNUM;
                    SUBDISPLAY = String(FIRSTNUM) + ' ' + OP + ' ' + String(SECONDNUM) + ' =';
                    DISPLAY = String(operate(OP,FIRSTNUM,SECONDNUM));
                } else {
                    FIRSTNUM = Number(DISPLAY);
                    SUBDISPLAY = String(FIRSTNUM) + ' ' + OP + ' ' + String(SECONDNUM) + ' =';
                    DISPLAY = String(operate(OP,FIRSTNUM,SECONDNUM));
                }
                CLEAR = true;
            }
        }
        
    } else if (e.target.classList.contains('misc')) {
        // misc
        if (e.target.id == 'ac') {
            DISPLAY = '';
            SUBDISPLAY = '';
            OP = '';
            FIRSTNUM = null;
            SECONDNUM = null;
            CLEAR = false;
        } else if (e.target.id == 'back') {
            if (CLEAR) {
                CLEAR = false;
                SUBDISPLAY = '';
                OP = '';
                FIRSTNUM = null;
                SECONDNUM = null;
            } else {
                DISPLAY = DISPLAY.slice(0,-1);
            }
        }
    }
    mainDisplay.innerText = DISPLAY ? DISPLAY : '0';
    subDisplay.innerText = SUBDISPLAY;
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
});