class Game {
    
    constructor(rounds, modelResults) {
        this.rounds = rounds;
        this.roundNum = 1;
        this.roundResults = [];
        this.gameOver.bind(this);
        this.players = [
            p1 = new HumanPlayer(modelResults),
            p2 = new ComputerPlayer(modelResults)
            ];
        this.gameRollUp = new Map();
    }

    getMoves() {
        moves = new Map();
        moves.set('draw', 'draw');
        this.players.forEach((player) => {
            moves.set(player, player.giveMove());
        })
        return moves;
    }

    judgeRound(playerMoves) {
        const moves = Array.from(playerMoves.keys()).sort();
        let roundWinner;

        if (moves[0] === 'rock' && moves[1] === 'scissors') {
            roundWinner = 'rock';
        } else if (moves[0] === 'paper' && moves[1] === 'rock') {
            roundWinner = 'paper';
        } else if (moves[0] === 'paper' && moves[1] === 'scissors') {
            roundWinner = 'scissors';
        } else {
            roundWinner = 'draw';
        }
        
        this.roundResults.push(playerMoves[roundWinner]);
    }

    keepScore(round, playerMoves) {
        const winner = this.roundResults[-1];
        this.gameRollUp.set(round, [playerMoves, winner])
    }

    gameWinner(roundResults) {
        let p1Count = 0;
        let p2Count = 0;
        let gWinner;

        roundResults.forEach((result) => {
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

    gameOver() {
        this.roundResults.length === this.rounds;
    }

    run() {
        while (!this.gameOver) {
            const playerMoves = getMoves();
            this.judgeRound(playerMoves);
            this.keepScore(this.roundNum, playerMoves);
        }
        this.gameWinner(this.roundResults);
    }

}