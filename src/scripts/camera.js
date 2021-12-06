class Handposition {
    constructor(results) {
        this.positions = results.multiHandLandmarks[0];
        this.handed = results.multiHandedness[0].label === 'Right' ? 'Left' : 'Right'
        this.axis = this.handAxisXYZ();
        this.fingers = {
            firstOpen: undefined,
            secondOpen: undefined,
            thirdOpen: undefined,
            fourthOpen: undefined,
            fifthOpen: undefined
        };
        this.fingersIsOpen();
        this.pose = this.pose();
    };


    // hand position will determine conditions for evaulating overall pose
    handAxisXYZ() {
        const palmBase = this.positions[0];
        const secondFingerTip = this.positions[9];

        let axisDistances = new Map();
        axisDistances.set(Math.abs(palmBase.x - secondFingerTip.x), 'x');
        axisDistances.set(Math.abs(palmBase.y - secondFingerTip.y), 'y');
        axisDistances.set(Math.abs(palmBase.z - secondFingerTip.z), 'z');

        const distancesArray = Array.from(axisDistances.keys());
        const maxDistance = Math.max(...distancesArray);

        return axisDistances.get(maxDistance);
    };


    fingersIsOpen() {
        const hand = this;

        const first = this.positions.slice(5, 9);
        const second = this.positions.slice(9, 13);
        const third = this.positions.slice(13, 17);
        const fourth = this.positions.slice(17, 21);
        const fifth = this.positions.slice(1, 5);

        const fingers = [first, second, third, fourth, fifth];

        let pointOne;
        let pointTwo;

        // camera is mirrored so x axis increases from right towards the left
        if (hand.handed === 'Right' && hand.axis === 'x') {
            [pointOne, pointTwo] = [1, 3];
        } else {
            [pointOne, pointTwo] = [3, 1];
        }

        // thumb position is generally orthogonal to hand
        // preserving value of pointOne & pointTwo is unnecessary, so they can
        // be reset as needed; 
        function fifthOpen() {
            const fifthAxis = (hand.axis !== 'y' ? 'y' : 'x')
            if (hand.handed === 'Right' && hand.axis === 'x') {
                [pointOne, pointTwo] = [2, 3];
            } else {
                [pointOne, pointTwo] = [3, 2];
            }
            const fifthBool = fifth[pointOne][fifthAxis] < fifth[pointTwo][fifthAxis];
            return fifthBool;
        }

        fingers.forEach((e, i) => {
            const openBool =
                e[pointOne][`${hand.axis}`] < e[pointTwo][`${hand.axis}`];

            if (i === 0) {
                hand.fingers['firstOpen'] = openBool;
            } else if (i === 1) {
                hand.fingers['secondOpen'] = openBool;
            } else if (i === 2) {
                hand.fingers['thirdOpen'] = openBool;
            } else if (i === 3) {
                hand.fingers['fourthOpen'] = openBool;
            } else {
                hand.fingers['fifthOpen'] = fifthOpen();
            }
        })
    };


    pose() {
        let pose;

        const rock = (!this.fingers['firstOpen']
            && !this.fingers['secondOpen']
            && !this.fingers['thirdOpen']
            && !this.fingers['fourthOpen']
            && !this.fingers['fifthOpen']);

        const paper = (this.fingers['firstOpen']
            && this.fingers['secondOpen']
            && this.fingers['thirdOpen']
            && this.fingers['fourthOpen']
            && this.fingers['fifthOpen']);


        const scissors = (this.fingers['firstOpen']
            && this.fingers['secondOpen']
            && !this.fingers['thirdOpen']
            && !this.fingers['fourthOpen']
            && !this.fingers['fifthOpen'])
            || (this.fingers['firstOpen']
                && !this.fingers['secondOpen']
                && !this.fingers['thirdOpen']
                && !this.fingers['fourthOpen']
                && this.fingers['fifthOpen']);

        if (rock) { pose = 'rock' }
        else if (paper) { pose = 'paper' }
        else if (scissors) { pose = 'scissors' }
        else { pose = 'unsure' }

        return pose;
    };
};

let handposition;

document.addEventListener("DOMContentLoaded", () => {

    const stream = document.getElementById('stream');
    const canvas = document.getElementById('stream-overlay');
    canvas.width = 1280;
    canvas.height = 720;
    const canvasCtx = canvas.getContext('2d');

    const hands = new Hands({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
    });

    hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 0,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    function onResults(results) {
        canvasCtx.save();
        canvasCtx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
        if (results.multiHandLandmarks) {
            handposition = new Handposition(results);
            for (const landmarks of results.multiHandLandmarks) {
                drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                    { color: '#00A36C', lineWidth: 5 });
                drawLandmarks(canvasCtx, landmarks, { color: '#c54b8c', lineWidth: 2 });
            }
        }
        canvasCtx.restore();
    };
    
    hands.onResults(onResults);
    

    const camera = new Camera(stream, {
        onFrame: async () => {
            await hands.send({ image: stream });
        },
        width: 1280,
        height: 720
    });

    camera.start();

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
});