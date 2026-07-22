/**
 * js/solver/cross.js
 * CFOP White Cross Solver Engine.
 * Solves the 4 White edges (White-Green, White-Orange, White-Blue, White-Red) onto the D face.
 */

if (typeof require !== 'undefined') {
    var { cloneCube, isCrossSolved } = require('../core/cube.js');
    var { applyMove, optimizeMoves } = require('../core/moves.js');
}

/**
 * Solves the White Cross on bottom (D) face.
 * Returns an array of move strings (e.g. ['F2', 'U', 'R2']).
 */
function solveCross(initialCube) {
    let cube = cloneCube(initialCube);
    if (isCrossSolved(cube)) {
        return [];
    }

    // 1. Try BFS search for optimal cross (depth 0 to 6)
    const bfsMoves = findCrossBFS(cube, 6);
    if (bfsMoves !== null) {
        return optimizeMoves(bfsMoves);
    }

    // 2. Fallback rule-based piece-by-piece cross solver
    const ruleMoves = [];
    const targetEdges = [
        { name: 'Front', face: 'F', color: cube.F[1][1], turn: 'F' },
        { name: 'Right', face: 'R', color: cube.R[1][1], turn: 'R' },
        { name: 'Back',  face: 'B', color: cube.B[1][1], turn: 'B' },
        { name: 'Left',  face: 'L', color: cube.L[1][1], turn: 'L' }
    ];

    for (let target of targetEdges) {
        let moves = solveSingleWhiteEdge(cube, target);
        ruleMoves.push(...moves);
    }

    return optimizeMoves(ruleMoves);
}

/**
 * Fast BFS search to find shortest move sequence to solve Cross up to maxDepth.
 */
function findCrossBFS(startCube, maxDepth) {
    const moves = ['F', "F'", 'F2', 'R', "R'", 'R2', 'B', "B'", 'B2', 'L', "L'", 'L2', 'U', "U'", 'U2', 'D', "D'", 'D2'];

    // Queue entries: { cube, path }
    let queue = [{ cube: startCube, path: [] }];

    for (let depth = 0; depth <= maxDepth; depth++) {
        let nextQueue = [];
        for (let item of queue) {
            if (isCrossSolved(item.cube)) {
                return item.path;
            }
            if (depth < maxDepth) {
                for (let m of moves) {
                    // Skip redundant consecutive moves on same face
                    if (item.path.length > 0) {
                        const last = item.path[item.path.length - 1];
                        if (last[0] === m[0]) continue;
                    }
                    let nextCube = cloneCube(item.cube);
                    applyMove(nextCube, m);
                    nextQueue.push({ cube: nextCube, path: [...item.path, m] });
                }
            }
        }
        queue = nextQueue;
    }
    return null;
}

/**
 * Rule-based single edge placement for fallback.
 */
function solveSingleWhiteEdge(cube, target) {
    const moves = [];
    const white = 'w';
    let safety = 0;

    while (safety < 20) {
        safety++;
        // Check if target edge is already correctly in place
        if (target.face === 'F' && cube.D[0][1] === white && cube.F[2][1] === target.color) break;
        if (target.face === 'R' && cube.D[1][2] === white && cube.R[2][1] === target.color) break;
        if (target.face === 'B' && cube.D[2][1] === white && cube.B[2][1] === target.color) break;
        if (target.face === 'L' && cube.D[1][0] === white && cube.L[2][1] === target.color) break;

        // Find where the target edge piece is located
        let location = findWhiteEdge(cube, target.color);
        if (!location) break;

        // Bring to Top (U) layer
        if (location.layer === 'bottom') {
            const turn = location.face;
            applyMove(cube, turn + '2');
            moves.push(turn + '2');
            continue;
        } else if (location.layer === 'middle') {
            if (location.pos === 'left') {
                const turn = location.face;
                applyMove(cube, turn + "'");
                applyMove(cube, 'U');
                applyMove(cube, turn);
                moves.push(turn + "'", 'U', turn);
            } else {
                const turn = location.face;
                applyMove(cube, turn);
                applyMove(cube, 'U');
                applyMove(cube, turn + "'");
                moves.push(turn, 'U', turn + "'");
            }
            continue;
        }

        // Now in U layer: align with target center
        if (location.layer === 'top') {
            // Rotate U to bring target above its face
            let uMoves = alignTopEdgeWithFace(cube, location, target.face);
            moves.push(...uMoves);

            // Insert down
            if (cube.U[location.uRow][location.uCol] === white) {
                // White is facing Up
                applyMove(cube, target.turn + '2');
                moves.push(target.turn + '2');
            } else {
                // White is facing side
                applyMove(cube, 'U');
                applyMove(cube, target.turn + "'");
                applyMove(cube, 'F');
                moves.push('U', target.turn + "'", 'F');
            }
            break;
        }
    }

    return moves;
}

function findWhiteEdge(cube, sideColor) {
    const white = 'w';

    // Top layer edges
    if ((cube.U[2][1] === white && cube.F[0][1] === sideColor) || (cube.U[2][1] === sideColor && cube.F[0][1] === white))
        return { layer: 'top', face: 'F', uRow: 2, uCol: 1 };
    if ((cube.U[1][2] === white && cube.R[0][1] === sideColor) || (cube.U[1][2] === sideColor && cube.R[0][1] === white))
        return { layer: 'top', face: 'R', uRow: 1, uCol: 2 };
    if ((cube.U[0][1] === white && cube.B[0][1] === sideColor) || (cube.U[0][1] === sideColor && cube.B[0][1] === white))
        return { layer: 'top', face: 'B', uRow: 0, uCol: 1 };
    if ((cube.U[1][0] === white && cube.L[0][1] === sideColor) || (cube.U[1][0] === sideColor && cube.L[0][1] === white))
        return { layer: 'top', face: 'L', uRow: 1, uCol: 0 };

    // Middle layer edges
    if (cube.F[1][0] === white || cube.F[1][0] === sideColor) return { layer: 'middle', face: 'F', pos: 'left' };
    if (cube.F[1][2] === white || cube.F[1][2] === sideColor) return { layer: 'middle', face: 'F', pos: 'right' };
    if (cube.R[1][0] === white || cube.R[1][0] === sideColor) return { layer: 'middle', face: 'R', pos: 'left' };
    if (cube.R[1][2] === white || cube.R[1][2] === sideColor) return { layer: 'middle', face: 'R', pos: 'right' };

    // Bottom layer edges
    if (cube.D[0][1] === white || cube.F[2][1] === white) return { layer: 'bottom', face: 'F' };
    if (cube.D[1][2] === white || cube.R[2][1] === white) return { layer: 'bottom', face: 'R' };
    if (cube.D[2][1] === white || cube.B[2][1] === white) return { layer: 'bottom', face: 'B' };
    if (cube.D[1][0] === white || cube.L[2][1] === white) return { layer: 'bottom', face: 'L' };

    return null;
}

function alignTopEdgeWithFace(cube, location, targetFace) {
    const moves = [];
    const faceOrder = ['F', 'R', 'B', 'L'];
    const curIdx = faceOrder.indexOf(location.face);
    const tarIdx = faceOrder.indexOf(targetFace);

    let diff = (tarIdx - curIdx + 4) % 4;
    if (diff === 1) {
        applyMove(cube, 'U');
        moves.push('U');
    } else if (diff === 2) {
        applyMove(cube, 'U2');
        moves.push('U2');
    } else if (diff === 3) {
        applyMove(cube, "U'");
        moves.push("U'");
    }
    return moves;
}

// Export for Node and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        solveCross,
        findCrossBFS
    };
}
