import { videoCallback } from './scripts/stream'
import { clickStart, clickHowTo, clickRound, clickLink, clickReady, updatedGameState } from './scripts/scripts'
import { Game } from './scripts/game'


document.addEventListener("click", clickLink);
document.addEventListener("DOMContentLoaded", videoCallback);
document.addEventListener("click", clickHowTo);
document.addEventListener("click", clickStart);
document.addEventListener("click", (e) => {
    let round = clickRound(e);
    let game = new Game(round);
    const ready = document.getElementById('ready')
    if (ready) {
        if (updatedGameState) {
            game = updatedGameState;
        }
        ready.addEventListener("click", (e) => clickReady(e, game))
    }
});
