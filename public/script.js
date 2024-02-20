// Current domain objects:
// Cell,
// gameboard,
// displayController,
// playerFactory,
// gameController

const Cell = function () {
  const value = "o";
  const getValue = () => value;
  return { getValue };
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
  const markCell = function () {
    console.log("Now check if space is available on board / in cell");
  };
  return { getBoard, markCell };
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
function playerFactory(name) {
  // Note that Object.create / factory functions are considered outdated
  let player = Object.create(playerProto);
  player.name = name;
  return player;
}

const gameController = (function (gameboard, displayController) {
  const playerOne = playerFactory("Steve");
  const playerTwo = playerFactory("Mary");
  const { printBoard } = displayController;
  const { markCell } = gameboard;

  const newGame = () => {
    console.log(`Begin new game, it's ${playerOne.name}'s turn!`);
    printBoard();
  };

  const playRound = () => {
    const answer = prompt("Please enter a space # 0-9");
    markCell()
  };
  return { newGame, playRound };
})(gameboard, displayController);
