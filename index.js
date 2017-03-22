class TicTacToe {
  constructor(board = [], round = 'x') {
    this.board = board;
    this.round = round;
  }

  startGame() {
    this.makeBoard();
    this.getRound();
    this.printBoard();
  }

  setRound() {
    this.round === 'x'? 'o': 'x';
  }

  getRound() {
    console.log(this.round + " it's your turn!");
    return this.round;
  }

  movePlayer(x, y) {
    this.board[x][y] = this.getRound();
    this.setRound();
  }

  makeBoard() {
    for(var i = 0; i < 3; i++) {
      this.board[i] = [];
      for(var j = 0; j < 3; j++) {
        this.board[i][j] = 0;
      }
    }
  }

  printBoard() {
    process.stdout.write(" --- --- ---\n")
    for(var i = 0; i < 3; i++) {
      process.stdout.write("| ")
      for(var j = 0; j < 3; j++) {
        process.stdout.write(this.board[i][j] + " | ");
      }
      process.stdout.write("\n --- --- ---")
      process.stdout.write("\n")
    }
  }
}

var game = new TicTacToe;

game.startGame();

module.exports = TicTacToe;
