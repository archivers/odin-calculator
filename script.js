const divButtDiv = document.getElementById("divButt");

divButtDiv.addEventListener('click', division);

function division() {
  storeDisplayOperand();
  alert(returnDisplayOperand());
}

let operand1 = 0;

function storeDisplayOperand() {
  const LCD = document.getElementById("sevenSegment");
  
  operand1 = LCD.textContent;
}

function returnDisplayOperand() {
  return operand1;
}

function displayDivision() {
  
}