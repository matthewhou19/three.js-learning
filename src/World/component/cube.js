import * as THREE from 'three';

function createCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        roughness: 0.5,
        metalness: 0.5
    });
    const cube = new THREE.Mesh(geometry, material);

    // Animation tick function
    cube.tick = () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    };

    return cube;
}

export { createCube };
