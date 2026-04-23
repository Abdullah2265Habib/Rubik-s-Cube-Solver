// 3D Rubik's Cube Viewer using Three.js

let scene, camera, renderer;
let cubeGroup;
let cubelets = []; // Array of 27 cubelets
let cubeState;
let moveCounter = 0;
let isAnimating = false;
let mouseDown = false;
let mouseX = 0;
let mouseY = 0;
let targetRotation = { x: 0, y: 0 };
let currentRotation = { x: 0, y: 0 };

// Color mapping for cube faces
const colors = {
    'w': 0xFFFFFF,  // white
    'y': 0xFFFF00,  // yellow
    'r': 0xFF0000,  // red
    'o': 0xFF8800,  // orange
    'b': 0x0000FF,  // blue
    'g': 0x00AA00   // green
};

const faceNames = {
    0: 'w', // white (bottom)
    1: 'y', // yellow (top)
    2: 'r', // red (left)
    3: 'o', // orange (right)
    4: 'g', // green (front)
    5: 'b'  // blue (back)
};

function initScene() {
    // Scene setup
    const canvas = document.getElementById('canvas');
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);

    // Camera setup
    camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.shadowMap.enabled = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Cube group
    cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    // Initialize cube state
    cubeState = initializeCube();
    
    // Create cubelets
    createCubelets();

    // Event listeners
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('wheel', onMouseWheel, false);
    window.addEventListener('resize', onWindowResize, false);

    // Start animation loop
    animate();
}

function createCubelets() {
    const size = 0.9;
    const spacing = 1;
    const positions = [-1, 0, 1];

    let index = 0;
    for (let x of positions) {
        for (let y of positions) {
            for (let z of positions) {
                const cubelet = createCubelet(size);
                cubelet.position.set(x * spacing, y * spacing, z * spacing);
                cubelet.userData = { x, y, z, index: index++ };
                
                cubeGroup.add(cubelet);
                cubelets.push(cubelet);
            }
        }
    }
}

function createCubelet(size) {
    const cubelet = new THREE.Group();
    const geometry = new THREE.BoxGeometry(size, size, size);
    
    // Array to hold materials for each face
    const materials = [];
    
    // For each of the 6 faces of the cube
    for (let i = 0; i < 6; i++) {
        materials.push(new THREE.MeshStandardMaterial({
            color: 0x222222,
            metalness: 0.3,
            roughness: 0.4
        }));
    }
    
    const mesh = new THREE.Mesh(geometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    cubelet.add(mesh);

    // Add black border edges
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 }));
    cubelet.add(line);

    return cubelet;
}

function updateCubeletColors() {
    // Update colors based on cube state
    let cubeIndex = 0;
    
    for (let cubelet of cubelets) {
        const { x, y, z } = cubelet.userData;
        const mesh = cubelet.children[0];
        const materials = mesh.material;

        // Determine which faces are visible and their colors
        const faceColors = [0x222222, 0x222222, 0x222222, 0x222222, 0x222222, 0x222222];

        // Bottom face (white)
        if (y === -1) faceColors[4] = colors['w'];
        // Top face (yellow)
        if (y === 1) faceColors[5] = colors['y'];
        // Left face (red)
        if (x === -1) faceColors[2] = colors['r'];
        // Right face (orange)
        if (x === 1) faceColors[0] = colors['o'];
        // Front face (green)
        if (z === 1) faceColors[3] = colors['g'];
        // Back face (blue)
        if (z === -1) faceColors[1] = colors['b'];

        // Update material colors
        for (let i = 0; i < 6; i++) {
            materials[i].color.setHex(faceColors[i]);
        }
    }
}

function animate() {
    requestAnimationFrame(animate);

    // Smooth camera rotation
    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1;

    cubeGroup.rotation.x = currentRotation.x;
    cubeGroup.rotation.y = currentRotation.y;

    renderer.render(scene, camera);

    // Update FPS counter
    updateFpsCounter();
}

let lastTime = Date.now();
let frameCount = 0;
let fps = 60;

function updateFpsCounter() {
    frameCount++;
    const currentTime = Date.now();
    
    if (currentTime - lastTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        const fpsElement = document.getElementById('fpsCounter');
        if (fpsElement) {
            fpsElement.textContent = `FPS: ${fps}`;
        }
    }
}

