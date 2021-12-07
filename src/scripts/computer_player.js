class ComputerPlayer {
    constructor() {
    };

    giveMove(_modelResults) {
        const possibleMoves = ['rock', 'paper', 'scissors']
        const idx = Math.floor(Math.random() * possibleMoves.length);
        return possibleMoves[idx];
    };
}

export { ComputerPlayer }