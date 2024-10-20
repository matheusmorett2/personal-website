import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let rocketMesh;
export const particles = [];

export function loadRocket(planetGroup) {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load("/models/rocket.gltf", (gltf) => {
    rocketMesh = gltf.scene;
    rocketMesh.traverse(function (node) {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
    rocketMesh.scale.set(0.012, 0.012, 0.012);
    rocketMesh.position.set(4.23, 0.85, 3.2);
    planetGroup.add(rocketMesh);
  });

  return rocketMesh;
}
