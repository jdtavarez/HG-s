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
    return game;
}

function cleanUpRound(game, card) {
    if (!game.over()) {
        const readyButton = document.getElementById('ready');
        readyButton.hidden = false;
        setTimeout(() => {
            const blank = getBlankCard();
            blank.style.opacity = 0;
            blank.hidden = false;
            Animation.appearAni(blank);    
        }, 2000)
    } else {
        const body = document.getElementsByTagName("BODY")[0];
        body.removeAttribute('state')
        console.log(game.rollUp)
    }
    const winner = document.getElementById("score-sign");
    setTimeout(() => {
        Animation.disappearAni(winner)
    }, 1400)
    setTimeout(() => {
        card.hidden = true;
        winner.innerHTML = "score";
        Animation.appearAni(winner)
    }, 2100)
}

export { getBlankCard, playRound }