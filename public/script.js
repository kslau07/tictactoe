// For single instances like Gameboard, wrap in an IIFE

function createPlayer(name) {
  const taunt = () => console.log(`${name} says, "I am going to win!"`);
  return { name, taunt };
}

const Cell = function () {
  const value = "o";
  return { value };
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

  return { getBoard };
})();

const game = (function () {
  const playerOne = createPlayer("Tom")
  const playerTwo = createPlayer("Jerry")
})();

const displayController = (function () {
  // 

})();


console.log(Gameboard.getBoard());
