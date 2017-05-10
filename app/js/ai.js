/*construct possible moves for AI player, takes cell position as param, and take that action
*/
var AIAction = function(pos) {
  /*public*/
  this.movePosition = pos;
  this.minimaxVal = 0;

  /*applies the action to a state to get the next state
  accepts current State as param
  returns next State*/
  this.applyTo = function(state) {
    var next = new State(state);
    next.board[this.movePosition] = state.turn;

    if(state.turn === "o") {
      next.oMovesCount++;
    }

    next.advanceTurn();
    return next;
  }
};

/*Public static method that defines a rule for soring AIAction in ascending manner
*param firstAction: the first action in a pairwise sort
*param secondAction: the second action in pairwise sort
*return: number(-1, 0, 1)*/
AIAction.ASCENDING = function(firstAction, secondAction) {
  if(firstAction.minimaxVal < secondAction.minimaxVal) {
    return -1;
  } else if (firstAction.minimaxVal > secondAction.minimaxVal) {
    return 1;
  } else {
    return 0;
  }
}

/*public method that defins a rule for sorting AIAction in descending manner
*param firstAction
*param secondAction
*return:number(-1, 0, 1)*/
AIAction.DESCENDING = function(firstAction, secondAction) {
  if(firstAction.minimaxVal > secondAction.minimaxVal) {
    return -1;
  } else if (firstAction.minimaxVal < secondAction.minimaxVal) {
    return 1;
  } else {
    return 0;
  }
}

/*Construct the AI player takes the chosen skill level as a parameter*/
var AI = function(level) {

  /*Private*/
  var levelOfIntelligence = level;
  var game = {};

  /*recursive function that compute the minimax value of a game state
  *param: state - the state to calculate its minimax value
  *returns: number - minimax value of the state
  */
  function minimaxValue(state) {
    if(state.isOver()) {
      return Game.score(state);
    } else {
      var stateScore; //stores the minimax value
      if (state.turn === "x") {
        stateScore = -1000;
      } else {
        stateScore = 1000;
      }
      var availablePositions = state.emptyCells();
      var availableNextStates = availablePositions.map(function(pos) {
        var action = new AIAction(pos);
        var nextState = action.applyTo(state);
        return nextState;
      });

      /*Calculate minimax value for all available next states and evaluate the current state's value*/
      availableNextStates.forEach(function(nextState){
        var nextScore = minimaxValue(nextState);
        if(state.turn === "x") {
          stateScore = nextScore;
          if(nextScore > stateScore) {
            stateScore = nextScore;
          }
        } else {
          if(nextScore < stateScore) {
            stateScore = nextScore;
          }
        }
      });

      return stateScore;
    }
  }

  // tell ai to make an easy move
  function takeABlindMove(turn) {
    var available = game.currentState.emptyCells();
    var randomCell = available[Math.floor(Math.random()*available.length)];
    var action = new AIAction(randomCell);
    var next = action.applyTo(game.currentState);
    ui.instertAt(randomCell, turn);
    game.advanceTo(next);
  }

  // tell ai to make a novice move
  function takeANoviceMove(turn) {
    var available = game.currentState.emptyCells();
    var availableActions = available.map(function(pos) {
      var action = new AIAction(pos);
      var next = action.applyTo(game.currentState);
      action.minimaxVal = minimaxValue(next);
      return action;
    });

    //sort the enumerated actions by score
    if(turn === "x") {
      availableActions.sort(AIAction.DESCENDING);
    } else {
      availableActions.sort(AIAction.ASCENDING);
    }

    //Take the optimal action 40% of the time, and the 1st suboptimal action 60% of the time
    var chosenAction;
    if(Math.random()*100 <=40) {
      chosenAction = availableActions[0];
    } else {
      if(availableActions.length >= 2) {
        chosenAction = availableActions[1];
      } else {
        chosenAction = availableActions[0];
      }
    }
    var next = chosenAction.applyTo(game.currentState);

    //add chosen action to the boarc
    ui.instertAt(chosenAction.movePosition, turn);

    //take the game to the next state
    game.advanceTo(next);
  }

  /*Public*/
  // specify what level the ai will play
  this.plays = function(_game) {
    game = _game;
  }

  // tell ai to make a master move - best minimax decision
  function takeAMasterMove(turn) {
    var available = game.currentState.emptyCells();
    var availableActions = available.map(function(pos) {
      var action = new AIAction(pos);
      var next = action.applyTo(game.currentState);
      action.minimaxVal = minimaxValue(next);
      return action;
    });

    //sort the enumerated actions by score
    if(turn === "x") {
      availableActions.sort(AIAction.DESCENDING);
    } else {
      availableActions.sort(AIAction.ASCENDING);
    }

    //take the frist action
    var chosenAction = availableActions[0];
    var next = chosenAction.applyTo(game.currentState);

    //add chosen action to the boarc
    ui.instertAt(chosenAction.movePosition, turn);

    //take the game to the next state
    game.advanceTo(next);
  }

  /*Public*/
  // specify what level the ai will play
  this.plays = function(_game) {
    game = _game;
  };

  //tell ai player to move
  this.notify = function(turn) {
    switch(levelOfIntelligence) {
      case "blind": takeABlindMove(turn); break;
      case "novice": takeANoviceMove(turn); break;
      case "master": takeAMasterMove(turn); break;
    }
  };
};
