var playerChoice;

// Prompt for player choice
// $(window).load(function() {
//   $('#choiceModal').modal('show');
//   playerChoice = "";
// });

// Set player choice
$('#player-x').on('click', function () {
  $('#choiceModal').modal('hide');
  playerChoice = 'x';
  startGame(playerChoice);
});

$('#player-o').on('click', function () {
  $('#choiceModal').modal('hide');
  playerChoice = 'o';
  startGame(playerChoice);
});

