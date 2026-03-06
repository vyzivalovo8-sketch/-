import * as THREE from 'three';

export function createBioluminescenceMaterial(glowColor) {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(glowColor),
    emissive: new THREE.Color(glowColor),
    emissiveIntensity: 1,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
  });
}
