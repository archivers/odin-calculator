//periodFlag = 1 means period has been pressed recently
let periodFlag = 0;
//clearFlag = 1 means the clear button has been pressed recently
let clearFlag = 0;
//negFlag = 1 means negative
let negFlag = 0;
//stores the last pressed operation
let activeOperation = 0;
//stores whether or not a number has been pressed recently, 0 means no
let numpadActive = 0;
//1 means clear display upon a number being pressed (since an operation button has been pressed)
let clearDisplay = 0;

const divButtDiv = document.getElementById("divButt");
const multButtDiv = document.getElementById("multButt");
const subButtDiv = document.getElementById("subButt");
const addButtDiv = document.getElementById("addButt");
const clearButtDiv = document.getElementById("clearButt");
const numButtDiv = document.getElementsByClassName("numButt");
const periodButtDiv = document.getElementById("periodButt");
const negButtDiv = document.getElementById("negButt");


divButtDiv.addEventListener('click', division);
multButtDiv.addEventListener('click', multiplication);
subButtDiv.addEventListener('click', subtraction);
addButtDiv.addEventListener('click', addition);
clearButtDiv.addEventListener('click', clearScreen);
for (const numButt of numButtDiv) {
  numButt.addEventListener('click', updateScreen);
}
periodButtDiv.addEventListener('click',addPeriod);
negButtDiv.addEventListener('click',addNeg);

function storeActiveOperation(operation) {
  activeOperation = operation;
}

function getActiveOperation() {
  return activeOperation;
}

function setNumpadActive(flag) {
  numpadActive = flag;
}

function isNumpadActive() {
  return numpadActive;
}

function setClearDisplay (flag) {
  clearDisplay = flag;
}

function getClearDisplay() {
  return clearDisplay;
}

function division() {
  const LCD = document.getElementById("sevenSegment");
  //storeDisplayOperand();
  //alert(returnDisplayOperand());
  displayDivision();

  //if previous operation exists
  if (getActiveOperation() !== 0) {
    //if a number has been recently entered, complete the operation
    if(isNumpadActive() === 1) {
      operand = LCD.textContent;
      let tempString = eval(getDisplayOperand() + getActiveOperation() + operand)+"";
      LCD.textContent = tempString.substring(0,10);
    } else { 
    }
  }
  storeActiveOperation('/');
  storeDisplayOperand(LCD.textContent);
  setClearDisplay(1);
  setNumpadActive(0);

}

function multiplication() {
  const LCD = document.getElementById("sevenSegment");
  //storeDisplayOperand();
  //alert(returnDisplayOperand());
  displayMultiplication();

  //if previous operation exists
  if (getActiveOperation() !== 0) {
    //if a number has been recently entered, complete the operation
    if(isNumpadActive() === 1) {
      operand = LCD.textContent;
      let tempString = eval(getDisplayOperand() + getActiveOperation() + operand)+"";
      LCD.textContent = tempString.substring(0,10);
    } else { 
    }
  }
  storeActiveOperation('*');
  storeDisplayOperand(LCD.textContent);
  setClearDisplay(1);
  setNumpadActive(0);
}

function subtraction() {
  const LCD = document.getElementById("sevenSegment");
  //storeDisplayOperand();
  //alert(returnDisplayOperand());
  displaySubtraction();

  //if previous operation exists
  if (getActiveOperation() !== 0) {
    //if a number has been recently entered, complete the operation
    if(isNumpadActive() === 1) {
      operand = LCD.textContent;
      let tempString = eval(getDisplayOperand() + getActiveOperation() + operand)+"";
      LCD.textContent = tempString.substring(0,10);
    } else { 
    }
  }
  storeActiveOperation('-');
  storeDisplayOperand(LCD.textContent);
  setClearDisplay(1);
  setNumpadActive(0);
}

