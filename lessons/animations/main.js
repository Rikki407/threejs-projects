import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';

/* ---------------------------------- Scene --------------------------------- */
const scene = new THREE.Scene();

/* --------------------------------- Object --------------------------------- */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xa909a4 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/* ---------------------------------- Sizes --------------------------------- */
const sizes = { width: 800, height: 600 };

/* --------------------------------- Camera --------------------------------- */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

/* -------------------------------- Renderer -------------------------------- */
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('webgl-canvas'),
});
renderer.setSize(sizes.width, sizes.height);

/* ------------------------------- Animations ------------------------------- */

// Clock
// const clock = new THREE.Clock();
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2 , x: 0 });

const tick = () => {
    // const elapsedTime = clock.getElapsedTime();

    // Update Object
    // mesh.rotation.x = elapsedTime * Math.PI;
    // mesh.position.y = Math.sin(elapsedTime);

    // Render
    
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
};
tick();
