const color = ["green", "red", "yellow", "blue"];
var randomPattern = [];
var userPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        started = true;
        level = 0;
        nextsequence();
    }
});

function nextsequence(){
    level++;
    $("#level-title").text("level " + level);

    userPattern = [];

    const randomNumber = Math.floor(Math.random()*4);
    const randomColor = color[randomNumber];

    randomPattern.push(randomColor);

    $("#" + randomColor).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

$(".btn").click(function(){
    const userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);

    animate(userChosenColour);
    playSound(userChosenColour);

    checkResult(userPattern.length-1);
});

// main logic for check user result
function checkResult(currLevel){
    if(userPattern[currLevel] == randomPattern[currLevel]){
        if(userPattern.length === randomPattern.length){
            setTimeout(function(){
                nextsequence();
            }, 500);
        }
    }
    else gameOver();
}

function gameOver(){
    $("#level-title").text("Game Over, Press Any Key to Restart");

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },100);
    playSound("wrong");
    
    randomPattern = [];
    userPattern = [];
    started = false;
}

// animation for user chosen color
function animate(colorName){
    $("#" + colorName).addClass("pressed");
    setTimeout(function() {
        $("#" + colorName).removeClass("pressed");
    }, 100);
}

// play sound of color
function playSound(colorName){
    const audio = new Audio("./sounds/" + colorName + ".mp3");
    audio.play();
}
