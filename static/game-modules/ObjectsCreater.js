"use strict";

const objectColors = {
    SPHERE_COLOR: "#5b54ff",
    CUBE_COLOR: "#bb2d41",
    CUBE_FRAME_COLOR: "#962536",
    LIGHT_COLOR: "#FFFFFF"
};

const objectGeometry = {
    SPHERE: "sphere",
    CUBE: "cube",
    CUBE_FRAME: "cubeFrame"
};

export default class ObjectsCreater {

    constructor(scene) {
        this.scene = scene;
        this.cubeSize = 9;
        this.bubbleRadius = 0.5;
        this.createStaticObjects();
    }

    getCubeSize() {
        return this.cubeSize;
    }

    getCube() {
        return this.cube;
    }

    getCubeFrame() {
        return this.cubeFrame;
    }

    createStaticObjects() {
        this.cube = this.createCube();
        this.cubeFrame = this.createWireFrameCube();

        this.createLight(-70, 0, 0);
        this.createLight(70, 0, 0);
        this.createLight(0, 0, -70);
        this.createLight(0, 0, 70);
        this.createLight(0, -70, 0);
        this.createLight(0, 70, 0);
    }

    createObject(geometry, material, pos) {
        let object = null;
        if (geometry === objectGeometry.SPHERE) {
            let sphereGeometry = new THREE.SphereGeometry(this.bubbleRadius, 25, 25);
            let sphereMaterial = new THREE.MeshLambertMaterial(material);
            object = new THREE.Mesh(sphereGeometry, sphereMaterial);

        } else if (geometry === objectGeometry.CUBE) {
            const size = this.cubeSize;
            let cubeGeometry = new THREE.CubeGeometry(size, size, size);
            let cubeMaterial = new THREE.MeshLambertMaterial(material);
            object = new THREE.Mesh(cubeGeometry, cubeMaterial);
        }
        object.position.x = pos.xx;
        object.position.y = pos.yy;
        object.position.z = pos.zz;
        this.scene.add(object);
        return object;
    }

    createResultSphere(xx, yy, zz) {
        const material = {
            color: objectColors.SPHERE_COLOR,
            opacity: 0.7,
            transparent:true
        };
        const position = {
            xx: xx,
            yy: yy,
            zz: zz
        };
        return this.createObject(objectGeometry.SPHERE, material, position);
    }

    createCube() {
        const material = {
            color: objectColors.CUBE_COLOR,
            opacity: 0.5,
            transparent:true
        };
        const position = {
            xx: 0,
            yy: 0,
            zz: 0
        };
        return this.createObject(objectGeometry.CUBE, material, position);
    }

    createWireFrameCube() {
        const material = {
            color: objectColors.CUBE_FRAME_COLOR,
            wireframe: true
        };
        const position = {
            xx: 0,
            yy: 0,
            zz: 0
        };
        return this.createObject(objectGeometry.CUBE, material, position);
    }

    createLight(xx, yy, zz) {
        const pointLight = new THREE.PointLight(objectColors.LIGHT_COLOR, 2);
        pointLight.position.set(xx, yy, zz);
        this.scene.add(pointLight);
    }
}
