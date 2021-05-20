// Membuat object {calculator} yang menampung property property
const calculator = {
    displayNumber: '0',
    operator: null, 
    firstNumber: null,
    waitingForSecondNumber: false
}

// Membuat function updateDisplay() yang menampung inputan dari user
function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

// Membuat function  clearCalculator() yang memberikan value default dari propery object
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

// Membuat function inputDigit()
function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

const buttons = document.querySelectorAll(".button");

for(let button of buttons) {
    button.addEventListener('click', function(event){
        // Mendapatkan objek element yang diklik
        const target = event.target;

        if(target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if(target.classList.contains('negative')) {
            inversNumber();
            updateDisplay();
            return;
        }

        if(target.classList.contains('equals')) { 
            performCalculation();
            updateDisplay();
            return;
        }

        if(target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    });
}

function inversNumber() {
    if(calculator.displayNumber === '0') {
        return;
    }

    calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
    if(!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // Mengatur ulang display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';

    } else {
        alert('Operator sudah ditetapkan');
    }
}

function performCalculation() {
    if(calculator.firstNumber == null || calculator.operator === null) {
        alert("Anda belum menetapkan operator");
    }

    let result = 0;
    if(calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }

    calculator.displayNumber = result;
}
