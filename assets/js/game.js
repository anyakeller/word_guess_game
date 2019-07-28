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
    }
    //gets a random word from an array
    get_random_index(freshbank) {
        //
        return Math.floor(Math.random() * freshbank.length);
    }
    //game start
    initplay() {
        this.playing = true;
        this.game_num++;
        $("#jumboGame").show();
        console.log("game started");

        this.oneRound();
    }

    oneRound() {
        // get random word
        var randomindex = this.get_random_index(this.unused_words);
        var ranword = this.unused_words[randomindex];
        this.unused_words.splice(randomindex, 1); //remove the random index word
        console.log(ranword);
        document.onkeyup = function(event) {
            var k = event.key;
            console.log("pressed key: " + k);
        };
    }

    // quit in the middle of a game
    earlyQuit() {
        this.game_num--;
        console.log("engame triggered");
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
