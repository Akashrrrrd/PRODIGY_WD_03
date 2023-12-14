let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let isAgainstComputer = false;

document.getElementById('board').addEventListener('click', handleCellClick);
updateMessage();

function handleCellClick(event) {
    const cellIndex = event.target.dataset.index;

    if (board[cellIndex] === '' && gameActive) {
        board[cellIndex] = currentPlayer;
        event.target.innerText = currentPlayer;

        if (checkWin()) {
            endGame(`${currentPlayer} wins!`);
        } else if (board.every(cell => cell !== '')) {
            endGame('It\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (isAgainstComputer && currentPlayer === 'O') {
                playComputerMove();
            }
            updateMessage();
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === currentPlayer)
    );
}

function endGame(message) {
    gameActive = false;
    document.getElementById('message').innerText = message;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerText = '';
    });

    updateMessage();

    if (isAgainstComputer && currentPlayer === 'O') {
        playComputerMove();
    }
}

function updateMessage() {
    const messageElement = document.getElementById('message');
    if (gameActive) {
        messageElement.innerText = `Player ${currentPlayer}'s turn`;
    } else {
        messageElement.innerText = 'Game Over';
    }
}

function toggleComputer() {
    isAgainstComputer = document.getElementById('computerCheckbox').checked;
    resetGame();
}

function playComputerMove() {
    const emptyCells = board.reduce((acc, cell, index) => {
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerMove = emptyCells[randomIndex];
        setTimeout(() => {
            board[computerMove] = currentPlayer;
            document.querySelector(`.cell[data-index="${computerMove}"]`).innerText = currentPlayer;
            if (checkWin()) {
                endGame('Computer wins!');
            } else if (board.every(cell => cell !== '')) {
                endGame('It\'s a draw!');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateMessage();
            }
        }, 500); 
    }
}
