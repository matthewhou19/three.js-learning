import * as THREE from 'three';

function createHelpers() {
    // Create axes helper (red = X, green = Y, blue = Z)
    // Size increased to 10 for better visibility
    const axesHelper = new THREE.AxesHelper(10);

    // Create grid helper for the ground plane
    const gridHelper = new THREE.GridHelper(10, 10);

    return { axesHelper, gridHelper };
}

export { createHelpers };