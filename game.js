var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var flag = true;
var level = 0;

function nextSequence(){

userClickedPattern = []

  level++;
  $('h1').text("Level " + level)

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(200).fadeIn(100);

  playSound(randomChosenColour);

}

$('.btn').click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour){
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $('.' + currentColour).removeClass('pressed');
  }, 100);
}

$(document).keypress(function(){
  if (flag){
    $("h1").text('Level ' + level);
    nextSequence();
    flag=false;
  }
});

function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }else{
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $('body').addClass("game-over");
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 2000);
    $('h1').text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver(){
  level = 0;
  gamePattern = [];
  flag = true;
}
