import './style.css';
import * as THREE from 'three';

/* --------------------------------- Canvas --------------------------------- */
const canvas = document.getElementById('webgl-canvas');

/* ---------------------------------- Scene --------------------------------- */
const scene = new THREE.Scene();

/* --------------------------------- Object --------------------------------- */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xa909a4 });
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

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    requestAnimationFrame(tick);
};
tick();
