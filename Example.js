// Highly influenced by the example of https://codepen.io/Yakudoo/pen/YXxmYR

// browser resize not implemented yet, I was lazy :)

var shoulderRotation;
var scarfPosY = [0, 10, 20, 30];

Snowman = function() {

    // RIGHT & LEFT ARE RELATIVE TO YOU, NOT THE SNOWMAN

    // materials
    this.whiteMat = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        shading: THREE.SmoothShading
    });
    this.blackMat = new THREE.MeshLambertMaterial({
        color: 0x212121,
        shading: THREE.SmoothShading
    })
    this.redMat = new THREE.MeshLambertMaterial({
        color: 0xef5350,
        shading: THREE.SmoothShading
    })
    this.orangeMat = new THREE.MeshLambertMaterial({
        color: 0xffb74d,
        shading: THREE.SmoothShading
    })
    this.brownMat = new THREE.MeshLambertMaterial({
        color: 0x8d6e63,
        shading: THREE.SmoothShading
    })

    // snowballs
    var base = new THREE.Mesh(new THREE.BoxGeometry(400, 400, 400), this.whiteMat);
    // base.rotation.y = Math.PI / 40;


    // HEAD

    var headBall = new THREE.Mesh(new THREE.BoxGeometry(225, 225, 225), this.whiteMat);

    //hat
    var crown = new THREE.Mesh(new THREE.BoxGeometry(150, 200, 150), this.blackMat);
    var brim = new THREE.Mesh(new THREE.BoxGeometry(275, 15, 275), this.blackMat);
    brim.translateY(-90);
    var band = new THREE.Mesh(new THREE.BoxGeometry(151, 30, 151), this.redMat);
    band.translateY(-50);

    this.hat = new THREE.Group();
    this.hat.add(crown);
    this.hat.add(brim);
    this.hat.add(band);
    this.hat.translateY(200);

    //nose
    var noseSeg0 = new THREE.Mesh(new THREE.BoxGeometry(25, 25, 35), this.orangeMat);
    var noseSeg1 = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 35), this.orangeMat);
    noseSeg1.translateZ(35);
    var noseSeg2 = new THREE.Mesh(new THREE.BoxGeometry(15, 15, 35), this.orangeMat);
    noseSeg2.translateZ(70);

    this.nose = new THREE.Group();
    this.nose.add(noseSeg0);
    this.nose.add(noseSeg1);
    this.nose.add(noseSeg2);
    this.nose.translateZ(130);

    //eyes
    var leftEye = new THREE.Mesh(new THREE.BoxGeometry(35, 35, 10), this.blackMat);
    leftEye.translateX(-50);
    var rightEye = new THREE.Mesh(new THREE.BoxGeometry(35, 35, 10), this.blackMat);
    rightEye.translateX(50);

    this.eyes = new THREE.Group();
    this.eyes.add(leftEye);
    this.eyes.add(rightEye);
    this.eyes.translateY(50);
    this.eyes.translateZ(115);

    //mouth
    var mouth = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 10), this.blackMat);
    var llMouth = mouth.clone();
    var lMouth = mouth.clone();
    var rMouth = mouth.clone();
    var rrMouth = mouth.clone();
    llMouth.translateX(-60);
    llMouth.translateY(25);
    lMouth.translateX(-30);
    lMouth.translateY(5);
    rMouth.translateX(30);
    rMouth.translateY(5);
    rrMouth.translateX(60);
    rrMouth.translateY(25);

    this.mouth = new THREE.Group();
    this.mouth.add(llMouth);
    this.mouth.add(lMouth);
    this.mouth.add(mouth);
    this.mouth.add(rMouth);
    this.mouth.add(rrMouth);
    this.mouth.translateY(-60);
    this.mouth.translateZ(115);

    var scarfNeck = new THREE.Mesh(new THREE.BoxGeometry(270, 60, 270), this.redMat);
    var scarfSeg0 = new THREE.Mesh(new THREE.BoxGeometry(100, 10, 70), this.redMat);
    scarfSeg0.translateZ(-40);
    var scarfSeg1 = scarfSeg0.clone();
    scarfSeg1.translateX(-100);
    scarfSeg1.position.y = 10;
    // scarfSeg1.translateY(-10);
    var scarfSeg2 = scarfSeg1.clone();
    scarfSeg2.translateX(-100);
    scarfSeg2.position.y = 20;
    // scarfSeg2.translateY(-10);
    var scarfSeg3 = scarfSeg2.clone();
    scarfSeg3.translateX(-100);
    scarfSeg3.position.y = 30;
    // scarfSeg3.translateY(-10);

    this.scarfTail = new THREE.Group();
    this.scarfTail.add(scarfSeg0);
    this.scarfTail.add(scarfSeg1);
    this.scarfTail.add(scarfSeg2);
    this.scarfTail.add(scarfSeg3);
    this.scarfTail.translateX(-180);
    this.scarfTail.rotation.z = Math.PI/20

    this.scarf = new THREE.Group();
    this.scarf.add(scarfNeck);
    this.scarf.add(this.scarfTail);

    this.scarf.translateY(-90);

    //head group
    this.head = new THREE.Group();
    this.head.add(headBall);
    this.head.add(this.hat);
    this.head.add(this.nose);
    this.head.add(this.eyes);
    this.head.add(this.mouth);
    this.head.add(this.scarf);

    this.head.translateY(612);
    // head.rotation.y = -Math.PI / 60;

    // BODY

    var bodyBall = new THREE.Mesh(new THREE.BoxGeometry(300, 300, 300), this.whiteMat);

    // arms
    var rightArm = new THREE.Mesh(new THREE.BoxGeometry(250, 20, 20), this.brownMat),
        rightForearm = rightArm.clone(),
        leftArm = rightArm.clone(),
        leftForearm = rightArm.clone();

    rightForearm.translateX(115);
    leftForearm.translateX(-115);

    this.rightElbow = new THREE.Group();
    this.rightElbow.add(rightForearm);
    this.rightElbow.translateX(115);
    this.rightElbow.rotation.z = Math.PI / 4 + Math.PI / 60; //right elbow control
    this.leftElbow = new THREE.Group();
    this.leftElbow.add(leftForearm);
    this.leftElbow.translateX(-115);
    this.leftElbow.rotation.z = Math.PI / 4; //left elbow control

    this.rightArm = new THREE.Group();
    this.rightArm.add(rightArm);
    this.rightArm.add(this.rightElbow);
    this.rightArm.translateX(125);
    this.leftArm = new THREE.Group();
    this.leftArm.add(leftArm);
    this.leftArm.add(this.leftElbow);
    this.leftArm.translateX(-125);

    this.rightShoulder = new THREE.Group();
    this.rightShoulder.add(this.rightArm);
    this.rightShoulder.translateX(140);
    this.rightShoulder.translateY(50);
    this.rightShoulder.rotation.z = Math.PI / 8; //right shoulder control
    this.leftShoulder = new THREE.Group();
    this.leftShoulder.add(this.leftArm);
    this.leftShoulder.translateX(-140);
    this.leftShoulder.translateY(50);
    this.leftShoulder.rotation.z = Math.PI / 4; //left shoulder control

    var button0 = new THREE.Mesh(new THREE.BoxGeometry(35, 35, 10), this.blackMat),
        button1 = button0.clone(),
        button2 = button0.clone();
    button0.translateY(-80);
    button2.translateY(80);

    this.buttons = new THREE.Group();
    this.buttons.add(button0);
    this.buttons.add(button1);
    this.buttons.add(button2);
    this.buttons.translateZ(155);

    // body group
    this.body = new THREE.Group();
    this.body.add(bodyBall);
    this.body.add(this.rightShoulder);
    this.body.add(this.leftShoulder);
    this.body.add(this.buttons);
    this.body.translateY(350);



    // ALL
    this.group = new THREE.Group();
    this.group.add(base);
    this.group.add(this.body);
    this.group.add(this.head);

    this.group.traverse(function(object) {
        if (object instanceof THREE.Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
        }
    });
}

