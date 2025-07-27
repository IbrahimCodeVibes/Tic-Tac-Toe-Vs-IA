const gameBoard = document.getElementById('game');
const statusText = document.getElementById('status');
const playerSpan = document.getElementById('player');

let currentPlayer = 'X'; // Humain
let board = Array(9).fill(null);
let gameOver = false;

function drawBoard() {
  gameBoard.innerHTML = '';
  board.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    if (cell) {
      div.textContent = cell;
      div.classList.add(cell);
    }
    div.addEventListener('click', () => handleClick(index));
    gameBoard.appendChild(div);
  });
}

function handleClick(index) {
  if (board[index] || gameOver || currentPlayer !== 'X') return;

  board[index] = 'X';
  drawBoard();

  if (checkWin('X')) {
    statusText.innerHTML = `🎉 Tu as gagné !`;
    gameOver = true;
    return;
  }

  if (isDraw()) {
    statusText.textContent = "Match nul ! 🤝";
    gameOver = true;
    return;
  }

  currentPlayer = 'O';
  playerSpan.textContent = 'O';
  playerSpan.style.color = '#e91e63';

  setTimeout(computerMove, 500); // petite pause avant que l’ordi joue
}

function computerMove() {
  if (gameOver) return;

  const available = board
    .map((cell, index) => cell === null ? index : null)
    .filter(index => index !== null);

  if (available.length === 0) return;

  const randomIndex = available[Math.floor(Math.random() * available.length)];
  board[randomIndex] = 'O';

  drawBoard();

  if (checkWin('O')) {
    statusText.innerHTML = `💻 L'ordinateur a gagné !`;
    gameOver = true;
    return;
  }

  if (isDraw()) {
    statusText.textContent = "Match nul ! 🤝";
    gameOver = true;
    return;
  }

  currentPlayer = 'X';
  playerSpan.textContent = 'X';
  playerSpan.style.color = '#007bff';
  statusText.innerHTML = `✨ Ton tour (<span id="player">X</span>)`;
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === player)
  );
}

function isDraw() {
  return board.every(cell => cell !== null);
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  playerSpan.textContent = currentPlayer;
  playerSpan.style.color = '#007bff';
  statusText.innerHTML = `✨ Ton tour (<span id="player">X</span>)`;
  drawBoard();
}

drawBoard();
