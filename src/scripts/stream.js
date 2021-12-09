import { hands } from './hand_rec_model'
import { Animation } from './animations'

let handInfo;

function videoCallback() {
    const canvas = document.getElementById('stream-overlay');
    canvas.width = 1126.4;
    canvas.height = 633.6;
    const canvasCtx = canvas.getContext('2d')
    const video = document.getElementById('stream');
    function onResults(results) {
        canvasCtx.save();
        canvasCtx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
        if (results.multiHandLandmarks) {
            for (const landmarks of results.multiHandLandmarks) {
                drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                    { color: '#222561', lineWidth: 2});
                drawLandmarks(canvasCtx, landmarks, { color: '#FF6347', lineWidth: 1 });
            }
        }
        canvasCtx.restore();
        handInfo = results;
        let body = document.getElementById("body");
        let status = body.getAttribute("state");
        const hCanvas = document.getElementById('handpose-require')
        const hCtx = hCanvas.getContext('2d')
        if (!handInfo.multiHandLandmarks[0] && status) {
            hCtx.save();
            Animation.createWarningCanvas();
        }
        if (handInfo.multiHandLandmarks[0] && status) {
            Animation.removeWarningCanvas();
            hCtx.save();
        }
    };

    hands.onResults(onResults);

    const camera = new Camera(video, {
        onFrame: async () => {
            await hands.send({ image: video });
        },
        width: 1088,
        height: 633.6,
    })
    camera.start();
}

export { videoCallback, handInfo }