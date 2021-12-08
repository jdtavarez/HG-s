import { Animation } from './animations'

function clickStart(e) {
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

function clickHowTo(e) {
    const classList = Array.from(e.target.classList);
    debugger
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

function clickRound(e) {
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
        buttons.forEach((e) => {e.hidden = true});
    }
}


export { clickStart, clickHowTo, clickRound }