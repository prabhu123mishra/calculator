let displayValue = ''; 
let num1 = ''; 
let num2 = ''; 
let operator = ''; 
let history = []; // Array to store calculation history

function appendToDisplay(value) {
    if (value === '=' && num1 !== '' && num2 !== '') {
        calculate();
        return;
    }  
    if (value === 'C') {
        clearDisplay();
        return;
    }
    
    if (value === '.') {
        if (!operator) {  
            if (!num1.includes('.')) {
                num1 += '.';
                displayValue += value;
            }
        } else {   
            if (!num2.includes('.')) {   
                num2 += '.';
                displayValue += value;
            }
        }
    } else {
        displayValue += value;
        document.getElementById('display').value = displayValue;
        if (!isNaN(value)) {
            if (!operator) {
                num1 += value; 
            } else {
                num2 += value; 
            }
        } else {
            if (value !== '.' && !operator) {
                operator = value;
            }
        }
    }
}

function calculate() {
    let result;
    switch (operator) {
        case '+':
            result = parseFloat(num1) + parseFloat(num2);
            break;
        case '-':
            result = parseFloat(num1) - parseFloat(num2);
            break;
        case '*':
            result = parseFloat(num1) * parseFloat(num2);
            break;
        case '/':
            result = parseFloat(num1) / parseFloat(num2);
            break;
    }
    document.getElementById('display').value = result;
    num1 = result.toString();
    num2 = '';
    operator = '';
    updateHistory(displayValue, result); // Update history after calculation
    displayHistory(); // Update history display
}

function clearDisplay() {
    displayValue = ''; 
    num1 = ''; 
    num2 = ''; 
    operator = ''; 
    document.getElementById('display').value = displayValue;
}

function removeLastEntry() {
    displayValue = displayValue.slice(0, -1);
    document.getElementById('display').value = displayValue;

    if (num2 !== '' && operator !== '') {
        num2 = num2.slice(0, -1);
    } else if (operator !== '') {
        operator = '';
    } else if (num1 !== '') {
        num1 = num1.slice(0, -1);
    }
}

function updateHistory(expression, result) {
    history.push({ expression: expression, result: result });
}

function displayHistory() {
    let historyList = document.getElementById('history-list');
    historyList.innerHTML = ''; // Clear previous history
    history.forEach(entry => {
        let listItem = document.createElement('li');
        listItem.textContent = `${entry.expression} = ${entry.result}`;
        historyList.appendChild(listItem);
    });
}

window.onload = displayHistory;

function clearHistory() {
    history = []; 
    displayHistory(); 
}