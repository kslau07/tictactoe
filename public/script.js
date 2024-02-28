"use strict";

// TODO: Do not allow player to move on occupied cell

const Cell = function () {
  let value = "F";
  const getValue = () => value;
  const setValue = (mark) => (value = mark);
  return { getValue, setValue };
};

const gameboard = (function () {
  const rows = 3;
  const cols = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const markCell = function (coord, player) {
    const targetCell = board[coord[0]][coord[1]];
    targetCell.setValue(player.marker);
  };

  const isCellUnoccupied = (coord) => {
    const targetCell = board[coord[0]][coord[1]];
    return targetCell.getValue() == "F" ? true : false;
  };

  const isTie = () => {
    // FIXME: We cannot return early from a forEach loop. The forEach method is
    // passed a callback function from us, this callback will be invoked n
    // times. In our callback function, we can use 3 parameters: item, index
    // and array. 

    board.forEach((row) => {
    row.forEach((cell) => {
        // if (cell.getValue() == "F") return console.log("false");
        // if (cell.getValue() == "F") return false;
        return false
      });
    });
    return true;
  };

  const isWin = (player) => {
    let threeInARow = "";
    Array.from({ length: 3 }, () => (threeInARow += player.marker));
    const winLines = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    let checkLine = "";

    for (const winAry of winLines) {
      for (const cellCoord of winAry) {
        const board = getBoard();
        const cellValue = board[cellCoord[0]][cellCoord[1]].getValue();
        checkLine += cellValue;
      }
      if (checkLine == threeInARow) return true;
      checkLine = "";
    }
  };

  return {
    getBoard,
    markCell,
    isCellUnoccupied,
    isTie,
    isWin,
  };
})();

const playerProto = {
  // Shared functionality goes in proto
};

function playerFactory(name, marker) {
  let player = Object.create(playerProto);
  player.name = name;
  player.marker = marker;
  return player;
}

const gameController = (function (gameboard) {
  const playerOne = playerFactory("Steve", "X");
  const playerTwo = playerFactory("Mary", "O");
  let currentPlayer;
  let gameStatus;
  const getCurrentPlayer = () => currentPlayer;
  const { getBoard, markCell, isCellUnoccupied, isTie, isWin } = gameboard;

  const switchPlayer = () =>
    (currentPlayer = getCurrentPlayer() == playerOne ? playerTwo : playerOne);

  const checkGameStatus = () => {
    if (isTie()) {
      gameStatus = "tie";
    } else if (isWin(currentPlayer)) {
      gameStatus = "win";
    }
  };

  const getGameStatus = () => gameStatus;

  const playRound = (clickedCoord) => {
    switchPlayer();
    markCell(clickedCoord, currentPlayer);
    checkGameStatus();
  };

  return {
    playRound,
    getBoard,
    getCurrentPlayer,
    isCellUnoccupied,
    getGameStatus,
  };
})(gameboard);

function displayController() {
  const game = gameController;
  const turnDiv = document.getElementById("turn");
  const boardDiv = document.getElementById("board");

  const updateScreen = () => {
    boardDiv.textContent = ""; // Clear the board
    const board = game.getBoard();
    const gameStatus = game.getGameStatus();
    if (gameStatus == "tie") {
      console.log("it's a tie!");
    }
    if (gameStatus == "win") {
      console.log("it's a win!");
    }
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellButton = document.createElement("button"); // Anything clickable should be a button
        cellButton.textContent = cell.getValue();
        cellButton.dataset.coord = `${rowIndex}${colIndex}`;
        cellButton.classList.add("cell");
        boardDiv.appendChild(cellButton);
      });
    });
  };

  function clickHandlerBoard(e) {
    const clickedCoordString = e.target.dataset.coord;
    if (!clickedCoordString) return;

    const coord = clickedCoordString.split("").map((char) => Number(char));
    if (game.isCellUnoccupied(coord)) {
      game.playRound(coord);
      updateScreen();
    } else {
      turnDiv.textContent = "This space is occupied!";
    }
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  updateScreen(); // Initial render
}

displayController();
