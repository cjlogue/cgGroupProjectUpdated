import * as THREE from './three.module.js';
import {BoxBufferGeometry} from "./three.module.js";

const displayNext =  (itemArray, itemIdx, key) => {

    for (let i = 0; i < itemArray.length; i++) {

        //How to wrap back around to front of list?
        // if (hatArray.length + 1 === hatIdx + 1) {
        //     i = 0;
        // }
        if (itemArray.length === itemIdx + 1) {
            break;
        }
        if (i === itemIdx) {
            itemArray[i].translateX(8);
        }
        if (i === itemIdx + 1) {
            itemArray[i].translateX(-8);
        }
    }
    if (key === "hat") {
        hatIndex = itemIdx + 1;
    }
    else if (key === "eye") {
        eyeIndex = itemIdx + 1;
    }

}

const displayPrevious =  (itemArray, itemIdx, key) => {
    console.log("display previous hit")

    for (let i = 0; i < itemArray.length; i++) {

        //How to wrap back around to front of list?
        // if (hatArray.length + 1 === hatIdx + 1) {
        //     i = 0;
        // }
        if (-1 === itemIdx - 1) {
            break;
        }
        if (i === itemIdx) {
            itemArray[i].translateX(8);
        }
        if (i === itemIdx - 1) {
            itemArray[i].translateX(-8);
        }
    }
    if (key === "hat") {
        hatIndex = itemIdx - 1;
    }
    else if (key === "eye") {
        eyeIndex = itemIdx - 1;
    }

}


