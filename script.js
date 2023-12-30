const buttons = document.querySelectorAll('.buttons');
const inputArea = document.querySelector('.first');
const outputArea = document.querySelector('.second');




function addEvents() {
    for (let index = 0; index < buttons.length; index++) {
        buttons[index].addEventListener('click', clickHandler);
    }
}

function checkCharacter(lastChar, input) {
    const chars = ['+', '-', '*', '/', '.', '%'];
    if (chars.includes(lastChar)) {
        if (chars.includes(input)) {
            if (lastChar != input) {
                if (input === '.') return true;
                return input;
            }
            return false;
        }
    }
    return true;
}

function checkInput(input) {
    let text = inputArea.value;
    let lastChar = Array.from(text)[Array.from(text).length - 1];
    return checkCharacter(lastChar, input);
}

function evaluate(text) {
    try {
        let operationString = text;
        let result = eval(operationString);
        return result;
    } catch (e) {
        outputArea.textContent = text;
    }

}

function clickHandler(event) {
    const clickedButton = event.target.textContent;
    let text = inputArea.value;
    if (clickedButton != 'AC' && clickedButton != '+/-' && clickedButton != 'X' && clickedButton != '=') {
        const valid = checkInput(event.target.textContent);
        if (valid) {
            if (valid === true) {
                inputArea.value += event.target.textContent;
                outputArea.textContent = evaluate(inputArea.textContent);

            } else if (valid !== true) {
                text = text.slice(0, text.length - 1) + valid;
                inputArea.value = text;
                outputArea.textContent = evaluate(text);
            }
        }
    } else if (clickedButton === 'AC') {
        inputArea.value = '';
        outputArea.textContent = '';

    } else if (clickedButton === 'X') {
        inputArea.value = text.slice(0, text.length - 1);
        outputArea.textContent = evaluate(inputArea.textContent);
    } else if (clickedButton === '=') {
        outputArea.textContent = evaluate(text);
    }



}


addEvents();