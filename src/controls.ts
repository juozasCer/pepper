import * as THREE from 'three';

// MOVEMENT VARIABLES
export const velocity = new THREE.Vector3();
export const direction = new THREE.Vector3();
export let moveForward = false;
export let moveBackward = false;
export let moveLeft = false;
export let moveRight = false;

// Select each key button by its unique ID
const buttonA = document.getElementById('keyA') as HTMLElement;
const buttonS = document.getElementById('keyS') as HTMLElement;
const buttonD = document.getElementById('keyD') as HTMLElement;
const buttonW = document.getElementById('keyW') as HTMLElement;

// Function to handle the "pressed" animation
const pressButton = (button: HTMLElement) => {
  button.style.transform = 'translateY(5px)';
  button.style.boxShadow =
    'inset -8px 0 8px rgba(0,0,0,0.15), inset 0 -8px 8px rgba(0,0,0,0.25), 0 0 0 0px rgba(0,0,0,0.75), 5px 15px 20px rgba(0,0,0,0.4)';
};

// Function to reset the "pressed" animation
const releaseButton = (button: HTMLElement) => {
  button.style.transform = 'translateY(0)';
  button.style.boxShadow =
    'inset -8px 0 8px rgba(0,0,0,0.15), inset 0 -8px 8px rgba(0,0,0,0.25), 0 0 0 0px rgba(0,0,0,0.75), 10px 20px 25px rgba(0,0,0,0.4)';
};

// KEYBOARD INPUTS
document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  switch (key) {
    case 'a':
      pressButton(buttonA);
      moveLeft = true; // Assuming you have logic to handle movement
      break;
    case 's':
      pressButton(buttonS);
      moveBackward = true;
      break;
    case 'd':
      pressButton(buttonD);
      moveRight = true;
      break;
    case 'w':
      pressButton(buttonW);
      moveForward = true;
      break;
  }
});

// Add event listeners for keyup
document.addEventListener('keyup', (event) => {
  const key = event.key.toLowerCase();
  switch (key) {
    case 'a':
      releaseButton(buttonA);
      moveLeft = false;
      break;
    case 's':
      releaseButton(buttonS);
      moveBackward = false;
      break;
    case 'd':
      releaseButton(buttonD);
      moveRight = false;
      break;
    case 'w':
      releaseButton(buttonW);
      moveForward = false;
      break;
  }
});