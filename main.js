const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart');
let currentPlayer = 'X';
let gameActive = true;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(e) {
    const cell = e.target;
    if (cell.textContent || !gameActive) return;
    cell.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const cellsArray = Array.from(cells);
    const currentPlayerCells = cellsArray
        .map((cell, index) => (cell.textContent === currentPlayer ? index : null))
        .filter(index => index !== null);
    
    const winner = winningConditions.some(condition =>
        condition.every(index => currentPlayerCells.includes(index))
    );

    if (winner) {
        alert(`${currentPlayer} wins!`);
        gameActive = false;
    } else if ([...cells].every(cell => cell.textContent)) {
        alert("It's a draw!");
        gameActive = false;
    }
}

function restartGame() {
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    gameActive = true;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);