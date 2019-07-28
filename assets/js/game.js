class Game {
    constructor() {
        this.wins = 0;
        this.losses = 0;
        this.game_num = 0;
        this.playing = true;
    }
}

class tos extends Game {
    constructor() {
        super();
    }
    play() {
        this.playing = true;
        this.game_num++;
        $(".jumbotron").show();
    }
    endgame() {
        this.playing = false;
        this.game_num--;
    }
    closegame() {
        $(".jumbotron").hide();
    }
}
