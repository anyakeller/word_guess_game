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
        this.game_num++;
    }
}
