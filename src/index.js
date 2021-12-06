import { Handposition } from './scripts/handposition'
import { videoCallback } from './scripts/stream'

document.addEventListener("DOMContentLoaded", videoCallback)

document.addEventListener("click", (e) => {
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
})