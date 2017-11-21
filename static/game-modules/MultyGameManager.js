"use strict";

import SceneRenderer from "./SceneRenderer.js";
import ObjectsCreater from "./ObjectsCreater.js";
import RequestToHost from "../modules/RequestToHost.js";
import Debugger from "../modules/Debugger.js";
import MultyPlayPage from "../views/multyplay-page/MultyPlayPage.js";

const keyCodes = {
    KEY_A_KEY_CODE: 65,
    KEY_D_KEY_CODE: 68
};

const BACKGROUND_COLOR_SCENE = "#c1ff65";

export default class MultyGameManager {

    addEventsToKey() {
        this.keyA = false;
        this.keyD = false;
        window.addEventListener("keydown", (event) => {
            const k = event.keyCode;

            switch(k){
            case keyCodes.KEY_A_KEY_CODE:
                this.keyA = true;
                break;
            case keyCodes.KEY_D_KEY_CODE:
                this.keyD = true;
                break;
            }
        });

        window.addEventListener("keyup", (event) => {
            const k = event.keyCode;

            switch(k){
            case keyCodes.KEY_A_KEY_CODE:
                this.keyA = false;
                break;
            case keyCodes.KEY_D_KEY_CODE:
                this.keyD = false;
                break;
            }
        });
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
            if (this.keyA === true && this.keyD === false) {
                angleXZ -= deltaAngle;
                cameraX = radius * Math.cos(angleXZ);
                cameraZ = radius * Math.sin(angleXZ);
                this.setCameraPosition(cameraX, cameraY, cameraZ);
            }
            if (this.keyD === true) {
                // off A key
                this.keyA = false;
                angleXZ += deltaAngle;
                cameraX = radius * Math.cos(angleXZ);
                cameraZ = radius * Math.sin(angleXZ);
                this.setCameraPosition(cameraX, cameraY, cameraZ);
            }
        }, 50);
    }


    /////////////////////////////////////////////////

    constructor(width, height, playFieldName) {
        this.width = width;
        this.height = height;
        this.score = 0;
        this.scoreEnemy = 0;

        this.initScene(width, height, playFieldName);
        this.sceneRenderer = new SceneRenderer(this.renderer, this.scene, this.camera);

        this.addClicksToBubbles();
        this.addEventsToKey();
    }

    start() {
        // default A
        this.keyA = true;
        this.keyD = false;
        this.sceneRenderer.startRendering();
        this.objectsCreater = new ObjectsCreater(this.scene);
        MultyPlayPage.printScore(this.score, this.scoreEnemy);

        this.bubbles = [];
        this.idArr = [];
        this.socketWorking();

        this.addCameraMovement();
        this.addBubbleGrowing();
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
                    this.stop();
                    alert("Game over!");
                }
            }
        }, 100);
    }

    socketWorking() {
        this.socket = new WebSocket("wss://bubblerise-backend.herokuapp.com/game");
        // let opened = false;
        //
        //
        //

        this.socket.onopen = () => {
            console.log("Соединение установлено");
            // opened = true;
        };

        this.socket.onclose = () => {
            console.log("Соединение закрыто");
            // opened = false;
        };

        this.socket.onerror = () =>  {
            console.log("Ошибка сокета");
            // opened = false;
        };

        this.socket.onmessage = (event) =>  {
            let message = event.data.toString();
            let content = JSON.parse(message);
            console.log(content);

            // console.log(this.score + "   " + this.scoreEnemy);

            if (content.class === "NewBubbles") {
                let newBubbles = content.bubbles;
                newBubbles.forEach((myBubble) => {
                    const xx = myBubble.coords.x;
                    const yy = myBubble.coords.y;
                    const zz = myBubble.coords.z;

                    const bubble = this.objectsCreater.createResultSphere(xx, yy, zz);
                    bubble.scale.x = myBubble.radius;
                    bubble.scale.y = myBubble.radius;
                    bubble.scale.z = myBubble.radius;

                    this.bubbles.push(bubble);
                    this.idArr.push(myBubble.id);
                });
            }

            if (content.class === "BurstingBubbles") {
                this.score = content.currentPlayerScore;
                this.scoreEnemy = content.enemyScore;
                MultyPlayPage.printScore(this.score, this.scoreEnemy);
                let killedBubbles = content.burstingBubbleIds;
                killedBubbles.forEach((myBubble) => {
                    const id = myBubble.burstingBubbleId;
                    const numberOfKilledBubble = this.idArr.indexOf(id);

                    if (numberOfKilledBubble !== -1) {
                        const bubbleObject = this.bubbles[numberOfKilledBubble];
                        this.scene.remove(bubbleObject);

                        this.bubbles.splice(numberOfKilledBubble, 1);
                        this.idArr.splice(numberOfKilledBubble, 1);
                    }
                });
            }

            Debugger.print("Bubbles number: " + this.bubbles.length);
            Debugger.print("Scene objects number: " + this.scene.children.length);
            console.log("Bubbles number: " + this.bubbles.length);
            console.log("Id array length: " + this.idArr.length);
            console.log("Scene objects number: " + this.scene.children.length);
        };
    }

    /////////////////////////////////////////////////


    addClicksToBubbles() {
        let raycaster = new THREE.Raycaster();
        let mouse = new THREE.Vector2();

        this.playField.addEventListener("click", (event) => {
            const width = this.width;
            const height = this.height;

            const xMouse = event.offsetX;
            const yMouse = event.offsetY;

            mouse.x = (xMouse / width) * 2 - 1;
            mouse.y = - (yMouse / height) * 2 + 1;
            raycaster.setFromCamera(mouse, this.camera);

            let intersects = raycaster.intersectObjects(this.scene.children);

            if (intersects.length > 0) {
                let answer = intersects[0];
                console.log("KILL BALL");

                if (answer.object !== this.objectsCreater.getCube() && answer.object !== this.objectsCreater.getCubeFrame()) {
                    let index = 0;

                    for (let i = 0; i < this.bubbles.length; i++) {
                        if (answer.object === this.bubbles[i]) {
                            index = i;
                            break;
                        }
                    }

                    this.scene.remove(answer.object);

                    const deleteNumber = this.idArr[index];
                    // { "class":"ClientSnap", "burstingBubbleId": 110 }
                    this.socket.send(JSON.stringify({class: "ClientSnap", burstingBubbleId: deleteNumber}));
                    console.log(JSON.stringify({burstingBubbleId: deleteNumber}));
                    this.bubbles.splice(index, 1);
                    this.idArr.splice(index, 1);

                    // this.score += 1;
                    // MultyPlayPage.printScore(this.score);
                    // document.querySelector(".multypanel__score-box").innerHTML = this.score;
                }
            }
            console.log("Bubbles number: " + this.bubbles.length);
            console.log("Id array length: " + this.idArr.length);
            console.log("Scene objects number: " + this.scene.children.length);
        });
    }

    sendRequestToSaveScore() {
        RequestToHost.singlescore(this.score, (err) => {
            if (err) {
                return Debugger.print("User don't authorise");
            }
        });
    }

    stop() {
        this.sceneRenderer.stopRendering();
        clearInterval(this.cameraMoveInterval);
        clearInterval(this.growingInterval);

        while(this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }

        this.bubbles = [];
        this.idArr = [];
        // this.sendRequestToSaveScore();
        this.score = 0;
        this.scoreEnemy = 0;
        try {
            this.socket.close();
        } catch(e) {
            // err
        }
        Debugger.print("Bubbles number: " + this.bubbles.length);
        Debugger.print("Scene objects number: " + this.scene.children.length);
    }
}
