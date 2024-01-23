// script.js
const board = document.getElementById("game-board");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart-button");

const initialBoard = [['', '', ''], ['', '', ''], ['', '', '']];
let currentPlayer = 'X';

function createCell(row, col) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.addEventListener("click", handleCellClick);
    return cell;
}

function updateBoard() {
    board.innerHTML = "";
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = createCell(row, col);
            cell.innerText = initialBoard[row][col];
            board.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (initialBoard[row][col] === '' && !message.textContent) {
        initialBoard[row][col] = currentPlayer;
        event.target.innerText = currentPlayer;

        const result = evaluar_estado(initialBoard);
        if (result === 10) {
            message.textContent = "¡Ganaste!";
        } else if (result === -10) {
            message.textContent = "Gana la computadora";
        } else if (!initialBoard.flat().includes('')) {
            message.textContent = "Empate";
        } else {
            currentPlayer = 'O'; // Cambiamos el turno al jugador antes de la computadora
            document.getElementById('turn-indicator').textContent = "Turno de la Computadora (O)";
            setTimeout(computerTurn, 500); // Espera medio segundo y permite el turno de la computadora
        }
    }
}

function evaluar_estado(board) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            if (board[i][0] === 'X') return 10;
            if (board[i][0] === 'O') return -10;
        }
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            if (board[0][i] === 'X') return 10;
            if (board[0][i] === 'O') return -10;
        }
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        if (board[0][0] === 'X') return 10;
        if (board[0][0] === 'O') return -10;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        if (board[0][2] === 'X') return 10;
        if (board[0][2] === 'O') return -10;
    }
    return 0;
}

function computerTurn() {
    if (!message.textContent && currentPlayer === 'O') {
        const emptyCells = [];
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (initialBoard[row][col] === '') {
                    emptyCells.push({ row, col });
                }
            }
        }

        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const { row, col } = emptyCells[randomIndex];
            initialBoard[row][col] = 'O';
            updateBoard();
            const result = evaluar_estado(initialBoard);
            if (result === -10) {
                message.textContent = "Gana la computadora";
            } else if (!initialBoard.flat().includes('')) {
                message.textContent = "Empate";
            } else {
                currentPlayer = 'X'; // Cambiamos el turno al jugador después de la computadora
                document.getElementById('turn-indicator').textContent = "Turno del Jugador (X)";
            }
        }
    }
}

function restartGame() {
    initialBoard.forEach((row, rowIndex) => row.fill(''));
    currentPlayer = 'X';
    message.textContent = '';
    updateBoard();
}

updateBoard();
restartButton.addEventListener("click", restartGame);