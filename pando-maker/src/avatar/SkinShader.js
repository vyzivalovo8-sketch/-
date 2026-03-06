import * as THREE from 'three';

export function createSkinMaterial(color, glowColor) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.5,
    metalness: 0.1,
    emissive: new THREE.Color(glowColor),
    emissiveIntensity: 0.12,
  });
}
