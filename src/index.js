// import { Handposition } from './scripts/handposition'
import { videoCallback, handInfo } from './scripts/stream'
import { clickStart, clickHowTo, clickRound } from './scripts/scripts'
import { Game } from './scripts/game'
import { Handposition } from './scripts/handposition'

document.addEventListener("DOMContentLoaded", videoCallback)
document.addEventListener("click", clickHowTo)
document.addEventListener("click", clickStart)
document.addEventListener("click", clickRound)


// document.addEventListener("click", (e) => {
//     if (e.target.id === "button") { infoCallback(e) }

//     if (e.target.id === 'game') {
//         let game = new Game(1, handInfo);
//         let playerMoves = game.getMoves();
//         game.judgeRound(playerMoves);
//         console.log(game.rollUp)
//         console.log(game.winner())
//         if (game.over()) {
//             let ul = document.createElement('UL')
//             let li = document.createElement('LI')
//             for (i = 0; i < playerMoves.size; i++) {
//                 ul2.innerHTML = '';
//                 let round = game.rollUp.get(i+1)
//                 let li2 = document.createElement('LI')
//                 li2.innerText = round;
//                 ul2.append(li2);
//             }
//             li.append(ul2)
//             ul.append(li);
//         }
//     }
// })

// run() {
//     while (!this.gameOver) {
//         const playerMoves = getMoves(modelResults);
//         this.judgeRound(playerMoves);
//         this.keepScore(this.roundNum, playerMoves);
//     }
//     this.gameWinner(this.roundResults);
// }