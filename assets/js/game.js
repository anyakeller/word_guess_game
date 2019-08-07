class Game {
    constructor() {
        this.wins = 0;
        this.losses = 0;
        this.game_num = 0;
        this.playing = true;
    }
}

class trek extends Game {
    constructor() {
        super();
        this.totGuess = 0;
        this.guessLeft = 0;
        this.shared_bank = {
            enterprise: "the voyages of...",
            klingon: "a n g r y",
            phaser: "pew",
            stun: "set to",
            vulcan: "llap",
            bridge: "take the lift up to the...",
            computer: "___, contact the starfleet",
            sickbay: "he's dying, send him to ___",
            transporter: "bzzzzzzzz particle something somthind here to there",
            warpdrive: "gotta be working to move",
            warp: "speed"
        };
        this.word_bank = {}; //with hints
        this.unused_words; //list of key words
        this.asciiletterBank = [];
        this.endGame;
    }
    //gets a random word from an array
    get_random_index(freshbank) {
        //
        return Math.floor(Math.random() * freshbank.length);
    }
    //game start
    initplay() {
        endGame = $("#endGameAlert");

        // for (var i = 65; i <= 90; i++) {
        //     //set up letter bank
        //     this.asciiletterBank.push(i); //String.fromCharCode() reverses
        // }
        for (var i = 97; i <= 122; i++) {
            //set up letter bank
            this.asciiletterBank.push(i); //String.fromCharCode(code) reverses or str.charCodeAt(index);
        }

        this.playing = true;
        $("#jumboGame").show();
        var winAlert = $("<div>");
        winAlert.addClass("alert alert-success winlossalert");
        winAlert.text("YOU WIN THIS ROUND");
        winAlert.attr({ role: "alert", id: "winalert" });
        winAlert.hide();
        $("#winloss").append(winAlert);
        var lossAlert = $("<div>");
        lossAlert.addClass("alert alert-danger winlossalert");
        lossAlert.text("You Lost this Round");
        lossAlert.attr({ role: "alert", id: "lossalert" });
        lossAlert.hide();
        $("#winloss").append(lossAlert);
        console.log("game started");
    }

    // The full game
    playit() {
        if (this.unused_words.length == 0) {
            endGame.show();
            this.closeGame();
        } else {
            $(".winlossalert").hide();
            this.game_num++;
            $("#rndnum").text(this.game_num);
            var id = this;
            var spaces = $("#letterSpaces");
            var letterBankElement = $("#letters_used");
            spaces.empty();
            letterBankElement.empty();
            return this.oneRound(id);
        }
    }

