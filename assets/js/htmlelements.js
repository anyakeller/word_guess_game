// BUTTONS AND GAME SETUP
// give buttons click attribute

var modes = $(".mode"); //mode buttons
var newG = $("#new_game"); //new game button

//GLOBAL VARIABLES
var version; //version
var isPlay = false; //global check if the game is being played
var currentG; //I forgot what this does

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

// NEWG listener
newG.click(function() {
    console.log("YAYY");
    $("#modalthing").modal("hide");
    gamething(version);
});

// Run Game
function gamething(version) {
    currentG = new tos();
    console.log(version);
    isPlay = true;
    currentG.initplay();
    currentG.playit();
}
