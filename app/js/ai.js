/*Construct the AI player takes the chosen skill level as a parameter*/
var AI = function(level) {

  /*Private*/
  var levelOfIntelligence = level;
  var game = {};

  /*recursive function that compute the minimax value of a game state*/
  function minimaxValue(state) {

  }

  // tell ai to make an easy move
  function takeABlindMove(turn) {

  }

  // tell ai to make a novice move
  function takeANoviceMove(turn) {

  }

  // tell ai to make a master move
  function takeAMasterMove(turn) {

  }

  /*Public*/
  // specify what level the ai will play
  this.plays = function(_game) {
    game = _game;
  };

  //tell ai player to move
  this.notify = function(turn) {
    switch(levelOfIntelligence) {
      case "blind":
        takeABlindMove(turn);
        break;
      case "novice":
        takeANoviceMove(turn);
        break;
      case "master":
        takeAMasterMove(turn);
        break;
    }
  };

  // Pick up on "The AI Actions"

};
