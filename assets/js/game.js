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
    }
    //gets a random word from an array
    get_random_index(freshbank) {
        //
        return Math.floor(Math.random() * freshbank.length);
    }
    //game start
    initplay() {
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
        console.log("game started");
    }

    // The full game
    playit() {
        this.game_num++;
        // get random word
        var randomindex = this.get_random_index(this.unused_words);
        var ranword = this.unused_words[randomindex];

        this.unused_words.splice(randomindex, 1); //remove the random index word

        var max_tries = 10; // add algo to generate later
        var tries_used = 0;
        var temparranword = ranword.split("");
        console.log(temparranword);
        var arrranword = [];
        for (var k = 0; k < temparranword.length; k++) {
            arrranword.push(temparranword[k].charCodeAt(0));
        }
        //console.log(arrranword);
        //var isWin = 0; //0 is playing, 1 is win, 2 is loss
        var unusedchars = this.asciiletterBank;
        return this.recursiveRound(
            arrranword,
            unusedchars,
            max_tries,
            tries_used
        );
    }

    recursiveRound(arrayleft, unused, max_tries, tries_used) {
        // takes the array of the letters left to guess
        if (arrayleft.length == 0) {
            return true;
        } else if (tries_used == max_tries) {
            return false;
        }
        var id = this;
        $(document).keyup(function(event) {
            console.log(arrayleft);
            var getkey = event.key;
            var k = getkey.charCodeAt(0);

            console.log("pressed key: " + k);
            // check if alpha
            var isletter = id.asciiletterBank.indexOf(k);
            if (isletter == -1) {
                alert("bad key!");
            } else if (unused.indexOf(k) == -1) {
                alert("u used that already");
            } else {
                $(document).off("keyup");
                tries_used++;
                console.log("tries left: " + (max_tries - tries_used));
                if (arrayleft.indexOf(k) == -1) {
                    //if not in word
                    console.log(k + " is not in the word");
                    return id.recursiveRound(
                        arrayleft,
                        unused,
                        max_tries,
                        tries_used
                    );
                } else {
                    console.log(k + " is in the word!");
                    var templeft = arrayleft;
                    var tempunused = unused;
                    for (var j = 0; j < templeft.length; j++) {
                        if (templeft[j] === k) {
                            templeft.splice(j, 1);
                            j--;
                        }
                    }
                    var whereisunusedk = unused.indexOf(k);
                    tempunused.splice(whereisunusedk, 1);

                    return id.recursiveRound(
                        templeft,
                        tempunused,
                        max_tries,
                        tries_used
                    );
                }
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
