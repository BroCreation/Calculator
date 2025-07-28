// Operation functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// Variables
let num1 = 0, num2 = 0, operator, result;

// DOM elements
const display = document.querySelector('input.display')
const backspace = document.querySelector('.backspace')
const numbers = document.querySelector('.numbers')
const operations = document.querySelector('.operations')
const buttons = document.querySelector('.btn-container')

numbers.addEventListener('click', setNumber)
numbers.addEventListener('click', clearEvaluate)
numbers.addEventListener('click', evaluateOperation)
operations.addEventListener('click', setOperator)
operations.addEventListener('click', makeSelected)
backspace.addEventListener('click', removeDigit)

let numberString = ""
function setNumber(e) {
    const value = Number(e.target.value)
    if(!isNaN(value)) {
        numberString += value
        display.value = numberString
    }

    if (numberString) {
        if (!operator) {
            num1 = Number(numberString)
        } else {
            num2 = Number(numberString)
        }
    }

    display.scrollLeft = display.scrollWidth
}

function clearEvaluate(e) {
    // Other operations
    switch(e.target.value) {
        case "clear":
            resetCalculator();
            break;
        case "evaluate":
            evaluateOperation();
            setResult()
            break;
    }
}

function setOperator(e) {
    const value = e.target.value
    if (value !== undefined) {
        operator = value
    }
    
    numberString = ""
    setResult()
}

function resetCalculator() {
    removeSelectedClass()
    numberString = ""
    operator = ""
    result = null
    num1 = null
    num2 = null
    display.value = 0
}

function evaluateOperation() {
    if((num1 || num1 === 0) && (num2 || num2 === 0) && operator) {
        switch(operator) {
            case '+':
                result = add(num1, num2);
                break;
            case '-':
                result = subtract(num1, num2);
                break;
            case '*':
                result = multiply(num1, num2);
                break;
            case '/':
                result = divide(num1, num2);
                break;
        }
    }
}

buttons.addEventListener('click', (e) => {
    console.log('NUM 1: ', num1, 'NUM2: ', num2, 'Result: ', result, 'operator: ', operator, 'numberString: ', numberString)
})

function setResult() {
    // sets num1 to result and num2 to 0
    if (result || result === 0) {
        numberString = ""
        num1 = result
        display.value = result
    } 
}

function removeDigit() {
    numberString = numberString.slice(0, -1)
    display.value = numberString
}

function makeSelected(e) {
    removeSelectedClass()
    e.target.classList.add('selected')
}

function removeSelectedClass() {
    const targets = document.querySelectorAll('.operation')
    targets.forEach(target => {
        if(target.classList.contains('selected')) {
            target.classList.remove('selected')
        }
    })
}

display.addEventListener('keypress', (e) => {
    const badKeys = ['.', ..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')]
    for (let key of badKeys) {
        if (e.key === key) {
            e.preventDefault()
        }
    }
})