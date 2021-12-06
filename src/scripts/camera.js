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
        canvasCtx.save();
        canvasCtx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
        if (results.multiHandLandmarks) {
            let handposition = new Handposition(results);
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