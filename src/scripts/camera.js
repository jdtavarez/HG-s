class Handpose {
    constructor(results) {
        this.positions = results.multiHandLandmarks[0];
        this.orientation = this.horizontal_or_vertical();
        this.axis = this.orientation === 'vertical' ? 'y' : 'x';
        this.handed = results.multiHandedness[0].label === 'Right' ? 'Left' : 'Right';
        this.pose = undefined;
    }

    // hand position will determine conditions for evaulating overall pose
    horizontal_or_vertical() {
        const knuckleIndex = this.positions[5].y;
        const knuckleMiddle = this.positions[9].y;
        const knuckleRing = this.positions[13].y;
        const knucklePinky = this.positions[17].y;

        const knuckleHeights = knuckleIndex + knuckleMiddle + knuckleRing + knucklePinky

        // if knuckleHeights/knuckleIndex ~= 4, then the knuckles are at the same y coordinate 
        const constraint = knuckleHeights / knuckleIndex
        if (Math.round(constraint) === 4) {
            return 'vertical'
        } else {
            return 'horizontal'
        }
    }

    rock() {
        let thumb0 = this.positions[2];
        let thumb1 = this.positions[3];
        let thumb2 = this.positions[4];

        const vertThumbCond = thumb0.x > thumb1.x && thumb0.x > thumb2.x
        const horThumbCond = thumb0.y > thumb1.y && thumb2.y > thumb0.y

        if (vertThumbCond || horThumbCond) return true;
    }

    paper() {

    }

    scissors() {

    }



}



document.addEventListener("DOMContentLoaded", () => {

    const stream = document.getElementById('stream');
    const canvas = document.getElementById('stream-overlay');
    canvas.width = 720;
    canvas.height = 720;
    const canvasCtx = canvas.getContext('2d');

    const hands = new Hands({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
    });

    hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 0,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    function onResults(results) {
        let handpose = new Handpose(results);
        canvasCtx.save();
        canvasCtx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
        if (results.multiHandLandmarks) {
            debugger
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
        width: 720,
        height: 720
    });

    camera.start();
});