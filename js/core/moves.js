/**
 * js/core/moves.js
 * Rubik's Cube Move Operations.
 */

// Helper to rotate a 3x3 matrix clockwise in place or return new
function rotateCW(matrix) {
    return [
        [matrix[2][0], matrix[1][0], matrix[0][0]],
        [matrix[2][1], matrix[1][1], matrix[0][1]],
        [matrix[2][2], matrix[1][2], matrix[0][2]]
    ];
}

// Helper to rotate a 3x3 matrix counter-clockwise
function rotateCCW(matrix) {
    return [
        [matrix[0][2], matrix[1][2], matrix[2][2]],
        [matrix[0][1], matrix[1][1], matrix[2][1]],
        [matrix[0][0], matrix[1][0], matrix[2][0]]
    ];
}

// Helper to rotate a 3x3 matrix 180 degrees
function rotate180(matrix) {
    return [
        [matrix[2][2], matrix[2][1], matrix[2][0]],
        [matrix[1][2], matrix[1][1], matrix[1][0]],
        [matrix[0][2], matrix[0][1], matrix[0][0]]
    ];
}

/**
 * Apply a single move to the cube state object.
 * Returns the modified cube state (mutates in place and returns).
 */
function applyMove(cube, move) {
    const cleanMove = move.trim();

    switch (cleanMove) {
        // Base Face Moves
        case 'U': return moveU(cube);
        case "U'": case 'Ui': return moveUPrime(cube);
        case 'U2': return moveU2(cube);

        case 'D': return moveD(cube);
        case "D'": case 'Di': return moveDPrime(cube);
        case 'D2': return moveD2(cube);

        case 'R': return moveR(cube);
        case "R'": case 'Ri': return moveRPrime(cube);
        case 'R2': return moveR2(cube);

        case 'L': return moveL(cube);
        case "L'": case 'Li': return moveLPrime(cube);
        case 'L2': return moveL2(cube);

        case 'F': return moveF(cube);
        case "F'": case 'Fi': return moveFPrime(cube);
        case 'F2': return moveF2(cube);

        case 'B': return moveB(cube);
        case "B'": case 'Bi': return moveBPrime(cube);
        case 'B2': return moveB2(cube);

        // Slice Moves
        case 'M': return moveM(cube);
        case "M'": case 'Mi': return moveMPrime(cube);
        case 'M2': return moveM2(cube);

        case 'E': return moveE(cube);
        case "E'": case 'Ei': return moveEPrime(cube);
        case 'E2': return moveE2(cube);

        case 'S': return moveS(cube);
        case "S'": case 'Si': return moveSPrime(cube);
        case 'S2': return moveS2(cube);

        // Rotations
        case 'x': return rotateX(cube);
        case "x'": case 'xi': return rotateXPrime(cube);
        case 'x2': return rotateX2(cube);

        case 'y': return rotateY(cube);
        case "y'": case 'yi': return rotateYPrime(cube);
        case 'y2': return rotateY2(cube);

        case 'z': return rotateZ(cube);
        case "z'": case 'zi': return rotateZPrime(cube);
        case 'z2': return rotateZ2(cube);

        // Wide moves (e.g. Rw, Lw, etc.)
        case 'Rw': case 'r': applyMove(cube, 'L'); return applyMove(cube, 'x');
        case "Rw'": case "r'": applyMove(cube, "L'"); return applyMove(cube, "x'");
        case 'Lw': applyMove(cube, 'R'); return applyMove(cube, "x'");
        case "Lw'": applyMove(cube, "R'"); return applyMove(cube, 'x');
        case 'Uw': case 'u': applyMove(cube, 'D'); return applyMove(cube, 'y');
        case "Uw'": case "u'": applyMove(cube, "D'"); return applyMove(cube, "y'");
        case 'Dw': applyMove(cube, 'U'); return applyMove(cube, "y'");
        case "Dw'": applyMove(cube, "U'"); return applyMove(cube, 'y');
        case 'Fw': case 'f': applyMove(cube, 'B'); return applyMove(cube, 'z');
        case "Fw'": case "f'": applyMove(cube, "B'"); return applyMove(cube, "z'");

        default:
            console.warn(`Unknown move: ${move}`);
            return cube;
    }
}

/**
 * Executes a space-separated sequence of moves (e.g. "R U R' U'").
 */
