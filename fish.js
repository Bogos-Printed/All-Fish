import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; 

const container = document.querySelector('#scene-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  85, window.innerWidth / window.innerHeight , 0.1, 1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth/2, window.innerHeight/2, false);
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(3, 0, 0);
camera.lookAt(0,-0.2,0);
controls.update();



const loader = new GLTFLoader();

loader.load('model/fish.glb', function(gltf) {
  const model = gltf.scene;
  model.position.set(0,-1,0);
  // model.rotation.set(1,0,0);
  scene.add(model);
  
}, undefined, function(error) {
  console.error(error);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const hlp = new THREE.AxesHelper(1);
scene.add(hlp);
