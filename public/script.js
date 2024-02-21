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
  const flatBoard = board.flat();
  const isValidCell = (index) => {
    const targetCell = flatBoard[index];

    if (targetCell.getValue() == "F") {
      return true;
    } else {
      console.log("This spot has already been taken!");
      return false;
    }
  };
  const markCell = function (index, player) {
    const targetCell = flatBoard[index];
    targetCell.setValue(player.marker);
  };
  return { getBoard, isValidCell, markCell };
})();

const displayController = (function (gb) {
  const board = gb.getBoard();

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue()),
    );
    console.log(boardWithCellValues);
  };

  return { printBoard };
})(gameboard);

const playerProto = {
  taunt() {
    console.log(`${this.name} says, "Haha, I am going to win!"`);
  },
};
function playerFactory(name, marker) {
  // Note that Object.create / factory functions are considered outdated
  let player = Object.create(playerProto);
  player.name = name;
  player.marker = marker;
  return player;
}

const gameController = (function (gameboard, displayController) {
  const playerOne = playerFactory("Steve", "X");
  const playerTwo = playerFactory("Mary", "O");
  const { printBoard } = displayController;
  const { isValidCell, markCell } = gameboard;
  let currentPlayer;
  const getCurrentPlayer = () => currentPlayer;

  const switchPlayer = () =>
    (currentPlayer = getCurrentPlayer() == playerOne ? playerTwo : playerOne);

  const newGame = () => {
    switchPlayer();
    // TODO: We could prompt for each player's name here
    console.log(`New game started!`);
  };

  const isValidInput = (input) => {
    const isnum = /^[1-9]$/.test(input);
    if (!isnum) return false;

    return true;
  };

  const playRound = () => {
    if (typeof currentPlayer == "undefined")
      return console.log("Please use .newGame() to begin a new game!");

    console.log(`It's ${currentPlayer.name}'s turn!`);
    printBoard();

    let input;
    while (true) {
      input = prompt("Please choose a space between 1-9");
      if (!isValidInput(input)) continue;
      index = Number(input) - 1;
      if (isValidCell(index)) break;
    }

    markCell(index, currentPlayer);
    switchPlayer();
  };

  return { newGame, playRound };
})(gameboard, displayController);
