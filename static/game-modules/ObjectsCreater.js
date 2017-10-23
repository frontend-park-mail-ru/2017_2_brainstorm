"use strict";

export default class ObjectsCreater {

    constructor(scene) {
        this.scene = scene;
        this.size = 7;
        this.bubbleRadius = 0.5;
        this.createStaticObjects();
    }

    getCubeSize() {
        return this.size;
    }

    getCube() {
        return this.c1;
    }

    getCubeFrame() {
        return this.c2;
    }

    createStaticObjects() {
        this.c1 = this.createCube();
        this.c2 = this.createWireFrameCube();

        this.createLight(-70, 0, 0);
        this.createLight(70, 0, 0);
        this.createLight(0, 0, -70);
        this.createLight(0, 0, 70);
        this.createLight( 0, -70, 0);
        this.createLight( 0, 70, 0);
    }

    createResultSphere(xx, yy, zz) {
        let sphereGeometry = new THREE.SphereGeometry(this.bubbleRadius, 25, 25);
        let sphereMaterial = new THREE.MeshLambertMaterial({color: "#5b54ff", opacity: 0.7, transparent:true});
        let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        sphere.position.x = xx;
        sphere.position.y = yy;
        sphere.position.z = zz;

        this.scene.add(sphere);
        return sphere;
    }

    createCube() {
        const size = this.size;

        let cubeGeometry = new THREE.CubeGeometry(size, size, size);
        let cubeMaterial = new THREE.MeshLambertMaterial({color: "#bb2d41", opacity: 0.5, transparent:true});
        let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

        cube.position.x = 0;
        cube.position.y = 0;
        cube.position.z = 0;

        this.scene.add(cube);

        return cube;
    }

    createWireFrameCube() {
        const size = this.size;

        let cubeGeometry = new THREE.CubeGeometry(size, size, size);
        let cubeMaterial = new THREE.MeshBasicMaterial({color: "#bb2d41", wireframe: true});
        let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

        cube.position.x = 0;
        cube.position.y = 0;
        cube.position.z = 0;

        this.scene.add(cube);

        return cube;
    }

    createLight(xx, yy, zz) {
        const pointLight = new THREE.PointLight( "#FFFFFF", 2);
        pointLight.position.set(xx, yy, zz);
        this.scene.add(pointLight);
    }
}