var hatIndex;
var eyeIndex;
// Create all elements of the Snow Buddy
var hatArray = [];
var eyeArray = [];
const SnowBuddy = () => {

    //Materials
    const snowColor = new THREE.MeshPhongMaterial({
        color: 0xf0fffc});

    const carrotColor = new THREE.MeshPhongMaterial({
        color: 0xda841c});

    const hatColor = new THREE.MeshPhongMaterial({
        color: 0x5c504b});

    const redColor = new THREE.MeshPhongMaterial({
        color: 0xdc472c});

    const stickColor = new THREE.MeshPhongMaterial({
        color: 0x73410c});

    const sombreroColor = new THREE.MeshPhongMaterial({
        color: 0xd9c48b});

    const snowHatColor = new THREE.MeshPhongMaterial({
        color: 0x8fa1d9});

    const snowHatDetail = new THREE.MeshPhongMaterial({
        color: 0x48569c});

    const birthdayHatColor = new THREE.MeshPhongMaterial({
        color: 0xff9Bbf3});

    const birthdayPuff = new THREE.MeshPhongMaterial({
        color: 0xdc57e2});

    //Textures (implement once on Heroku?)
    const loader = new THREE.TextureLoader();

    const birthdayHatTexture = new THREE.MeshBasicMaterial(  {map: loader.load("./bdayHat2.jpg")});

    const HatTexture = new THREE.MeshBasicMaterial(  {map: loader.load("./WinterBirthdayHat.jpg")});

    const blueDots = new THREE.MeshBasicMaterial({map: loader.load("./BlueDots.bmp")});

    const bananaShirt = new THREE.MeshBasicMaterial({map: loader.load("./Textures/BananaShirt.jpg")});

    const cowShirt = new THREE.MeshBasicMaterial({map: loader.load("./Textures/cowPrintShirt.jpg")});

    const hawaiianShirt = new THREE.MeshBasicMaterial({map: loader.load("./Textures/HawaiianShirt.jpg")});

    const winterSweater1 = new THREE.MeshBasicMaterial({map: loader.load("./Textures/winterSweater1.jpg")});

    const winterSweater2 = new THREE.MeshBasicMaterial({map: loader.load("./Textures/winterSweater2.jpg")});


    const materials = [birthdayHatTexture, HatTexture, blueDots, bananaShirt,
        cowShirt, hawaiianShirt, winterSweater1, winterSweater2];



    //Snowball Parts
    const baseBall = new THREE.Mesh(new THREE.SphereBufferGeometry(
        1, 30, 8), snowColor);

    const middleBall = new THREE.Mesh(new THREE.SphereBufferGeometry(
        0.85, 30, 8), snowColor);

    const headBall = new THREE.Mesh(new THREE.SphereBufferGeometry(
        0.7, 30, 8), snowColor);



    //Noses:
    // 1) Carrot Nose
    const nose = new THREE.Mesh(new THREE.ConeBufferGeometry(0.12, 0.16, 7), carrotColor);

    const carrotNose = new THREE.Group();
    carrotNose.add(nose);
    carrotNose.translateZ(1);
    carrotNose.translateY(-0.1);
    carrotNose.rotateX(90);



    //Eyes:

    // 1) Button Eyes
    const leftEye = new THREE.Mesh(new THREE.SphereBufferGeometry(
        0.08, 8, 8), hatColor);
    leftEye.translateX(-0.3);
    const rightEye = new THREE.Mesh(new THREE.SphereBufferGeometry(
        0.08, 8, 8), hatColor);
    rightEye.translateX(0.3);

    const buttonEyes = new THREE.Group();
    buttonEyes.add(leftEye);
    buttonEyes.add(rightEye);
    //buttonEyes.translateY(0.5);
    buttonEyes.translateZ(1.5);
    //buttonEyes.translateX(8);

    // 2) Glasses
    var leftGlass = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.15, 0.15, 0.01), hatColor);
    leftGlass.translateX(-0.3);
    leftGlass.rotateX(90);
    var rightGlass = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.15, 0.15, 0.01), hatColor);
    rightGlass.translateX(0.3);
    rightGlass.rotateX(90);
    var connector = new THREE.Mesh(new THREE.BoxBufferGeometry(0.4, 0.05, 0.02), hatColor);

    const sunGlasses = new THREE.Group();
    sunGlasses.add(leftGlass);
    sunGlasses.add(rightGlass);
    sunGlasses.add(connector);
    sunGlasses.translateZ(1);
    sunGlasses.translateX(8);

    // 2) Torus Eyes

    const leftTorus = new THREE.Mesh(new THREE.TorusKnotBufferGeometry(0.06, 0.015, 64, 8), redColor);
    leftTorus.translateX(-0.6);
    const rightTorus = new THREE.Mesh(new THREE.TorusKnotBufferGeometry(0.06, 0.015, 64, 8), redColor);

    const torusEyes = new THREE.Group();
    torusEyes.add(leftTorus);
    torusEyes.add(rightTorus);
    torusEyes.translateZ(1.5);
    torusEyes.translateX(.3);
    torusEyes.translateX(8);

    eyeArray[0] = buttonEyes;
    eyeArray[1] = sunGlasses;
    eyeArray[2] = torusEyes;


    //Hats

    // 1) Top Hat
    var crown = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.5, 0.5, 0.7), hatColor);
    var brim = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.7, 0.7, 0.1), hatColor);
    brim.translateY(-0.4);
    var band = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.52, 0.52, 0.3), redColor);
    band.translateY(-0.3);

    var topHat = new THREE.Group();
    topHat.add(crown);
    topHat.add(brim);
    topHat.add(band);
    topHat.translateY(1);
    //topHat.translateX(4); START ON HEAD FIRST


    // 2) Birthday Hat
    var coneHat = new THREE.Mesh(new THREE.ConeBufferGeometry(
        0.5, 0.9, 15), birthdayHatColor);
    var puffBall = new THREE.Mesh(new THREE.SphereBufferGeometry(
        0.12, 8, 8), birthdayPuff);
    puffBall.translateY(0.45);

    var birthdayHat = new THREE.Group();
    birthdayHat.add(coneHat);
    birthdayHat.add(puffBall);
    birthdayHat.translateY(1);
    birthdayHat.translateX(8);


    //3) Sombrero
    var sombrero = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.3, 0.6, 0.6), sombreroColor);
    sombrero.translateY(0.8);
    var sombreroBrim = new THREE.Mesh(new THREE.CylinderBufferGeometry(1.5, 1.5, 0.1), sombreroColor);
    sombreroBrim.translateY(0.5);

    const sombreroHat = new THREE.Group();
    sombreroHat.add(sombrero);
    sombreroHat.add(sombreroBrim);
    sombreroHat.translateX(8);


    //4) Snow Hat
    var snowHat = new THREE.Mesh(new THREE.CylinderBufferGeometry(
        0.3, 0.6, 0.6), snowHatColor);
    snowHat.translateY(0.7);
    var roundHatTop = new THREE.Mesh(new THREE.SphereBufferGeometry(
        0.3, 8, 8), snowHatColor);
    roundHatTop.translateY(0.9);
    var snowHatFold = new THREE.Mesh(
        new THREE.CylinderBufferGeometry(0.6, 0.7, 0.2), snowHatDetail);
    snowHatFold.translateY(0.4);
    var pomPom = new THREE.Mesh(new THREE.SphereBufferGeometry(
        0.15, 8, 8), snowHatDetail);
    pomPom.translateY(1.25);

    const snowHatGroup = new THREE.Group();
    snowHatGroup.add(snowHat);
    snowHatGroup.add(snowHatFold);
    snowHatGroup.add(roundHatTop);
    snowHatGroup.add(pomPom);
    snowHatGroup.translateX(8);


    // 5) Graduation Cap
    var graduationCap = new THREE.Mesh(new THREE.CylinderBufferGeometry(
        0.5, 0.65, 0.5), hatColor);
    graduationCap.translateY(0.6);
    var graduationBrim = new THREE.Mesh(new BoxBufferGeometry(1.6, 0.1, 1.6), hatColor);
    graduationBrim.translateY(0.9);
    graduationBrim.rotateY(90);

    const graduationCapGroup = new THREE.Group();
    graduationCapGroup.add(graduationCap);
    graduationCapGroup.add(graduationBrim);
    graduationCapGroup.translateX(8);

    hatArray[0] = topHat;
    hatArray[1] = birthdayHat;
    hatArray[2] = sombreroHat;
    hatArray[3] = snowHatGroup;
    hatArray[4] = graduationCapGroup;



    //Group head
    const headGroup = new THREE.Group();
    headGroup.add(headBall);
    //NOSE
    headGroup.add(carrotNose);
    //EYES
    headGroup.add(buttonEyes);
    headGroup.add(sunGlasses);
    headGroup.add(torusEyes);
    //HATS
    headGroup.add(topHat);
    headGroup.add(birthdayHat);
    headGroup.add(sombreroHat);
    headGroup.add(snowHatGroup);
    headGroup.add(graduationCapGroup);



    //INTERACTIONS
    //hat
    const nextHat = document.getElementById('nextHat')
    if(nextHat) {
        nextHat.addEventListener("click", () => displayNext(hatArray, hatIndex, "hat"));
        console.log(hatArray.length);
    }

    const previousHat = document.getElementById('previousHat')
    if(previousHat) {
        previousHat.addEventListener("click", () => displayPrevious(hatArray, hatIndex, "hat"));
        console.log("previous hat hit");
    }

    //eyes
    const nextEye = document.getElementById('nextEyes')
    if(nextEye) {
        nextEye.addEventListener("click", () => displayNext(eyeArray, eyeIndex, "eye"));
        console.log(hatArray.length);
    }

    const previousEye = document.getElementById('previousEyes')
    if(previousEye) {
        previousEye.addEventListener("click", () => displayPrevious(eyeArray, eyeIndex, "eye"));
        console.log(hatArray.length);
    }









    //Buttons
    // 1) Standard Buttons:
    const button1 = new THREE.Mesh(new THREE.SphereBufferGeometry(
        0.075, 8, 8), hatColor);
    button1.translateZ(1);
    button1.translateY(0.35);
    const button2 = new THREE.Mesh(new THREE.SphereBufferGeometry(
        0.08, 8, 8), hatColor);
    button2.translateZ(1);
    button2.translateY(0.1);
    const button3 = new THREE.Mesh(new THREE.SphereBufferGeometry(
        0.075, 8, 8), hatColor);
    button3.translateZ(1);
    button3.translateY(-0.15);


    //Arms
    // 1) Stick Arms
    const leftStick = new THREE.Mesh(new THREE.CylinderBufferGeometry(
        0.02, 0.04, 1.7), stickColor);
    leftStick.translateX(-0.7);
    leftStick.rotateZ(70);
    leftStick.translateY(0.6);
    const leftFinger1 = new THREE.Mesh(new THREE.CylinderBufferGeometry(
        0.01, 0.03, 0.5), stickColor);
    leftFinger1.translateX(-1.4);
    leftFinger1.translateY(0.8);


    // Left Arm Group
    const leftArm = new THREE.Group();
    leftArm.add(leftStick);
    leftArm.add(leftFinger1);


    const rightStick = new THREE.Mesh(new THREE.CylinderBufferGeometry(
        0.02, 0.04, 1.7), stickColor);
    rightStick.translateX(0.7);
    rightStick.rotateZ(250);
    rightStick.translateY(0.6);
    const rightFinger1 = new THREE.Mesh(new THREE.CylinderBufferGeometry(
        0.01, 0.03, 0.5), stickColor);
    rightFinger1.translateX(1.6);
    rightFinger1.translateY(0.5);


    // Left Arm Group
    const rightArm = new THREE.Group();
    rightArm.add(rightStick);
    rightArm.add(rightFinger1);



   // Middle Ball Group
    const middleBallGroup = new THREE.Group();
    middleBallGroup.add(middleBall);
    middleBallGroup.add(button1);
    middleBallGroup.add(button2);
    middleBallGroup.add(button3);
    middleBallGroup.add(leftArm);
    middleBallGroup.add(rightArm);



    //Place Snowballs on the screen
    headGroup.position.set(0,1.2, 0);     //Where should the head be on the screen?
    middleBallGroup.position.set(0, 0, 0);
    baseBall.position.set(0,-1.2, 0);


    //Group All components together: snowbuddyGroup
    const snowBuddyGroup = new THREE.Group();
    snowBuddyGroup.add(baseBall);
    snowBuddyGroup.add(middleBallGroup);
    snowBuddyGroup.add(headGroup);
    scene.add(snowBuddyGroup);


}

