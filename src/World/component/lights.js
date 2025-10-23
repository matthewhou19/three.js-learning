import * as THREE from "three";

function createLights() {
  // Create a strong ambient light to illuminate all surfaces
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);

  // Create a point light near the camera
  const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(0, 0, 10);

  return { ambientLight, pointLight };
}

export { createLights };