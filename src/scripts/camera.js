import { async } from "regenerator-runtime";
export { model, captureSetup }

// import the model
const model = handPoseDetection.SupportedModels.MediaPipeHands;

// lite version of the model
const detectorConfig = { runtime: 'tfjs', modelType: 'lite' };

document.addEventListener("DOMContentLoaded", captureSetup);
async function captureSetup() {

    // Set up stream using MediaStream object 
    const camera = await navigator.mediaDevices.getUserMedia({ video: true });
    const stream = document.getElementById('stream');
    stream.srcObject = camera;

    const detector = await handPoseDetection.createDetector(model, detectorConfig);
    const hands = await detector.estimateHands(stream)
};

