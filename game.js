
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


//we need a way to keep track of weather if the game has started or not.
var started = false;

// create a new variable called level and start a level 0.
var level = 0;

//use Jquery to detect when a keyboard key has been pressed,when that happens for first time , call nextSequence().
$(document).keypress(function () {
    if (!started) {

        //we are changing title name to level as soon as game start
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;//we gave start to true so this function will not run again
    }
});


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    // Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern,if so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        //if the user got the most recent answer right in step 3 , then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {


        playsound("wrong");

        //in style .css there is game-over class we are applying it for specific time
        $("body").addClass("game-over");
        //change the h1 title to say "Game Over", Press any key to restart
        $("#level-title").text("Game Over, Press Any Key to Restart Game");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        

        //restart the game
        startOver();
    }
}


function nextSequence() {
    //once this function is triggred reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
    //as soon as this function calls level will increase to 1
    level++;

    //inside this function we will update the h1 with this change in the value of level
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
}

//playing audio on click
function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
//we are giving animation on click
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//REstart the Game
function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}