function applyAlgorithm(cube, algoString) {
    if (!algoString) return cube;
    const tokens = algoString.trim().split(/\s+/);
    for (let token of tokens) {
        if (token) applyMove(cube, token);
    }
    return cube;
}

// -------------------------------------------------------------
// Face Move Implementations
// -------------------------------------------------------------

function moveU(cube) {
    cube.U = rotateCW(cube.U);
    const temp = [...cube.F[0]];
    cube.F[0] = [...cube.R[0]];
    cube.R[0] = [...cube.B[0]];
    cube.B[0] = [...cube.L[0]];
    cube.L[0] = temp;
    return cube;
}

function moveUPrime(cube) {
    cube.U = rotateCCW(cube.U);
    const temp = [...cube.F[0]];
    cube.F[0] = [...cube.L[0]];
    cube.L[0] = [...cube.B[0]];
    cube.B[0] = [...cube.R[0]];
    cube.R[0] = temp;
    return cube;
}

function moveU2(cube) {
    moveU(cube);
    return moveU(cube);
}

function moveD(cube) {
    cube.D = rotateCW(cube.D);
    const temp = [...cube.F[2]];
    cube.F[2] = [...cube.L[2]];
    cube.L[2] = [...cube.B[2]];
    cube.B[2] = [...cube.R[2]];
    cube.R[2] = temp;
    return cube;
}

function moveDPrime(cube) {
    cube.D = rotateCCW(cube.D);
    const temp = [...cube.F[2]];
    cube.F[2] = [...cube.R[2]];
    cube.R[2] = [...cube.B[2]];
    cube.B[2] = [...cube.L[2]];
    cube.L[2] = temp;
    return cube;
}

function moveD2(cube) {
    moveD(cube);
    return moveD(cube);
}

function moveR(cube) {
    cube.R = rotateCW(cube.R);
    const temp = [cube.U[0][2], cube.U[1][2], cube.U[2][2]];

    cube.U[0][2] = cube.F[0][2];
    cube.U[1][2] = cube.F[1][2];
    cube.U[2][2] = cube.F[2][2];

    cube.F[0][2] = cube.D[0][2];
    cube.F[1][2] = cube.D[1][2];
    cube.F[2][2] = cube.D[2][2];

    cube.D[0][2] = cube.B[2][0];
    cube.D[1][2] = cube.B[1][0];
    cube.D[2][2] = cube.B[0][0];

    cube.B[2][0] = temp[0];
    cube.B[1][0] = temp[1];
    cube.B[0][0] = temp[2];

    return cube;
}

function moveRPrime(cube) {
    cube.R = rotateCCW(cube.R);
    const temp = [cube.U[0][2], cube.U[1][2], cube.U[2][2]];

    cube.U[0][2] = cube.B[2][0];
    cube.U[1][2] = cube.B[1][0];
    cube.U[2][2] = cube.B[0][0];

    cube.B[2][0] = cube.D[0][2];
    cube.B[1][0] = cube.D[1][2];
    cube.B[0][0] = cube.D[2][2];

    cube.D[0][2] = cube.F[0][2];
    cube.D[1][2] = cube.F[1][2];
    cube.D[2][2] = cube.F[2][2];

    cube.F[0][2] = temp[0];
    cube.F[1][2] = temp[1];
    cube.F[2][2] = temp[2];

    return cube;
}

function moveR2(cube) {
    moveR(cube);
    return moveR(cube);
}

function moveL(cube) {
    cube.L = rotateCW(cube.L);
    const temp = [cube.U[0][0], cube.U[1][0], cube.U[2][0]];

    cube.U[0][0] = cube.B[2][2];
    cube.U[1][0] = cube.B[1][2];
    cube.U[2][0] = cube.B[0][2];

    cube.B[2][2] = cube.D[0][0];
    cube.B[1][2] = cube.D[1][0];
    cube.B[0][2] = cube.D[2][0];

    cube.D[0][0] = cube.F[0][0];
    cube.D[1][0] = cube.F[1][0];
    cube.D[2][0] = cube.F[2][0];

    cube.F[0][0] = temp[0];
    cube.F[1][0] = temp[1];
    cube.F[2][0] = temp[2];

    return cube;
}

