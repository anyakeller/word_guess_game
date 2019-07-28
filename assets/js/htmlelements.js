// BUTTONS AND GAME SETUP
// give buttons click attribute

var modes = $(".mode"); //mode buttons
var newG = $("#new_game"); //new game button

//GLOBAL VARIABLES
var version; //version
var isPlay = false; //global check if the game is being played
var mainG; //I forgot

// Helper to check if the game is started
// function confirmstartkey(version) {
//     document.onkeyup = function(event) {
//         var k = event.key;
//         if (k === "s") {
//             gamething(version);
//         }
//         $("#modalthing").modal("hide");
//     };
// }

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
    gamething(version);
    $("#modalthing").modal("hide");
});

// Run Game
function gamething(version) {
    mainG = new tos();
    console.log(version);
    mainG.play();
    if (mainG.playing) {
        console.log("game started");
    }
    isPlay = true;
}
