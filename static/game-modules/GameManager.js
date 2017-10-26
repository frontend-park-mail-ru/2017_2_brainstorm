"use strict";

import SceneRenderer from "./SceneRenderer.js";
import ObjectsCreater from "./ObjectsCreater.js";
import RequestToHost from "../modules/RequestToHost.js"
import Debugger from "../modules/Debugger.js";
import PlayPage from "../views/play-page/PlayPage.js";

const keyCodes = {
    KEY_A_KEY_CODE: 65,
    KEY_D_KEY_CODE: 68
};

const BACKGROUND_COLOR_SCENE = "#ffbe74";

export default class GameManager {

    constructor(width, height, playFieldName) {
        this.width = width;
        this.height = height;
        this.initScene(width, height, playFieldName);
        this.sceneRenderer = new SceneRenderer(this.renderer, this.scene, this.camera);
        this.addClicksToBubbles();
        this.addEventsToKey();
        this.score = 0;
    }

    addEventsToKey() {
        this.keyA = false;
        this.keyD = false;

        window.onkeydown = (event) => {
            const k = event.keyCode;

            switch(k){
                case keyCodes.KEY_A_KEY_CODE:
                    this.keyA = true;
                    break;
                case keyCodes.KEY_D_KEY_CODE:
                    this.keyD = true;
                    break;
            }
        };

        window.onkeyup = (event) => {
            const k = event.keyCode;

            switch(k){
                case keyCodes.KEY_A_KEY_CODE:
                    this.keyA = false;
                    break;
                case keyCodes.KEY_D_KEY_CODE:
                    this.keyD = false;
                    break;
            }
        }
    }

    start() {
        this.keyA = false;
        this.keyD = false;
        this.sceneRenderer.startRendering();
        this.objectsCreater = new ObjectsCreater(this.scene);
        this.addCameraMovement();
        this.addBubblesGeneration();
        this.addBubbleGrowing();
        PlayPage.printScore(this.score);
    }

    initScene(width, height, playFieldName) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(BACKGROUND_COLOR_SCENE);
        this.renderer.setSize(width, height);
        this.playField = document.querySelector(playFieldName);
        this.playField.append(this.renderer.domElement);
    }

    setCameraPosition(xx, yy, zz) {
        const camera = this.camera;
        camera.position.x = xx;
        camera.position.y = yy;
        camera.position.z = zz;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    addCameraMovement() {
        const radius = 20;
        const deltaAngle = 0.05;

        let cameraX = radius;
        let cameraY = 0;
        let cameraZ = 0;
        let angleXZ = 0;

        this.setCameraPosition(cameraX, cameraY, cameraZ);

        this.cameraMoveInterval = setInterval(() => {
            if (this.keyA === true) {
                angleXZ -= deltaAngle;
                cameraX = radius * Math.cos(angleXZ);
                cameraZ = radius * Math.sin(angleXZ);
                this.setCameraPosition(cameraX, cameraY, cameraZ);
            }
            if (this.keyD === true) {
                angleXZ += deltaAngle;
                cameraX = radius * Math.cos(angleXZ);
                cameraZ = radius * Math.sin(angleXZ);
                this.setCameraPosition(cameraX, cameraY, cameraZ);
            }
        }, 50);
    }

    addBubblesGeneration() {
        this.bubbles = [];

        Debugger.print("Scene objects number: " + this.scene.children.length);

        function getRandomInteger() {
           return (parseInt(Math.random() * 1000000) % 4) + 1;
        }

        function getRandomPosition() {
            return (parseInt(Math.random() * 1000000) % 9) + Math.random() - 4.5;
        }

        let countNow = 0;
        let maxCount = 20;

        this.generationInterval = setInterval(() => {
            if (countNow < maxCount) {
                countNow++;
            } else {

                countNow = 0;
                (maxCount > 7) ? maxCount -= 0.1 : "";

                const side = getRandomInteger();

                let xx = null;
                let yy = null;
                let zz = null;

                switch (side) {
                    case 1:
                        xx = getRandomPosition();
                        yy = getRandomPosition();
                        zz = -4.5;
                        break;
                    case 3:
                        xx = getRandomPosition();
                        yy = getRandomPosition();
                        zz = 4.5;
                        break;
                    case 2:
                        xx = 4.5;
                        yy = getRandomPosition();
                        zz = getRandomPosition();
                        break;
                    case 4:
                        xx = -4.5;
                        yy = getRandomPosition();
                        zz = getRandomPosition();
                        break;
                }

                const bubble = this.objectsCreater.createResultSphere(xx, yy, zz);
                this.bubbles.push(bubble);

                Debugger.print("Bubbles number: " + this.bubbles.length);
                Debugger.print("Scene objects number: " + this.scene.children.length);
            }

        }, 50);
    }

    addBubbleGrowing() {
        const scaleDelta = 0.02;

        this.growingInterval = setInterval(() => {
            for(let i = 0; i < this.bubbles.length; i++){
                const bubble = this.bubbles[i];
                bubble.scale.x += scaleDelta;
                bubble.scale.y += scaleDelta;
                bubble.scale.z += scaleDelta;

                if (bubble.scale.x >= 4) {
                    alert("Game over!");
                    this.stop();
                }
            }
        }, 100);
    }

    addClicksToBubbles() {
        let raycaster = new THREE.Raycaster();
        let mouse = new THREE.Vector2();

        this.playField.addEventListener("click", (event) => {
            const width = this.width;
            const height = this.height;

            const xMouse = event.offsetX;
            const yMouse = event.offsetY;

            mouse.x = ( xMouse / width ) * 2 - 1;
            mouse.y = - ( yMouse / height ) * 2 + 1;
            raycaster.setFromCamera( mouse, this.camera );

            let intersects = raycaster.intersectObjects( this.scene.children );

            if ( intersects.length > 0 ) {
                let answer = intersects[0];

                if (answer.object !== this.objectsCreater.getCube() && answer.object !== this.objectsCreater.getCubeFrame()) {
                    let index = 0;

                    for (let i = 0; i < this.bubbles.length; i++) {
                        if (answer.object === this.bubbles[i]) {
                            index = i;
                            break;
                        }
                    }

                    this.scene.remove(answer.object);
                    this.bubbles.splice(index, 1);
                    this.score += 1;
                    PlayPage.printScore(this.score);
                }
            }
            Debugger.print("Bubbles number: " + this.bubbles.length);
            Debugger.print("Scene objects number: " + this.scene.children.length);
        });
    };

    sendRequestToSaveScore() {
        RequestToHost.singlescore(this.score, (err) => {
            if (err) {
                return Debugger.print("User don't authorise")
            }
        })
    }

    stop() {
        this.sceneRenderer.stopRendering();
        clearInterval(this.cameraMoveInterval);
        clearInterval(this.growingInterval);
        clearInterval(this.generationInterval);

        while(this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }

        this.bubbles = [];
        this.sendRequestToSaveScore();
        this.score = 0;
        Debugger.print("Bubbles number: " + this.bubbles.length);
        Debugger.print("Scene objects number: " + this.scene.children.length);
    }
}