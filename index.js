class TicTacToe {
  constructor(board = [], round = 'X', moves = 0) {
    this.board = board;
    this.round = round;
    this.moves = moves;
  }

  checkGameEnd(player, row, col) {
    if(this.moves === 9) {
      this.printBoard();
      console.log("\n\x1b[44m\x1b[33mIT'S A DRAW !\x1b[0m\n");
      process.exit();
    }

    var rowWin = this.board[row].every((mark) => mark === player);
    var colWin = this.board.every((line) => line[col] === player);
    var diagWin = (this.board[0][0] === player && this.board[1][1] === player
                  && this.board[2][2] === player) ||
                  (this.board[0][2] === player && this.board[1][1] === player
                  && this.board[2][0] === player);

    if(rowWin || colWin || diagWin) {
      this.printBoard();
      console.log("\n\x1b[44m\x1b[33mPLAYER " + player + " WON!\x1b[0m\n");
      process.exit();
    }
  }

  playTurn(player) {
    // intialize board
    if(!this.board.length) {
      this.makeBoard();
    }
    this.printBoard();

    // setTurn
    process.stdout.write('\x1b[33m'+ player + "\x1b[0m you're up!\n")
    process.stdout.write('Enter coordinates:');
    this.handleInput(player);
    this.moves++;
  }


  handleInput(player) {
    return new Promise((res, rej) => {
      process.stdin.on('data', (buffer) => {
        const input = buffer.toString().replace(/\s/g, '');
        if(input.length == 2 && input[0] < 3 && input[1] < 3
          && this.board[input[0]][input[1]] === '?') {
          res(input);
        } else {
          rej(input);
        }
      });
    })
    .then((input) => {
      this.board[input[0]][input[1]] = player;
      const nextRound = player === 'X'? 'O': 'X';
      this.checkGameEnd(player, input[0], input[1]);
      this.playTurn(nextRound);
    })
    .catch((err) => {
      process.stdout.write('\n\x1b[31mOops! The coordinates you entered are not valid.\x1b[0m\nEnter coordinates:');
      this.handleInput(player);
    })
  }


  makeBoard() {
    for(var i = 0; i < 3; i++) {
      this.board[i] = [];
      for(var j = 0; j < 3; j++) {
        this.board[i][j] = '?';
      }
    }
  }


  printBoard() {
    process.stdout.write('\n\n\x1b[43m\x1b[30mNEXT ROUND...\x1b[0m\n\n')
    process.stdout.write('\x1b[33m    0   1   2\n')
    process.stdout.write('\x1b[0m   --- --- ---\n')
    for(var i = 0; i < 3; i++) {
      process.stdout.write('\x1b[33m'+(i)+'\x1b[0m'+ " | ")
      for(var j = 0; j < 3; j++) {
        process.stdout.write(this.board[i][j] + " | ");
      }
      process.stdout.write("\n   --- --- --- \n\n")
    }
  }
}

var game = new TicTacToe;
game.playTurn('X');
module.exports = TicTacToe;
