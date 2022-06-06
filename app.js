const add = (a,b) => a+b;

const subtract = (a,b) => a-b;

const multiply = (a,b) => a*b;

const divide = (a,b) => a/b;

const operate = (operator, a, b) => {
    if (operator === '+') {
        return add(a,b)
    } else if (operator === '-') {
        return subtract(a,b)
    } else if (operator === '*') {
        return multiply(a,b)
    } else if (operator === '÷') {
        return divide(a,b)
    } else {
        return 'invalid operator'
    }
}

let firstOperand = '';
let secondOperand = '';
let operator = null;
let isDecimal = false;
let isNegative = false;
let reset = false;

const digitBtns = document.querySelectorAll('.digit');
const operatorBtns = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('.equal-btn');
const delBtn = document.querySelector('.del-btn');
const clearBtn = document.querySelector('.clear-btn');
const decimalBtn = document.querySelector('.decimal');
const negativeBtn = document.querySelector('.neg');
const displayTop = document.querySelector('.display-top');
const displayBot = document.querySelector('.display-bot');

digitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        appendDigit(btn.textContent);
    })
})

operatorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        appendOperator(btn.textContent);
    })
})

clearBtn.addEventListener('click', () => {
    clearDigit();
})

delBtn.addEventListener('click', () => {
    deleteDigit();
})

decimalBtn.addEventListener('click', () => {
    appendDecimal();
})

negativeBtn.addEventListener('click', () => {
    appendNeg();
})

equalsBtn.addEventListener('click', () => {
    equals();
})

function appendDigit(text) {
    if (displayBot.textContent !== '0' && !reset) {
        displayBot.textContent += text;
    } else {
        displayBot.textContent = text;
        reset = false;
    }
}

function appendOperator(op) {
    if (firstOperand && operator) {
        secondOperand = displayBot.textContent;
        let total = Math.round(operate(operator, +firstOperand, +secondOperand) * 1000) / 1000;
        operator = op.replace(/\s/g,'');
        firstOperand = total.toString();
        displayTop.textContent = firstOperand.concat(' ', operator);
        reset = true;
        isDecimal = false;
        isNegative = false;
    } else {
        firstOperand = displayBot.textContent;
        operator = op.replace(/\s/g,'');
        displayTop.textContent = firstOperand.concat(' ', operator);
        reset = true;
        isDecimal = false;
        isNegative = false;
    }
}

function clearDigit() {
    displayBot.textContent = '0';
    displayTop.textContent = '';
    isDecimal = false;
    isNegative = false;
    firstOperand = '';
    secondOperand = '';
    operator = null;
}

function deleteDigit() {
    let last = displayBot.textContent[displayBot.textContent - 1];
    if (!isFinite(displayBot.textContent)) {
        displayBot.textContent = '0';
    } else {
        displayBot.textContent = displayBot.textContent.slice(0, -1);
    }
    if (displayBot.textContent.length === 0) {
        displayBot.textContent = 0;
        firstOperand = '';
        secondOperand = '';
    }
    if (last === '.') {
        isDecimal = false;
    } else if (last === '(-)') {
        isNegative = false;
    }
}

function appendDecimal() {
    if (!isDecimal) {
        displayBot.textContent += '.';
        isDecimal = true;
    }
}

function appendNeg() {
    if (!isNegative && displayBot.textContent !== '0') {
        displayBot.textContent = '-'.concat(displayBot.textContent);
        isNegative = true;
    }
}

function equals() {
    secondOperand = displayBot.textContent;
    if (firstOperand && operator && secondOperand) {
        displayTop.textContent = displayTop.textContent.concat(' ', secondOperand, ' =');
        displayBot.textContent = Math.round(operate(operator, +firstOperand, +secondOperand) * 1000) / 1000;
        firstOperand = displayBot.textContent;
        operator = null;
        secondOperand = '';
        reset = true;
    }
}


window.addEventListener('keydown', keyboardInput)

function keyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendDigit(e.key)
    if (e.key === '.') appendDecimal()
    if (e.key === '=' || e.key === 'Enter') equals()
    if (e.key === 'Backspace') deleteDigit()
    if (e.key === 'Escape') clearDigit()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    appendOperator(convertOperator(e.key))
}

function convertOperator(key) {
    if (key === '/') return '÷'
    if (key === '*') return '*'
    if (key === '-') return '-'
    if (key === '+') return '+'
}