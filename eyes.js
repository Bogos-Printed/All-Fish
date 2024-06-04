import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const container = document.querySelector('#allInTheFish');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight , 0.1, 1000
); //fov, aspect, near, far

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.domElement.id = "bithch";
container.appendChild(renderer.domElement);

camera.position.set(2, 4, 7.5); //(depth, up-down ,left-right)

camera.lookAt(1.5,4,7.5);

const loader = new GLTFLoader();

let model;
let instances = [];

loader.load('model/fish-centered.glb', function(gltf) {
  model = gltf.scene;
  model.rotation.y -= 1.5;

  const rows = 20;
  const cols = 9;
  const space = 1;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const instance = model.clone();
      instance.position.set(-4, j, i);
      instances.push(instance);
      instance.userData.id = `fish_${i}_${j}`;
      scene.add(instance);
    }
  }

}, undefined, function(error) {
  console.error('error loading: ', error);
});


function animate() {
  requestAnimationFrame(animate);

  // instances.forEach(instance => {
  //   instance.rotation.y += 0.01;
  // });

  instances.forEach(instance => {
    const vector = new THREE.Vector3();
    raycaster.ray.at(10, vector);

    const angle = Math.atan2(
      vector.x - instance.position.x,
      vector.z - instance.position.z
    ); //angle is the problem
    // => make it math rotation instance and position mouse

    instance.rotation.y = angle;
    instance.rotation.z = angle;
    instance.rotation.x = angle;
    console.log(angle)
  });

  renderer.render(scene, camera);
}

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
