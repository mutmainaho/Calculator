const screen = document.querySelector('.screen')

let runningTotal = 0;
let buffer = 0;
let previousOperator;
var clear = true

// helper functions
function appendValue(value){
    buffer = buffer * 10 + parseInt(value)
}

function deleteValue(){
    if (buffer > 9){
        buffer -= buffer % 10
        buffer /= 10
    }
    else{
        buffer = 0
    }
}

function clearValue(){
    buffer = 0
    runningTotal = 0
    previousOperator = null
    clear = true
    equal_ = false
}
//

function handleDigit(value){
    if (clear){
      appendValue(value)
    }
    else{
        runningTotal = buffer
        buffer = parseInt(value)
        clear = true
    }
}

function doOperation(){
    if (runningTotal){
      if (previousOperator === '+'){
          runningTotal += buffer
      }
      else if (previousOperator === '-'){
          runningTotal -= buffer
      }
      else if (previousOperator === '×'){
          runningTotal *= buffer
      }
      else{
          runningTotal /= buffer
      }
      buffer = runningTotal
      runningTotal = 0
    }
    
}

function handleSymbol(value){
    switch(value){
        case 'C':
            clearValue()
            break;
        case "←":
            deleteValue()
            break;
        case "=":
            if (!previousOperator){
                return
            }
            doOperation()
            previousOperator = null
            clear = false
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
            if (!previousOperator){
                previousOperator = value
                clear = false
                return
            }
            doOperation()
            previousOperator = value
            clear = false
            break;

        
    }
}

function buttonClick(value){
    if (isNaN(parseInt(value))){
        handleSymbol(value)
    }
    else{
        handleDigit(value)
    }
    render()
}
function render(){
    screen.innerText = buffer
}

function init() {
    document.querySelector(".calc-buttons").addEventListener("click", function(event) {
      buttonClick(event.target.innerText);
    });
  }
  
init();
