import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const container = document.querySelector('#allInTheFish');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  85, window.innerWidth / window.innerHeight , 0.1, 1000
); //fov, aspect, near, far

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.domElement.id = "bithch";
container.appendChild(renderer.domElement);

//(depth, up-down ,left-right)
camera.position.set(4,0,0)

camera.lookAt(0,0,0);

const loader = new GLTFLoader();

let model;
let instances = [];

loader.load('model/fish2.glb', function(gltf) {
  model = gltf.scene;
  // scene.add(model);

  const rows = 5;
  const cols = 5;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const instance = model.clone();
      instance.position.set(-4, j, i);
      instances.push(instance);
      scene.add(instance);
    }
  }
  console.log(instances);

}, undefined, function(error) {
  console.error('error loading: ', error);
});


function animate() {
  requestAnimationFrame(animate);
  
  instances.forEach(instance => {
    instance.rotation.set(0, mouse.x*1.5, mouse.y*1.5);
    //the solution to thy problem
  });

  renderer.render(scene, camera);
};

animate();

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const hlp = new THREE.AxesHelper(1);
scene.add(hlp);

scene.background = new THREE.Color(0xaaaaaa);

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
}

window.addEventListener('mousemove', onMouseMove);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
