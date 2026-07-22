/**
 * js/solver/cross.js
 * CFOP White Cross Solver Engine with fast search limits.
 */

if (typeof require !== 'undefined') {
    var { cloneCube, cubeToString, isCrossSolved } = require('../core/cube.js');
    var { applyMove, optimizeMoves } = require('../core/moves.js');
}

/**
 * Solves the White Cross on bottom (D) face.
 */
function solveCross(initialCube) {
    let cube = cloneCube(initialCube);
    if (isCrossSolved(cube)) {
        return [];
    }

    // 1. Fast BFS up to depth 4 (< 5ms)
    const bfsMoves = findCrossBFS(cube, 4);
    if (bfsMoves !== null) {
        return optimizeMoves(bfsMoves);
    }

    // 2. Fallback rule-based piece placement
    const ruleMoves = [];
    const targetEdges = [
        { face: 'F', color: cube.F[1][1], turn: 'F' },
        { face: 'R', color: cube.R[1][1], turn: 'R' },
        { face: 'B', color: cube.B[1][1], turn: 'B' },
        { face: 'L', color: cube.L[1][1], turn: 'L' }
    ];

    for (let target of targetEdges) {
        let moves = solveSingleWhiteEdge(cube, target);
        ruleMoves.push(...moves);
    }

    return optimizeMoves(ruleMoves);
}

function findCrossBFS(startCube, maxDepth) {
    const moves = ['F', "F'", 'F2', 'R', "R'", 'R2', 'B', "B'", 'B2', 'L', "L'", 'L2', 'U', "U'", 'U2', 'D', "D'", 'D2'];
    const visited = new Set();

    let queue = [{ cube: startCube, path: [] }];
    visited.add(cubeToString(startCube));

    for (let depth = 0; depth <= maxDepth; depth++) {
        let nextQueue = [];
        for (let item of queue) {
            if (isCrossSolved(item.cube)) {
                return item.path;
            }
            if (depth < maxDepth) {
                for (let m of moves) {
                    if (item.path.length > 0 && item.path[item.path.length - 1][0] === m[0]) continue;

                    let nextCube = cloneCube(item.cube);
                    applyMove(nextCube, m);
                    let key = cubeToString(nextCube);

                    if (!visited.has(key)) {
                        visited.add(key);
                        nextQueue.push({ cube: nextCube, path: [...item.path, m] });
                    }
                }
            }
        }
        queue = nextQueue;
    }
    return null;
}

function solveSingleWhiteEdge(cube, target) {
    const moves = [];
    let safety = 0;
    while (safety < 12) {
        safety++;
        if (target.face === 'F' && cube.D[0][1] === 'w' && cube.F[2][1] === target.color) break;
        if (target.face === 'R' && cube.D[1][2] === 'w' && cube.R[2][1] === target.color) break;
        if (target.face === 'B' && cube.D[2][1] === 'w' && cube.B[2][1] === target.color) break;
        if (target.face === 'L' && cube.D[1][0] === 'w' && cube.L[2][1] === target.color) break;

        // Bring target white edge up to U layer then drop down
        if (cube.D[0][1] === 'w' || cube.F[2][1] === 'w') { applyMove(cube, 'F2'); moves.push('F2'); continue; }
        if (cube.D[1][2] === 'w' || cube.R[2][1] === 'w') { applyMove(cube, 'R2'); moves.push('R2'); continue; }
        if (cube.D[2][1] === 'w' || cube.B[2][1] === 'w') { applyMove(cube, 'B2'); moves.push('B2'); continue; }
        if (cube.D[1][0] === 'w' || cube.L[2][1] === 'w') { applyMove(cube, 'L2'); moves.push('L2'); continue; }

        applyMove(cube, 'U');
        moves.push('U');
    }
    return moves;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        solveCross,
        findCrossBFS
    };
}