function moveLPrime(cube) {
    cube.L = rotateCCW(cube.L);
    const temp = [cube.U[0][0], cube.U[1][0], cube.U[2][0]];

    cube.U[0][0] = cube.F[0][0];
    cube.U[1][0] = cube.F[1][0];
    cube.U[2][0] = cube.F[2][0];

    cube.F[0][0] = cube.D[0][0];
    cube.F[1][0] = cube.D[1][0];
    cube.F[2][0] = cube.D[2][0];

    cube.D[0][0] = cube.B[2][2];
    cube.D[1][0] = cube.B[1][2];
    cube.D[2][0] = cube.B[0][2];

    cube.B[2][2] = temp[0];
    cube.B[1][2] = temp[1];
    cube.B[0][2] = temp[2];

    return cube;
}

function moveL2(cube) {
    moveL(cube);
    return moveL(cube);
}

function moveF(cube) {
    cube.F = rotateCW(cube.F);
    const temp = [cube.U[2][0], cube.U[2][1], cube.U[2][2]];

    cube.U[2][0] = cube.L[2][2];
    cube.U[2][1] = cube.L[1][2];
    cube.U[2][2] = cube.L[0][2];

    cube.L[0][2] = cube.D[0][0];
    cube.L[1][2] = cube.D[0][1];
    cube.L[2][2] = cube.D[0][2];

    cube.D[0][0] = cube.R[2][0];
    cube.D[0][1] = cube.R[1][0];
    cube.D[0][2] = cube.R[0][0];

    cube.R[0][0] = temp[0];
    cube.R[1][0] = temp[1];
    cube.R[2][0] = temp[2];

    return cube;
}

function moveFPrime(cube) {
    cube.F = rotateCCW(cube.F);
    const temp = [cube.U[2][0], cube.U[2][1], cube.U[2][2]];

    cube.U[2][0] = cube.R[0][0];
    cube.U[2][1] = cube.R[1][0];
    cube.U[2][2] = cube.R[2][0];

    cube.R[0][0] = cube.D[0][2];
    cube.R[1][0] = cube.D[0][1];
    cube.R[2][0] = cube.D[0][0];

    cube.D[0][0] = cube.L[0][2];
    cube.D[0][1] = cube.L[1][2];
    cube.D[0][2] = cube.L[2][2];

    cube.L[0][2] = temp[2];
    cube.L[1][2] = temp[1];
    cube.L[2][2] = temp[0];

    return cube;
}

function moveF2(cube) {
    moveF(cube);
    return moveF(cube);
}

function moveB(cube) {
    cube.B = rotateCW(cube.B);
    const temp = [cube.U[0][0], cube.U[0][1], cube.U[0][2]];

    cube.U[0][0] = cube.R[0][2];
    cube.U[0][1] = cube.R[1][2];
    cube.U[0][2] = cube.R[2][2];

    cube.R[0][2] = cube.D[2][2];
    cube.R[1][2] = cube.D[2][1];
    cube.R[2][2] = cube.D[2][0];

    cube.D[2][0] = cube.L[0][0];
    cube.D[2][1] = cube.L[1][0];
    cube.D[2][2] = cube.L[2][0];

    cube.L[0][0] = temp[2];
    cube.L[1][0] = temp[1];
    cube.L[2][0] = temp[0];

    return cube;
}

function moveBPrime(cube) {
    cube.B = rotateCCW(cube.B);
    const temp = [cube.U[0][0], cube.U[0][1], cube.U[0][2]];

    cube.U[0][0] = cube.L[2][0];
    cube.U[0][1] = cube.L[1][0];
    cube.U[0][2] = cube.L[0][0];

    cube.L[0][0] = cube.D[2][0];
    cube.L[1][0] = cube.D[2][1];
    cube.L[2][0] = cube.D[2][2];

    cube.D[2][0] = cube.R[2][2];
    cube.D[2][1] = cube.R[1][2];
    cube.D[2][2] = cube.R[0][2];

    cube.R[0][2] = temp[0];
    cube.R[1][2] = temp[1];
    cube.R[2][2] = temp[2];

    return cube;
}

function moveB2(cube) {
    moveB(cube);
    return moveB(cube);
}

// -------------------------------------------------------------
// Slice Moves & Rotations
// -------------------------------------------------------------

function moveM(cube) {
    // M follows L direction (middle col of U->F->D->B->U)
    const temp = [cube.U[0][1], cube.U[1][1], cube.U[2][1]];

    cube.U[0][1] = cube.B[2][1];
    cube.U[1][1] = cube.B[1][1];
    cube.U[2][1] = cube.B[0][1];

    cube.B[2][1] = cube.D[0][1];
    cube.B[1][1] = cube.D[1][1];
    cube.B[0][1] = cube.D[2][1];

    cube.D[0][1] = cube.F[0][1];
    cube.D[1][1] = cube.F[1][1];
    cube.D[2][1] = cube.F[2][1];

    cube.F[0][1] = temp[0];
    cube.F[1][1] = temp[1];
    cube.F[2][1] = temp[2];

    return cube;
}

