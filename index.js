const util = require('util');

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
    process.stdout.write('\n'+ this.round + " it's your turn!\n\n");
    return this.round;
  }

  movePlayer() {
    const x = process.argv[2];
    const y = process.argv[3];
    this.board[x][y] = this.getRound();
    this.printBoard();
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
    process.stdout.write('\x1b[33m    0   1   2\n')
    process.stdout.write('\x1b[0m   --- --- ---\n')
    for(var i = 0; i < 3; i++) {
      process.stdout.write('\x1b[33m'+(i)+'\x1b[0m'+ " | ")
      for(var j = 0; j < 3; j++) {
        process.stdout.write(this.board[i][j] + " | ");
      }
      process.stdout.write("\n   --- --- ---")
      process.stdout.write("\n")
    }
  }
}

var game = new TicTacToe;
game.startGame();
game.movePlayer();

module.exports = TicTacToe;
