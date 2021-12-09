class Animation {
    static appearAni(elem) {
        let iValue = 0;
        function _appearAni() {
            // const flag = true;
            if (elem.style.opacity >= 1) {
                clearInterval(startAni);
                // return flag;
            } else {
                iValue += .1;
            }
            elem.style.opacity = iValue;
        }
        let startAni = setInterval(_appearAni, 50);
        return true;
    };

    static disappearAni(elem) {
        let iValue = 1;
        function _disappearAni() {
            // const flag = true;
            if (elem.style.opacity <= 0) {
                clearInterval(startAni);
                // return flag;
            } else {
                iValue -= .035;
            }
            elem.style.opacity = iValue;
        }
        let startAni = setInterval(_disappearAni, 50);
        // return startAni;
        return true;
    };

    static disappearAniDelete(elem) {
        let iValue = 1;
        function _disappearAni() {
            const flag = true;
            if (elem.style.opacity <= 0) {
                clearInterval(startAni);
                elem.remove();
                return flag;
            } else {
                iValue -= .035;
            }
            elem.style.opacity = iValue;
        }
        let startAni = setInterval(_disappearAni, 50);
        return startAni;
    };


    // static gameAni() {
    //     // const canvas = document.getElementById("game-ani");
    //     // canvas.width = 1126.4;
    //     // canvas.height = 633.6;
    //     // const canvasCtx = canvas.getContext("2d");
    //     // let words = ['ROCK', 'PAPER', 'SCISSORS', 'SHOOT'];
    //     const img = document.getElementById("blank-card");

    //     // canvasCtx.drawImage(img, 40, 40, 107.25, 150);
    //     // setTimeout(canvasCtx.clearRect(0, 0, canvas.width, canvas.height), 10000);
    //     return true;
    // }

    static createWarningCanvas() {
        const bCanvas = document.getElementById("handpose-require");
        const bCtx = bCanvas.getContext("2d");
        bCtx.beginPath();
        bCtx.rect(0, 0, bCanvas.width, bCanvas.height);
        bCtx.fillStyle = "olive";
        bCtx.fill();
        bCtx.closePath();

        const videoContainer = document.getElementsByClassName("video-container")[0];

        const text = document.createElement("P");
        text.innerText = "please keep hand in frame";
        text.setAttribute('id', "handpose-require-text");
        text.style.opacity = 0;
        videoContainer.append(text);
        Animation.appearAni(text);
        return true;
    }

    static removeWarningCanvas()  {
        const text = document.getElementById("handpose-require-text");
        setTimeout(_removeWarningCanvas, 1375);
        Animation.disappearAniDelete(text);
        function  _removeWarningCanvas() {
            const bCanvas = document.getElementById("handpose-require");
            const bCtx = bCanvas.getContext("2d");
            bCtx.clearRect(0, 0, bCanvas.width, bCanvas.height);
        };
        return true;
    }
}

export { Animation }


