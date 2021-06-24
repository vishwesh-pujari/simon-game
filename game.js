var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var i = 0; // index for gamePattern

function buttonPress(randomColor) { // presses the button
    $("#" + randomColor).addClass("pressed"); // for animating button press
    setTimeout(function () {
        $("#" + randomColor).removeClass("pressed");
    }, 100); // for 0.1s
    return;
}

function selectRandomColor() {
    var randomColor = buttonColors[Math.floor(Math.random() * 4)]; // select random color from array
    gamePattern.push(randomColor); // push it in the gamePattern array
    return randomColor;
}

function nextSequence() {
    $(document).off("keypress"); // remove the event handler of "keypress" applied to document becoz we no longer need it. We need to detect keys only at the beginning and when Game-Over takes place

    buttonPress(selectRandomColor());
    $(".btn").click(nextSequence1); // add event listener to all the buttons
    $("h1").text("Level " + gamePattern.length); // Change text of HTML
    return;
}

function nextSequence1() {

    buttonPress(this.id); // press the button on which user has clicked
    
    if (this.id !== gamePattern[i]) { // a mistake has been committed by the player
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 400);

        $("h1").text("Game Over, Press Any Key to Restart");
        $(document).keypress(nextSequence); // Again get ready to accept any key from the user
        $(".btn").off("click"); // remove event listener from buttons

        gamePattern = []; // reset gamePattern
        i = 0;
        return;
    }

    i++;

    if (i === gamePattern.length) { // player has selected all correct sequences on the current level
        setTimeout(function() {
            buttonPress(selectRandomColor()); // select one new random color for the next level
            $("h1").text("Level " + gamePattern.length); // Change text of HTML
            i = 0;
        }, 400);
    }

    return;
}

$(document).keypress(nextSequence); // In the BEGINNING get ready to accept any key from the user
