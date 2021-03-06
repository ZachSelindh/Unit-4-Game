$(document).ready(function() {

var winScore = 0;

var lossScore = 0;

var targetNumber = "";

var currentNumber = 0;

const timeInitial = 10;

var timeLeft = timeInitial;

var timerRunning = false;

var moonValue = "";

var blueValue = "";

var redValue = "";

var billyValue = "";

var hardcore = false;

$("#current-text").html(currentNumber);

$("#wins-text").html(winScore);

$("#losses-text").html(lossScore);

$("#timer").hide()

    /* Set a random number generator that shows up as the target number */
function randomNum(x, y) {
                num = [Math.floor(Math.random() * (y-x+1) + x)]
                return num;
};

    /* Sets the target value with a random number. */
function setTargetValue() {
    targetNumber = randomNum(19, 120);
    $("#target-text").html(targetNumber);
};

    /* Sets the values associated with the crystals. Checks if a value is repeated and replaces it. 
    Checks if all numbers are even, and if so, replaces on with 3. */
function setCrystalValues() {
    moonValue = parseInt(randomNum(2, 12));
    blueValue = parseInt(randomNum(2, 12));
    redValue = parseInt(randomNum(2, 12));
    billyValue = parseInt(randomNum(2, 12)); 

        for (i=0; i<10; i++) {
            if (moonValue === blueValue || moonValue === redValue || moonValue === billyValue) {
                    moonValue = parseInt(randomNum(2, 12));
                }
            else if (blueValue === redValue || blueValue === billyValue) {
                    blueValue = parseInt(randomNum(2, 12));
                }
            else if (redValue  === billyValue) {
                    redValue = parseInt(randomNum(2, 12));  
                }
        } 
        if (moonValue%2 == 0 && blueValue%2 == 0 && redValue%2 == 0 && billyValue%2 == 0) {
                moonValue = 3;
                console.log("ODDSUB")           
        }            
};

    /* Ends the current game before beginning another with resetgame. */
function endCurrentRound() {
    moonValue = 0; 
    blueValue = 0;
    redValue = 0;
    billyValue = 0;
    timerRunning = false;
    clearInterval(timer);
    $("#big-card-z").fadeIn(400);
    $("#confirm-button").show();
};

    /* Clears all boards and chooses new values. */
function resetGame() {
    if (hardcore === true) {
        timerRunning = true;
        timeLeft = timeInitial;
        $("#time-text").html(timeLeft);
    }
    currentNumber = 0;
    $("#current-text").html(currentNumber);
    setTargetValue();
    setCrystalValues();
};

    /* Sets up a message and a play again confirm button, adds a win to the score and resets game. */
function winState() {
    endCurrentRound();
    $("#big-card-text").html("Congratulations! You've won! Click Confirm to play again!")
    $("#confirm-button").click(function() {
        $("#confirm-button").hide();
        $("#wins-text").html(winScore);
        resetGame()
        $("#big-card-z").fadeOut(400)
        });
};

    /* Sets up a message and a play again confirm button, adds a loss to the score and resets game. */
function loseState() {
    endCurrentRound();
    $("#big-card-text").html("You lose! The witch has defeated you. Click Confirm to play again.")
    $("#confirm-button").click(function() {
        $("#confirm-button").hide();
        $("#losses-text").html(lossScore);
        resetGame()
        $("#big-card-z").fadeOut(400)
        });
};

    /* Checks if the player has won or lost, and acts accordingly! Then resets the board. */
function winLoseState() {
    if (currentNumber == targetNumber) {
        winScore++;
        setTimeout(function() {   
        winState();}, 100);
    } else if (currentNumber > targetNumber) {
        lossScore++;
        setTimeout(function() {
        loseState();}, 100);
    }
};

    /* Sets a timer at 10 seconds, and counts down. After the timer hits 0,
    resets all the crystal values and flashes them for a visual cue. */
function hardcoreMode() {
    if (hardcore === true) {
        timerRunning = true;
        $("#timer").show()
        $("#time-text").html(timeLeft);
        setInterval(timer, 1000);
    }
};

function timer() {
    if (timerRunning === true) {
    timeLeft--;
    $("#time-text").html(timeLeft);
        if (timeLeft <= 0) {
            timeLeft = timeInitial + 1;
            setCrystalValues();
            $(".crystalbutton").fadeOut(50);
            $(".crystalbutton").fadeIn(700);
        }
    }
};

/* Starts the game and sets all variable/values after the Mode button is selected. */
$("#normal-button, #hardcore-button").click(function(){
    $("#big-card-z").fadeOut(400);
    $("#normal-button").fadeOut(400);
    $("#hardcore-button").fadeOut(400);
    setTargetValue();
    setCrystalValues();
});


    /* Chooses if the game mode is Hardcore or Normal depending on what the user picks. */
$("#normal-button").click(function(){
    hardcore = false;
    hardcoreMode();
});

$("#hardcore-button").click(function(){
    hardcore = true;
    hardcoreMode();
});

    /* Creates a fade effect when hovered over. */
$("button").hover(function(){
    $(this).css("opacity", "0.6");
}, function() {
    $(this).css("opacity", "1");
});

$(".crystalbutton").hover(function(){
    $(this).css("opacity", "0.6");
}, function() {
    $(this).css("opacity", "1");
});

    /* Clicking the crystals adds to the game current number. */
$("#moonstone").click(function(){
    currentNumber = currentNumber + moonValue;
    $("#current-text").html(currentNumber);
    winLoseState();
});

$("#bluecrystal").click(function(){
    currentNumber = currentNumber + blueValue;
    $("#current-text").html(currentNumber);
    winLoseState();
});

$("#redcrystal").click(function(){
    currentNumber = currentNumber + redValue;
    $("#current-text").html(currentNumber);
    winLoseState();
});

$("#billycrystal").click(function(){
    currentNumber = currentNumber + billyValue;
    $("#current-text").html(currentNumber);
    winLoseState();
});

});

