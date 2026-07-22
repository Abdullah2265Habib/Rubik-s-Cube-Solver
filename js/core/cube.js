/**
 * js/core/cube.js
 * Cube state representation, validation, and conversion helpers.
 *
 * Standard CFOP Color scheme:
 * Up (U): Yellow ('y')
 * Down (D): White ('w')
 * Front (F): Green ('g')
 * Back (B): Blue ('b')
 * Left (L): Red ('r')
 * Right (R): Orange ('o')
 */

// Color mapping for full names and hex codes
const COLOR_MAP = {
    'w': { name: 'White', hex: '#ffffff', code: 'w' },
    'y': { name: 'Yellow', hex: '#ffeb3b', code: 'y' },
    'g': { name: 'Green', hex: '#4caf50', code: 'g' },
    'b': { name: 'Blue', hex: '#2196f3', code: 'b' },
    'r': { name: 'Red', hex: '#f44336', code: 'r' },
    'o': { name: 'Orange', hex: '#ff9800', code: 'o' }
};

/**
 * Creates a new solved cube state object.
 */
function createSolvedCube() {
    const makeFace = (color) => [
        [color, color, color],
        [color, color, color],
        [color, color, color]
    ];

    return {
        U: makeFace('y'),
        D: makeFace('w'),
        F: makeFace('g'),
        B: makeFace('b'),
        L: makeFace('r'),
        R: makeFace('o')
    };
}

/**
 * Creates a deep clone of a cube state object.
 */
function cloneCube(cube) {
    return {
        U: cube.U.map(row => [...row]),
        D: cube.D.map(row => [...row]),
        F: cube.F.map(row => [...row]),
        B: cube.B.map(row => [...row]),
        L: cube.L.map(row => [...row]),
        R: cube.R.map(row => [...row])
    };
}

/**
 * Serializes cube state to a 54-character string.
 * Order of faces: U (9), D (9), F (9), B (9), L (9), R (9)
 */
function cubeToString(cube) {
    const faces = ['U', 'D', 'F', 'B', 'L', 'R'];
    let str = '';
    for (let f of faces) {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                str += cube[f][r][c];
            }
        }
    }
    return str;
}

/**
 * Parses a 54-character string into a cube state object.
 * Format: 9 chars for U, 9 for D, 9 for F, 9 for B, 9 for L, 9 for R.
 */
function stringToCube(str) {
    const cleanStr = str.trim().toLowerCase();
    if (cleanStr.length !== 54) {
        throw new Error(`Invalid cube string length. Expected 54 characters, got ${cleanStr.length}.`);
    }

    const faces = ['U', 'D', 'F', 'B', 'L', 'R'];
    const cube = {};
    let idx = 0;

    for (let f of faces) {
        cube[f] = [[], [], []];
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const char = cleanStr[idx++];
                if (!COLOR_MAP[char]) {
                    // Normalize or fallback
                    cube[f][r][c] = char;
                } else {
                    cube[f][r][c] = char;
                }
            }
        }
    }

    return cube;
}

/**
 * Validates if the cube has valid color distribution (9 of each color).
 */
function validateCubeState(cube) {
    const counts = { 'w': 0, 'y': 0, 'g': 0, 'b': 0, 'r': 0, 'o': 0 };
    const faces = ['U', 'D', 'F', 'B', 'L', 'R'];

    for (let f of faces) {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const color = cube[f][r][c];
                if (counts[color] !== undefined) {
                    counts[color]++;
                } else {
                    return { valid: false, message: `Unknown color character '${color}'.` };
                }
            }
        }
    }

    for (let col in counts) {
        if (counts[col] !== 9) {
            return {
                valid: false,
                message: `Color '${COLOR_MAP[col]?.name || col}' has count ${counts[col]} (expected 9).`
            };
        }
    }

    return { valid: true, message: "Valid cube state." };
}

/**
 * Checks if the cube is fully solved.
 */
function isCubeSolved(cube) {
    const faces = ['U', 'D', 'F', 'B', 'L', 'R'];
    for (let f of faces) {
        const centerColor = cube[f][1][1];
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (cube[f][r][c] !== centerColor) return false;
            }
        }
    }
    return true;
}

/**
 * Checks if the White Cross on bottom (D) is solved.
 * Requirements:
 * 1. D[0][1], D[1][0], D[1][2], D[2][1] are all D[1][1] (White 'w').
 * 2. F[2][1] matches F[1][1] (Green).
 * 3. R[2][1] matches R[1][1] (Orange).
 * 4. B[2][1] matches B[1][1] (Blue).
 * 5. L[2][1] matches L[1][1] (Red).
 */
function isCrossSolved(cube) {
    const dColor = cube.D[1][1]; // White
    if (cube.D[0][1] !== dColor || cube.D[1][0] !== dColor ||
        cube.D[1][2] !== dColor || cube.D[2][1] !== dColor) {
        return false;
    }
    if (cube.F[2][1] !== cube.F[1][1]) return false;
    if (cube.R[2][1] !== cube.R[1][1]) return false;
    if (cube.B[2][1] !== cube.B[1][1]) return false;
    if (cube.L[2][1] !== cube.L[1][1]) return false;

    return true;
}

/**
 * Checks if First Two Layers (F2L) are solved.
 * Requirements:
 * 1. D face is all White.
 * 2. Bottom two rows of F, R, B, L match their center colors.
 */
function isF2LSolved(cube) {
    if (!isCrossSolved(cube)) return false;

    // Check all of D face
    const dColor = cube.D[1][1];
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (cube.D[r][c] !== dColor) return false;
        }
    }

    // Check bottom two rows of side faces
    const sideFaces = ['F', 'R', 'B', 'L'];
    for (let f of sideFaces) {
        const center = cube[f][1][1];
        for (let r = 1; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (cube[f][r][c] !== center) return false;
            }
        }
    }

    return true;
}

// Export for Node and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        COLOR_MAP,
        createSolvedCube,
        cloneCube,
        cubeToString,
        stringToCube,
        validateCubeState,
        isCubeSolved,
        isCrossSolved,
        isF2LSolved
    };
}
