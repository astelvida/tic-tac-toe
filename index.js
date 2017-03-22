class TicTacToe {
  constructor(x = 0, y = 0, size = 3) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.board = [];
  }

  movePlayer(direction) {
    
  }

  makeBoard() {
    for(var i = 0; i < 3; i++) {
      this.board[i] = [];
      for(var j = 0; j < 3; j++) {
        this.board[i][j] = 0;
      }
      console.log(this.board[i]);
    }
  }
}

var game = new TicTacToe;

game.makeBoard();

module.exports = TicTacToe;
