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
const numbers = document.querySelector('.numbers')
const operations = document.querySelector('.operations')
const buttons = document.querySelector('.btn-container')

numbers.addEventListener('click', setNumber)
numbers.addEventListener('click', clearEvaluate)
numbers.addEventListener('click', evaluateOperation)
operations.addEventListener('click', setOperator)
operations.addEventListener('click', makeSelected)

let numberString = ""
let hasTypedNewNumber = false
function setNumber(e) {
    const value = Number(e.target.value)
    if(!isNaN(value)) {
        numberString += value
        display.value = numberString
        hasTypedNewNumber = true
    }
        
    if (numberString) {
        if (!operator) {
            num1 = Number(numberString)
        } else {
            num2 = Number(numberString)
        }
    }

    display.scrollLeft = display.scrollWidth // helps to see values
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
    const value = e.target.value;

    if (value === undefined) return;

    // Continuous Evaluation on operation change - if operator present and num2 exists
    if (operator && hasTypedNewNumber) {
        evaluateOperation();
        setResult();
    }

    operator = value;
    numberString = "";
    hasTypedNewNumber = false;
}


function resetCalculator() {
    removeSelectedClass()
    numberString = ""
    operator = ""
    result = null
    num1 = 0
    num2 = 0
    display.value = 0
}

function evaluateOperation() {
    if((num1 !== null && num1 !== undefined) && operator) {
        if (hasTypedNewNumber && numberString) {
            num2 = Number(numberString)
        }

        if (num2 !== null && num2 !== undefined) {
            switch(operator) {
                case '+':
                    result = roundResult(add(num1, num2));
                    break;
                case '-':
                    result = roundResult(subtract(num1, num2));
                    break;
                case '*':
                    result = roundResult(multiply(num1, num2));
                    break;
                case '/':
                    result = roundResult(divide(num1, num2));
                    break;
            }
        }
    }
}

function setResult() {
    // sets num1 to result and num2 to 0
    if (result || result === 0) {
        numberString = ""
        num1 = result
        display.value = result
        hasTypedNewNumber = false
    } 
}

function roundResult(result) {
    return Math.round(result * 1000) / 1000
}

function makeSelected(e) {
    removeSelectedClass()
    if (e.target.classList.contains('operation')) {
        e.target.classList.add('selected')
    }
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

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault() // very helpful
        evaluateOperation();
        setResult()
    }
})

// Logic
// TODO : remove numberstring and make it so user appends number to display
// as he chooses the operation, first number is stored with the operator
// then flag is toggled to true, so new number gets appended directly to display
// after clearing it first. that is the loop. Append Number, choose operator, store values and
// get new number after clearing the display. finally show the result on display. repeat.