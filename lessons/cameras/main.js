import * as THREE from 'three';

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
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio,
//     1 * aspectRatio,
//     1,
//     -1,
//     0.1,
//     100
// );
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
console.log(camera.position.length());
camera.lookAt(mesh.position);
scene.add(camera);

/* -------------------------------- Renderer -------------------------------- */
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('webgl-canvas'),
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

/* --------------------------------- Animate -------------------------------- */
const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update camera
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    camera.position.y = cursor.y * Math.PI * 2;
    camera.lookAt(mesh.position);

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    requestAnimationFrame(tick);
};
tick();
