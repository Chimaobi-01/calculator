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

// initialize variables 
let total = ''
let operator = ''
let operationScreen = []
let operandArray = []
let firstOperand = []
let secondOperand = []
let isFirstSecondOperand = true
createButtons()

buttons.addEventListener('click', e => {
    const button = e.target
    const numbers = '1234567890'
    const symbols = 'X/+-'
    const btnTextContent = button.textContent

    if(numbers.includes(btnTextContent)){
        updateOperationFromNumbersButton(btnTextContent)
    }
    if(symbols.includes(btnTextContent)){
        updateOperationFromOperatorButton(btnTextContent)
    }
    displayScreen.currentBold.textContent = total
})

function updateOperationFromNumbersButton(value) {
    const cleanedUpValue = value === 'X'? '*': value

    operationScreen = operationScreen.concat(cleanedUpValue)
    operandArray = operationScreen.join('').split(/\D/).filter(s => s != "")

    displayScreen.currentLight.textContent = operationScreen.join('')
}

function updateOperationFromOperatorButton(value) {
    const cleanedUpValue = value === 'X'? '*': value
    const lastItem = operationScreen[operationScreen.length-1]

    if(operationScreen.length === 0){
        return
    }else {
        if('*+-/'.includes(lastItem)){
            operationScreen[operationScreen.length-1] = cleanedUpValue
        }else {
            operationScreen = operationScreen.concat(cleanedUpValue)
        }
        
        displayScreen.currentLight.textContent = operationScreen.join('')
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





// function add(a, b) {
//     return a + b
// }
// function divide(a, b) {

//     return Math.round(a / b)
// }
// function multiply(a, b) {
//     return a * b
// }
// function subtract(a, b) {
//     return a - b
// }

// function operate(firstNumber, secondNum, operator) {
//     const a = Number(firstNumber)
//     const b = Number(secondNum)
//     switch (operator) {
//         case "minus":
//             return subtract(a, b)

//         case "multiply":

//             return multiply(a, b)

//         case "add":
//             return add(a, b)

//         case "divide":
//             return divide(a, b)

//         default:
//             break;
//     }
// }

// function getFirstOperand(num) {
//     if (!total) {
//         firstOperand.push(num)
//     }
// }

// function getSecondOperand(num) {
//     if (!isFirstSecondOperand) {

//         secondOperand.push(num)

//     }
// }

// function setOperationType(name) {
//     if (firstOperand) {
//         isFirstSecondOperand = false
//         total = total ? total : firstOperand.join('')
//         operator = name
//         firstOperand = [total]
//     }
//     if (secondOperand) {
//         secondOperand = []
//     }
// }


// function clearScreen() {
//     total = ''
//     operator = ''
//     operationScreen = []
//     firstOperand = []
//     secondOperand = []
//     isFirstSecondOperand = true

//     currentBold.textContent = ''
//     currentLight.textContent = 0
//     historyBold.textContent = ''
// }

// function backspace() {
//     if (isFirstSecondOperand) {
//         if (!firstOperand) {
//             return
//         } else if (firstOperand.length === 1) {
//             firstOperand = [0]
//             operationScreen = [...operationScreen.slice(0, operationScreen.length - 1)]
//             displayScreen.currentLight.textContent = 0
//             return
//         }
//         else {
//             firstOperand = [...firstOperand.slice(0, firstOperand.length - 1)]
//             operationScreen = [...operationScreen.slice(0, operationScreen.length - 1)]
//             displayScreen.currentLight.textContent = operationScreen.join('')
//         }
//     }
//     else if (isFirstSecondOperand === false && secondOperand.length === 0) {
//         let valueArray = operationScreen.join('').split(/\D/).filter(s => s != "")

//         if (valueArray.length > 1) {
//             firstOperand = [valueArray[valueArray.length - 2]]
//             secondOperand = [valueArray[valueArray.length - 1]]

//             total = operate(firstOperand.join(''), secondOperand.join(''), operator)
//             operationScreen = [...operationScreen.slice(0, operationScreen.length - 1)]
//             displayScreen.currentLight.textContent = operationScreen.join('')
//         }
//         if (valueArray.length === 1) {

//             total = ''
//             firstOperand = [...valueArray]
//             firstOperand = firstOperand.join('').split('')
//             operationScreen = [...operationScreen.slice(0, operationScreen.length - 1)]
//             displayScreen.currentLight.textContent = operationScreen.join('')
//             isFirstSecondOperand = true
            
//         }
//     }
//     else if (isFirstSecondOperand === false && secondOperand.length > 0) {
//         if (secondOperand.length === 1 && Number(secondOperand[0]) > 9) {
//             secondOperand = secondOperand.join('').split('')
//             secondOperand = [...secondOperand.slice(0, secondOperand.length - 1)]
//         } else {
//             secondOperand = [...secondOperand.slice(0, secondOperand.length - 1)]
//         }

//         total = operate(firstOperand.join(''), secondOperand.join(''), operator)
//         operationScreen = [...operationScreen.slice(0, operationScreen.length - 1)]
//         displayScreen.currentLight.textContent = operationScreen.join('')
//     }
//     else {
//         return
//     }


// }