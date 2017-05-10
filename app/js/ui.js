// UI object to contain all ui methods and attributes
var ui = {};
ui.initialControlsVisible = true;
ui.robotFlickeringHandle = 0;
ui.currentView = "";

// Robot image functions - delete if possible
ui.startRobotFlickering = function() {
  ui.robotFlickeringHandle = setInterval(function() {
    $("#robot").toggleClass('robot');
  }, 500);
};

ui.stopRobotFlickering = function() {
  clearInterval(ui.robotFlickeringHandle);
};

// Switch View depending on whose turn it is
ui.switchViewTo = function(turn) {
  function _switch(_turn) {
    ui.currentView = "#" + _turn;
    $(ui.currentView).fadeIn("fast");
    if(_turn === "ai")
            ui.startRobotFlickering();
  }

  if(ui.initialControlsVisible) {
    ui.initialControlsVisible = false;
    $('.initial').fadeOut({
      duration: "slow",
      done: function() {
        _switch(turn);
      }
    });
  } else {
    $(ui.currentView).fadeOut({
      duration: "fast",
      done: function() {
        _switch(turn);
      }
    });
  }
};

// Place and X or in the specified place in the board
ui.insertAt = function(indx, symbol) {
  var board = $('.cell');
  var targetCell = $(board[indx]);
  if(!targetCell.hasClass('occupied')) {
    targetCell.html(symbol);
    targetCell.css({
      color: symbol == "x" ? "green" : "red"
    });
    targetCell.addClass('occupied');
  }
}