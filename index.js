let buttons = document.querySelectorAll('button')
let displayText = document.querySelector('#displayText')
let displayOperation = document.querySelector('#displayOperation')

let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']
let symbols = ['+', '-', '/', 'x', 'RESET', 'DEL', '=']
let arrayOfNumbers = []
let arrayOfSymbols = []
let mainDisplay = ''
let secondaryDisplay = ''
let isDisplayEmpty = true
let updatedMainString = ''
let updatedSecondaryString = ''
let isResultCalled = false

function resetCalculator () {
  arrayOfNumbers = []
  arrayOfSymbols = []
  mainDisplay = ''
  secondaryDisplay = ''
  isDisplayEmpty = true
  updatedMainString = ''
  updatedSecondaryString = ''
  displayText.textContent = '0'
  displayOperation.textContent = ''
  isResultCalled = false
}

function updateMainDisplayText (input) {
  mainDisplay += input
  if (mainDisplay !== '0') {
    displayText.textContent = mainDisplay
  }
}

function updateSecScreenText (input) {
  secondaryDisplay += input
  displayOperation.textContent = secondaryDisplay
}

function computeNumbersAndSymbols (symbol) {
  isResultCalled = false
  arrayOfNumbers.push(displayText.textContent)
  arrayOfSymbols.push(symbol)
  if (displayText.textContent !== '0') {
    displayText.textContent = '0'
    mainDisplay = ''
  }
  if (symbols.includes(secondaryDisplay.substr(-1)) === false && isDisplayEmpty === false) {
    updateSecScreenText(symbol)
  }
}

function numbersValidation (button) {
  if (isResultCalled) {
    resetCalculator()
  } else if (isDisplayEmpty === true && button === '0') {
    return
  } else if (mainDisplay.indexOf('.') >= 0 && mainDisplay.substr(-1) === '0' && button === '0') {
    return
  } else if (mainDisplay.indexOf('.') >= 0 && button === '.') {
    return
  }
  isDisplayEmpty = false
  updateMainDisplayText(button)
  updateSecScreenText(button)
}

function processEqualButton () {
  isResultCalled = true
  if (symbols.includes(displayOperation.textContent.substr(-1)) === true) {
    displayOperation.textContent = secondaryDisplay.slice(0, secondaryDisplay.length - 1)
  }
  if (displayText.textContent === '0') {
    displayText.textContent = '0'
  }
  secondaryDisplay = (eval(displayOperation.textContent.replace('x', '*'))).toString()
  if (secondaryDisplay === '0') {
    displayText.textContent = '0'
  }
  arrayOfNumbers = []
  arrayOfNumbers.push(secondaryDisplay.toString())
  arrayOfSymbols = []
  mainDisplay = ''
  updateMainDisplayText(secondaryDisplay.toString())
}

function processDelButton () {
  if (isResultCalled) {
    resetCalculator()
  }
  if (mainDisplay !== '0') {
    if (symbols.includes(secondaryDisplay.substr(-1))) {
      updatedMainString = arrayOfNumbers[arrayOfNumbers.length - 1]
      arrayOfSymbols.pop()
    } else {
      updatedMainString = mainDisplay.slice(0, mainDisplay.length - 1)
      mainDisplay = ''
    }
    updatedSecondaryString = secondaryDisplay.slice(0, secondaryDisplay.length - 1)
    secondaryDisplay = ''
    updateSecScreenText(updatedSecondaryString)
    if (updatedMainString.length === 0) {
      displayText.textContent = '0'
      arrayOfNumbers.pop()
    } else {
      updateMainDisplayText(updatedMainString)
    }
  }
}

function symbolsValidation (arg) {
  const input = arg.toString()
  switch (input) {
    case '+':
      computeNumbersAndSymbols('+')
      break
    case '-':
      computeNumbersAndSymbols('-')
      break
    case '/':
      computeNumbersAndSymbols('/')
      break
    case 'x':
      computeNumbersAndSymbols('x')
      break
    case '=':
      processEqualButton()
      break
    case 'DEL':
      processDelButton()
      break
    case 'RESET':
      resetCalculator()
      break
  }
}

function btnClicked (arg) {
  const button = arg.toString()
  if (numbers.includes(button)) {
    numbersValidation(button)
  } else if (symbols.includes(arg)) {
    symbolsValidation(arg)
  }
}

document.addEventListener('keydown', function (eventObj) {
  let key = eventObj.key
  if (key === 'Enter') {
    key = '='
  } else if (key === 'Backspace') {
    key = 'DEL'
  } else if (key === '*') {
    key = 'x'
  } else if (key === 'Delete') {
    key = 'RESET'
  }
  btnClicked(key)
})

for (let btn of buttons) {
  btn.onclick = function () {
    btnClicked(btn.textContent)
  }
}