const MAX_NUM_DISPLAY = 12;

let calcDisplay = document.querySelector('.calculator-display')
calcDisplay.textContent = '0';

let buttons = document.querySelectorAll('.calculator-buttons button');
addButtonEventListeners(buttons);

// flags
let pressedDot = false;
let pressedOperator = false;

// 0 by default
let num1 = 0, num2 = 0;

function addButtonEventListeners(buttons){
    buttons.forEach(button => {     
        // number pad listener
        if(button.className == 'number-btn'){
            button.addEventListener('click', () => {
                if(calcDisplay.textContent === '0') 
                    calcDisplay.textContent = button.textContent;
                else 
                    calcDisplay.textContent += button.textContent;
            }); 
        }       

        // operator listeners
        if(button.className === 'operator'){
            button.addEventListener('click', () => {
                // store num1
                num1 = Number(calcDisplay.textContent);
                
                // toggle flag
                pressedOperator = true;
            });
        }

        // clear
        if(button.id === 'clear'){
            button.addEventListener('click', () => {
                //reset all flags
                pressedDot = false;
                pressedOperator = false;

                // reset display
                calcDisplay.textContent = '0';
            });
        }
    });
}

// op will represent the symbol of the operation
function operate(op, num1, num2){
    switch(op){
        case '+':
            return add(num1, num2);

        case '-':
            return subtract(num1, num2);

        case '*':
            return multiply(num1, num2);

        case '/':
            return divide(num1, num2);
    }
}

function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    if(num2 == 0) return 'IDIOT';
    return num1/num2;
}

