class Calculator {
   constructor(previosDataText, currentDataText) {
    this.previosDataText = previosDataText;
    this.currentDataText = currentDataText;
    this.clear();
  }
  clear() {
    this.currentData = " ";
    this.previosData = " ";
    this.operation = undefined;
  }
  delete() {
    this.currentData = this.currentData.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentData.includes(".")) return;
    this.currentData = this.currentData.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentData === "") return;
    if (this.previosData !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previosData = this.currentData;
    this.currentData = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previosData);
    const current = parseFloat(this.currentData);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentData = computation;
    this.operation = undefined;
    this.previosData = "";
  }
  getdisplayNumber(number) {
    const stringnumber = number.toString();
    const integernumber = parseFloat(stringnumber.split(".")[0]);
    const decimalnumber = stringnumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integernumber)) {
      integerDisplay = " ";
    } else {
      integerDisplay = integernumber.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalnumber != null) {
      return `${integerDisplay}.${decimalnumber}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {
    this.currentDataText.innerText = this.getdisplayNumber(this.currentData);
    if (this.operation != null) {
      this.previosDataText.innerText = `${this.getdisplayNumber(
        this.previosData
      )} ${this.operation}`;
    } else {
      this.previosDataText.innerText = "";
    }
  }
}

const previosDataText = document.querySelector("[previous-data-operand]");
const currentDataText = document.querySelector("[current-data-operand]");
const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const clearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const EqualsData = document.querySelector("[data-equals]");

const calculator = new Calculator(previosDataText, currentDataText);

numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
EqualsData.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});
clearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
document.addEventListener("keydown", function (event) {
  let patterForNumber = /[0-9]/g;
  let patternForOperators = /[+\-*\/]/g;
  if (event.key.match(patterForNumber)) {
    event.preventDefault();
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  }
  if (event.key === ".") {
    event.preventDefault();
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  }
  if (event.key.match(patternForOperators)) {
    event.preventDefault();
    calculator.chooseOperation(event.key);
    calculator.updateDisplay();
  }
  if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    calculator.compute();
    calculator.updateDisplay();
  }
  if (event.key === "Backspace") {
    event.preventDefault();
    calculator.delete();
    calculator.updateDisplay();
  }
  if (event.key === "delete") {
    event.preventDefault();
    calculator.clear();
    calculator.updateDisplay();
  }
});
