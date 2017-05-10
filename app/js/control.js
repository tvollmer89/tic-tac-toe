// Object to contain all items accessible to all control functions
var globals = {};

/*Choosing difficulty level*/
$(".level").each(function() {
  var $this = $(this);
  $this.click(function() {
    $('.selected').toggleClass('not-selected');
    $('.selected').toggleClass('selected');
    $this.toggleClass('not-selected');
    $this.toggleClass('selected');

    ai.level = $this.attr("id");
  });
});


// Start game on click and update game status to running
$(".start").click(function() {
  var selectedDiffeculty = $('.selected').attr("id");
  if (typeof selectedDiffeculty !== "undefined") {
    var aiPlayer = new AI(selectedDiffeculty);
    globals.game = new Game(aiPlayer);
    aiPlayer.plays(globals.game);
    globals.game.start();
  }
});


// control events when cells are clicked
$(".cell").each(function() {
  var $this = $(this);
  $this.click(function() {
    if (globals.game.status === "running" && globals.game.currentState.turn === "X" && !$this.hasClass('occupied')) {
      var indx = parseInt($this.data("indx"));
      var next = new State(globals.game.currentState);
      next.board[indx] = "X";
      ui.insertAt(indx, "X");
      next.advanceTurn();
      globals.game.advanceTo(next);

    }
  })
});
