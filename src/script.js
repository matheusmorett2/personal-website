import "./style.css";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { Vector3 } from "three";
import "./sound";
import { colorsFloor } from "./color";
import { isMobile } from "./utils";
import * as dat from "lil-gui";

/**
 * Debug
 */
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = null;
scene.fog = new THREE.Fog(0xffffff, 0, 750);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const flagTexture = textureLoader.load("/textures/flag/brasil.jpeg");
const normalTexture = textureLoader.load("/textures/matcap/normal.jpeg");

/**
 * Fonts
 */
const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  // Material
  const material = new THREE.MeshNormalMaterial({
    matcap: normalTexture,
  });

  // Font style
  const fontSize = isMobile ? 0.25 : 0.5;
  const fontStyle = {
    font: font,
    size: fontSize,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  };

  // Text
  const nameGeometry = new TextGeometry("Matheus Morett", fontStyle);
  nameGeometry.center();
  nameGeometry.translate(0, 2, isMobile ? 2 : 1);
  const nameMesh = new THREE.Mesh(nameGeometry, material);

  const occupationGeometry = new TextGeometry("Software Engineer", fontStyle);
  occupationGeometry.center();
  occupationGeometry.translate(0, isMobile ? 1.5 : 1, isMobile ? 2 : 1);
  const occupationMesh = new THREE.Mesh(occupationGeometry, material);

  const groupText = new THREE.Group();
  groupText.add(nameMesh);
  groupText.add(occupationMesh);
  scene.add(groupText);
});

// Floor
const floorGeometry = new THREE.PlaneGeometry(20, 20);
floorGeometry.rotateX(-Math.PI / 2);
floorGeometry.setAttribute(
  "color",
  new THREE.Float32BufferAttribute(colorsFloor, 3)
);
const floorMaterial = new THREE.MeshStandardMaterial({ vertexColors: true });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.receiveShadow = true; //default
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
 * Flag
 */
const poleGeometry = new THREE.CylinderGeometry(0.12, 0.12, 3, 32);
const poleMaterial = new THREE.MeshPhongMaterial({
  color: "#ffcc99",
  specular: "#999999",
  shininess: 30,
});
const poleMesh = new THREE.Mesh(poleGeometry, poleMaterial);
poleMesh.castShadow = true;
poleMesh.position.set(-5, 0.4, 3);

const [sizeW, sizeH, segW, segH] = [1.5, 1, 10, 10];
const flagGeometry = new THREE.PlaneGeometry(sizeW, sizeH, segW, segH);
const flagMaterial = new THREE.MeshLambertMaterial({
  map: flagTexture,
  side: THREE.DoubleSide,
});
const flagMesh = new THREE.Mesh(flagGeometry, flagMaterial);
flagMesh.position.set(-4.2, 1.3, 2.95);
flagMesh.castShadow = true;

const flagGroup = new THREE.Group();
flagGroup.add(poleMesh);
flagGroup.add(flagMesh);

if (isMobile) {
  flagGroup.scale.set(0.5, 0.5, -1);
}

if (!isMobile) {
  flagGroup.position.x = 0;
}

scene.add(flagGroup);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight("#FFFFFF", 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight("#FFFFFF", 1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.position.set(0, 10, 15);
scene.add(directionalLight);

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
  cursor.x = (event.clientX / sizes.width - 0.5);
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

window.addEventListener(
  "mousewheel",
  (event) => {
    event.preventDefault();
    let zoom = camera.zoom; // take current zoom value
    zoom += event.deltaY * -0.01; /// adjust it
    zoom = Math.min(Math.max(0.5, zoom), 4); /// clamp the value

    camera.zoom = zoom; /// assign new zoom value
    camera.updateProjectionMatrix(); /// make the changes take effect
  },
  { passive: false }
);

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
renderer.shadowMap.enabled = true;

// Clock
const clock = new THREE.Clock();

/**
 * Animate
 */
const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime();

  // Animate objects
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

  // Update flag
  for (
    var i = 2;
    i < flagMesh.geometry.attributes.position.array.length;
    i += 3
  ) {
    const x = flagMesh.geometry.attributes.position.array[i - 2];
    const y = flagMesh.geometry.attributes.position.array[i - 1];
    const waveX1 = 0.001 * Math.sin(x + elapsedTime);
    const waveX2 = 0.25 * Math.sin(x * 3 + elapsedTime * 2);
    const waveY1 = 0.1 * Math.sin(y * 5 + elapsedTime * 0.5);
    const multi = (x + 2.5) / 5;
    flagMesh.geometry.attributes.position.array[i] =
      (waveX1 + waveX2 + waveY1) * multi;
  }

  flagMesh.geometry.attributes.position.needsUpdate = true;

  // Update Camera
  camera.position.y = Math.max(0.5, ((cursor.y * 2 * -1) + 5));
  camera.position.x = (cursor.x * 10 * -1);
  camera.position.z = Math.cos(cursor.x * (Math.PI / 2)) * 10;
  camera.lookAt(new Vector3());

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
