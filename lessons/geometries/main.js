import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/* --------------------------------- Canvas --------------------------------- */
const canvas = document.getElementById('webgl-canvas');

/* ---------------------------------- Scene --------------------------------- */
const scene = new THREE.Scene();

/* --------------------------------- Object --------------------------------- */
// const geometry = new THREE.BoxGeometry(1, 1, 1);
const geometry = new THREE.BufferGeometry();
const count = 50 * 3 * 3;
const positions = [];
for (let i = 0; i < count; i++) positions.push(Math.random() * 4 - 2);

console.log(positions.length);
geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
);
const material = new THREE.MeshBasicMaterial({
    color: 0xa909a4,
    wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/* ---------------------------------- Sizes --------------------------------- */
const sizes = { width: innerWidth, height: innerHeight };
addEventListener('resize', () => {
    // Update sizes
    sizes.width = innerWidth;
    sizes.height = innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
});
addEventListener('dblclick', () => {
    const fullscreenElement =
        document.fullscreenElement ?? document.webkitFullscreenElement;
    const enter = canvas.requestFullscreen ?? canvas.webkitRequestFullscreen;
    const exit = document.exitFullscreen ?? document.webkitExitFullscreen;

    if (!fullscreenElement) enter.bind(canvas)();
    else exit.bind(document)();
});

/* --------------------------------- Camera --------------------------------- */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(2, 2, 2);
camera.lookAt(mesh.position);
scene.add(camera);

/* -------------------------------- Controls -------------------------------- */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/* -------------------------------- Renderer -------------------------------- */
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

/* --------------------------------- Animate -------------------------------- */
const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    mesh.rotation.y = elapsedTime;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    requestAnimationFrame(tick);
};
tick();
