import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

const loader = new THREE.TextureLoader();
loader.load("image.png", (texture) => {
  const geo = new THREE.PlaneGeometry(3, 1);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
  });
  const car = new THREE.Mesh(geo, material);
  scene.add(car);
});

const windParticles = new THREE.Group();
scene.add(windParticles);

const rows = 3;
const cols = 50;
const spacingX = 0.3;
const spacingY = 1.2;

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const geometry = new THREE.SphereGeometry(0.05, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0x888888 });
    const particle = new THREE.Mesh(geometry, material);

    particle.position.x = -5 + col * spacingX;
    particle.position.y = spacingY * (row - 1);
    windParticles.add(particle);
  }
}
function animate() {
  requestAnimationFrame(animate);
  windParticles.children.forEach((p) => {
    p.position.x += 0.02;
    if (p.position.x > 6) p.position.x = -6;
  });
  renderer.render(scene, camera);
}
animate();
