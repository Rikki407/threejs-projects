import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import * as dat from 'dat.gui';

const parameters = {
    color: 0xa909a4,
    spin: () => {
        gsap.to(mesh.rotation, {
            duration: 1,
            y: mesh.rotation.y + Math.PI * 2,
        });
    },
};

/* --------------------------------- Canvas --------------------------------- */
const canvas = document.getElementById('webgl-canvas');

/* ---------------------------------- Scene --------------------------------- */
const scene = new THREE.Scene();

/* --------------------------------- Object --------------------------------- */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: parameters.color });
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
    // mesh.rotation.y = elapsedTime;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    requestAnimationFrame(tick);
};
tick();

/* ---------------------------------- Debug --------------------------------- */
const gui = new dat.GUI();
// Range
// gui.add(mesh.position, 'y', -3, 3, 0.01);
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation'); // Same thing as above

// Boolean
gui.add(mesh, 'visible');
gui.add(material, 'wireframe');

// Colors
gui.addColor(parameters, 'color').onChange(() => {
    material.color.set(parameters.color);
});

// Call functions
gui.add(parameters, 'spin');

/**
 * *Hints
 * Press H to hide the Dat.gui controls or call gui.hide()
 */