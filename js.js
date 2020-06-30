let inputResult = document.querySelector(".display");
let containerButtons = document.querySelector(".containerButtons");
//let hintText = document.querySelector(".hintText");

let calculator = {
     displayValue: '0',
     firstValue: null,
     waitingForSecondOperand: false,
     operator: null
}


let inputDigit = (value) => {
     const {
          displayValue,
          waitingForSecondOperand
     } = calculator;
     if (waitingForSecondOperand === true) {
          calculator.displayValue = value;
          calculator.waitingForSecondOperand = false;
     } else {
          calculator.displayValue = displayValue === '0' ? value : displayValue + value;
     }
}

const performCalculation = {
     '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

     '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

     '+': (firstOperand, secondOperand) => +firstOperand + +secondOperand,

     '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

     '%': (firstOperand, secondOperand) => firstOperand / 100 * secondOperand,

     '=': (firstOperand, secondOperand) => secondOperand

};

function handleOperator(operatorValue) {
     const {
          firstValue,
          displayValue,
          operator
     } = calculator
     const inputValue = displayValue;
     calculator.waitingForSecondOperand = true;
     calculator.operator = operatorValue;

     if (firstValue === null) {
          calculator.firstValue = inputValue;
     } else if (operator) {
          const currentValue = firstValue || 0;
          const result = performCalculation[operator](currentValue, inputValue);
          calculator.displayValue = result;
          calculator.firstValue = result;
          inputResult.innerHTML = calculator.displayValue;
     }
}

function resetCalculator() {
     calculator.displayValue = '0';
     calculator.firstValue = null;
     calculator.waitingForSecondOperand = false;
     calculator.operator = null;
     inputResult.innerHTML = calculator.displayValue;
}

let valueButton = e => {
     const {
          target
     } = event;

     if (!target.matches('button')) {
          return;
     }

     if (target.classList.contains('operator')) {
          handleOperator(target.value);
          return;
     }

     if (target.classList.contains('C') || target.classList.contains('CE')) {
          resetCalculator(target.value);
          return;
     }

     inputDigit(e.target.value);
     inputResult.innerHTML = `
     ${calculator.firstValue === null ? "" : calculator.firstValue} 
     ${calculator.operator === null ? " " : calculator.operator} 
     ${calculator.displayValue}`;
     // hintText.innerHTML = `${calculator.displayValue}`;
}


containerButtons.addEventListener("click", valueButton);