    oneRound(id) {
        var usedchars = [];
        var roundStatus = 0;
        // get random word
        var randomindex = id.get_random_index(id.unused_words);
        var ranword = id.unused_words[randomindex];

        id.unused_words.splice(randomindex, 1); //remove the random index word

        var tries_used = 0;
        var temparranword = ranword.split("");
        var max_tries =
            26 - Math.floor((temparranword.length + 20) / temparranword.length);
        $("#guess_left").text(max_tries);

        //UPDATE BLANKS FOR GAME

        //console.log(temparranword);
        var arrranword = [];
        for (var k = 0; k < temparranword.length; k++) {
            arrranword.push(temparranword[k].charCodeAt(0));
        }

        this.createBlanks(arrranword);

        // helper for key up eent
        function checkForRoundEnd(arrayleft, tries_used) {
            // takes the array of the letters left to guess
            if (arrayleft.length == 0) {
                return 1; //win
            } else if (tries_used == max_tries) {
                return 2; //loss
            }
            return 0; //still playing
        }

        var correctLetters = [];
        var arrayleft = arrranword;
        $(document).keyup(function(event) {
            var getkey = event.key;
            var k = getkey.charCodeAt(0);

            // console.log("pressed key: " + k);
            // check if alpha
            var isletter = id.asciiletterBank.indexOf(k);
            if (isletter == -1) {
                alert("bad key!");
            } else if (usedchars.indexOf(k) != -1) {
                alert("u used that already");
            } else {
                tries_used++;
                //console.log("tries left: " + (max_tries - tries_used));
                $("#guess_left").text(max_tries - tries_used);
                usedchars.push(k);

                if (arrayleft.indexOf(k) == -1) {
                    //if not in word
                    console.log(String.fromCharCode(k) + " is not in the word");
                } else {
                    console.log(String.fromCharCode(k) + " is in the word!");
                    correctLetters.push(k);
                    var templeft = arrayleft;
                    for (var j = 0; j < templeft.length; j++) {
                        if (templeft[j] === k) {
                            templeft.splice(j, 1);
                            j--;
                        }
                    }
                }
                id.updateBlanks(correctLetters, usedchars);

                roundStatus = checkForRoundEnd(arrayleft, tries_used);
                if (roundStatus != 0) {
                    $(document).off("keyup");
                    if (roundStatus == 1) {
                        id.wins++;
                        $("#wins").text(id.wins);
                        console.log("U Win!");
                        $("#winalert").show();
                        var nxtRndBtn = $("#nxtRndBtn");
                        nxtRndBtn.show();
                        return;
                    } else if (roundStatus == 2) {
                        id.losses++;
                        $("#losses").text(id.losses);
                        console.log("U lose :/");
                        $("#lossalert").show();
                        var nxtRndBtn = $("#nxtRndBtn");
                        nxtRndBtn.show();
                        return;
                    } else {
                        console.log("You effing broke my program");
                    }
                }
            }
        });
    }

    createBlanks(arrayofword) {
        var spaces = $("#letterSpaces");
        for (var i = 0; i < arrayofword.length; i++) {
            var oneBlank = $("<span>");
            oneBlank.addClass(
                "badge badge-info m-1 wordBlank letterBlankLetter"
            );
            oneBlank.data("correctLetterValue", arrayofword[i]);
            oneBlank.text("_");
            oneBlank.appendTo(spaces);
        }

        var letterBankElement = $("#letters_used");
        for (var j = 0; j < this.asciiletterBank.length; j++) {
            var oneletter = $("<span>");
            oneletter.addClass("badge badge-pill m-1 badge-warning letter");
            oneletter.attr("value", this.asciiletterBank[j]);
            oneletter.text(String.fromCharCode(this.asciiletterBank[j]));
            letterBankElement.append(oneletter);
        }
        // $(d).addClass(classname);
    }

    updateBlanks(correctLetters, usedLetters) {
        $(
            $(".letterBlankLetter").each(function(index) {
                // console.log($(this).data("correctLetterValue"));
                if (
                    correctLetters.indexOf(
                        $(this).data("correctLetterValue")
                    ) != -1
                ) {
                    $(this).text(
                        String.fromCharCode($(this).data("correctLetterValue"))
                    );
                }
            })
        );
        $(".letter").each(function(index) {
            if (
                usedLetters.indexOf(parseInt($(this).attr("value"))) != -1 &&
                $(this).hasClass("badge-warning")
            ) {
                $(this).removeClass("badge-warning");
                $(this).addClass("badge-secondary");
            }
        });
    }

    //display stats
    endResult() {}

    //closeexit the game
    closeGame() {
        this.playing = false;
        $("#jumboGame").hide();
        console.log("game closed");
    }
}

class tos extends trek {
    constructor() {
        super();
        this.totGuess = 0;
        this.guessLeft = 0;
        this.version_words = {
            kirk: "actually not the first cap",
            spock: "science officer",
            tribble: "furry multiplier",
            uhura: "wore the first bluetooth earpiece",
            checkov: "keptin, en enemy wessel is apprchhhing",
            scotty: "wasn't told to beam anyone up",
            mccoy: "im a doctor not a",
            bones: "the pet name for the doc",
            sulu: "presses random buttons to navigate ship"
        };
        this.full_bank = Object.assign(
            {},
            this.shared_bank,
            this.version_words
        );
        this.unused_words = Object.keys(this.full_bank);
    }
}
