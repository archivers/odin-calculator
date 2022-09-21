const divButtDiv = document.getElementById("divButt");
const multButtDiv = document.getElementById("multButt");
const subButtDiv = document.getElementById("subButt");
const addButtDiv = document.getElementById("addButt");
const clearButtDiv = document.getElementById("clearButt");
const numButtDiv = document.getElementsByClassName("numButt");
const periodButtDiv = document.getElementById("periodButt");
let periodFlag = 0;

divButtDiv.addEventListener('click', division);
multButtDiv.addEventListener('click', multiplication);
subButtDiv.addEventListener('click', subtraction);
addButtDiv.addEventListener('click', addition);
clearButtDiv.addEventListener('click', clearScreen);
for (const numButt of numButtDiv) {
  numButt.addEventListener('click', updateScreen);
}
periodButtDiv.addEventListener('click',addPeriod);

function division() {
  storeDisplayOperand();
  //alert(returnDisplayOperand());
  displayDivision();
}

function multiplication() {
  displayMultiplication();
}

function subtraction() {
  displaySubtraction();
}

function addition() {
  displayAddition();
}

function clearScreen() {
  const LCD = document.getElementById("sevenSegment");
  LCD.textContent = "0.";
  clearPeriod();
}

function updateScreen(e) {
  const LCD = document.getElementById("sevenSegment");

  if (LCD.textContent.length < 10) {
    if (LCD.textContent.endsWith(".") && periodFlag === 0) {
      if (LCD.textContent === "0.") {
        LCD.textContent = LCD.textContent.replace("0.",'');
      } else {
        LCD.textContent = LCD.textContent.replace(".",'');
      }
      LCD.textContent += e.currentTarget.textContent + ".";
    } else {
    LCD.textContent += e.currentTarget.textContent;
    }
  }
}

function addPeriod() {
  periodFlag = 1;
}

function clearPeriod() {
  periodFlag = 0;
}

let operand1 = 0;
let operand2 = 0;
let previousOperation = 0;

function storeDisplayOperand() {
  const LCD = document.getElementById("sevenSegment");
 
  operand1 = LCD.textContent;
}

function returnDisplayOperand() {
  return operand1;
}

function hideSmallIcons(){
  const smallIcons = document.getElementsByClassName("smallIcon");
  for (let icon of smallIcons) {
    icon.style.opacity = "0";
  }
}

function displayDivision() {
  hideSmallIcons();
  const divIcon = document.getElementById("smallDivision");
  divIcon.style.opacity = "1";
}

function displayMultiplication() {
  hideSmallIcons();
  const multIcon = document.getElementById("smallMultiplication");
  multIcon.style.opacity = "1";
}

function displaySubtraction() {
  hideSmallIcons();
  const subIcon = document.getElementById("smallSubtraction");
  subIcon.style.opacity = "1";
}

function displayAddition() {
  hideSmallIcons();
  const addIcon = document.getElementById("smallAddition");
  addIcon.style.opacity = "1";
}

/*functionCheckPreviousOp(operation) {
  if (previousOperation === 0) {
    previousOperation = operation;
  } else {
    //execute the operation on operand
    //store the result into previous operand
    //store new operation into previousOperation
  }
}*/
