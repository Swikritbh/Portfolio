// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.hero-canvas'),
  alpha: true,
  antialias: true
});

renderer.setClearColor(0x000000, 1); // Pure black background
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 500;

// Create regular stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  color: 0x808080,
  size: 0.4,
  transparent: true,
  opacity: 0.5
});

const starVertices = [];
for(let i = 0; i < 6000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = -Math.random() * 2000;
  starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Create shooting stars
class ShootingStar {
  constructor() {
    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(18); // 6 vertices (x,y,z) for trail
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const gradient = new THREE.LineDashedMaterial({
      color: 0x2a9d8f,
      linewidth: 1,
      scale: 1,
      dashSize: 3,
      gapSize: 1,
      transparent: true,
      opacity: 0.7
    });

    this.star = new THREE.Line(this.geometry, gradient);
    this.reset();
    scene.add(this.star);
  }

  reset() {
    this.x = (Math.random() - 0.5) * 2000;
    this.y = (Math.random() - 0.5) * 2000;
    this.z = -1000;
    this.speed = 15 + Math.random() * 15;
    this.angle = Math.random() * Math.PI * 2;
    this.opacity = 0.7;
  }

  update() {
    // Update position
    this.z += this.speed;
    this.x += Math.cos(this.angle) * this.speed * 0.2;
    this.y += Math.sin(this.angle) * this.speed * 0.2;

    // Update trail positions
    const positions = this.star.geometry.attributes.position.array;
    for(let i = positions.length - 3; i >= 3; i -= 3) {
      positions[i] = positions[i - 3];
      positions[i + 1] = positions[i - 2];
      positions[i + 2] = positions[i - 1];
    }
    positions[0] = this.x;
    positions[1] = this.y;
    positions[2] = this.z;

    this.star.geometry.attributes.position.needsUpdate = true;

    // Reset if out of view
    if(this.z > 1000) {
      this.reset();
    }

    // Update opacity
    this.star.material.opacity = Math.min(1, (1000 - this.z) / 1000);
  }
}

// Create multiple shooting stars
const shootingStars = Array(15).fill(null).map(() => new ShootingStar());

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Rotate regular stars slowly
  stars.rotation.y += 0.0001;
  stars.rotation.z += 0.0001;
  
  // Update regular stars positions
  const positions = stars.geometry.attributes.position.array;
  for(let i = 0; i < positions.length; i += 3) {
    positions[i + 2] += 0.3; // Move stars toward camera
    if(positions[i + 2] > 0) {
      positions[i + 2] = -2000; // Reset star position
    }
  }
  stars.geometry.attributes.position.needsUpdate = true;
  
  // Update shooting stars
  shootingStars.forEach(star => star.update());
  
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Start animation
animate(); 