"use strict";

import SceneRenderer from "./SceneRenderer.js";
import ObjectsCreater from "./ObjectsCreater.js";
import RequestToHost from "../modules/RequestToHost.js";
import Debugger from "../modules/Debugger.js";
import PlayPage from "../views/play-page/PlayPage.js";
import MultyPlayPage from "../views/multyplay-page/MultyPlayPage.js";

const keyCodes = {
    KEY_A_KEY_CODE: 65,
    KEY_D_KEY_CODE: 68
};

const cubeSides = {
    FIRST_SIDE: 1,
    SECOND_SIDE: 2,
    THIRD_SIDE: 3,
    FOURTH_SIDE: 4
};

const BACKGROUND_COLOR_SCENE = "#ffbe74";

export default class GameManager {

    constructor(mode, width, height, playFieldName) {
        this.mode = mode;
        this.width = width;
        this.height = height;
        this.initScene(width, height, playFieldName);
        this.sceneRenderer = new SceneRenderer(this.renderer, this.scene, this.camera);
        this.addClicksToBubbles();
        this.addEventsToKey();
        this.score = 0;
        this.scoreEnemy = 0;
    }

    addEventsToKey() {
        this.keyA = false;
        this.keyD = false;
        window.addEventListener("keydown", (event) => {
            const k = event.keyCode;

            switch (k) {
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

            switch (k) {
            case keyCodes.KEY_A_KEY_CODE:
                this.keyA = false;
                break;
            case keyCodes.KEY_D_KEY_CODE:
                this.keyD = false;
                break;
            }
        });
    }

    start() {
        // default A
        this.keyA = true;
        this.keyD = false;
        this.sceneRenderer.startRendering();
        this.objectsCreater = new ObjectsCreater(this.scene);
        this.bubbles = [];
        this.idArr = [];
        this.score = 0;
        this.scoreEnemy = 0;
        this.addCameraMovement();
        this.addBubbleGrowing();
        if (this.mode) {
            MultyPlayPage.printScore(this.score, this.scoreEnemy);
            this.socketWorking();
        } else {
            PlayPage.printScore(this.score);
            this.addBubblesGeneration();
        }
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
                (maxCount > 8) ? maxCount -= 0.1 : "";

                const side = getRandomInteger();

                let xx = null;
                let yy = null;
                let zz = null;

                switch (side) {
                case cubeSides.FIRST_SIDE:
                    xx = getRandomPosition();
                    yy = getRandomPosition();
                    zz = -4.5;
                    break;
                case cubeSides.THIRD_SIDE:
                    xx = getRandomPosition();
                    yy = getRandomPosition();
                    zz = 4.5;
                    break;
                case cubeSides.SECOND_SIDE:
                    xx = 4.5;
                    yy = getRandomPosition();
                    zz = getRandomPosition();
                    break;
                case cubeSides.FOURTH_SIDE:
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
            for (let i = 0; i < this.bubbles.length; i++) {
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

    addClicksToBubbles() {
        let raycaster = new THREE.Raycaster();
        let mouse = new THREE.Vector2();

        this.playField.addEventListener("click", (event) => {
            const width = this.width;
            const height = this.height;

            const xMouse = event.offsetX;
            const yMouse = event.offsetY;

            mouse.x = (xMouse / width) * 2 - 1;
            mouse.y = -(yMouse / height) * 2 + 1;
            raycaster.setFromCamera(mouse, this.camera);

            let intersects = raycaster.intersectObjects(this.scene.children);

            if (intersects.length > 0) {
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

                    if (this.mode) {
                        const deleteNumber = this.idArr[index];
                        this.socket.send(JSON.stringify({class: "ClientSnap", burstingBubbleId: deleteNumber}));
                        Debugger.print(JSON.stringify({burstingBubbleId: deleteNumber}));
                        this.bubbles.splice(index, 1);
                        this.idArr.splice(index, 1);
                    } else {
                        this.bubbles.splice(index, 1);
                        this.score += 1;
                        PlayPage.printScore(this.score);
                    }
                }
            }
            Debugger.print("Bubbles number: " + this.bubbles.length);
            Debugger.print("Scene objects number: " + this.scene.children.length);
        });
    }

    socketWorking() {
        this.socket = new WebSocket("wss://bubblerise-backend.herokuapp.com/game");

        this.socket.onopen = () => {
            console.log("Соединение установлено");
        };

        this.socket.onclose = () => {
            console.log("Соединение закрыто");
        };

        this.socket.onerror = () => {
            console.log("Ошибка сокета");
        };

        this.socket.onmessage = (event) => {
            let message = event.data.toString();
            let content = JSON.parse(message);
            Debugger.print(content);

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
            Debugger.print("Id array length: " + this.idArr.length);
            Debugger.print("Scene objects number: " + this.scene.children.length);
        };
    }

    sendRequestToSaveScore() {
        RequestToHost.singlescore(this.score, (err) => {
            if (err) {
                let myScore = localStorage.getItem("myScore");
                if (this.score > parseInt(myScore)) {
                    localStorage.setItem("myScore", this.score);
                    console.log("2 = " + err);
                }
                Debugger.print("User don't authorise");
                return null;
            }
            let previousScore = parseInt(localStorage.getItem("myScore"));
            RequestToHost.singlescore(previousScore, (err) => {
                if (err) {
                    Debugger.print("Cant load to host");
                    return null;
                }
                localStorage.setItem("myScore", 0);
            });
        });
    }

    stop() {
        this.sceneRenderer.stopRendering();
        clearInterval(this.cameraMoveInterval);
        clearInterval(this.growingInterval);
        if (!this.mode) {
            clearInterval(this.generationInterval);
        }

        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }

        this.bubbles = [];
        this.idArr = [];
        if (this.mode) {
            try {
                this.socket.close();
            } catch (e) {
                // err
            }
        } else {
            this.sendRequestToSaveScore();
        }

        Debugger.print("Bubbles number: " + this.bubbles.length);
        Debugger.print("Scene objects number: " + this.scene.children.length);
    }
}
