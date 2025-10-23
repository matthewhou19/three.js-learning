class Resizer {
    constructor(camera, renderer) {
        this.camera = camera;
        this.renderer = renderer;

        // Bind the resize handler
        this.onResize = this.onResize.bind(this);

        // Add event listener
        window.addEventListener('resize', this.onResize);
    }

    onResize() {
        // Update camera aspect ratio
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        // Update renderer size
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    dispose() {
        window.removeEventListener('resize', this.onResize);
    }
}

export { Resizer };
