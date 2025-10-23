import * as THREE from "three";

function createLights() {
  // Create a directional light (simulates sunlight)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);

  return { directionalLight };
}

export { createLights };
