import * as THREE from './three.module.js';

// Create all elements of the Snow Buddy
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

    const birthdayHatColor = new THREE.MeshPhongMaterial({
        color: 0xff9Bbf3});

    const birthdayPuff = new THREE.MeshPhongMaterial({
        color: 0xdc57e2});

    const loader = new THREE.TextureLoader();
    const birthdayHatTexture = new THREE.MeshBasicMaterial(  {map: loader.load("./bdayHat2.jpg")});
    const HatTexture = new THREE.MeshBasicMaterial(  {map: loader.load("./WinterBirthdayHat.jpg")});

    const materials = [birthdayHatTexture, HatTexture];



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



    //Hats

    // 1) Top Hat
    const crown = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.5, 0.5, 0.7), hatColor);
    const brim = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.7, 0.7, 0.1), hatColor);
    brim.translateY(-0.4);
    const band = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.52, 0.52, 0.3), redColor);
    band.translateY(-0.3);

    const topHat = new THREE.Group();
    topHat.add(crown);
    topHat.add(brim);
    topHat.add(band);
    topHat.translateY(1);


    // 2) Birthday Hat
    const coneHat = new THREE.Mesh(new THREE.ConeBufferGeometry(
        0.5, 0.9, 15), materials);
    const puffBall = new THREE.Mesh(new THREE.SphereBufferGeometry(
        0.12, 8, 8), birthdayPuff);
    puffBall.translateY(0.45);

    const birthdayHat = new THREE.Group();
    birthdayHat.add(coneHat);
    birthdayHat.add(puffBall);
    birthdayHat.translateY(1);


    const hatArray = [];
    hatArray.push(topHat);
    hatArray.push(birthdayHat);


    let hatIndex = 1;
    //let selectedHat;

    const nextHat = document.getElementById('next')
    if(nextHat) {
        nextHat.addEventListener("mousedown", displayNextHat(hatArray, hatIndex));
    }

    const displayNextHat = (hatArray, hatIndex) => {
        for (let i = 0; i < hatArray.length(); i++) {
            if (i === hatIndex) {
                hatArray.get(i).position.set(2, 1, 0) // move it to the right
            }
            else if (i === hatIndex + 1) {
                hatArray.get(i + 1).position.set(0, 1, 0);  //move it to the left
            }
            else {
                hatArray.get(i).translateX(2, 1, 0);
            }
        }
        hatIndex = hatIndex + 1;
    }


    //Group head
    const headGroup = new THREE.Group();
    headGroup.add(headBall);
    headGroup.add(carrotNose);
    headGroup.add(buttonEyes);
    headGroup.add(topHat);
    headGroup.add(birthdayHat);






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

    //RENDER
    renderer.render(scene, camera)
}

// START
main();



