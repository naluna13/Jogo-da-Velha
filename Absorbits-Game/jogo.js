const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]")
const winningMessageTextElement = document.querySelector(
    "[data-winning-message-text]");

const restartButton = document.querySelector(".winning-message-button");

const winningMessage = document.querySelector("[data-winning-message]");

let isCircleTurn

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function animaFeliz(){
    var contagem = ['girlone.png','girlthree.png','girltwo.png','girlone.png'];
        var indice = contagem.length - 1;
        function regressiva(){
            if(indice < 0) {
            return false;
            }
            document.getElementById("contador").src = contagem[indice];
            indice = indice - 1;
        }
        setInterval(regressiva, 200);
}

function animaTriste(){
    var contagem = ['girl6.png','girl5.png','girl4.png'];
        var indice = contagem.length - 1;
        function regressiva(){
            if(indice < 0) {
            return false;
            }
            document.getElementById("contador").src = contagem[indice];
            indice = indice - 1;
        }
        setInterval(regressiva, 200);
}

const startGame = () => { 
    isCircleTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    }

    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = 'Empate!'
    }
    else {
        winningMessageTextElement.innerText = isCircleTurn
        if (winningMessageTextElement.innerText = isCircleTurn){
            winningMessageTextElement.innerText = "Absorbits Venceu!"
            animaFeliz();
        }
        else{
            winningMessageTextElement.innerText = "O Sangue Venceu!"
            animaTriste()  
        }
    }
    winningMessage.classList.add("show-winning-message");
};

const handleRestartClick = []

const checkforDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle")
    })
}
const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn) {
        board.classList.add("circle");
        
    } else {
        board.classList.add("x");
    }
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn
    setBoardHoverClass();
};

const handleClick = (e) => {
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    const isWin = checkForWin(classToAdd);

    const isDraw = checkforDraw();
    if (isWin) {
        endGame(false);
    }
    else if (isDraw) {
        endGame(true);
    }
    else {
        swapTurns();
    };
}
startGame();

restartButton.addEventListener("click", startGame);