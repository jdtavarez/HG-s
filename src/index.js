// import { Handposition } from './scripts/handposition'
import { videoCallback, handInfo } from './scripts/stream'
import { clickStart, clickHowTo, clickRound, clickLink, gameSyncFunc, updateScore, getCard, getBlankCard } from './scripts/scripts'
import { Game } from './scripts/game'
import { _ } from 'core-js';

document.addEventListener("click", clickLink);
document.addEventListener("DOMContentLoaded", videoCallback);
document.addEventListener("click", clickHowTo);
document.addEventListener("click", clickStart);
document.addEventListener("click", (e) => {
    let round = clickRound(e);
    const game = new Game(round, handInfo);
    function _game() {
        const blankCard = getBlankCard();
        blankCard.hidden = true;
        let playerMoves = game.getMoves();
        const card  = getCard(playerMoves);
        card.hidden = false;
        game.judgeRound(playerMoves);
        updateScore(game);
        if (game.over()) {
            const body = document.getElementsByTagName("BODY")[0];
            body.removeAttribute('state');
        }
    }
    let i; 
    for (i = 0; i < round; i++) {
        _game();
    }
});
