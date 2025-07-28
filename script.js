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
let num1 = null, num2 = null, operator, result;

// DOM elements
const display = document.querySelector('input.display')
const numbers = document.querySelector('.numbers')
const operations = document.querySelector('.operations')

numbers.addEventListener('click', setNumber)
numbers.addEventListener('click', clearEvaluate)
numbers.addEventListener('click', evaluateOperation)
operations.addEventListener('click', setOperator)

let numberString = ""
function setNumber(e) {
    const value = Number(e.target.value)
    if(!isNaN(value)) {
        numberString += value
        display.value = numberString
    }

    if (numberString) {
        if (!hasOperator()) {
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
            resetDisplay();
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

function hasOperator() {
    return (operator !== undefined)
}

function resetDisplay() {
    numberString = ""
    result = 0
    setResult()
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

function setResult() {
    // sets num1 to result and num2 to 0
    if (result || result === 0) {
        num1 = result
        num2 = 0
        display.value = result
    } 
}


display.addEventListener('keypress', (e) => {
    const badKeys = ['.', ..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')]
    for (let key of badKeys) {
        if (e.key === key) {
            e.preventDefault()
        }
    }
})