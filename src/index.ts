import * as THREE from 'three';
import { CameraHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { velocity, direction, moveForward, moveBackward, moveLeft, moveRight } from './controls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'; // Import CSS2DRenderer and CSS2DObject
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// CAMERA
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.3, 1); // First-person camera at height 1.6
camera.lookAt(0, 1.3, -1);

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

// CSS2DRenderer for HTML overlays
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none'; // Allow pointer events to pass through
document.body.appendChild(labelRenderer.domElement);

// Spinner and blocker elements
const spinner = document.getElementById('spinner');
const blocker = document.getElementById('blocker');

// Loading text
const loadingText = document.getElementById('loading-text');

let dotCount = 0;
const maxDots = 3;
const intervalTime = 500; // milliseconds

// Function to update the loading text
function updateLoadingText() {
    dotCount = (dotCount + 1) % (maxDots + 1); // Cycle dotCount from 0 to maxDots
    if (loadingText) {
        loadingText.textContent = 'Loading' + '.'.repeat(dotCount);
    }
}

// Start the interval to update the text
const loadingInterval = setInterval(updateLoadingText, intervalTime);

// LIGHTS
light();

// CONTROLS
const controls = new PointerLockControls(camera, renderer.domElement);
scene.add(controls.getObject());

// Create a "Click to Play" overlay
const clickToPlayOverlay = document.createElement('div');
clickToPlayOverlay.id = 'click-to-play-overlay';
clickToPlayOverlay.style.position = 'absolute';
clickToPlayOverlay.style.top = '0';
clickToPlayOverlay.style.left = '0';
clickToPlayOverlay.style.width = '100%';
clickToPlayOverlay.style.height = '100%';
clickToPlayOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
clickToPlayOverlay.style.color = 'white';
clickToPlayOverlay.style.display = 'flex';
clickToPlayOverlay.style.justifyContent = 'center';
clickToPlayOverlay.style.alignItems = 'center';
clickToPlayOverlay.style.zIndex = '0';
clickToPlayOverlay.style.fontSize = '24px';
clickToPlayOverlay.style.cursor = 'pointer';
clickToPlayOverlay.textContent = 'Click to Play';
document.body.appendChild(clickToPlayOverlay);

// Variables to store loaded resources
let audio: HTMLAudioElement;

// Remove the overlay on click and lock pointer
clickToPlayOverlay.addEventListener('click', () => {
    if (!controls.isLocked) {
        controls.lock();
        if (audio) {
            audio.play(); // Play audio when the pointer is locked
        }
    }
});
controls.addEventListener('lock', () => {
    clickToPlayOverlay.style.display = 'none'; // Hide overlay when pointer is locked
});
controls.addEventListener('unlock', () => {
    clickToPlayOverlay.style.display = 'flex'; // Show overlay when pointer lock is released
});

// Create and add the div as a CSS2DObject
const div = document.createElement('div');
div.style.color = 'white'; // Optional: style the text
div.textContent = '$SHITsim';
const label = new CSS2DObject(div);
label.position.set(0, 1, 0); // Position at (0, 1, 0)
scene.add(label);

// Load compressed textures
const ktx2Loader = new KTX2Loader()
    .setTranscoderPath('/textures/tile/') // Path to Basis transcoder
    .detectSupport(renderer);

const textures: { [key: string]: THREE.Texture | null } = {
    sandBaseColor: null,
    sandNormalMap: null,
    sandHeightMap: null,
    sandAmbientOcclusion: null,
};

// Load textures asynchronously
function loadTexture(url: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
        ktx2Loader.load(
            url,
            (texture) => {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(25, 25);
                texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
                resolve(texture);
            },
            undefined,
            (error) => {
                console.error(`Error loading texture ${url}:`, error);
                reject(error);
            }
        );
    });
}

// Function to load the model and return a Promise
function loadModel(): Promise<void> {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();

        loader.load(
            '/models/FINALKRWWWW.gltf',
            (gltf) => {
                const model = gltf.scene;
                const animations = gltf.animations;
                const mixer = new THREE.AnimationMixer(model);

                // Play first animation if available
                if (animations.length > 0) {
                    const action = mixer.clipAction(animations[0]);
                    action.play();
                }

                model.traverse((object) => {
                    if (object instanceof THREE.Mesh) {
                        object.castShadow = true;
                        object.receiveShadow = true;
                        object.frustumCulled = false;
                    }
                });

                model.position.set(0, 0, 0); // Adjust position as needed
                model.scale.set(1, 1, 1);
                scene.add(model);

                // Animation update in the animation loop
                const clock = new THREE.Clock();
                function animateModel() {
                    const delta = clock.getDelta();
                    mixer.update(delta); // Update animations
                    requestAnimationFrame(animateModel);
                }
                animateModel();

                // Resolve the promise when the model is loaded
                resolve();
            },
            // Progress callback
            undefined,
            // Error callback
            (error) => {
                console.error('Error loading the model:', error);
                reject(error);
            }
        );
    });
}

// Function to load the audio and return a Promise
function loadAudio(url: string): Promise<HTMLAudioElement> {
    return new Promise((resolve, reject) => {
        const audio = new Audio(url);
        audio.addEventListener('canplaythrough', () => {
            resolve(audio);
        }, false);

        audio.addEventListener('error', (e) => {
            console.error('Error loading audio:', e);
            reject(e);
        }, false);

        // Start loading the audio
        audio.load();
    });
}

