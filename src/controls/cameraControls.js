export function setupCamera(sizes, isMobile, scene) {
  const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
  camera.position.y = isMobile ? 14.5 : 6.5;
  camera.position.z = isMobile ? 30 : 12;
  camera.rotation.x = -Math.PI / 7;

  scene.add(camera);
  return camera;
}

export function setupCameraControls(camera, gui) {
  const cameraFolder = gui.addFolder("Camera Controls");
  cameraFolder.add(camera.position, "x", -50, 50).name("Position X");
  cameraFolder.add(camera.position, "y", -50, 50).name("Position Y");
  cameraFolder.add(camera.position, "z", -50, 50).name("Position Z");
  cameraFolder.add(camera.rotation, "x", -Math.PI, Math.PI).name("Rotation X");
  cameraFolder.add(camera.rotation, "y", -Math.PI, Math.PI).name("Rotation Y");
  cameraFolder.add(camera.rotation, "z", -Math.PI, Math.PI).name("Rotation Z");
  cameraFolder.open();
}
