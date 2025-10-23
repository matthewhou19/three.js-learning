import * as THREE from "three";

function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    75, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near clipping plane
    1000 // Far clipping plane
  );

  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);

  return camera;
}

export { createCamera };
