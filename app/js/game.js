/**

  TODO:
  - startGame function to set player choice
  - remove temporary player choice
  -
 */

/**
 *  Function to set player token (either X or O)
 *  @param  {string} p player's choice
 *  @return {void}   starts the game
 */
function startGame(c) {
  if (id === 'x') {
    game.user = '<span class="fa fa-times"></span>';
    game.computer = '<span class="fa fa-circle-o"></span>';
  } else if (id === 'o') {
    game.user = '<span class="fa fa-circle-o"></span>';
    game.computer = '<span class="fa fa-times"></span>';
  }
  firstMove();
  //setPlayer('user');
}

var game = {
  user: '',
  computer: '',
  currentPlayer: '',
  moves: 1,
};