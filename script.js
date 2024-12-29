const board = document.querySelector('.game-board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const clearScoresButton = document.getElementById('clear-scores');
const message = document.getElementById('message');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const playAgainButton = document.getElementById('play-again');
const scoreXDisplay = document.getElementById('score-x');
const scoreODisplay = document.getElementById('score-o');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle a cell click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        endGame(`${currentPlayer} wins! 🎉`);
        if (currentPlayer === 'X') scoreX++;
        else scoreO++;
        updateScores();
        return;
    }

    if (gameState.every(cell => cell)) {
        endGame("It's a draw!");
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

// Check if there's a winner
function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

// End the game
function endGame(result) {
    gameActive = false;
    resultMessage.textContent = result;
    resultScreen.classList.add('active');
}

// Reset the game
function resetGame() {
    gameState.fill(null);
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = `Player X's turn`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
    resultScreen.classList.remove('active');
}

// Update scores
function updateScores() {
    scoreXDisplay.textContent = scoreX;
    scoreODisplay.textContent = scoreO;
}

// Clear scores
function clearScores() {
    scoreX = 0;
    scoreO = 0;
    updateScores();
}

// Attach event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});
resetButton.addEventListener('click', resetGame);
clearScoresButton.addEventListener('click', clearScores);
playAgainButton.addEventListener('click', resetGame);