function addition() {
  const LCD = document.getElementById("sevenSegment");
  //storeDisplayOperand();
  //alert(returnDisplayOperand());
  displayAddition();

  //if previous operation exists
  if (getActiveOperation() !== 0) {
    //if a number has been recently entered, complete the operation
    if(isNumpadActive() === 1) {
      operand = LCD.textContent;
      let tempString = eval(getDisplayOperand() + getActiveOperation() + operand)+"";
      LCD.textContent = tempString.substring(0,10);
    } else { 
    }
  }
  storeActiveOperation('+');
  storeDisplayOperand(LCD.textContent);
  setClearDisplay(1);
  setNumpadActive(0);
}

function clearScreen() {
  const LCD = document.getElementById("sevenSegment");
  LCD.textContent = "0.";
  clearPeriod();
  setClearFlag();
  resetNeg();
  hideSmallIcons();
  hideSmallNeg();
  storeActiveOperation(0);
}

function updateScreen(e) {
  resetClearFlag();
  setNumpadActive(1);
  const LCD = document.getElementById("sevenSegment");
  
  if(getClearDisplay() === 1) {
    LCD.textContent = "0.";
    setClearDisplay(0);
  }

  if (LCD.textContent.length < 10) {
    if (LCD.textContent.endsWith(".") && periodFlag === 0) {
      //you have to take into account for -0. otherwise the when you press a number it will be -09, etc.
      if (LCD.textContent === "0." || LCD.textContent === "-0.") {
        LCD.textContent = LCD.textContent.replace("0.",'');
      } else {
        LCD.textContent = LCD.textContent.replace(".",'');
      }
      LCD.textContent += e.currentTarget.textContent + ".";
    } else {
    LCD.textContent += e.currentTarget.textContent;
    }
  /* this section is needed for when you have a negative number and the next number maxes out the display
     the calculator must remove the negative sign and active the small icon
  */
  } else if(LCD.textContent.includes('-')){
    //for numbers ending with a period
    if(LCD.textContent.endsWith('.')) {
      LCD.textContent = LCD.textContent.replace('-','').replace('.','') + e.currentTarget.textContent + '.';
    //for numbers that contain a decimal
    } else {
      LCD.textContent = LCD.textContent.replace('-','') + e.currentTarget.textContent;
    }
    
    displayNegative();
  }
}

function addPeriod() {
  periodFlag = 1;
}

function clearPeriod() {
  periodFlag = 0;
}

function resetClearFlag() {
  clearFlag = 0;
}

function setClearFlag() {
  clearFlag = 1;
}

function resetNeg() {
  negFlag = 0;
}

function setNeg() {
  negFlag = 1;
}

function toggleNeg() {
  if (negFlag === 0) {
    negFlag = 1;
  } else {
    negFlag = 0;
  }
}

function getNeg() {
  return negFlag;
}

let operand1 = 0;
let operand2 = 0;
let previousOperation = 0;

function storeDisplayOperand() {
  const LCD = document.getElementById("sevenSegment");
 
  operand1 = LCD.textContent;
}

function getDisplayOperand() {
  return operand1;
}

function hideSmallIcons(){
  const smallIcons = document.getElementsByClassName("smallIcon");
  for (let icon of smallIcons) {
    icon.style.opacity = "0";
  }
}

function hideSmallNeg() {
  const smallNeg = document.getElementById("smallNeg");
  smallNeg.style.opacity = "0";
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

function displayNegative() {
  const negIcon = document.getElementById("smallNeg");
  negIcon.style.opacity = "1";
}

function addNeg() {
  const LCD = document.getElementById("sevenSegment");
  if (clearFlag === 0) {
    toggleNeg();
    if (getNeg() === 1){
      if(LCD.textContent.length < 10) {
        LCD.textContent = LCD.textContent.replace(/^/,'-');
      } else {
        displayNegative();
      }
    } else {
      if(LCD.textContent.length < 11 && LCD.textContent.includes("-")) {
        LCD.textContent = LCD.textContent.replace('-','');
      } else {
        hideSmallNeg();     
      }
    }
  }
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
