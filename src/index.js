// import { Handposition } from './scripts/handposition'
import { videoCallback, handInfo } from './scripts/stream'
import { clickStart, clickHowTo, clickRound, clickLink, gameSyncFunc, updateScore } from './scripts/scripts'
import { Game } from './scripts/game'
import { Handposition } from './scripts/handposition'
import { Animation } from './scripts/animations'
import { _ } from 'core-js';

document.addEventListener("DOMContentLoaded", videoCallback);
document.addEventListener("click", clickHowTo);
document.addEventListener("click", clickStart);
document.addEventListener("click", (e) => {
    let round = clickRound(e);
    const game = new Game(round, handInfo);
    async function _game() {
        let result = await updateScore(game);
        let playerMoves = await game.getMoves();
        game.judgeRound(playerMoves);
        if (game.over()) {
            const body = document.getElementsByTagName("BODY")[0];
            body.removeAttribute('state');
            console.log(game.winner());
            console.log(game.rollUp)
        }
    }
    let i; 
    for (i = 0; i < round; i++) {
        _game();
    }
});
document.addEventListener("click", clickLink);