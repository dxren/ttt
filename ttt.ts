import { createInterface } from "node:readline/promises";

type Move = "x" | "o" | " ";
type Row = [Move, Move, Move];
type Board = [Row, Row, Row];

async function TTTGame() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const board: Board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  const row: Row = [" ", " ", " "];

  function printBoard() {
    for (let i = 0; i <= 2; i++) {
      console.log(board[i].join("|"));
    }
  }

  type MoveOutcome = "X" | "O" | "Null" | "Tie";

  //mark spot with current player
  function winState(): MoveOutcome {
    //check win state
    // Check rows
    if (
      board[0][0] === board[0][1] &&
      board[0][1] === board[0][2] &&
      board[0][0] !== " "
    ) {
      return board[0][0] === "x" ? "X" : "O";
    }
    if (
      board[1][0] === board[1][1] &&
      board[1][1] === board[1][2] &&
      board[1][0] !== " "
    ) {
      return board[1][0] === "x" ? "X" : "O";
    }
    if (
      board[2][0] === board[2][1] &&
      board[2][1] === board[2][2] &&
      board[2][0] !== " "
    ) {
      return board[2][0] === "x" ? "X" : "O";
    }
    // Check columns
    if (
      board[0][0] === board[1][0] &&
      board[1][0] === board[2][0] &&
      board[0][0] !== " "
    ) {
      return board[0][0] === "x" ? "X" : "O";
    }
    if (
      board[0][1] === board[1][1] &&
      board[1][1] === board[2][1] &&
      board[0][1] !== " "
    ) {
      return board[0][1] === "x" ? "X" : "O";
    }
    if (
      board[0][2] === board[1][2] &&
      board[1][2] === board[2][2] &&
      board[0][2] !== " "
    ) {
      return board[0][2] === "x" ? "X" : "O";
    }
    // Check diagonals
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== " "
    ) {
      return board[0][0] === "x" ? "X" : "O";
    }
    if (
      board[2][0] === board[1][1] &&
      board[1][1] === board[0][2] &&
      board[2][0] !== " "
    ) {
      return board[2][0] === "x" ? "X" : "O";
    }
    for (let row of board) {
      for (let cell of row) {
        if (cell === " ") {
          return "Null";
        }
      }
    }
    return "Tie";
  }

  let currentPlayer: Move = "x";
  console.log("welcome to tic tac toe");
  console.log("how to play: enter row and column numbers between 0 and 2");

  while (winState() == "Null") {
    printBoard();
    console.log(`current player is: ${currentPlayer}`);
    const answerRow = await rl.question(
      "what row do you want to place your player in?"
    );
    const columnRow = await rl.question(
      "what column do you want to place your player in?"
    );
    const rowIdx = parseInt(answerRow);
    const columnIdx = parseInt(columnRow);
    if (board[rowIdx][columnIdx] !== " ") {
      console.log("Invalid move, please try again");
      continue;
    }
    board[rowIdx][columnIdx] = currentPlayer;

    //swap player
    if (currentPlayer == "x") {
      currentPlayer = "o";
    } else {
      currentPlayer = "x";
    }
    //repeat
  }
  printBoard();
  switch (winState()) {
    case "X":
      console.log("X is the winner");
      break;
    case "O":
      console.log("O is the winner");
      break;
    case "Tie":
      console.log("The game is a tie");
      break;
  }
}

await TTTGame();
