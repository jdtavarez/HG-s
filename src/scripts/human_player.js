import { Handposition } from './handposition'
class HumanPlayer {
    
    giveMove(modelResults) {
        if (modelResults.multiHandLandmarks.length !== 0) {
            const move = new Handposition(modelResults);
            return move.pose;
        } else {
            return 'unsure'
        }
    };
}

export { HumanPlayer }