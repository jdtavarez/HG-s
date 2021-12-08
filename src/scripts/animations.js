class Animation {

    static appearAni(elem) {
        let iValue = 0;
        function _appearAni() {
            const flag = true;
            if (elem.style.opacity > 1) {
                clearInterval(startAni);
                return flag;
            } else {
                iValue += .1;
            }
            elem.style.opacity = iValue;
        }
        let startAni = setInterval(_appearAni, 50);
        return startAni;
    };

    static disappearAni(elem) {
        let iValue = 1;
        function _disappearAni() {
            const flag = true;
            if (elem.style.opacity < 0) {
                clearInterval(startAni);
                return flag;
            } else {
                iValue -= .025;
            }
            elem.style.opacity = iValue;
        }
        let startAni = setInterval(_disappearAni, 50);
        return startAni;
    };
}

export { Animation }


