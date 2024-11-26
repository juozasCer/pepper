
import * as THREE from 'three'
import { CameraHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { velocity, direction, moveForward, moveBackward, moveLeft, moveRight } from './controls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'; // Import CSS2DRenderer and CSS2DObject

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// CAMERA
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.3,1 ); // First-person camera at height 1.6
camera.lookAt(0,1.3,-1)
// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true

// CSS2DRenderer for HTML overlays
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none'; // Allow pointer events to pass through
document.body.appendChild(labelRenderer.domElement);

// LIGHTS
light()

// FLOOR
generateFloor()

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

// Remove the overlay on click and lock pointer
clickToPlayOverlay.addEventListener('click', () => {
    if (!controls.isLocked) {
        controls.lock();
        audio.play(); // Play audio when the pointer is locked
    }
});
controls.addEventListener('lock', () => {
    clickToPlayOverlay.style.display = 'none'; // Show overlay when pointer lock is released
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
      position.x = THREE.MathUtils.clamp(position.x, -0.5, 0.45); // Limit x to ±3
      position.z = THREE.MathUtils.clamp(position.z, 0.2, 1.5); // Limit z to -23 to +5
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

function generateFloor() {
    // TEXTURES
    const textureLoader = new THREE.TextureLoader();
    // const placeholder = textureLoader.load("./textures/placeholder/placeholder.png");
    const sandBaseColor = textureLoader.load("./textures/tile/T_uegoehgfw_4K_B.png");
    const sandNormalMap = textureLoader.load("./textures/tile/T_uegoehgfw_4K_N.png");
    const sandHeightMap = textureLoader.load("./textures/tile/T_uegoehgfw_4K_H.png");
    const sandAmbientOcclusion = textureLoader.load("./textures/tile/T_uegoehgfw_4K_ORM.png");

    const WIDTH = 80
    const LENGTH = 80

    const geometry = new THREE.PlaneGeometry(WIDTH, LENGTH, 512, 512);
    const material = new THREE.MeshStandardMaterial(
        {
            map: sandBaseColor, normalMap: sandNormalMap,
            displacementMap: sandHeightMap, displacementScale: 0,
            aoMap: sandAmbientOcclusion
        })
    wrapAndRepeatTexture(material.map!)
    wrapAndRepeatTexture(material.normalMap!)
    wrapAndRepeatTexture(material.displacementMap!)
    wrapAndRepeatTexture(material.aoMap!)
    // const material = new THREE.MeshPhongMaterial({ map: placeholder})

    const floor = new THREE.Mesh(geometry, material)
    floor.receiveShadow = true
    floor.rotation.x = - Math.PI / 2
    scene.add(floor)
}

function wrapAndRepeatTexture (map: THREE.Texture) {
    map.wrapS = map.wrapT = THREE.RepeatWrapping
    map.repeat.x = map.repeat.y = 25
}

function light() {
    scene.add(new THREE.AmbientLight(0xffffff, 0.2))

    const dirLight = new THREE.DirectionalLight(0xffffff,0.5)
    dirLight.position.set(1,5, 0);
    dirLight.target.position.set(0, 0, 0);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top =0.78;
    dirLight.shadow.camera.bottom = - 0.7;
    dirLight.shadow.camera.left = - 1.8;
    dirLight.shadow.camera.right =1;
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
    pointLight1.position.set(0,1,1);
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


  function loadModel() {
    const loader = new GLTFLoader();
    const spinner = document.getElementById('spinner');
    const blocker = document.getElementById('blocker');

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

            // Hide blocker when the model is loaded
            if (blocker) {
                blocker.style.display = 'none';
            }
            if (spinner) {
                spinner.style.display = 'none';
            }
            
        },
        // Progress callback
        undefined,
          // Error callback
        (error) => {
            console.error('Error loading the model:', error);
        }
    );
}

loadModel();
const audio = new Audio('/audio/sound.mp3');

function generateRoof() {
    // TEXTURES
    const textureLoader = new THREE.TextureLoader();
    // const placeholder = textureLoader.load("./textures/placeholder/placeholder.png");
    const sandBaseColor = textureLoader.load("./textures/tile/T_uegoehgfw_4K_B.png");
    const sandNormalMap = textureLoader.load("./textures/tile/T_uegoehgfw_4K_N.png");
    const sandHeightMap = textureLoader.load("./textures/tile/T_uegoehgfw_4K_H.png");
    const sandAmbientOcclusion = textureLoader.load("./textures/tile/T_uegoehgfw_4K_ORM.png");

    const WIDTH = 80
    const LENGTH = 80

    const geometry = new THREE.PlaneGeometry(WIDTH, LENGTH, 512, 512);
    const material = new THREE.MeshStandardMaterial(
        {
            map: sandBaseColor, normalMap: sandNormalMap,
            displacementMap: sandHeightMap, displacementScale: 0,
            aoMap: sandAmbientOcclusion,
        })
    wrapAndRepeatTexture(material.map!)
    wrapAndRepeatTexture(material.normalMap!)
    wrapAndRepeatTexture(material.displacementMap!)
    wrapAndRepeatTexture(material.aoMap!)
    // const material = new THREE.MeshPhongMaterial({ map: placeholder})

    const roof = new THREE.Mesh(geometry, material)
    roof.receiveShadow = true
    roof.rotation.x = Math.PI / 2
    roof.position.set(0,2.5,0)
    scene.add(roof)
}
generateRoof();

const loadingText = document.getElementById('loading-text');
      
      let dotCount = 0;
      const maxDots = 3;
      const intervalTime = 500; // milliseconds
      
      // Function to update the loading text
      function updateLoadingText() {
        dotCount = (dotCount + 1) % (maxDots + 1); // Cycle dotCount from 0 to maxDots
        if(loadingText){
              loadingText.textContent = 'Loading' + '.'.repeat(dotCount);
        }
      }
      
      // Start the interval to update the text
      const loadingInterval = setInterval(updateLoadingText, intervalTime);
