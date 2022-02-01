import { updateScoreBoard } from './scripts'
import { Animation } from './animations'

function getCard(playerMoves) {
    const moves = Array.from(playerMoves.keys());
    const compMove = moves.at(-1);
    const card = document.getElementById(`${compMove}-card`);
    return card;
}

function getBlankCard() {
    const card = document.getElementById('blank-card')
    return card;
}

function playRound(game, handInfo) {
    let playerMoves = game.getMoves(handInfo);
    const card = getCard(playerMoves);
    card.hidden = false;
    game.judgeRound(playerMoves);
    updateScoreBoard(game);
    cleanUpRound(game, card);
}

function cleanUpRound(game, card) {
    console.log(game.over())
    if (!game.over()) {
        setTimeout(() => {
            const winner = document.getElementById("score-sign");
            winner.opacity = 0;
            winner.innerHTML = "score";
            winner.opacity = 1;
            card.hidden = true;
            getBlankCard().hidden = false;
        }, 2000)
    } else {
        const body = document.getElementsByTagName("BODY")[0];
        body.removeAttribute('state')
        console.log(game.rollUp)
    }
}

export { getBlankCard, playRound }