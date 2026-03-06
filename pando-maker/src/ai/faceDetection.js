import * as faceapi from 'face-api.js';

let modelsLoaded = false;

export async function ensureModelsLoaded() {
  if (modelsLoaded) return;

  const modelUrl = '/models';
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(modelUrl),
    faceapi.nets.faceLandmark68TinyNet.loadFromUri(modelUrl),
  ]);

  modelsLoaded = true;
}

export async function detectFaceFeatures(imageElement) {
  await ensureModelsLoaded();

  const result = await faceapi
    .detectSingleFace(imageElement, new faceapi.TinyFaceDetectorOptions({ inputSize: 320 }))
    .withFaceLandmarks(true);

  if (!result) return null;

  const { landmarks, detection } = result;
  const box = detection.box;
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();
  const nose = landmarks.getNose();

  const eyeCenter = (eye) => eye.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
  const l = eyeCenter(leftEye);
  const r = eyeCenter(rightEye);
  const lCenter = { x: l.x / leftEye.length, y: l.y / leftEye.length };
  const rCenter = { x: r.x / rightEye.length, y: r.y / rightEye.length };

  const eyeDistance = Math.hypot(rCenter.x - lCenter.x, rCenter.y - lCenter.y) / box.width;
  const eyeAngle = Math.atan2(rCenter.y - lCenter.y, rCenter.x - lCenter.x);

  const noseWidth = Math.abs(nose[0].x - nose[nose.length - 1].x) / box.width;

  return {
    eyeDistance,
    eyeAngle,
    noseSize: noseWidth,
    faceWidth: box.width / imageElement.width,
  };
}
