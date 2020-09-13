buttonColors = ["red", "blue", "green", "yellow"];

gamePattern = [];

userClickedPattern = [];

var started = false;
var level = 0;

$(document).on("keydown", function(){
  if(started === false) {
    started = true;
    $("#level-title").text("Level 0");
    nextSequence();
  }
})

function nextSequence() {
  var randomNumber = Math.floor(Math.random()*3)+1;
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  var selectedButton = $("#" + randomChosenColour);
  selectedButton.fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);
}

$(".btn").on("click", function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if(currentLevel === (gamePattern.length-1)) {
      setTimeout(
        function() {
          nextSequence();
          userClickedPattern = [];
        }, 1000);
      }
  } else {
    console.log("wrong");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }, 200);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