function moveMPrime(cube) {
    moveM(cube);
    moveM(cube);
    return moveM(cube);
}

function moveM2(cube) {
    moveM(cube);
    return moveM(cube);
}

function moveE(cube) {
    // E follows D direction (middle row of F->L->B->R->F)
    const temp = [...cube.F[1]];
    cube.F[1] = [...cube.L[1]];
    cube.L[1] = [...cube.B[1]];
    cube.B[1] = [...cube.R[1]];
    cube.R[1] = temp;
    return cube;
}

function moveEPrime(cube) {
    moveE(cube);
    moveE(cube);
    return moveE(cube);
}

function moveE2(cube) {
    moveE(cube);
    return moveE(cube);
}

function moveS(cube) {
    // S follows F direction
    const temp = [cube.U[1][0], cube.U[1][1], cube.U[1][2]];

    cube.U[1][0] = cube.L[2][1];
    cube.U[1][1] = cube.L[1][1];
    cube.U[1][2] = cube.L[0][1];

    cube.L[0][1] = cube.D[1][0];
    cube.L[1][1] = cube.D[1][1];
    cube.L[2][1] = cube.D[1][2];

    cube.D[1][0] = cube.R[2][1];
    cube.D[1][1] = cube.R[1][1];
    cube.D[1][2] = cube.R[0][1];

    cube.R[0][1] = temp[0];
    cube.R[1][1] = temp[1];
    cube.R[2][1] = temp[2];

    return cube;
}

function moveSPrime(cube) {
    moveS(cube);
    moveS(cube);
    return moveS(cube);
}

function moveS2(cube) {
    moveS(cube);
    return moveS(cube);
}

function rotateX(cube) {
    moveR(cube);
    moveMPrime(cube);
    moveLPrime(cube);
    return cube;
}

function rotateXPrime(cube) {
    moveRPrime(cube);
    moveM(cube);
    moveL(cube);
    return cube;
}

function rotateX2(cube) {
    rotateX(cube);
    return rotateX(cube);
}

function rotateY(cube) {
    moveU(cube);
    moveEPrime(cube);
    moveDPrime(cube);
    return cube;
}

function rotateYPrime(cube) {
    moveUPrime(cube);
    moveE(cube);
    moveD(cube);
    return cube;
}

function rotateY2(cube) {
    rotateY(cube);
    return rotateY(cube);
}

function rotateZ(cube) {
    moveF(cube);
    moveS(cube);
    moveBPrime(cube);
    return cube;
}

function rotateZPrime(cube) {
    moveFPrime(cube);
    moveSPrime(cube);
    moveB(cube);
    return cube;
}

function rotateZ2(cube) {
    rotateZ(cube);
    return rotateZ(cube);
}

/**
 * Simplifies a sequence of moves (e.g., "R R'" -> "", "U U U U" -> "", "U U U" -> "U'").
 */
function optimizeMoves(moveList) {
    if (!moveList || moveList.length === 0) return [];
    let moves = [...moveList];
    let changed = true;

    while (changed) {
        changed = false;
        let newMoves = [];
        let i = 0;
        while (i < moves.length) {
            let curr = moves[i];
            let next = moves[i + 1];

            if (!next) {
                newMoves.push(curr);
                i++;
                break;
            }

            // Combine same base moves
            const base1 = curr.replace(/['2i]/g, '');
            const base2 = next.replace(/['2i]/g, '');

            if (base1 === base2) {
                // Calculate net rotation mod 4
                const val = (m) => m.includes('2') ? 2 : (m.includes("'") || m.includes('i') ? 3 : 1);
                const total = (val(curr) + val(next)) % 4;
                changed = true;
                if (total === 1) newMoves.push(base1);
                else if (total === 2) newMoves.push(base1 + '2');
                else if (total === 3) newMoves.push(base1 + "'");
                // total === 0 drops both moves
                i += 2;
            } else {
                newMoves.push(curr);
                i++;
            }
        }
        moves = newMoves;
    }

    return moves;
}

// Export for Node and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        applyMove,
        applyAlgorithm,
        optimizeMoves
    };
}
