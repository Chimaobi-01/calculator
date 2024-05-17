console.log('hello world');

createButtons()

function createButtons() {
    const textContents = [
        ['C', '+/-', '%', '/'],
        [7, 8, 9, 'X'],
        [4, 5, 6, '-'],
        [1, 2, 3, '+'],
        [0, ',', '<', '=']
    ]
    const buttons = document.querySelector('.buttons')
    const row = 5
    const column = 4
    for (let i = 0; i < row; i++) {
        const buttonRow = document.createElement('div')
        for (let j = 0; j < column; j++) {
            const button = document.createElement('button')
            button.textContent = textContents[i][j]
            buttonRow.appendChild(button)
        }
        buttons.appendChild(buttonRow)
    }

}
