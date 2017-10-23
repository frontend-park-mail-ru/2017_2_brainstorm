"use strict";

import SceneRenderer from "./SceneRenderer.js";
import ObjectsCreater from "./ObjectsCreater.js";
import RequestToHost from "../modules/RequestToHost.js"
import Debugger from "../modules/Debugger.js";
import PlayPage from "../views/play-page/PlayPage.js";

export default class GameManager {

    constructor(ww, hh, playFieldName) {
        this.ww = ww;
        this.hh = hh;
        this.initScene(ww, hh, playFieldName);
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
                case 65:
                    this.keyA = true;
                    break;
                case 68:
                    this.keyD = true;
                    break;
            }
        };

        window.onkeyup = (event) => {
            const k = event.keyCode;

            switch(k){
                case 65:
                    this.keyA = false;
                    break;
                case 68:
                    this.keyD = false;
                    break;
            }
        }
    }

    start() {
        this.sceneRenderer.startRendering();
        this.objectsCreater = new ObjectsCreater(this.scene);
        this.addCameraMovement();
        this.addObjectsGeneration();
        this.addBubbleGrowing();
        PlayPage.printScore(this.score);
    }

    initScene(ww, hh, playFieldName) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, ww / hh, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor("#ffbe74");
        this.renderer.setSize(ww, hh);
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
            if (this.keyA === true){
                angleXZ -= deltaAngle;
                cameraX = radius * Math.cos(angleXZ);
                cameraZ = radius * Math.sin(angleXZ);
                this.setCameraPosition(cameraX, cameraY, cameraZ);
            }
            if (this.keyD === true){
                angleXZ += deltaAngle;
                cameraX = radius * Math.cos(angleXZ);
                cameraZ = radius * Math.sin(angleXZ);
                this.setCameraPosition(cameraX, cameraY, cameraZ);
            }
        }, 50);
    }

    addObjectsGeneration() {
        this.bubbles = [];

        Debugger.print("Scene objects number: " + this.scene.children.length);

        function getRandomInteger(){
           return (parseInt(Math.random() * 1000000) % 6) + 1;
        }

        function getRandomPosition(){
            return (parseInt(Math.random() * 1000000) % 9) + Math.random() - 4.5;
        }

        this.generationInterval = setInterval(() => {
            const side = getRandomInteger();

            let xx = null;
            let yy = null;
            let zz = null;

            switch(side) {
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

        }, 1000);
    }

    addBubbleGrowing() {
        const scaleDelta = 0.02;

        this.growingInterval = setInterval(() => {
            for(let i = 0; i < this.bubbles.length; i++){
                const bubble = this.bubbles[i];
                bubble.scale.x += scaleDelta;
                bubble.scale.y += scaleDelta;
                bubble.scale.z += scaleDelta;

                if(bubble.scale.x >= 4) {
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
            const ww = this.ww;
            const hh = this.hh;

            const xMouse = event.offsetX;
            const yMouse = event.offsetY;

            mouse.x = ( xMouse / ww ) * 2 - 1;
            mouse.y = - ( yMouse / hh ) * 2 + 1;
            raycaster.setFromCamera( mouse, this.camera );

            let intersects = raycaster.intersectObjects( this.scene.children );

            if ( intersects.length > 0 ) {
                let answer = intersects[0];

                if(answer.object !== this.objectsCreater.getCube() && answer.object !== this.objectsCreater.getCubeFrame()) {
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
            return Debugger.print("User don't authorise")
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