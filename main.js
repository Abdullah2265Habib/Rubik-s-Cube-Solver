// Main entry point for Rubik's Cube Solver

function initializeCube() {
    // Create 3x3 arrays for each face
    const front = [[], [], []];
    const down = [[], [], []];
    const up = [[], [], []];
    const left = [[], [], []];
    const right = [[], [], []];
    const back = [[], [], []];

    // Initialize with default values
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            front[i][j] = 'g';
            down[i][j] = 'd';
            up[i][j] = 'u';
            left[i][j] = 'l';
            right[i][j] = 'r';
            back[i][j] = 'b';
        }
    }

    return { front, down, up, left, right, back };
}

function inputCubeState(cubeData) {
    // Parse cube input
    const { front, down, up, left, right, back } = cubeData;

    // Parse input from form or text area
    const inputValues = document.getElementById('cubeInput').value.split('');
    let index = 0;

    // Parse each face
    const faces = [front, down, up, left, right, back];
    for (let face of faces) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (index < inputValues.length) {
                    face[i][j] = inputValues[index];
                    index++;
                }
            }
        }
    }

    return cubeData;
}

function performMove(moveName, cubeData) {
    const { front, down, up, left, right, back } = cubeData;

    switch(moveName) {
        case 'R':
            R(front, down, up, left, right, back);
            break;
        case 'L':
            L(front, down, up, left, right, back);
            break;
        case 'U':
            U(front, down, up, left, right, back);
            break;
        case 'F':
            F(front, down, up, left, right, back);
            break;
        case 'R\'':
            R_prime(front, down, up, left, right, back);
            break;
        case 'L\'':
            L_prime(front, down, up, left, right, back);
            break;
        case 'U\'':
            U_prime(front, down, up, left, right, back);
            break;
        case 'F\'':
            F_prime(front, down, up, left, right, back);
            break;
        case 'x':
            x(front, down, up, left, right, back);
            break;
        case 'y':
            y(front, down, up, left, right, back);
            break;
        case 'M':
            M(front, down, up, left, right, back);
            break;
        case 'M\'':
            M_prime(front, down, up, left, right, back);
            break;
    }

    return cubeData;
}

function solveCube() {
    const cubeData = initializeCube();
    const userInput = document.getElementById('cubeInput').value;
    
    if (userInput.length > 0) {
        inputCubeState(cubeData);
    }

    console.log("Initial Cube State:");
    displayCube(cubeData.front, cubeData.down, cubeData.up, cubeData.left, cubeData.right, cubeData.back);

    // Apply a test move (M move as shown in original C++ main.cpp)
    M(cubeData.front, cubeData.down, cubeData.up, cubeData.left, cubeData.right, cubeData.back);
    
    console.log("After M move:");
    displayCube(cubeData.front, cubeData.down, cubeData.up, cubeData.left, cubeData.right, cubeData.back);

    // Display output
    const output = document.getElementById('output');
    output.textContent += displayCube(cubeData.front, cubeData.down, cubeData.up, cubeData.left, cubeData.right, cubeData.back);
}

// Export for use in HTML
window.solveCube = solveCube;
window.performMove = performMove;
window.initializeCube = initializeCube;
