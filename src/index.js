import { videoCallback } from './scripts/stream'
import { clickStart, clickHowTo, clickRound, clickLink } from './scripts/scripts'


document.addEventListener("click", clickLink);
document.addEventListener("DOMContentLoaded", videoCallback);
document.addEventListener("click", clickHowTo);
document.addEventListener("click", clickStart);
document.addEventListener("click", clickRound);