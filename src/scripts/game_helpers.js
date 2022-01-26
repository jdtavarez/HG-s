function updateScore(game) {
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
        // await Animation.disappearAni(score);
        score.innerHTML = "draw";
        // await Animation.appearAni(score);
        // await Animation.disappearAni(score);
        // score.innerHTML = "score";
        // Animation.appearAni(score);
    }
    return true;
}

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
