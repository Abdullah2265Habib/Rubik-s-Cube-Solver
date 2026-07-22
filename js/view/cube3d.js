/**
 * js/view/cube3d.js
 * 3D Rubik's Cube Renderer using Three.js with Live Real-time Sync.
 */

let scene, camera, renderer;
let cubeGroup;
let cubelets = []; // 27 cubelets
let current3DCubeState = null;

// Color Hex Map for Three.js Materials
const COLOR_HEX = {
    'w': 0xffffff, // White
    'y': 0xffd600, // Yellow
    'g': 0x00e676, // Green
    'b': 0x29b6f6, // Blue
    'r': 0xff3366, // Red
    'o': 0xff9100  // Orange
};

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let targetRotation = { x: 0.5, y: -0.6 };
let currentRotation = { x: 0.5, y: -0.6 };

/**
 * Initializes the Three.js 3D Viewport Scene.
 */
function init3DScene(canvasId = 'cubeCanvas') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07090e);

    // Camera
    camera = new THREE.PerspectiveCamera(
        45,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );
    camera.position.set(6, 5, 8);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);

    // Cube Group
    cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    // Build 27 Cubelets
    build3DCubelets();

    // Mouse Interaction Event Listeners
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('wheel', onMouseWheel);
    window.addEventListener('resize', onWindowResize);

    // Start render loop
    animate3D();
}

/**
 * Creates 27 sub-cubes with crisp black edge borders.
 */
function build3DCubelets() {
    cubeGroup.clear();
    cubelets = [];
    const size = 0.95;
    const spacing = 1.0;
    const positions = [-1, 0, 1];

    const boxGeom = new THREE.BoxGeometry(size, size, size);
    const edgesGeom = new THREE.EdgesGeometry(boxGeom);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });

    for (let x of positions) {
        for (let y of positions) {
            for (let z of positions) {
                const materials = [];
                // 6 faces: [Right, Left, Top, Bottom, Front, Back]
                for (let f = 0; f < 6; f++) {
                    materials.push(new THREE.MeshStandardMaterial({
                        color: 0x111111,
                        roughness: 0.3,
                        metalness: 0.1
                    }));
                }

                const mesh = new THREE.Mesh(boxGeom, materials);
                const edgesLine = new THREE.LineSegments(edgesGeom, lineMat);

                const cubeletGroup = new THREE.Group();
                cubeletGroup.add(mesh);
                cubeletGroup.add(edgesLine);

                cubeletGroup.position.set(x * spacing, y * spacing, z * spacing);
                cubeletGroup.userData = { posX: x, posY: y, posZ: z };

                cubeGroup.add(cubeletGroup);
                cubelets.push(cubeletGroup);
            }
        }
    }
}

/**
 * Updates 3D Cube Colors based on full cube state object.
 */
function update3DCubeState(cubeState) {
    if (!cubeState || cubelets.length === 0) return;
    current3DCubeState = cubeState;

    for (let cubelet of cubelets) {
        const { posX, posY, posZ } = cubelet.userData;
        const mesh = cubelet.children[0];
        const materials = mesh.material;

        // Face Materials Index in Three.js BoxGeometry:
        // 0: Right (+X)
        // 1: Left (-X)
        // 2: Top (+Y)
        // 3: Bottom (-Y)
        // 4: Front (+Z)
        // 5: Back (-Z)

        // Reset to inner black
        for (let i = 0; i < 6; i++) {
            materials[i].color.setHex(0x111111);
        }

        // Top face (+Y) -> U (Yellow)
        if (posY === 1) {
            // Mapping matrix row: z + 1, col: x + 1 (Z goes -1 to 1: row 0 to 2; X goes -1 to 1: col 0 to 2)
            const row = posZ + 1;
            const col = posX + 1;
            const colorChar = cubeState.U[row][col];
            materials[2].color.setHex(COLOR_HEX[colorChar] || 0x111111);
        }

        // Bottom face (-Y) -> D (White)
        if (posY === -1) {
            // Z goes -1 to 1: row 2 to 0; X goes -1 to 1: col 0 to 2
            const row = 1 - posZ;
            const col = posX + 1;
            const colorChar = cubeState.D[row][col];
            materials[3].color.setHex(COLOR_HEX[colorChar] || 0x111111);
        }

        // Front face (+Z) -> F (Green)
        if (posZ === 1) {
            // Y goes 1 to -1: row 0 to 2; X goes -1 to 1: col 0 to 2
            const row = 1 - posY;
            const col = posX + 1;
            const colorChar = cubeState.F[row][col];
            materials[4].color.setHex(COLOR_HEX[colorChar] || 0x111111);
        }

        // Back face (-Z) -> B (Blue)
        if (posZ === -1) {
            // Y goes 1 to -1: row 0 to 2; X goes 1 to -1: col 0 to 2
            const row = 1 - posY;
            const col = 1 - posX;
            const colorChar = cubeState.B[row][col];
            materials[5].color.setHex(COLOR_HEX[colorChar] || 0x111111);
        }

        // Left face (-X) -> L (Red)
        if (posX === -1) {
            // Y goes 1 to -1: row 0 to 2; Z goes -1 to 1: col 0 to 2
            const row = 1 - posY;
            const col = posZ + 1;
            const colorChar = cubeState.L[row][col];
            materials[1].color.setHex(COLOR_HEX[colorChar] || 0x111111);
        }

        // Right face (+X) -> R (Orange)
        if (posX === 1) {
            // Y goes 1 to -1: row 0 to 2; Z goes 1 to -1: col 0 to 2
            const row = 1 - posY;
            const col = 1 - posZ;
            const colorChar = cubeState.R[row][col];
            materials[0].color.setHex(COLOR_HEX[colorChar] || 0x111111);
        }
    }
}

/**
 * Render Animation Loop
 */
function animate3D() {
    requestAnimationFrame(animate3D);

    // Smooth camera damping
    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1;

    if (cubeGroup) {
        cubeGroup.rotation.x = currentRotation.x;
        cubeGroup.rotation.y = currentRotation.y;
    }

    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Mouse Controls
function onMouseDown(e) {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
}

function onMouseMove(e) {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    targetRotation.y += deltaX * 0.008;
    targetRotation.x += deltaY * 0.008;

    previousMousePosition = { x: e.clientX, y: e.clientY };
}

function onMouseUp() {
    isDragging = false;
}

function onMouseWheel(e) {
    e.preventDefault();
    camera.position.z += e.deltaY * 0.005;
    camera.position.z = Math.max(4, Math.min(15, camera.position.z));
}

function onWindowResize() {
    const canvas = document.getElementById('cubeCanvas');
    if (!canvas || !renderer || !camera) return;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}

function reset3DView() {
    targetRotation = { x: 0.5, y: -0.6 };
    currentRotation = { x: 0.5, y: -0.6 };
    if (camera) camera.position.set(6, 5, 8);
}