const createFloor = () => {

    const snowColor = new THREE.MeshPhongMaterial({
        color: 0xf0fffc});

    const planeGeo = new THREE.PlaneGeometry(15, 30, 0.5, 0.5);
    const plane = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({
        color: snowColor,
    }));
    //plane.rotation.x -= Math.PI * .5;
    plane.translateY(-1);
    plane.translateZ(-5);
    plane.rotateX(30);

    scene.add(plane);

    const pineColor = new THREE.MeshPhongMaterial({
        color: 0x2c713d});

    const stickColor = new THREE.MeshPhongMaterial({
        color: 0x73410c});

    const pineTop = new THREE.Mesh(new THREE.ConeBufferGeometry(0.5, 1.3, 5), pineColor);
    pineTop.translateY(0.8);

    const pineMiddle = new THREE.Mesh(new THREE.ConeBufferGeometry(0.7, 1, 5), pineColor);
    pineMiddle.translateY(0.2);

    const pineBottom = new THREE.Mesh(new THREE.ConeBufferGeometry(0.9, 1, 5), pineColor);
    pineBottom.translateY(-0.3);

    const pineTrunk = new THREE.Mesh(new THREE.CylinderBufferGeometry(
        0.1, 0.1, 1), stickColor);
    pineTrunk.translateY(-0.6);

    const pineTree = new THREE.Group();
    pineTree.add(pineTop);
    pineTree.add(pineMiddle);
    pineTree.add(pineBottom);
    pineTree.add(pineTrunk);


    scene.add(pineTree);
    pineTree.translateZ(-1.9);
    pineTree.translateX(-4);


}



function createLighting() {


    const color = 0xFFFFFF;
    const intensity = 1;
    let directionalLight;
    directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.set(-1, 2, 4);

    const ambLight = new THREE.AmbientLight(0x474747);

    scene.add(directionalLight);
    scene.add(ambLight);



}


let scene;
const main = () => {

    // // CLOCK for timing functions
    // clock = new THREE.Clock(true);

    // RENDERER
    const canvas = document.getElementById("canvas");
    //document.querySelector('#canvas');   //////// is this how you get canvas?
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
    });

    // SCENE
    scene = new THREE.Scene();

    // CAMERA
    const fov = 20; //field of view (larger = fish eye)
    const aspect = 2;  // canvas default = 2 = 300/150
    const near = 0.1; //
    const far = 20; //
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.set(0, 0.3, 16); //move the camera a back
    scene.add(camera);

    createFloor();
    SnowBuddy();
    createLighting();

    hatIndex = 0;
    eyeIndex = 0;

    //RENDER
    var drawScene = () => {

        renderer.render(scene, camera);
        requestAnimationFrame(drawScene)
    }

    requestAnimationFrame(drawScene)
}

// START
main();



