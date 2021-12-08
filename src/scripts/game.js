import { HumanPlayer } from './human_player'
import { ComputerPlayer } from './computer_player'

class Game {
    constructor(rounds, modelResults) {
        this.totalRounds = rounds;
        this.roundResults = [];
        
        this.handInfo = modelResults;
        this.roundNum = 1;

        const p1 = new HumanPlayer(); 
        const p2 = new ComputerPlayer();
        this.players = [p1, p2];
        this.rollUp = new Map();

        this.over.bind(this);
        this.getMoves.bind(this);
    }

    getMoves() {
        let moves = new Map();
        moves.set('draw', 'draw');
        this.players.forEach((player) => {
            moves.set(player.giveMove(this.handInfo), player);
        })
        return moves;
    }

    judgeRound(playerMoves) {
        const moves = Array.from(playerMoves.keys()).sort(); 
        let winningMove;

        if (moves[1] === 'rock' && moves[2] === 'scissors') {
            winningMove = 'rock';
        } else if (moves[1] === 'paper' && moves[2] === 'rock') {
            winningMove = 'paper';
        } else if (moves[1] === 'paper' && moves[2] === 'scissors') {
            winningMove = 'scissors';
        } else {
            winningMove = 'draw';
        }

        const roundWinner = playerMoves.get(winningMove);
        this.roundResults.push(roundWinner);
        this.rollUp.set(this.roundNum, [playerMoves, roundWinner]);
        this.roundNum++
    }

    winner() {
        let p1Count = 0; let p2Count = 0; let gWinner;

        this.roundResults.forEach((result) => {
            if (result instanceof HumanPlayer) {
                p1Count++;
            } else {
                p2Count++;
            }
        })

        if (p1Count > p2Count) {
            gWinner = 'Player 1';
        } else if (p1Count < p2Count)  {
            gWinner = 'Player 2';
        } else {
            gWinner = 'Draw'
        }
        return gWinner;
    }

    over = () => this.roundNum >= this.totalRounds
}

export { Game }