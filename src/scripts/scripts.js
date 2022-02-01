import { Animation } from './animations'
import { getBlankCard, playRound, roundPlay } from './game_helpers'
import { HumanPlayer } from './human_player'
import { ComputerPlayer } from './computer_player'
import { handInfo } from './stream'

export let updatedGameState;

function clickStart(e) {
    e.preventDefault();
    if (e.target.id === "start-game") {
        let elem = document.getElementById('start-game');
        elem.hidden = true;
        let possibleSelections = [1, 3, 5];
        let div = document.getElementsByClassName('game-tools')[0];
        possibleSelections.forEach((ele) => {
            let button = document.createElement("BUTTON");
            button.innerText = `${ele.toString()} Round`
            button.setAttribute("class", "game");
            button.setAttribute("id", `${ele.toString()}-round`);
            button.setAttribute("value", ele);
            button.style.opacity = 0;
            div.append(button);
        })
        let buttons = Array.from(div.children).slice(1);
        buttons.forEach(Animation.appearAni);
    }
}

function clickHowTo(e) {
    const classList = Array.from(e.target.classList);
    if (classList.includes("hand-graphic")) {
        let elem;
        let list;
        if (!e.target.getAttribute("clicked")) {
            if (e.target.id === "rock-image") {
                elem = document.getElementById("rock-image")
                list = document.getElementById("rock-list")
            } else if (e.target.id === "paper-image") {
                elem = document.getElementById("paper-image")
                list = document.getElementById("paper-list")
            } else {
                elem = document.getElementById("scissor-image")
                list = document.getElementById("scissor-list")
            }
            elem.setAttribute("clicked", "true")
            list.setAttribute("class", "hand-graphic-list-dir")
            list.hidden = false;
        } else { 
            if (e.target.id === "rock-image") {
                elem = document.getElementById("rock-image");
                list = document.getElementById("rock-list");
            } else if (e.target.id === "paper-image") {
                elem = document.getElementById("paper-image");
                list = document.getElementById("paper-list");
            } else {
                elem = document.getElementById("scissor-image");
                list = document.getElementById("scissor-list");
            }
            elem.removeAttribute("clicked");
            list.setAttribute("class", "");
            list.hidden = true;
        }
    }
}

function clickLink(e) {
    if (e.target.id === 'logo-link') {
        window.location = e.target.href
        return;
    } else if (e.target.classList[0] === 'logolinks' ) {
        const link = e.target.parentElement.getAttribute("HREF");
        window.open(link);
    }
}

function clickRound(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (e.target.id === 'ready') return
    const classList = Array.from(e.target.classList)
    let round;
    if (classList.includes("game") && e.target.id != "start-game") {
        const body = document.getElementsByTagName("BODY")[0];
        body.setAttribute('state', 'game-in-prog');
        const blankCard = getBlankCard();
        blankCard.hidden = false;
        round = parseInt(e.target.value);
        const scoreboard = document.getElementsByClassName("game-util")[0];
        const elems = Array.from(scoreboard.children);
        [scoreboard, ...elems].forEach(Animation.appearAni);
        const div = document.getElementsByClassName('game-tools')[0];
        const buttons = Array.from(div.children).slice(1);
        buttons.forEach(button => button.style.opacity = 0);
        buttons.forEach((e) => { e.hidden = true });
        const button = document.createElement("BUTTON");
        button.innerText = `Ready?`
        button.setAttribute("class", "game");
        button.setAttribute("id", `ready`);
        div.append(button);
    }
    return round;
}

function clickReady(e, game) {
    e.preventDefault();
    e.stopImmediatePropagation();
    const text = document.getElementById("handpose-require-text");
    if (text || e.target.id !== 'ready') {
        return;
    } else {
        e.target.hidden = true;
        Animation.gameAni();
        setTimeout(() => {
            updatedGameState = playRound(game, handInfo);
        }, 4500)
    }
}

function updateScoreBoard(game) {
    const winner = document.getElementById("score-sign");
    winner.style.opacity = 0;
    
    if (game.roundResults.at(-1) === 'unrecognized') {
        winner.innerHTML = "unsure try again"
        winner.style.opacity = 1;
    }
    else if (game.roundResults.at(-1) instanceof HumanPlayer) {
        winner.innerHTML = "you win";
        winner.style.opacity = 1;
        let hScore = document.getElementById("player-1-score");
        hScore.style.opacity = 0;
        hScore.innerText = parseInt(hScore.innerText) + 1;
        hScore.style.opacity = 1;
    } else if (game.roundResults.at(-1) instanceof ComputerPlayer) {
        winner.innerHTML = "you lose";
        winner.style.opacity = 1;
        let cScore = document.getElementById("player-2-score");
        cScore.style.opacity = 0;
        cScore.innerText = parseInt(cScore.innerText) + 1;
        cScore.style.opacity = 1;
    } else {
        winner.innerHTML = "draw";
        winner.style.opacity = 1;
    }
}
export { clickStart, clickHowTo, clickRound, clickLink, clickReady, updateScoreBoard } 