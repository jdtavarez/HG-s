import { videoCallback } from './scripts/stream'
import { clickStart, clickHowTo, clickRound, clickLink, clickReady } from './scripts/scripts'
import { Game } from './scripts/game'


document.addEventListener("click", clickLink);
document.addEventListener("DOMContentLoaded", videoCallback);
document.addEventListener("click", clickHowTo);
document.addEventListener("click", clickStart);
document.addEventListener("click", (e) => {
    let round = clickRound(e);
    const game = new Game(round);
    const ready = document.getElementById('ready')
    if (ready) {
        ready.addEventListener("click", (e) => clickReady(e, game))
    }
});
