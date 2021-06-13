import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/* --------------------------------- Cursor --------------------------------- */
const cursor = { x: 0, y: 0 };
addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5;
    cursor.y = -(e.clientY / sizes.height - 0.5);
});

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
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);

camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);
/* --------------------------------- Canvas --------------------------------- */
const canvas = document.getElementById('webgl-canvas');

/* -------------------------------- Controls -------------------------------- */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 1;
// controls.update();

/* -------------------------------- Renderer -------------------------------- */
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

/* --------------------------------- Animate -------------------------------- */
const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    mesh.rotation.y = elapsedTime;
    
    // Update Controls
    controls.update();
    
    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    requestAnimationFrame(tick);
};
tick();
