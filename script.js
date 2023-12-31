const buttons = document.querySelectorAll('.buttons');
const inputArea = document.querySelector('.first');
const outputArea = document.querySelector('.second');

// Function to add Event-Listners to keyboard and calculator buttons
function addEvents() {
    for (let index = 0; index < buttons.length; index++) {
        buttons[index].addEventListener('click', clickHandler);
    }
    window.addEventListener('keypress', keyPressHandler);
}

// Button click event handler
function clickHandler(event) {
    inputHandler(event.target.textContent);
}

// Keypress event handler
function keyPressHandler(event) {
    const allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '+', '-', '*', '/', '%', '='];
    if (allowedKeys.includes(event.key)) {
        inputHandler(event.key);
    }
}

// Calculator Input Handler
function inputHandler(input) {
    outputArea.classList.remove('make-big');
    inputArea.classList.remove('make-small')
    let text = inputArea.value;
    if (input != 'AC' && input != '+/-' && input != 'X' && input != '=') {
        const valid = checkInput(input);
        if (valid) {
            if (valid === true) {
                inputArea.value += input;
                outputArea.textContent = evaluate(inputArea.value);
            } else if (valid !== true) {
                text = text.slice(0, text.length - 1) + valid;
                inputArea.value = text;
                outputArea.textContent = evaluate(text);
            }
        }
    } else if (input === 'AC') {
        inputArea.value = '';
        outputArea.textContent = '';
    } else if (input === 'X') {
        inputArea.value = text.slice(0, text.length - 1);
        outputArea.textContent = evaluate(inputArea.value);
    } else if (input === '=') {
        outputArea.textContent = evaluate(text);
        outputArea.classList.add('make-big');
        inputArea.classList.add('make-small')
    } else if (input === '+/-') {
        let text = inputArea.value;
        if (text[text.length - 1] === ')') {
            text = text.slice(0, text.length - 1)
            for (let i = text.length; i >= 0; i--) {
                if (text[i] === '(') {
                    let lastNumber = (text.slice(i)).slice(2);
                    text = (text.slice(0, text.length - lastNumber.length - 2).concat(lastNumber))
                    break
                }
            }
            inputArea.value = text;
            outputArea.textContent = evaluate(inputArea.value);
        } else {
            const chars = ['+', '-', '*', '/'];
            const maxIndex = [];
            for (let i = 0; i < chars.length; i++) {
                maxIndex.push(text.lastIndexOf(chars[i]))
            }
            const max = Math.max(...maxIndex);
            if (max === -1) {
                inputArea.value = "(-" + text + ")";
                outputArea.textContent = evaluate(inputArea.value);
            } else {
                let brokenText = [text.slice(0, max + 1), text.slice(max + 1, text.length)]
                const newText = brokenText[0] + '(-' + brokenText[1] + ')';
                inputArea.value = newText;
                outputArea.textContent = evaluate(inputArea.value);
            }
        }
    }
}

// Function to check for invalid inputs.
function checkInput(input) {
    let text = inputArea.value;
    let lastChar = Array.from(text)[Array.from(text).length - 1];
    return checkCharacter(lastChar, input);
}

function checkCharacter(lastChar, input) {
    const chars = ['+', '-', '*', '/', '.', '%'];
    if (chars.includes(lastChar)) {
        if (chars.includes(input)) {
            if (lastChar != input && lastChar != '.') {
                if (input === '.') return true;
                return input;
            }
            return false;
        }
    }
    return true;
}

// Function to evaluate expression.
function evaluate(text) {
    try {
        let operationString = text;
        let result = eval(operationString);
        return result;
    } catch (e) {
        return "Error"
        console.log(e);
    }
}


addEvents();
