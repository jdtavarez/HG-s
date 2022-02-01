import { getBlankCard } from './game_helpers'

class Animation {
    static appearAni(elem) {
        return new Promise((resolve) => {
            let iValue = 0;
            function _appearAni() {
                if (elem.style.opacity >= 1) {
                    clearInterval(startAni);
                    resolve(true);
                } else {
                    iValue += .175;
                }
                elem.style.opacity = iValue;
            }
            let startAni = setInterval(_appearAni, 50);
        });
    };

    static disappearAni(elem) {
        return new Promise((resolve) => {
            let iValue = 1;
            function _disappearAni() {
                if (elem.style.opacity <= 0) {
                    clearInterval(startAni);
                    resolve(true);
                } else {
                    iValue -= .175;
                }
                elem.style.opacity = iValue;
            }
            let startAni = setInterval(_disappearAni, 50);
        });
    };

    static disappearAniDelete(elem) {
        return new Promise((resolve) => {
            let iValue = 1;
            function _disappearAni() {
                if (elem.style.opacity <= 0) {
                    elem.remove();
                    clearInterval(startAni);
                    resolve(true);
                } else {
                    iValue -= .1;
                }
                elem.style.opacity = iValue;
            }
            let startAni = setInterval(_disappearAni, 50);
        });
    };

    static gameAni() {
        const blankCard = getBlankCard();
        return new Promise((resolve) => {
            setTimeout(() => {
                blankCard.setAttribute('class', 'card rock')
            }, 500)
            setTimeout(() => {
                blankCard.setAttribute('class', 'card paper')
            }, 1500)
            setTimeout(() => {
                blankCard.setAttribute('class', 'card scissors')
            }, 2500)
            setTimeout(() => {
                blankCard.setAttribute('class', 'card shoot')
            }, 3500)
            setTimeout(() => {
                blankCard.hidden = true
                blankCard.setAttribute('class', 'card')
                resolve(true)
            }, 4500)
        }) 
    }

    static createWarningCanvas() {
        const warningText = document.getElementById('handpose-require-text')
        if (warningText) return
        const videoContainer = document.getElementsByClassName("video-container")[0];
        const text = document.createElement("P");
        text.innerText = "please keep hand in frame";
        text.setAttribute('id', "handpose-require-text");
        videoContainer.append(text);
        return true;
    }

    static removeWarningCanvas()  {
        const text = document.getElementById("handpose-require-text");
        if (text) { 
            text.style.opacity = 0;
            text.remove();
        }
        return true;
    }

}

export { Animation }


