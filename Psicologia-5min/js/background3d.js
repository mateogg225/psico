import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const container = document.getElementById('canvas-container');

// Scene Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffebcd, 0.8);
dirLight.position.set(10, 10, 5);
scene.add(dirLight);

// Objects: Floating Islands
const geometry = new THREE.ConeGeometry(1, 1.5, 4);
const material = new THREE.MeshStandardMaterial({
    color: 0x86c8e8,
    flatShading: true,
    roughness: 0.8
});

const islands = [];
for (let i = 0; i < 15; i++) {
    const island = new THREE.Mesh(geometry, material);
    island.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 2,
        (Math.random() - 0.5) * 10 - 5
    );
    island.rotation.x = Math.PI; // Inverted cone
    island.rotation.y = Math.random() * Math.PI;
    island.scale.setScalar(Math.random() * 0.5 + 0.5);
    scene.add(island);
    islands.push({ mesh: island, speed: Math.random() * 0.002 + 0.001 });
}

// Objects: Clouds
const cloudGeo = new THREE.IcosahedronGeometry(1, 0);
const cloudMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true,
    transparent: true,
    opacity: 0.8
});

const clouds = [];
for (let i = 0; i < 20; i++) {
    const cloud = new THREE.Mesh(cloudGeo, cloudMat);
    cloud.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 10 + 2,
        (Math.random() - 0.5) * 10 - 8
    );
    cloud.scale.set(
        Math.random() * 1 + 1,
        Math.random() * 0.5 + 0.5,
        Math.random() * 0.5 + 0.5
    );
    scene.add(cloud);
    clouds.push({ mesh: cloud, speed: Math.random() * 0.005 + 0.002 });
}

// Particles
const particlesGeo = new THREE.BufferGeometry();
const particlesCount = 200;
const posArray = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 25;
}
particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMat = new THREE.PointsMaterial({
    size: 0.05,
    color: 0xffea00,
    transparent: true,
    opacity: 0.8
});
const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
scene.add(particlesMesh);

// THEME SYSTEM
const themes = {
    light: {
        fog: 0xd4ebf7,
        ambient: 0xffffff,
        dirLight: 0xffebcd,
        island: 0x86c8e8,
        particles: 0xffea00
    },
    sunset: {
        fog: 0xffd1a9, // Orange/Peach
        ambient: 0xffddee,
        dirLight: 0xffaa00,
        island: 0xff9966,
        particles: 0xffffff
    },
    dark: {
        fog: 0x0f1419, // Dark Blue/Black
        ambient: 0x222244,
        dirLight: 0x4444ff,
        island: 0x1f3a52,
        particles: 0x57c4e5
    }
};

window.set3DTheme = function (themeName) {
    const theme = themes[themeName] || themes['light'];

    // Smooth transition could be added here, currently instant
    scene.fog = new THREE.FogExp2(theme.fog, 0.002);
    ambientLight.color.setHex(theme.ambient);
    dirLight.color.setHex(theme.dirLight);
    material.color.setHex(theme.island);
    particlesMat.color.setHex(theme.particles);
};

// Initialize with saved theme or default
const savedTheme = localStorage.getItem('theme') || 'light';
window.set3DTheme(savedTheme);


// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    islands.forEach(item => {
        item.mesh.position.y += Math.sin(Date.now() * item.speed) * 0.005;
        item.mesh.rotation.y += 0.001;
    });

    clouds.forEach(item => {
        item.mesh.position.x -= item.speed;
        if (item.mesh.position.x < -15) item.mesh.position.x = 15;
    });

    particlesMesh.rotation.y += 0.001;
    particlesMesh.position.y += 0.002;
    if (particlesMesh.position.y > 5) particlesMesh.position.y = -5;

    renderer.render(scene, camera);
}

animate();

// Resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffebcd, 0.8);
dirLight.position.set(10, 10, 5);
scene.add(dirLight);

// Objects: Floating Islands (Distant)
const geometry = new THREE.ConeGeometry(1, 1.5, 4);
const material = new THREE.MeshStandardMaterial({
    color: 0x86c8e8,
    flatShading: true,
    roughness: 0.8
});

const islands = [];
for (let i = 0; i < 15; i++) {
    const island = new THREE.Mesh(geometry, material);
    island.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 2,
        (Math.random() - 0.5) * 10 - 5
    );
    island.rotation.x = Math.PI; // Inverted cone
    island.rotation.y = Math.random() * Math.PI;
    island.scale.setScalar(Math.random() * 0.5 + 0.5);
    scene.add(island);
    islands.push({ mesh: island, speed: Math.random() * 0.002 + 0.001 });
}

// Objects: Clouds (Low Poly Spheres)
const cloudGeo = new THREE.IcosahedronGeometry(1, 0);
const cloudMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true,
    transparent: true,
    opacity: 0.8
});

const clouds = [];
for (let i = 0; i < 20; i++) {
    const cloud = new THREE.Mesh(cloudGeo, cloudMat);
    cloud.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 10 + 2,
        (Math.random() - 0.5) * 10 - 8
    );
    cloud.scale.set(
        Math.random() * 1 + 1,
        Math.random() * 0.5 + 0.5,
        Math.random() * 0.5 + 0.5
    );
    scene.add(cloud);
    clouds.push({ mesh: cloud, speed: Math.random() * 0.005 + 0.002 });
}

// Particles (Ideas rising)
const particlesGeo = new THREE.BufferGeometry();
const particlesCount = 200;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 25;
}

particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMat = new THREE.PointsMaterial({
    size: 0.05,
    color: 0xffea00,
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
scene.add(particlesMesh);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Animate Islands
    islands.forEach(item => {
        item.mesh.position.y += Math.sin(Date.now() * item.speed) * 0.005;
        item.mesh.rotation.y += 0.001;
    });

    // Animate Clouds
    clouds.forEach(item => {
        item.mesh.position.x -= item.speed;
        if (item.mesh.position.x < -15) item.mesh.position.x = 15;
    });

    // Animate Particles
    particlesMesh.rotation.y += 0.001;
    particlesMesh.position.y += 0.002;
    if (particlesMesh.position.y > 5) particlesMesh.position.y = -5;

    renderer.render(scene, camera);
}

animate();

// Resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
