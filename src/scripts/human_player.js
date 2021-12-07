import { Handposition } from './handposition'
class HumanPlayer {

    constructor() {
    };

    giveMove(modelResults) {
        const move = new Handposition(modelResults);
        return move.pose;
    };
}

export { HumanPlayer }