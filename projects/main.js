import './style.css';
import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import * as dat from 'dat.gui';

// const gui = new dat.GUI();
const world = {
    plane: {
        width: 800,
        height: 800,
        widthSegments: 100,
        heightSegments: 100,
    },
};

const raycaster = new THREE.Raycaster();
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

document.body.append(renderer.domElement);

/**
 * Camera/ Orbital Control
 */
const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
);
camera.position.y = -75;
camera.position.z = 11;
new OrbitControls(camera, renderer.domElement);

/**
 * Window resize
 */
window.addEventListener('resize', () => {
    // Update camera
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio));
});

/**
 * Plane Shape
 */
const planeGeometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegments,
    world.plane.heightSegments
);
const planeMaterial = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    flatShading: THREE.FlatShading,
    vertexColors: true,
});

const generatePlaneGeometry = () => {
    planeMesh.geometry.dispose();
    planeMesh.geometry = new THREE.PlaneGeometry(
        world.plane.width,
        world.plane.height,
        world.plane.widthSegments,
        world.plane.heightSegments
    );

    // Vertice postion randomization
    const { array } = planeMesh.geometry.attributes.position;
    const randomValues = [];
    for (let i = 0; i < array.length; i += 3) {
        const x = array[i];
        const y = array[i + 1];
        const z = array[i + 2];
        array[i] = x + (Math.random() - 0.5) * 3;
        array[i + 1] = y + (Math.random() - 0.5) * 3;
        array[i + 2] = z + (Math.random() - 0.5) * 3;
        randomValues.push(Math.random() * Math.PI * 2);
        randomValues.push(Math.random() * Math.PI * 2);
        randomValues.push(Math.random() * Math.PI * 2);
    }
    planeMesh.geometry.attributes.position.originalPosition = array;
    planeMesh.geometry.attributes.position.randomValues = randomValues;

    // Color attribute addition
    const colors = [];
    for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
        colors.push(0, 0.19, 0.4);
    }
    planeMesh.geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(new Float32Array(colors), 3)
    );
};

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);
generatePlaneGeometry();

/**
 * Lights
 */
const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(0, 1.6, 1.05);
scene.add(light);
const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 0, -1);
scene.add(backLight);

/**
 * Hover Effect
 */
const mouse = { x: undefined, y: undefined };

addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = (e.clientY / innerHeight) * -2 + 1;
});

/**
 * Animation
 */
let frame = 0;
(function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    raycaster.setFromCamera(mouse, camera);
    frame += 0.01;
    const { array, originalPosition, randomValues } =
        planeMesh.geometry.attributes.position;

    for (let i = 0; i < array.length; i += 3) {
        array[i] =
            originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.02;
        array[i + 1] =
            originalPosition[i + 1] +
            Math.sin(frame + randomValues[i + 1]) * 0.02;
    }
    planeMesh.geometry.attributes.position.needsUpdate = true;
    const intersects = raycaster.intersectObject(planeMesh);
    if (intersects.length > 0) {
        const { face } = intersects[0];
        const { color } = intersects[0].object.geometry.attributes;
        // Vertice 1
        color.setX(face.a, 0.1);
        color.setY(face.a, 0.5);
        color.setZ(face.a, 1);
        // Vertice 2
        color.setX(face.b, 0.1);
        color.setY(face.b, 0.5);
        color.setZ(face.b, 1);
        // Vertice 3
        color.setX(face.c, 0.1);
        color.setY(face.c, 0.5);
        color.setZ(face.c, 1);

        color.needsUpdate = true;

        const initialColor = {
            r: 0,
            g: 0.19,
            b: 0.4,
        };
        const hoverColor = {
            r: 0.1,
            g: 0.5,
            b: 1,
        };

        gsap.to(hoverColor, {
            ...initialColor,
            onUpdate: () => {
                color.setX(face.a, hoverColor.r);
                color.setY(face.a, hoverColor.g);
                color.setZ(face.a, hoverColor.b);
                // Vertice 2
                color.setX(face.b, hoverColor.r);
                color.setY(face.b, hoverColor.g);
                color.setZ(face.b, hoverColor.b);
                // Vertice 3
                color.setX(face.c, hoverColor.r);
                color.setY(face.c, hoverColor.g);
                color.setZ(face.c, hoverColor.b);

                color.needsUpdate = true;
            },
        });
    }
})();

/**
 * Development congifuration for DAT.GUI
 */
// const planedev = gui.addFolder('Plane');
// planedev.add(world.plane, 'width', 1, 500).onChange(generatePlaneGeometry);
// planedev.add(world.plane, 'height', 1, 500).onChange(generatePlaneGeometry);
// planedev
//     .add(world.plane, 'widthSegments', 1, 100)
//     .onChange(generatePlaneGeometry);
// planedev
//     .add(world.plane, 'heightSegments', 1, 100)
//     .onChange(generatePlaneGeometry);

// const cameraDev = gui.addFolder('Camera');
// cameraDev.add(camera.position, 'x', -100, 100);
// cameraDev.add(camera.position, 'y', -100, 100);
// cameraDev.add(camera.position, 'z', -100, 100);

// const lightDev = gui.addFolder('Light');
// lightDev.add(light.position, 'x').min(-3).max(3).step(0.01);
// lightDev.add(light.position, 'y').min(-6).max(6).step(0.01);
// lightDev.add(light.position, 'z').min(-3).max(3).step(0.01);
// lightDev.add(light, 'intensity').min(0).max(10).step(0.01);