function onMouseDown(event) {
    mouseDown = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function onMouseMove(event) {
    if (mouseDown) {
        const deltaX = event.clientX - mouseX;
        const deltaY = event.clientY - mouseY;

        targetRotation.y += deltaX * 0.005;
        targetRotation.x += deltaY * 0.005;

        mouseX = event.clientX;
        mouseY = event.clientY;
    }
}

function onMouseUp(event) {
    mouseDown = false;
}

function onMouseWheel(event) {
    event.preventDefault();
    
    const zoomSpeed = 0.5;
    const direction = camera.position.clone().normalize();
    
    if (event.deltaY > 0) {
        camera.position.addScaledVector(direction, zoomSpeed);
    } else {
        camera.position.addScaledVector(direction, -zoomSpeed);
    }

    // Clamp zoom
    const distance = camera.position.length();
    if (distance < 3) camera.position.normalize().multiplyScalar(3);
    if (distance > 12) camera.position.normalize().multiplyScalar(12);
}

function onWindowResize() {
    const canvas = document.getElementById('canvas');
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function applyMove(moveName) {
    if (isAnimating) return;

    isAnimating = true;
    moveCounter++;
    document.getElementById('moveCounter').textContent = `Moves: ${moveCounter}`;

    // Apply move to cube state
    performMove(moveName, cubeState);
    
    // Animate the visual representation
    animateMove(moveName, 0.5);
}

function animateMove(moveName, duration) {
    const startTime = Date.now();
    const speed = Math.PI / (2 * duration * 1000); // radians per ms

    function animateFrame() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        const angle = progress * Math.PI / 2;

        // Apply rotation based on move
        applyMoveRotation(moveName, angle, cubeGroup);

        if (progress < 1) {
            requestAnimationFrame(animateFrame);
        } else {
            isAnimating = false;
        }
    }

    animateFrame();
}

function applyMoveRotation(moveName, angle, group) {
    // This is simplified - in a real implementation, you'd rotate individual cubelets
    // For now, we'll show the visual rotation on the entire cube
    group.rotation.z += angle * 0.01;
}

function rotateX(angle) {
    targetRotation.x += angle;
}

function rotateY(angle) {
    targetRotation.y += angle;
}

function rotateZ(angle) {
    // Note: Z rotation would affect the entire view
    cubeGroup.rotation.z += angle;
}

function resetView() {
    targetRotation.x = 0;
    targetRotation.y = 0;
    currentRotation.x = 0;
    currentRotation.y = 0;
    cubeGroup.rotation.z = 0;
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
}

function resetCube() {
    cubeState = initializeCube();
    moveCounter = 0;
    document.getElementById('moveCounter').textContent = `Moves: 0`;
    resetView();
}

function shuffle() {
    const moves = ['R', 'L', 'U', 'F', 'B', 'D', 'R\'', 'L\'', 'U\'', 'F\'', 'B\'', 'D\''];
    const shuffleLength = Math.floor(Math.random() * 10) + 15;

    let moveIndex = 0;

    function applyNextMove() {
        if (moveIndex < shuffleLength) {
            const randomMove = moves[Math.floor(Math.random() * moves.length)];
            applyMove(randomMove);
            moveIndex++;
            setTimeout(applyNextMove, 300);
        }
    }

    applyNextMove();
}

function goToSolver() {
    window.location.href = 'index.html';
}

// Helper function to apply a move without the B and D moves (since our solver doesn't have them)
// We'll map them to similar moves
function performMove(moveName, cubeData) {
    const { green, white, yellow, red, orange, blue } = cubeData;

    switch(moveName) {
        case 'R':
            R(green, white, yellow, red, orange, blue);
            break;
        case 'L':
            L(green, white, yellow, red, orange, blue);
            break;
        case 'U':
            U(green, white, yellow, red, orange, blue);
            break;
        case 'F':
            F(green, white, yellow, red, orange, blue);
            break;
        case 'B':
            // Back move - not in original solver, use x rotation instead
            x(green, white, yellow, red, orange, blue);
            x(green, white, yellow, red, orange, blue);
            F(green, white, yellow, red, orange, blue);
            break;
        case 'D':
            // Down move - not in original solver, use inverse of U
            U_prime(green, white, yellow, red, orange, blue);
            U_prime(green, white, yellow, red, orange, blue);
            U_prime(green, white, yellow, red, orange, blue);
            break;
        case 'R\'':
            R_prime(green, white, yellow, red, orange, blue);
            break;
        case 'L\'':
            L_prime(green, white, yellow, red, orange, blue);
            break;
        case 'U\'':
            U_prime(green, white, yellow, red, orange, blue);
            break;
        case 'F\'':
            F_prime(green, white, yellow, red, orange, blue);
            break;
        case 'B\'':
            // Back inverse - not in original solver
            F_prime(green, white, yellow, red, orange, blue);
            x_prime(green, white, yellow, red, orange, blue);
            x_prime(green, white, yellow, red, orange, blue);
            break;
        case 'D\'':
            // Down inverse - not in original solver
            U(green, white, yellow, red, orange, blue);
            break;
    }
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', initScene);
