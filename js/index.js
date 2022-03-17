const MAX_NUM_DISPLAY = 12;

let calcDisplay = document.querySelector('.calculator-display')
calcDisplay.textContent = '0';

let calcDisplayOverall = document.querySelector('.calculator-overall-display');

console.log(calcDisplayOverall)

let buttons = document.querySelectorAll('.calculator-buttons button');
addButtonEventListeners(buttons);

// flags
let pressedDot = false;
let pressedOperator = false;

// 0 by default
let num1 = 0, num2 = 0;
let operator = '';

function addButtonEventListeners(buttons){
    buttons.forEach(button => {     
        // number pad listener
        if(button.className == 'number-btn'){
            button.addEventListener('click', () => {
                if(calcDisplay.textContent === '0' || pressedOperator) {
                    calcDisplay.textContent = button.textContent;
                    pressedOperator = false;
                }else 
                    calcDisplay.textContent += button.textContent;
            }); 
        }       

        // dot
        if(button.id === 'dot'){
            button.addEventListener('click', () => {
                if(!pressedDot){
                    calcDisplay.textContent += button.textContent;        

                    pressedDot = true;
                }
            });
        }

        // operator listeners
        if(button.className === 'operator'){
            button.addEventListener('click', () => {
                if(!pressedOperator){
                    // store num1
                    num1 = Number(calcDisplay.textContent);
    
                    // toggle flag
                    pressedOperator = true;
                }

                operator = button.textContent;

                // update overall display
                calcDisplayOverall.textContent = `${num1} ${operator}`;
            });
        }

        if(button.id === 'equals'){
            button.addEventListener('click', equals);
        }

        if(button.id === 'clear'){
            button.addEventListener('click', clear);
        }
    });
}

function clear(){
    //reset all flags
    pressedDot = false;
    pressedOperator = false;

    //reset all vars
    num1 = 0;
    num2 = 0;
    operator = '';

    // reset display
    calcDisplay.textContent = '0';
}

function equals(){
    // store num2
    num2 = Number(calcDisplay.textContent);

    //update overall display
    calcDisplayOverall.textContent = `${calcDisplayOverall.textContent} ${num2} =`;

    // calculate and append to display 
    let result = operate(operator, num1, num2);
    console.log(result);

    calcDisplay.textContent = result;

    // store to num1;
    num1 = result;

    // reset flags
    pressedDot = false;
    pressedOperator = false;
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

