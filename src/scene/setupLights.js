export function setupLights(scene) {
  const ambientLight = new THREE.AmbientLight("#FFFFFF", 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("#FFFFFF", 0.85);
  directionalLight.position.set(0, 15, 15);
  scene.add(directionalLight);

  const blueLight = new THREE.PointLight(0x0000ff, 0.5);
  blueLight.position.set(0, 15, 15);
  scene.add(blueLight);

  return { ambientLight, directionalLight, blueLight };
}
