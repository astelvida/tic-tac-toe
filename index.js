
// process.stdin.resume();
// process.stdin.setEncoding('utf8');
// var util = require('util');
//
// process.stdin.on('data', function (text) {
//   console.log('received data:', util.inspect(text));
//   if (text === 'quit\n') {
//     done();
//   }
// });
//
// function done() {
//   console.log('Now that process.stdin is paused, there is nothing more to do.');
//   process.exit();
// }


const util = require('util');


class TicTacToe {
  constructor(board = [], round = 'X', moves = 0) {
    this.board = board;
    this.round = round;
    this.moves = moves;
  }


  checkGameEnd() {
    if(this.moves === 9) {
      return 'DONE';
    }
  }

  playTurn(player) {
    // check if game is done setWinner
    if(this.moves === 3) {
      return 'WINNER';
    }
    // intialize board
    if(!this.board.length) {
      this.makeBoard();
    }
    this.printBoard();
    process.stdout.write('*** \x1b[33m'+ player + '\x1b[0m' + " it's your turn!\n")
    process.stdout.write('*** Enter coordinates:');
    this.handleInput(player)
  }




  handleInput(player) {
    process.stdin.resume();
    return new Promise((res, rej) => {
      process.stdin.on('data', (buffer) => {
        const input = buffer.toString().replace(/\s/g, '');
        if(!input.length || input[0] >= 3 || input[1] >= 3
          || this.board[input[0]][input[1]] !== '?') {
          rej(input);
        } else {
          res(input);
        }
      });
    })
    .then((input) => {
      this.board[input[0]][input[1]] = player;
      this.moves++;
      const nextRound = player === 'X'? 'O': 'X';
      this.playTurn(nextRound);
    })
    .catch((err) => {
      process.stdout.write('*** Try again! Please enter valid coordinates: ');
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
    process.stdout.write('\n\n\x1b[36m********************************************\n\n')
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
game.playTurn('X');
module.exports = TicTacToe;