// Use Promise.all to wait for all resources to load
Promise.all([
    Promise.all([
        loadTexture('./textures/tile/T_uegoehgfw_4K_B.ktx2'),
        loadTexture('./textures/tile/T_uegoehgfw_4K_N.ktx2'),
        loadTexture('./textures/tile/T_uegoehgfw_4K_H.ktx2'),
        loadTexture('./textures/tile/T_uegoehgfw_4K_ORM.ktx2'),
    ]),
    loadModel(),
    loadAudio('/audio/sound.mp3'),
]).then(([[sandBaseColor, sandNormalMap, sandHeightMap, sandAmbientOcclusion], _, loadedAudio]) => {
    const floorRoofMaterial = new THREE.MeshStandardMaterial({
        map: sandBaseColor,
        normalMap: sandNormalMap,
        displacementMap: sandHeightMap,
        displacementScale: 0,
        aoMap: sandAmbientOcclusion,
    });

    // Generate floor and roof with the loaded material
    generateFloor(floorRoofMaterial);
    generateRoof(floorRoofMaterial);

    // Store the audio for later use
    audio = loadedAudio;

    // Hide blocker when everything is loaded
    if (blocker) {
        blocker.style.display = 'none';
    }
    if (spinner) {
        spinner.style.display = 'none';
    }

    // Clear the loading interval
    clearInterval(loadingInterval);
}).catch((error) => {
    console.error('Error loading resources:', error);
});

// Update function signatures to accept the material
function generateFloor(floorRoofMaterial: THREE.Material) {
    const WIDTH = 80;
    const LENGTH = 80;
    const position = new THREE.Vector3(0, 0, 0);
    const rotation = new THREE.Euler(-Math.PI / 2, 0, 0);
    const floor = createPlane(WIDTH, LENGTH, floorRoofMaterial, position, rotation);
    scene.add(floor);
}

function generateRoof(floorRoofMaterial: THREE.Material) {
    const WIDTH = 80;
    const LENGTH = 80;
    const position = new THREE.Vector3(0, 2.5, 0);
    const rotation = new THREE.Euler(Math.PI / 2, 0, 0);
    const roof = createPlane(WIDTH, LENGTH, floorRoofMaterial, position, rotation);
    scene.add(roof);
}

const clock = new THREE.Clock();
// ANIMATE
function animate() {
    requestAnimationFrame(animate);

    // stats.begin(); // Start measuring FPS

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    if (controls.isLocked) {
        // Update movement
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize();

        const speed = 50; // Movement speed
        if (moveForward || moveBackward) velocity.z -= direction.z * speed * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * speed * delta;

        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);

        // Constrain camera position
        const position = controls.getObject().position;
        position.x = THREE.MathUtils.clamp(position.x, -0.5, 0.45); // Limit x to ±0.5
        position.z = THREE.MathUtils.clamp(position.z, 0.2, 1.5); // Limit z to 0.2 to 1.5
    }
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}
document.body.appendChild(renderer.domElement);
animate();

// RESIZE HANDLER
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

function createPlane(width: number, length: number, material: THREE.Material, position: THREE.Vector3, rotation: THREE.Euler): THREE.Mesh {
    const geometry = new THREE.PlaneGeometry(width, length, 512, 512);
    const plane = new THREE.Mesh(geometry, material);
    plane.position.copy(position);
    plane.rotation.copy(rotation);
    plane.receiveShadow = true;
    return plane;
}

// function generateFloor() {
//     const WIDTH = 80;
//     const LENGTH = 80;
//     const position = new THREE.Vector3(0, 0, 0);
//     const rotation = new THREE.Euler(-Math.PI / 2, 0, 0);
//     const floor = createPlane(WIDTH, LENGTH, floorRoofMaterial, position, rotation);
//     scene.add(floor);
// }

// function generateRoof() {
//     const WIDTH = 80;
//     const LENGTH = 80;
//     const position = new THREE.Vector3(0, 2.5, 0);
//     const rotation = new THREE.Euler(Math.PI / 2, 0, 0);
//     const roof = createPlane(WIDTH, LENGTH, floorRoofMaterial, position, rotation);
//     scene.add(roof);
// }

function light() {
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(1, 5, 0);
    dirLight.target.position.set(0, 0, 0);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 0.78;
    dirLight.shadow.camera.bottom = -0.7;
    dirLight.shadow.camera.left = -1.8;
    dirLight.shadow.camera.right = 1;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 6;
    dirLight.shadow.mapSize.width = 4096;
    dirLight.shadow.mapSize.height = 4096;
    dirLight.shadow.bias = -0.005; // Reduce self-shadowing
    dirLight.shadow.normalBias = 0.05; // Smooth normals in shadows
    scene.add(dirLight.target);
    scene.add(dirLight);
    // scene.add( new THREE.CameraHelper(dirLight.shadow.camera))
}

function light3() {
    // scene.add(new THREE.AmbientLight(0xFFFFff, 0.1));
    const pointLight1 = new THREE.PointLight(0xffffff, 0.7, 2); // Color, intensity, distance
    pointLight1.position.set(0, 1, 1);
    // pointLight1.castShadow = true;

    // Shadow Settings
    pointLight1.shadow.mapSize.width = 1024; // Shadow resolution
    pointLight1.shadow.mapSize.height = 1024;
    pointLight1.shadow.camera.near = 0.1; // Near plane
    pointLight1.shadow.camera.far = 4;
    pointLight1.shadow.bias = -0.005; // Far plane
    pointLight1.shadow.normalBias = 0.05;
    scene.add(pointLight1);

    // Helper to visualize shadow camera
    const pointLightHelper = new THREE.PointLightHelper(pointLight1, 1); // 1 is the helper size
    // scene.add(pointLightHelper);
}
light3();

// i have this code i need you to fix few issues make blocker disappear only when everything is loaded provide full code fix dont delete commented code
