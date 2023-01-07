import "./style.css";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { Vector3 } from "three";
import "./sound";
import { colorsFloor } from "./color";
import { isMobile } from "./utils";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = null;
scene.fog = new THREE.Fog(0xffffff, 0, 750);

/**
 * Fonts
 */
const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  // Material
  const material = new THREE.MeshNormalMaterial();

  // Text
  const fontSize = isMobile ? 0.25 : 0.5;
  const nameGeometry = new TextGeometry("Matheus Morett", {
    font: font,
    size: fontSize,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  nameGeometry.center();
  nameGeometry.translate(0, 2, 2);
  const nameMesh = new THREE.Mesh(nameGeometry, material);
  scene.add(nameMesh);

  const occupationGeometry = new TextGeometry("Software Engineer", {
    font: font,
    size: fontSize,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  occupationGeometry.center();
  occupationGeometry.translate(0, isMobile ? 1.5 : 1, 2);
  const occupationMesh = new THREE.Mesh(occupationGeometry, material);
  scene.add(occupationMesh);
});

// Floor
const floorGeometry = new THREE.PlaneGeometry(20, 20);
floorGeometry.rotateX(-Math.PI / 2);

floorGeometry.setAttribute(
  "color",
  new THREE.Float32BufferAttribute(colorsFloor, 3)
);
const floorMaterial = new THREE.MeshBasicMaterial({ vertexColors: true });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
scene.add(floor);

// Objects
const baseMaterial = new THREE.MeshNormalMaterial({
  opacity: 0.2,
  transparent: true,
});

// Cube
const cubeList = [];
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
for (let i = 0; i < 7; i++) {
  const mesh = new THREE.Mesh(cubeGeometry, baseMaterial);
  mesh.position.y = (Math.random() + 0.5) * 1.5;
  mesh.position.x = (Math.random() - 0.5) * 15;
  mesh.position.z = (Math.random() - 1) * 10;
  cubeList.push(mesh);
  scene.add(mesh);
}

// torus
const torusList = [];
const torusGeometry = new THREE.TorusGeometry(0.3, 0.2, 16, 32);
for (let i = 0; i < 5; i++) {
  const mesh = new THREE.Mesh(torusGeometry, baseMaterial);
  mesh.position.y = (Math.random() + 0.5) * 2;
  mesh.position.x = (Math.random() - 0.5) * 20;
  mesh.position.z = (Math.random() - 1) * 10;
  torusList.push(mesh);
  scene.add(mesh);
}

// OctahedronGeometry
const octahedronsList = [];
const octahedronGeometry = new THREE.OctahedronGeometry(1);
for (let i = 0; i < 5; i++) {
  const mesh = new THREE.Mesh(octahedronGeometry, baseMaterial);
  mesh.position.y = (Math.random() - 0.5) * 4;
  mesh.position.x = (Math.random() - 0.5) * 15;
  mesh.position.z = (Math.random() - 1) * 10;
  octahedronsList.push(mesh);
  scene.add(mesh);
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Cursor
 */
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

window.addEventListener("touchmove", (event) => {
  const touch = event.touches[0];
  const x = touch.pageX;
  const y = touch.pageY;
  cursor.x = x / sizes.width - 0.5;
  cursor.y = -(y / sizes.height - 0.5);
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.y = 5;
camera.position.z = 10;
camera.rotation.x = -0.37;
camera.rotation.y = 0.25;
camera.rotation.z = 0.09;

scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Clock
const clock = new THREE.Clock();

/**
 * Animate
 */
const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime();

  for (const octahedron of octahedronsList) {
    octahedron.position.y = Math.sin(elapsedTime) + 2;
  }

  for (const cube of cubeList) {
    cube.rotation.y = elapsedTime;
    cube.rotation.x = elapsedTime;
  }

  for (const torus of torusList) {
    torus.rotation.y = 0.5 * elapsedTime;
    torus.rotation.x = 0.5 * elapsedTime;
  }

  // Update Camera
  camera.position.x = cursor.x * 10;
  camera.position.z = Math.cos(cursor.x * (Math.PI / 2)) * 10;
  camera.lookAt(new Vector3());

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
