import * as THREE from 'https://cdn.skypack.dev/three@0.133.0/build/three.module.js';

// set up the scene
const scene = new THREE.Scene();

// create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;

// create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// load the skybox
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('skybox/');

// pos-x, neg-x, pos-y, neg-y, pos-z, neg-z

const skyboxTexture = cubeTextureLoader.load([
    'right.jpg', 'left.jpg',
    'top.jpg', 'bottom.jpg',
    'front.jpg', 'back.jpg',
]);

scene.background = skyboxTexture;

// variables to track mouse movement
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

// MISSCHIEN GAAT HET HIER MIS

// add event listener for mouse movement
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1; // normalize to -1 to 1
    mouseY = (event.clientY / window.innerHeight) * 2 - 1;
});

// handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// render the scene
function animate() {
    requestAnimationFrame(animate);

    // smoothly interpolate camera rotation towards the mouse direction
    targetX += (mouseX - targetX) * 0.1;
    targetY += (mouseY - targetY) * 0.1;

    // update camera rotation
    camera.rotation.y = -targetX * Math.PI;

    // clamp the vertical tilt to prevent over-tilting
    const maxTilt = Math.PI / 4; // limit to 45 degrees up/down
    camera.rotation.x = THREE.MathUtils.clamp(-targetY * Math.PI * 0.5, -maxTilt, maxTilt);
    //camera.rotation.x = -targetY * Math.PI;

    // render the scene
    renderer.render(scene, camera);
}

animate();
