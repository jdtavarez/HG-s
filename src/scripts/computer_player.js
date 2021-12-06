class ComputerPlayer {
    constructor(_modelResults) {
        this.moves = ['rock', 'paper', 'scissors']
    };

    giveMove() {
        moveIndex = Math.floor(Math.random() * this.moves.length);
        return this.moves[moveIndex];
    };
}