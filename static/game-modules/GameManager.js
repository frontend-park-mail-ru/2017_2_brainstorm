"use strict";

import SceneRenderer from "./SceneRenderer.js";
import ObjectsCreater from "./ObjectsCreater.js";

export default class GameManager {

    constructor(ww, hh, playFieldName) {
        this.ww = ww;
        this.hh = hh;
        this.initScene(ww, hh, playFieldName);
        this.sceneRenderer = new SceneRenderer(this.renderer, this.scene, this.camera);
        this.addClicksToBubbles();
        this.addEventsToKey();
    }

    addEventsToKey() {
        this.a = false;
        this.d = false;
        this.w = false;
        this.s = false;

        const t = this;

        window.onkeydown = function(event){
            const k = event.keyCode;

            switch(k){
                case 87:
                    t.w = true;
                    break;
                case 65:
                    t.a = true;
                    break;
                case 83:
                    t.s = true;
                    break;
                case 68:
                    t.d = true;
                    break;
            }
        };

        window.onkeyup = function(event){
            const k = event.keyCode;

            switch(k){
                case 87:
                    t.w = false;
                    break;
                case 65:
                    t.a = false;
                    break;
                case 83:
                    t.s = false;
                    break;
                case 68:
                    t.d = false;
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

    addCameraMovement(){
        const radius = 20;
        const deltaAngle = 0.05;

        let cameraX = radius;
        let cameraY = 0;
        let cameraZ = 0;

        let angleXZ = 0;
        let angleY = 0;

        this.setCameraPosition(cameraX, cameraY, cameraZ);

        this.cameraMoveInterval = setInterval(() => {
            if (this.a === true){
                angleXZ -= deltaAngle;
                cameraX = radius * Math.cos(angleXZ);
                cameraZ = radius * Math.sin(angleXZ);
                this.setCameraPosition(cameraX, cameraY, cameraZ);
            }
            if (this.d === true){
                angleXZ += deltaAngle;
                cameraX = radius * Math.cos(angleXZ);
                cameraZ = radius * Math.sin(angleXZ);
                this.setCameraPosition(cameraX, cameraY, cameraZ);
            }
        }, 50);
    }

    addBubbleGrowing(){
        const scaleDelta = 0.02;

        this.growingInterval = setInterval(() => {
            for(let i = 0; i < this.bubbles.length; i++){
                const bubble = this.bubbles[i];
                bubble.scale.x += scaleDelta;
                bubble.scale.y += scaleDelta;
                bubble.scale.z += scaleDelta;

                if(bubble.scale.x >= 4) {
                    this.stop();
                    alert("Game over!");
                }
            }
        }, 100);
    }

    addClicksToBubbles(){
        let raycaster = new THREE.Raycaster();
        let mouse = new THREE.Vector2();

        this.playField.addEventListener("click", () => {
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

                if(answer.object !== this.objectsCreater.getC1() && answer.object !== this.objectsCreater.getC2()) {
                    let index = 0;

                    for (let i = 0; i < this.bubbles.length; i++) {
                        if (answer.object === this.bubbles[i]) {
                            index = i;
                            break;
                        }
                    }

                    this.scene.remove(answer.object);
                    this.bubbles.splice(index, 1);
                }

            }

            // console.log("Bubbles number: " + this.bubbles.length);
            // console.log("Scene objects number: " + this.scene.children.length);
        });
    };

    addObjectsGeneration(){
        this.bubbles = [];

        console.log("Scene objects number: " + this.scene.children.length);

        function getRandInteger(){
           return (parseInt(Math.random() * 1000000) % 4) + 1;
        }

        function getRandPos(){
            return (parseInt(Math.random() * 1000000) % 7) + Math.random() - 3.5;
        }

        this.generationInterval = setInterval(() => {
            const side = getRandInteger();

            let xx = null;
            let yy = null;
            let zz = null;

            if(side === 1){
                xx = getRandPos();
                yy = getRandPos();
                zz = -3.5;
            }

            if(side === 3){
                xx = getRandPos();
                yy = getRandPos();
                zz = 3.5;
            }

            if(side === 2){
                xx = 3.5;
                yy = getRandPos();
                zz = getRandPos();
            }

            if(side === 4){
                xx = -3.5;
                yy = getRandPos();
                zz = getRandPos();
            }

            const bubble = this.objectsCreater.createResultSphere(xx, yy, zz);
            this.bubbles.push(bubble);

            // console.log("Bubbles number: " + this.bubbles.length);
            // console.log("Scene objects number: " + this.scene.children.length);

        }, 2000);
    }

    stop() {
        this.sceneRenderer.stopRendering();
        clearInterval(this.cameraMoveInterval);
        clearInterval(this.growingInterval);
        clearInterval(this.generationInterval);

        while(this.scene.children.length > 0){
            this.scene.remove(this.scene.children[0]);
        }

        this.bubbles = [];

        console.log("Bubbles number: " + this.bubbles.length);
        console.log("Scene objects number: " + this.scene.children.length);
    }

}