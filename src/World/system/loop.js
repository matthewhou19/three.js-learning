class Loop {
    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
    }

    // Start the animation loop
    start() {
        this.renderer.setAnimationLoop(() => {
            this.tick();
            this.renderer.render(this.scene, this.camera);
        });
    }

    // Stop the animation loop
    stop() {
        this.renderer.setAnimationLoop(null);
    }

    // Update all animatable objects
    tick() {
        for (const object of this.updatables) {
            if (object.tick) {
                object.tick();
            }
        }
    }
}

export { Loop };