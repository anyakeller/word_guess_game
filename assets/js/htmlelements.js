// BUTTONS AND GAME SETUP
// give buttons click attribute

var modes = $(".mode"); //mode buttons
var newG = $("#new_game"); //new game button

//GLOBAL VARIABLES
var version; //version
var isPlay = false; //global check if the game is being played

// Start Mode Button Listeners
modes.click(function() {
    version = this.value;
    if (isPlay) {
        $("#warn_restart").text("You're already in a game!  Start a new one?");
    } else {
        $("#warn_restart").text("");
    }
    $("#ver").text(version);
    $("#modalthing").modal("show");
    //confirmstartkey(version);
});

var currentG; //I forgot what this does
var nxtRndBtn = $("#nxtRndBtn");

var endGame = $("<div>");
endGame.addClass("alert alert-danger");
endGame.text("Out of fresh words.  Game Over.");
endGame.attr({ role: "alert", id: "gameOver" });

// NEWG listener
newG.click(function() {
    endGame.hide();
    console.log("YAYY");
    $("#modalthing").modal("hide");
    currentG = new tos();
    isPlay = true;
    currentG.initplay();
});

nxtRndBtn.click(function() {
    nxtRndBtn.hide();
    gamething(version);
});
// Run Game
function gamething(version) {
    console.log(version);
    currentG.playit();
}
