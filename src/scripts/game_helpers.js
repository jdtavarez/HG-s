import { updateScoreBoard, clickRestart } from './scripts'
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
    const readyButton = document.getElementById('ready');
    readyButton.style.opacity = 0;
    if (!game.over()) {
        setTimeout(() => {
            const blank = getBlankCard();
            blank.style.opacity = 0;
            blank.hidden = false;
            Animation.appearAni(blank);  
            Animation.appearAni(readyButton).then(() => {
                readyButton.hidden = false;
            });
            card.hidden = true;  
        }, 2100)
    } else {
        const body = document.getElementsByTagName("BODY")[0];
        body.removeAttribute('state');
        readyButton.remove();
        setTimeout(() => {
            const restartButton = document.getElementById('start-game');
            restartButton.innerHTML = "Play Again"
            restartButton.style.opacity = 0;
            restartButton.hidden = false;
            card.hidden = true;
            Animation.appearAni(restartButton);
            restartButton.addEventListener("click", clickRestart)
        }, 2100)
    }
    const winner = document.getElementById("score-sign");
    setTimeout(() => {
        Animation.disappearAni(winner)
    }, 1400)
    setTimeout(() => {
        winner.innerHTML = "score";
        Animation.appearAni(winner)
    }, 2100)
}

export { getBlankCard, playRound }