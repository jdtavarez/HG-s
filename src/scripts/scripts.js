import { Animation } from './animations'
import { ComputerPlayer } from './computer_player';
import { HumanPlayer } from './human_player';
import { Game } from './game';

async function clickStart(e) {
    e.preventDefault();
    if (e.target.id === "start-game") {
        let elem = document.getElementById('start-game');
        let flag = Animation.disappearAni(elem);
        if (flag) {
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
}

async function clickHowTo(e) {
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

async function clickLink(e) {
    let gitEx = document.getElementById("github-logo")
    if (e.target.tagName === "A" || e.target === gitEx) {
        let elem;
        if (e.target === gitEx) {
            elem = gitEx.parentElement;
        } else {
            let id = e.target.id;
            elem = document.getElementById(id);
        }
        let link = elem.getAttribute("HREF")
        window.location.href = link;
    }
}

async function clickRound(e) {
    const classList = Array.from(e.target.classList)
    e.preventDefault();
    let flag = false;
    let round;
    if (classList.includes("game") && e.target.id != "start-game") {
        round = parseInt(e.target.value);
        let scoreboard = document.getElementsByClassName("game-util")[0];
        let elems = Array.from(scoreboard.children);
        [scoreboard, ...elems].forEach(Animation.appearAni);
        flag = true;
    };
    let div = document.getElementsByClassName('game-tools')[0];
    let buttons = Array.from(div.children).slice(1)
    if (flag) {
        buttons.forEach(Animation.disappearAni);
        buttons.forEach((e) => { e.hidden = true });
    }
    const body = document.getElementsByTagName("BODY")[0];
    body.setAttribute('state', 'game-in-prog');
    return round;
}

async function updateScore(game) {
    if (game.roundResults.at(-1) instanceof HumanPlayer) {
        let hScore = document.getElementById("player-1-score");
        await Animation.disappearAni(hScore);
        hScore.innerText = parseInt(hScore.innerText) + 1;
        hScore.opacity = "1";
    } else if (game.roundResults.at(-1) instanceof ComputerPlayer) {
        let cScore = document.getElementById("player-2-score");
        await Animation.disappearAni(cScore);
        cScore.innerText = parseInt(cScore.innerText) + 1;
        cScore.opacity = "1";
    } else {
        let score = document.getElementById("score-sign");
        await Animation.disappearAni(score);
        score.innerHTML = "draw";
        score.style.opacity = "1";
        await Animation.disappearAni(score);
        score.innerHTML = "score";
        score.style.opacity = "1";
    }
    return true;
}

export { clickStart, clickHowTo, clickRound, clickLink, updateScore }