// TODO: Move hasWon() from gameboard to gameController

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

  const isValidCell = (coord) => {
    const targetCell = board[coord[0]][coord[1]];

    if (targetCell.getValue() == "F") {
      return true;
    } else {
      console.log("This spot has already been taken!");
      return false;
    }
  };

  const markCell = function (coord, player) {
    const targetCell = board[coord[0]][coord[1]];
    targetCell.setValue(player.marker);
  };

  const hasWon = (player) => {
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
        const cellValue = board[cellCoord[0]][cellCoord[1]].getValue();
        checkLine += cellValue;
      }
      if (checkLine == threeInARow) return true;
      checkLine = "";
    }
  };

  return { getBoard, isValidCell, markCell, hasWon };
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
  const getCurrentPlayer = () => currentPlayer;
  const { getBoard, isValidCell, markCell, hasWon } = gameboard;

  const switchPlayer = () =>
    (currentPlayer = getCurrentPlayer() == playerOne ? playerTwo : playerOne);

  const newGame = () => {
    switchPlayer();
    // TODO: We could prompt for each player's name here
    console.log(`New game started!`);
    printBoard();
  };

  const isValidInput = (input) => {
    const isNum = /^[1-9]$/.test(input);
    if (!isNum) return false;
    return true;
  };

  const convertInputToCoord = (input) => {
    const row = Math.floor((input - 1) / 3);
    const col = (input + 2) % 3;
    return [row, col];
    index = Number(input) - 1;
    // 1 should be [0][0]
    // 9 should be [2][2]

    // To obtain column #
    // 1 % 3 = 1
    // 2 % 3 = 2
    // 3 % 3 = 0
    // Add 2 and mod % to get column:
    // 1 -> (1+2) % 3 = 0
    // 2 -> (2+2) % 3 = 1
    // 3 -> (3+2) % 3 = 2
    // 4 -> (4+2) % 3 = 0
    //
    // To obtain row number:
    // 1 -> Math.floor( (1-1)/3 ) = 0
    // 2 -> Math.floor( (2-1)/3 ) = 0
    // 3 -> Math.floor( (3-1)/3 ) = 0
    // 4 -> Math.floor( (4-1)/3 ) = 1
    // 5 -> Math.floor( (5-1)/3 ) = 1
    // 6 -> Math.floor( (6-1)/3 ) = 1
    // 7 -> Math.floor( (7-1)/3 ) = 1
  };

  const playRound = () => {
    if (typeof currentPlayer == "undefined")
      return console.log("Please use .newGame() to begin a new game!");

    console.log(`It's ${currentPlayer.name}'s turn!`);

    let input;
    while (true) {
      input = prompt("Please choose a space between 1-9");
      if (!isValidInput(input)) continue;
      coord = convertInputToCoord(input);
      if (isValidCell(coord)) break;
    }

    markCell(coord, currentPlayer);
    printBoard();
    if (hasWon(currentPlayer)) {
      return `${currentPlayer.name} won!`;
    }
    switchPlayer();
  };

  return { newGame, playRound, getBoard, getCurrentPlayer };
})(gameboard);

function displayController() {
  const game = gameController;
  const turnDiv = document.getElementById("turn");
  const boardDiv = document.getElementById("board");

  const updateScreen = () => {
    boardDiv.textContent = ""; // Clear the board

    const board = game.getBoard;
    const currentPlayer = game.getCurrentPlayer();
    turnDiv.textContent = "screenController has changed this";
  };

  updateScreen(); // Initial render
}

displayController();
