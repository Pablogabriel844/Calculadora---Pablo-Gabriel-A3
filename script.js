const display = document.getElementById("display");
const historyList = document.getElementById("history");

let currentInput = "";
let operator = null;
let firstValue = null;

// Atualiza display
function updateDisplay(value) {
    display.textContent = value;
}

// Clique dos botões numéricos e operadores
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.dataset.value;

        if (value !== undefined) {
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
});

// Operações
document.querySelectorAll(".op").forEach(opBtn => {
    opBtn.addEventListener("click", () => {
        if (currentInput === "") return;

        firstValue = currentInput;
        operator = opBtn.dataset.value;
        currentInput = "";
    });
});

// Botão Clear
document.getElementById("clear").addEventListener("click", () => {
    currentInput = "";
    operator = null;
    firstValue = null;
    updateDisplay("0");
});

// Botão Equals
document.getElementById("equals").addEventListener("click", () => {
    if (!firstValue || !operator || currentInput === "") return;

    const a = parseFloat(firstValue);
    const b = parseFloat(currentInput);
    let result;

    switch (operator) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/": result = b !== 0 ? a / b : "Erro"; break;
    }

    const operationStr = `${a} ${operator} ${b} = ${result}`;
    addHistory(operationStr);

    updateDisplay(result);
    currentInput = String(result);
    operator = null;
    firstValue = null;
});

// Função para adicionar histórico
function addHistory(text) {
    const li = document.createElement("li");
    li.textContent = text;

    // Clique no histórico (bônus D3)
    li.addEventListener("click", () => {
        const last = text.split(" = ")[1];
        currentInput = last;
        updateDisplay(last);
    });

    historyList.prepend(li);
      }
