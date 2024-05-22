/*
A big sorry to my future self. I doubt if you will 
understand this code. LoL
*/

// display nodes
const displayScreen = {
    currentBold: document.querySelector('.current > .bold'),
    currentLight: document.querySelector('.current > .light'),
    historyBold: document.querySelector('.history > .bold'),
    historyLight: document.querySelector('.history > .light')
}
// buttons
const buttons = document.querySelector('.buttons')
createButtons()

// initialize variables 
let total = null
let result = null
let expression = []
let input
let negative

// event listener
buttons.addEventListener('click', e => {
    const button = e.target
    const numbers = '1234567890'
    const symbols = 'X/+-'
    const btnTextContent = button.textContent

    if (numbers.includes(btnTextContent)) {
        updateExpressionFromNumber(btnTextContent)
        evaluateExpression()
    }
    if (symbols.includes(btnTextContent)) {
        updateExpressionFromOperator(btnTextContent)
    }
    if (btnTextContent === 'C') {
        clearScreen()
    }
    if (btnTextContent === '=') {
        equateOperation()
    }
    displayScreen.currentBold.textContent = result

})









function updateExpressionFromOperator(value) {
    const cleanedUpValue = value === 'X' ? '*' : value
    const lastItem = expression[expression.length - 1]

    if (expression.length === 0) {
        return
    } else {
        if ('*+-/'.includes(lastItem)) {
            expression[expression.length - 1] = cleanedUpValue
        } else {
            expression = expression.concat(cleanedUpValue)
        }

        displayScreen.currentLight.textContent = expression.join('')
    }
}
function updateExpressionFromNumber(value) {
    expression = expression.concat(value)
    displayScreen.currentLight.textContent = expression.join('')
}

function evaluateExpression() {
    let regexRule = /([0-9]*\.?[0-9]*)([*/])([0-9]*\.?[0-9]*)/
    let match
    input = expression.join('')

    while (regexRule.test(input)) {
        match = regexRule.exec(input)

        if (!match[2])
            break
        if (match[2] === "*") {
            result = operate(match[1], match[3], 'multiply')
        } else {
            result = operate(match[1], match[3], 'divide')
        }
        input = input.replace(match[0], input)
    }

    regexRule = /([0-9]*\.?[0-9]*)([\+\-])([0-9]*\.?[0-9]*)/

    while (regexRule.test(input) && input[0] != '-') {
        match = regexRule.exec(input)

        if (!match[2])
            break
        if (match[2] === "+") {
            result = operate(match[1], match[3], 'add')
        } else {
            result = operate(match[1], match[3], 'minus')
        }
        input = input.replace(match[0], `${result}`)
    }

    // Negative numbers

    regexRule = /^-([0-9]*\.?[0-9]*)([\+\-])([0-9]*\.?[0-9]*)/
    negative = regexRule.test(input)

    while (negative) {
        match = regexRule.exec(input)

        if (!match[2])
            break
        if (match[2] === "+") {
            result = operate(match[1], match[3], 'add')
        } else {
            result = operate(match[1], match[3], 'minus')
        }
        input = input.replace(match[0], `${result}`)
        negative = regexRule.test(input)
    }

    total = input
}

function operate(firstNumber, secondNum, operator) {
    const a = Number(firstNumber)
    const b = Number(secondNum)
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

function add(a, b) {
    return a + b
}
function divide(a, b) {
    const temp = a / b
    return temp.toFixed(1)
}
function multiply(a, b) {
    return a * b
}
function subtract(a, b) {
    return a - b
}

function clearScreen() {
    total = null
    result = null
    expression = []
    input

    displayScreen.currentBold.textContent = ''
    displayScreen.currentLight.textContent = 0
    displayScreen.historyBold.textContent = ''
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

function equateOperation() {
    if (!expression || !result || !input)
        return
    let temp = new String(result)
    expression = temp.split('')
    displayScreen.currentLight.textContent = expression.join('')
    result = null

}