import { gsap } from "gsap";

export function animateRocket(rocketMesh) {
  gsap.to(rocketMesh.position, {
    y: 30, // Faz o foguete subir
    duration: 2,
    ease: "power2.inOut",
    onUpdate: createFireParticles, // Função de partículas
  });

  gsap.to(rocketMesh.scale, {
    y: 0.015,
    duration: 0.5,
    repeat: false,
  });
}

export function createFireParticles(particles, rocketMesh, scene) {
  const particleCount = 5;
  const spread = 0.3;

  for (let i = 0; i < particleCount; i++) {
    const particleGeometry = new THREE.SphereGeometry(0.05, 6, 6);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xff4500 });

    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    particle.position.copy(rocketMesh.position);
    particle.position.x += (Math.random() - 0.5) * spread;
    particle.position.y -= 0.5;
    particle.position.z += (Math.random() - 0.5) * spread;

    scene.add(particle);
    particles.push(particle);

    setTimeout(() => {
      scene.remove(particle);
      particles = particles.filter(p => p !== particle);
    }, 500);
  }
}

export function updateParticles(particles) {
  particles.forEach(particle => {
    particle.position.y -= 0.05;
    particle.scale.multiplyScalar(0.95);
  });
}