var backwards;

Snowman.prototype.moveArm = function(rotator, maxAngle, minAngle, speed) {
    var direction = Math.PI / speed;
    var rotation = rotator.rotation["_z"]

    if (rotation > maxAngle) backwards = true;
    if (rotation < minAngle) backwards = false;

    if (backwards) {
        rotation -= direction;
    } else {
        rotation += direction;
    }
    rotator.rotation.z = rotation;
}

Snowman.prototype.scarfWave = function() {
    for (i = 0; i < this.scarfTail.children.length; i++) {
        var seg = this.scarfTail.children[i];
        seg.position.y = 7 * Math.sin(scarfPosY[i] * 3);
        scarfPosY[i] += 0.07;
    }
};


var clock, renderer, scene, camera, mesh, controls;
var frontLight, backLight, ambLight;
var deltaTime;
var snowman;


function buildASnowman() {
    snowman = new Snowman();
    scene.add(snowman.group);
    snowman.group.position.set(0, 200, 0);
};

function createFloor() {
    var floorMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        shading: THREE.SmoothShading
    })
    floor = new THREE.Mesh(
        new THREE.PlaneGeometry(4000, 4000),
        floorMaterial
    );
    floor.rotation.x = -Math.PI / 2;
    // floor.position.y = -100;
    floor.receiveShadow = true;
    scene.add(floor);
}

