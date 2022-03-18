const MAX_NUM_DISPLAY = 12;

let calcDisplay = document.querySelector('.calculator-display')
calcDisplay.textContent = '0';

let calcDisplayOverall = document.querySelector('.calculator-overall-display');

let buttons = document.querySelectorAll('button');
addButtonEventListeners(buttons);
addKeyBoardPressListeners();

// flags
let pressedDot = false;
let pressedEqual = false;
let pressedOperator = false;
let pressedNum2 = false;

// 0 by default
let num1 = 0, num2 = 0;
let operator = '';

function addButtonEventListeners(buttons){
    buttons.forEach(button => {     
        // number pad listener
        if(button.className == 'number-btn'){
            button.addEventListener('click', enterNumber); 
        }       

        // entering dot
        if(button.id === 'dot'){
            button.addEventListener('click', enterDot);
        }

        // operator listeners
        if(button.className === 'operator'){
            button.addEventListener('click', enterOperator);
        }

        if(button.id === 'toggle'){
            button.addEventListener('click', negate);
        }

        // converting number to percent
        if(button.id === 'percent'){
            button.addEventListener('click', convertPercent);
        }

        if(button.id === 'equals'){
            button.addEventListener('click', equals);
        }

        if(button.id === 'clear'){
            button.addEventListener('click', clear);
        }

        if(button.id === 'delete'){
            button.addEventListener('click', deleteNum);
        }
    });
}

function addKeyBoardPressListeners(){
    window.addEventListener('keyup', event => {
        if(event.key === '='){
            if(pressedNum2)
                equals();
        }

        if(event.key === 'Backspace'){
            deleteNum();
        }

    });
}

function enterOperator(event){
    let button = event.target;
        if(!pressedOperator){
            if(pressedNum2){
                // toggle flag
                pressedNum2 = false;

                // calculate result
                equals();
            }

            // store num1
            num1 = Number(calcDisplay.textContent);

            // toggle flag
            pressedOperator = true;
        }

        operator = button.textContent;

        // update overall display
        calcDisplayOverall.textContent = `${num1} ${operator}`;
}

function enterDot(){
    if(!pressedDot){
        calcDisplay.textContent += button.textContent;        

        pressedDot = true;
    }
}

function enterNumber(event){
    let button = event.target;

    if(calcDisplay.textContent === '0' || pressedOperator 
        || pressedEqual) {
        if(num1 != 0){
            pressedNum2 = true;
        }

        calcDisplay.textContent = button.textContent;

        // reset flags
        pressedOperator = false;
        pressedEqual = false;
    }else 
        calcDisplay.textContent += button.textContent;
}

function clear(){
    //reset all flags
    pressedDot = false;
    pressedOperator = false;
    pressedEqual = false;

    //reset all vars
    num1 = 0;
    num2 = 0;
    operator = '';

    // reset display
    calcDisplay.textContent = '0';
    calcDisplayOverall.textContent = '';
}

function equals(){    
    if(operator === '') return;

    pressedEqual = true;

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

    operator = '';

    // reset flags
    pressedDot = false;
    pressedOperator = false;
    pressedNum2 = false;
    
}

// op will represent the symbol of the operation
function operate(op, num1, num2){
    console.log(`Operate(${op}, ${num1}, ${num2})`);
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
    if(num2 == 0) return 'BOOM';
    return num1/num2;
}

function negate(){
    calcDisplay.textContent = Number(calcDisplay.textContent) * -1;
}

function convertPercent(){
    num1 = Number(calcDisplay.textContent) /100;    
    calcDisplay.textContent = num1;
}

function deleteNum() {
    if(calcDisplay.textContent == '0') return;

    let newNum = calcDisplay.textContent.substring(0, calcDisplay.textContent.length - 1);
    calcDisplay.textContent = newNum;
}
