"use strict";

export default class SceneRenderer {

    constructor(renderer, scene, camera) {
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
    }

    startRendering() {
        this.repeatInterval = setInterval(() => {
            this.renderer.render(this.scene, this.camera);
        }, 50);
    }

    stopRendering() {
        clearInterval(this.repeatInterval);
    }
}