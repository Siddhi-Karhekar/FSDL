let currentInput = '';

function appendNumber(num) {
    if (currentInput === '0' && num !== '.') currentInput = '';
    currentInput += num;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '') return;
    currentInput += ' ' + op + ' ';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    updateDisplay('0');
}

function deleteLast() {
    currentInput = currentInput.trim().slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        // Using eval safely for this assignment level
        const result = eval(currentInput.replace('×', '*').replace('÷', '/'));
        document.getElementById('previous-val').innerText = currentInput;
        currentInput = result.toString();
        updateDisplay();
    } catch (e) {
        updateDisplay('Error');
        currentInput = '';
    }
}

function updateDisplay(val) {
    document.getElementById('display').innerText = val || currentInput || '0';
}