function createLights() {
    frontLight = new THREE.DirectionalLight(0xffffff, 0.6);
    frontLight.position.set(700, 1500, 1500);
    frontLight.position.multiplyScalar(1.3); // puts light further but with the same angle
    frontLight.target = snowman.group.children[2];

    frontLight.castShadow = true;

    var d = 1200;

    frontLight.shadow.camera.left = -d;
    frontLight.shadow.camera.right = d;
    frontLight.shadow.camera.top = d;
    frontLight.shadow.camera.bottom = -d;

    frontLight.shadow.camera.far = 5000;



    backLight = new THREE.DirectionalLight(0xffffff, 0.6);
    backLight.position.set(-700, 3000, -3000);

    // backLight.castShadow = true

    ambLight = new THREE.AmbientLight(0x474747);

    light = new THREE.HemisphereLight(0xffffdd, 0xffffdd, .2)


    scene.add(frontLight);
    scene.add(backLight);
    scene.add(ambLight);
    scene.add(light);
}

function createParticles() {

    var particleCount = 10000;

    var particles = new THREE.Geometry();

    for (var p = 0; p < particleCount; p++) {

        var x = Math.random() * 4000 - 2000;
        var y = Math.random() * 2000;
        var z = Math.random() * 4000 - 2000;

        var particle = new THREE.Vector3(x, y, z);

        particles.vertices.push(particle);
    }
    var snowMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 10
    });

    particles = new THREE.Points(particles, snowMaterial);

    return particles;
}

function animateParticles(speed) {
    var verts = particles.geometry.vertices;
    for (var i = 0; i < verts.length; i++) {
        var vert = verts[i];
        if (vert.y < 0) {
            vert.y = Math.random() * 2000;
        }
        vert.y = vert.y - (speed * deltaTime);
        if (vert.x < -2000) {
            vert.x = Math.random() * 2000;
        }
        vert.x = vert.x - (speed * 2 * deltaTime);
    }
    // necessary to tell threeJS the geometry has changed and needs to be refreshed
    particles.geometry.verticesNeedUpdate = true;

}



function init() {

    // CLOCK for timing functions
    clock = new THREE.Clock(true);

    // RENDERER
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.soft = true;
    document.getElementById('container').appendChild(renderer.domElement);

    // SCENE
    scene = new THREE.Scene();

    // CAMERA
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(500, 1000, 2000);
    camera.lookAt(new THREE.Vector3(0, 800, 0));
    scene.add(camera);

    createFloor();
    buildASnowman();
    createLights();

    particles = createParticles();
    scene.add(particles);

}

// START

init();
// scene.add(axes); //show axes inside scene


function updateFrame() {
    deltaTime = clock.getDelta();

    snowman.moveArm(snowman.rightShoulder, Math.PI / 4, Math.PI / 30, 180);
    snowman.moveArm(snowman.rightElbow, Math.PI / 3, Math.PI / 10, 60);
    snowman.scarfWave();
    animateParticles(300);
    renderer.render(scene, camera);
    requestAnimationFrame(updateFrame);
}
requestAnimationFrame(updateFrame);