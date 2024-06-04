import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const container = document.querySelector('#long-scene');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  85, window.innerWidth / window.innerHeight , 0.1, 1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.domElement.id = "bithch";
container.appendChild(renderer.domElement);

camera.position.set(3, 0, 0);
camera.lookAt(0,-0.2,0);

const loader = new GLTFLoader();

let model;

loader.load('model/fish.glb', function(gltf) {
  model = gltf.scene;
  model.position.set(0,-1,0);
  model.rotation.y += 0.5;
  scene.add(model);

}, undefined, function(error) {
  console.error(error);
});


function animate() {
  requestAnimationFrame(animate);

  if (model) {
    model.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

animate();

const light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light);

const hlp = new THREE.AxesHelper(1);
scene.add(hlp);
