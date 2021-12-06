class HumanPlayer {
    constructor(modelResults) {
        this.handposition = new Handposition(modelResults);
    };

    giveMove() {
        return this.handposition.pose;
    };
}