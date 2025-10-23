import { createScene } from './component/scene.js';
import { createCamera } from './component/camera.js';
import { createCube } from './component/cube.js';
import { createLights } from './component/lights.js';
import { createHelpers } from './component/helpers.js';
import { createRenderer } from './system/renderer.js';
import { Resizer } from './system/Resizer.js';
import { Loop } from './system/loop.js';

class World {
    constructor(canvas) {
        this.canvas = canvas;

        // Create core components
        this.scene = createScene();
        this.camera = createCamera();
        this.renderer = createRenderer(canvas);

        // Create the animation loop
        this.loop = new Loop(this.camera, this.scene, this.renderer);

        // Set up resizer
        this.resizer = new Resizer(this.camera, this.renderer);

        // Create and add lights
        const { ambientLight, pointLight } = createLights();
        this.scene.add(ambientLight, pointLight);

        // Create and add helpers for debugging
        const { axesHelper, gridHelper } = createHelpers();
        this.scene.add(axesHelper, gridHelper);

        // Create and add objects
        const cube = createCube();
        this.scene.add(cube);

        // Add to loop updatables for animation
        this.loop.updatables.push(cube);
    }

    // Start the animation loop
    start() {
        this.loop.start();
    }

    // Stop the animation loop
    stop() {
        this.loop.stop();
    }

    // Clean up resources
    dispose() {
        this.stop();
        this.resizer.dispose();
    }
}

export { World };
