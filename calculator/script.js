class Calculator {
  constructor(currentOperandText, previousOperandText) {
    this.currentOperandText = currentOperandText;
    this.previousOperandText = previousOperandText;
    this.clear();
    this.equals = false;
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
    this.equals = false;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  addMinus() {
    if (!isNaN(parseFloat(this.currentOperand))) {
      this.currentOperand = (parseFloat(this.currentOperand) * -1).toString();
    }
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === " ") return;
    if (this.previousOperand !== " " && this.previousOperand !== " ") {
      this.compute();
    }
    if (operation === "√") {
      this.extractSqr();
      return;
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = " ";
  }

  pressEquals() {
    this.equals = true;
    this.compute();
  }

  extractSqr() {
    if (this.currentOperand < 0) {
      alert("Cannot extract the square root from a negative number");
    } else {
      this.currentOperand = Math.sqrt(this.currentOperand);
      this.updateDisplay();
    }
  }

  compute() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand) || " ";
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        result = prev * 10000 + current * 10000;
        this.currentOperand = result / 10000;
        this.operation = undefined;
        this.previousOperand = " ";
        break;
      case "-":
        result = prev * 10000 - current * 10000;
        this.currentOperand = result / 10000;
        this.operation = undefined;
        this.previousOperand = " ";
        break;
      case "*":
        result = prev * current;
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = " ";
        break;
      case "÷":
        if (current === 0) {
          result = "Cannot divide by zero";
        } else {
          result = prev / current;
          this.currentOperand = result;
          this.operation = undefined;
          this.previousOperand = " ";
        }
        break;
      case "√":
        if (prev < 0) {
          result = "Cannot extract the square root from a negative number.";
        } else {
          result = Math.sqrt(prev);
          this.updateDisplay();
          this.currentOperand = result;
          this.operation = undefined;
          this.previousOperand = " ";
        }
        break;
      case "xy":
        if (prev < 0 && current < 1) {
          result = "For negative number exponent >= 1";
        } else {
          result = Math.pow(prev, current);
          this.currentOperand = result;
          this.operation = undefined;
          this.previousOperand = " ";
        }
        break;
      default:
        return;
    }
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandText.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandText.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandText.innerText = "";
    }
    if (this.equals) {
      this.clear();
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const deleteButton = document.querySelector("[data-delete]");
const clearAllButton = document.querySelector("[data-all-clear]");
const equals = document.querySelector("[data-equals]");
const previousOperandText = document.querySelector("[data-previous-operand ]");
const currentOperandText = document.querySelector("[data-current-operand ]");
const allButons = document.querySelectorAll("button");
const sqrButton = document.querySelector("[data-operation-sqr]");
const addMinusButton = document.querySelector("[data-add-minus]");

const calculator = new Calculator(currentOperandText, previousOperandText);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equals.addEventListener("click", () => {
  calculator.pressEquals();
  calculator.updateDisplay();
});

clearAllButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

addMinusButton.addEventListener("click", () => {
  calculator.addMinus();
});

document.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "Digit0":
      calculator.appendNumber(event.key);
      calculator.updateDisplay();
      break;
    case "Digit1":
      calculator.appendNumber(event.key);
      calculator.updateDisplay();
      break;
    case "Digit2":
      calculator.appendNumber(event.key);
      calculator.updateDisplay();
      break;
    case "Digit3":
      calculator.appendNumber(event.key);
      calculator.updateDisplay();
      break;
    case "Digit4":
      calculator.appendNumber(event.key);
      calculator.updateDisplay();
      break;
    case "Digit5":
      calculator.appendNumber(event.key);
      calculator.updateDisplay();
      break;
    case "Digit6":
      calculator.appendNumber(event.key);
      calculator.updateDisplay();
      break;
    case "Digit7":
      calculator.appendNumber(event.key);
      calculator.updateDisplay();
      break;
    case "Digit8":
      calculator.appendNumber(event.key);
      calculator.updateDisplay();
      break;
    case "Digit9":
      calculator.appendNumber(event.key);
      calculator.updateDisplay();
      break;
    case `${"Equal" && "ShiftRight"}`:
      calculator.chooseOperation("+");
      calculator.updateDisplay();
      break;
    case `${"Digit8" && "ShiftRight"}`:
      calculator.chooseOperation("*");
      calculator.updateDisplay();
      break;
    case "Minus":
      calculator.chooseOperation("-");
      calculator.updateDisplay();
      break;
    case "Slash":
      calculator.chooseOperation("÷");
      calculator.updateDisplay();
      break;
    case "Period":
      calculator.appendNumber(".");
      calculator.updateDisplay();
      break;
    case "Enter":
      calculator.compute();
      calculator.updateDisplay();
      break;
    case "Backspace":
      calculator.delete();
      calculator.updateDisplay();
      break;
    default:
      return;
  }
});
