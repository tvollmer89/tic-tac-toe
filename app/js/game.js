var player;

function startGame(player) {
  this.player = player;
  console.log('Player has chosen to be ' + player);
}

// Represent a stat in the game, taking the (old) state to start the new
var State = function(old) {
  /* Public */
  // find out whose turn it is
  this.turn = "";
  // number of moves of the AI player
  this.oMovesCount = 0;
  // result of the game in this State
  this.result = "still running";
  // current board configuration
  this.board=[];

  // Begin object construction
  if(typeof old !== "undefined") {
    var len = old.board.length;
    this.board = new Array(len);
    for(var i=0; i<len; i++) {
      this.board[i] = old.board[i];
    }

    this.oMovesCount = old.oMovesCount;
    this.result = old.result;
    this.turn = old.turn;
  }
  /*End Object Construction*/

  // function to advance turn in the state
  this.advanceTurn = function() {
    this.turn = this.turn === 'x' ? 'o' : 'x';
  }

  // function to count the empty cells in state
  this.emptyCells = function() {
    var emptyCount = [];
    for(var i=0; i<9; i++) {
      if(this.board[i] === 'e') {
        emptyCount.push(i);
      }
    }
    return emptyCount;
  }

  /*function to check if game is over, and updates the state of result of the game*/
  this.isOver = function() {
    var b = this.board;

    // check rows
    for (var i=0; i<=6; i=i+3) {
      if(b[i] !== "e" && b[i] === b[i+1] && b[i+1] === b[i+2]) {
        this.result = b[i] + "-won";//update result state
        return true;
      }
    }

    // check columns
    for(var i=0; i<=2; i++) {
      if(b[i]!== "e" && b[i] === b[i+3] && b[i+3] === b[i+6]) {
        this.result = b[i] + "-won";
        this.result = true;
      }
    }

    // check diagonals
    for(var i=0, j=4; i<=2 ; i = i+2, j=j-2) {
      if(b[i] !== "e" && b[i] === b[i+j] && b[i+j] === b[i + (2*j)]) {
        this.result = b[i] + "-won";
        this.result = true;
      }
    }

    // check for a draw
    var available = this.emptyCells();
    if(available.length == 0) {
      // this game is a draw
      this.result = "draw";
      return true;
    } else {
      return false;
    }

  };

};