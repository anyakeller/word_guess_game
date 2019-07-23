function start_game() {
    this.wins = 0;
    this.losses = 0;
    this.game_num = 0;

    this.confirm_begin = function(version) {
        $("#modalthing").modal("show");
        return;
    };

    this.play = function(version) {
        this.game_num++;
        console.log(version);
        return;
    };
    console.log("game started");
}
