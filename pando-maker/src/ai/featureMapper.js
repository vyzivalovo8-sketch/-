export function mapFeaturesToAvatar(features) {
  if (!features) {
    return {
      eyeScale: 1,
      headScaleX: 1,
      noseScale: 1,
      headRotation: 0,
    };
  }

  return {
    eyeScale: 0.95 + features.eyeDistance,
    headScaleX: 0.8 + features.faceWidth,
    noseScale: 0.8 + features.noseSize * 2,
    headRotation: features.eyeAngle * 0.5,
  };
}
