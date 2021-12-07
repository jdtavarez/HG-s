import { hands } from './hand_rec_model'

let handInfo;

function videoCallback() {
    const canvas = document.getElementById('stream-overlay');
    canvas.width = 1280;
    canvas.height = 720;
    const canvasCtx = canvas.getContext('2d')
    const video = document.getElementById('stream');

    function onResults(results) {
        canvasCtx.save();
        canvasCtx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
        if (results.multiHandLandmarks) {
            for (const landmarks of results.multiHandLandmarks) {
                drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                    { color: '#00A36C', lineWidth: 5 });
                drawLandmarks(canvasCtx, landmarks, { color: '#c54b8c', lineWidth: 2 });
            }
        }
        canvasCtx.restore();
        handInfo = results;
    };

    hands.onResults(onResults);

    const camera = new Camera(video, {
        onFrame: async () => {
            await hands.send({ image: video });
        },
        width: 1280,
        height: 720
    })
    camera.start();
}

export { videoCallback, handInfo }