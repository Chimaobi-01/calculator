/*
A big sorry to my future self. I doubt if you will 
understand this code. LoL
*/ 

// display nodes
const currentBold = document.querySelector('.current > .bold')
const currentLight = document.querySelector('.current > .light')
const historyBold = document.querySelector('.history > .bold')
const historyLight = document.querySelector('.history > .light')

// buttons
const buttons = document.querySelector('.buttons')
const displayScreen = {
    currentBold,
    currentLight,
    historyBold,
    historyLight
}
let total = ''
let operator = ''
let operationScreen = []

let firstOperand = []
let secondOperand = []
let isFirstSecondOperand = true

createButtons()



buttons.addEventListener('click', e => {
    const numbers = '1234567890'
    const operatorSymbols = 'X/+-'
    const button = e.target
    const btnTextContent = button.textContent


    if (numbers.includes(btnTextContent)) {
        getFirstOperand(btnTextContent)
        getSecondOperand(btnTextContent)

        if (total && secondOperand) {
            total = operate(firstOperand.join(''), secondOperand.join(''), operator)
        }

        operationScreen.push(btnTextContent)
        displayScreen.currentLight.textContent = operationScreen.join('')
    }

    else if (operatorSymbols.includes(btnTextContent)) {

        switch (btnTextContent) {
            case "X":
                setOperationType("multiply")
                break;

            case "-":
                setOperationType('minus')
                break;
            case "+":
                setOperationType('add')
                break;
            case "/":
                setOperationType('divide')
                break;

            default:
                break;
        }

        handleMultipleSymbolClick(btnTextContent)
        displayScreen.currentLight.textContent = operationScreen.join('')

    } else {

    }
    displayScreen.currentBold.textContent = total
})

function handleMultipleSymbolClick(sym) {
    const isAsterik = sym === "X" ? "*" : sym
    const lastItem = operationScreen[operationScreen.length - 1]
    switch (lastItem) {
        case "-":
            operationScreen[operationScreen.length - 1] = isAsterik
            break;
        case "*":
            operationScreen[operationScreen.length - 1] = isAsterik
            break;
        case "+":
            operationScreen[operationScreen.length - 1] = isAsterik
            break;
        case "/":
            operationScreen[operationScreen.length - 1] = isAsterik
            break;

        default:
            operationScreen.push(isAsterik)
            break;
    }
}







function createButtons() {
    const textContents = [
        ['C', '+/-', '%', '/'],
        [7, 8, 9, 'X'],
        [4, 5, 6, '-'],
        [1, 2, 3, '+'],
        [0, '.', '<', '=']
    ]

    for (let i = 0; i < textContents.length; i++) {
        const buttonRow = document.createElement('div')
        for (let j = 0; j < textContents[i].length; j++) {
            const button = document.createElement('button')
            button.textContent = textContents[i][j]
            button.setAttribute('id', `${textContents[i][j]}`)
            buttonRow.appendChild(button)
        }
        buttons.appendChild(buttonRow)
    }

}

// operation functions

function add(a, b) {
    return a + b
}
function divide(a, b) {
    return a / b
}
function multiply(a, b) {
    return a * b
}
function subtract(a, b) {
    return a - b
}

function operate(firstNumber, secondNum, operator) {
    const a = Number(firstNumber)
    const b = Number(secondNum)
    console.log(a, b);
    switch (operator) {
        case "minus":
            return subtract(a, b)

        case "multiply":

            return multiply(a, b)

        case "add":
            return add(a, b)

        case "divide":
            return divide(a, b)

        default:
            break;
    }
}

function getFirstOperand(num) {
    if (!total) {
        firstOperand.push(num)
    }
}

function getSecondOperand(num) {
    if (!isFirstSecondOperand) {

        secondOperand.push(num)

    }
}

function setOperationType(name) {
    if (firstOperand) {
        isFirstSecondOperand = false
        total = total? total : firstOperand.join('')
        operator = name
        firstOperand = [total]
    }
    if (secondOperand) {
        secondOperand = []
    }
}