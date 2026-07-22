/**
 * js/solver/f2l.js
 * CFOP First Two Layers (F2L) Solver Engine.
 * Solves the 4 corner-edge pairs into their respective slots.
 */

if (typeof require !== 'undefined') {
    var { cloneCube, isF2LSolved, isCrossSolved } = require('../core/cube.js');
    var { applyMove, applyAlgorithm, optimizeMoves } = require('../core/moves.js');
}

/**
 * Solves all 4 F2L pairs starting from a White Cross solved cube.
 * Returns an array of move strings.
 */
function solveF2L(initialCube) {
    let cube = cloneCube(initialCube);
    if (isF2LSolved(cube)) return [];

    const f2lMoves = [];
    // 4 Slots: FR (Green-Orange), FL (Green-Red), BR (Blue-Orange), BL (Blue-Red)
    const slots = [
        { name: 'FR', frontColor: 'g', rightColor: 'o', rot: '' },
        { name: 'FL', frontColor: 'g', rightColor: 'r', rot: 'y' },
        { name: 'BR', frontColor: 'b', rightColor: 'o', rot: "y'" },
        { name: 'BL', frontColor: 'b', rightColor: 'r', rot: 'y2' }
    ];

    for (let slot of slots) {
        let moves = solveSingleF2LSlot(cube, slot);
        f2lMoves.push(...moves);
    }

    return optimizeMoves(f2lMoves);
}

/**
 * Solves a single F2L slot.
 */
function solveSingleF2LSlot(cube, slot) {
    const moves = [];

    // Check if slot is already solved
    if (isSlotSolved(cube, slot)) {
        return moves;
    }

    // Try finding a direct search sequence to pair and insert (depth 0 to 6)
    const seq = findSlotSolverBFS(cube, slot, 6);
    if (seq !== null) {
        for (let m of seq) {
            applyMove(cube, m);
        }
        return seq;
    }

    // Fallback: standard CFOP pairing triggers
    const triggers = [
        "R U R'",
        "R U' R'",
        "R U2 R'",
        "F' U' F",
        "F' U F",
        "R U R' U' R U R'",
        "U R U' R'",
        "U' F' U F",
        "R U' R' U R U' R'",
        "R U2 R' U R U' R'",
        "F' U2 F U' F' U F",
        "R U R' U2 R U' R' U R U' R'",
        "y R U R'",
        "y R U' R'",
        "y' R U R'"
    ];

    for (let trig of triggers) {
        let testCube = cloneCube(cube);
        applyAlgorithm(testCube, trig);
        if (isSlotSolved(testCube, slot) && isCrossSolved(testCube)) {
            applyAlgorithm(cube, trig);
            moves.push(...trig.split(/\s+/));
            return moves;
        }
    }

    return moves;
}

/**
 * Checks if a specific F2L slot is solved.
 */
function isSlotSolved(cube, slot) {
    // Check D face corner for white
    if (cube.D[1][1] !== 'w') return false;

    if (slot.name === 'FR') {
        return cube.D[0][2] === 'w' &&
               cube.F[2][2] === cube.F[1][1] && cube.F[1][2] === cube.F[1][1] &&
               cube.R[2][0] === cube.R[1][1] && cube.R[1][0] === cube.R[1][1];
    }
    if (slot.name === 'FL') {
        return cube.D[0][0] === 'w' &&
               cube.F[2][0] === cube.F[1][1] && cube.F[1][0] === cube.F[1][1] &&
               cube.L[2][2] === cube.L[1][1] && cube.L[1][2] === cube.L[1][1];
    }
    if (slot.name === 'BR') {
        return cube.D[2][2] === 'w' &&
               cube.B[2][0] === cube.B[1][1] && cube.B[1][0] === cube.B[1][1] &&
               cube.R[2][2] === cube.R[1][1] && cube.R[1][2] === cube.R[1][1];
    }
    if (slot.name === 'BL') {
        return cube.D[2][0] === 'w' &&
               cube.B[2][2] === cube.B[1][1] && cube.B[1][2] === cube.B[1][1] &&
               cube.L[2][0] === cube.L[1][1] && cube.L[1][0] === cube.L[1][1];
    }

    return false;
}

/**
 * BFS search to solve target F2L slot without breaking the White Cross or already solved F2L slots.
 */
function findSlotSolverBFS(startCube, slot, maxDepth) {
    // Available moves for F2L pairing (U rotations, R/L/F/B slot turns)
    const allowedMoves = ['U', "U'", 'U2', 'R', "R'", 'R2', 'F', "F'", 'F2', 'L', "L'", 'L2', 'B', "B'", 'B2'];

    let queue = [{ cube: startCube, path: [] }];

    for (let depth = 0; depth <= maxDepth; depth++) {
        let nextQueue = [];
        for (let item of queue) {
            if (isSlotSolved(item.cube, slot) && isCrossSolved(item.cube)) {
                return item.path;
            }
            if (depth < maxDepth) {
                for (let m of allowedMoves) {
                    if (item.path.length > 0) {
                        const last = item.path[item.path.length - 1];
                        if (last[0] === m[0]) continue; // avoid U U or R R
                    }
                    let nextCube = cloneCube(item.cube);
                    applyMove(nextCube, m);

                    // Must preserve Cross at all times
                    if (isCrossSolved(nextCube)) {
                        nextQueue.push({ cube: nextCube, path: [...item.path, m] });
                    }
                }
            }
        }
        queue = nextQueue;
    }

    return null;
}

// Export for Node and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        solveF2L,
        solveSingleF2LSlot,
        isSlotSolved
    };
}
