import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/* -------------------------------- Textures -------------------------------- */
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
    console.log('start');
};
loadingManager.onProgress = () => {
    console.log('progress');
};
loadingManager.onLoad = () => {
    console.log('loaded');
};
loadingManager.onError = () => {
    console.log('error');
};
const textureLoader = new THREE.TextureLoader(loadingManager);
const alphaTexture = textureLoader.load('./public/Door_Wood_001_opacity.jpg');
const roughnessTexture = textureLoader.load(
    './public/Door_Wood_001_roughness.jpg'
);
const normalTexture = textureLoader.load('./public/Door_Wood_001_normal.jpg');
const metallicTexture = textureLoader.load(
    './public/Door_Wood_001_metallic.jpg'
);
const heightTexture = textureLoader.load('./public/Door_Wood_001_height.png');
const ambientOcclusion = textureLoader.load(
    './public/Door_Wood_001_ambientOcclusion.jpg'
);
const colorTexture = textureLoader.load('./public/Door_Wood_001_basecolor.jpg');
const colorTexture2 = textureLoader.load('./public/check.png');
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;

// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// colorTexture.rotation = Math.PI * 0.25;
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;
/* --------------------------------- Canvas --------------------------------- */
const canvas = document.getElementById('webgl-canvas');

/* ---------------------------------- Scene --------------------------------- */
const scene = new THREE.Scene();

/* --------------------------------- Object --------------------------------- */
const geometry = new THREE.BoxGeometry(1, 1, 1);
console.log(geometry.attributes.uv);
const material = new THREE.MeshBasicMaterial({ map: colorTexture2 });
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
