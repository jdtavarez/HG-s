// import { Handposition } from './scripts/handposition'
import { videoCallback, handInfo } from './scripts/stream'
import { Game } from './scripts/game'
import { Handposition } from './scripts/handposition'

document.addEventListener("DOMContentLoaded", videoCallback)

document.addEventListener("click", (e) => {
    if (e.target.id === "button") { infoCallback(e) }

    if (e.target.id === 'game') {
        let game = new Game(1, handInfo);
        let playerMoves = game.getMoves();
        game.judgeRound(playerMoves);
        if (game.over()) {
            let ul = document.createElement('UL')
            let li = document.createElement('LI')
            for (i = 0; i < playerMoves.size; i++) {
                ul2.innerHTML = '';
                let round = game.rollUp.get(i+1)
                let li2 = document.createElement('LI')
                li2.innerText = round;
                ul2.append(li2);
            }
            li.append(ul2)
            ul.append(li);
        }
    }
})

function infoCallback(e) {
    let handposition = new Handposition(handInfo);
    e.preventDefault();
    let ul = document.getElementsByClassName('hand-info')[0];
    ul.innerHTML = '';

    let handAxisLi = document.createElement('LI');
    handAxisLi.innerText = `Axis: ${handposition.axis}`;

    let handedLi = document.createElement('LI');
    handedLi.innerText = `Hand: ${handposition.handed}`;

    let handPoseLi = document.createElement('LI');
    handPoseLi.innerText = `Pose: ${handposition.pose}`;

    ul.append(handAxisLi);
    ul.append(handedLi);
    ul.append(handPoseLi);
    debugger
}



// run() {
//     while (!this.gameOver) {
//         const playerMoves = getMoves(modelResults);
//         this.judgeRound(playerMoves);
//         this.keepScore(this.roundNum, playerMoves);
//     }
//     this.gameWinner(this.roundResults);
// }