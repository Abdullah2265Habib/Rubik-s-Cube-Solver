/**
 * js/solver/f2l.js
 * CFOP First Two Layers (F2L) Solver Engine.
 * Solves all 4 corner-edge pairs into their respective slots while preserving Cross.
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
    const slots = ['FR', 'FL', 'BR', 'BL'];

    for (let slotName of slots) {
        if (!isSlotSolved(cube, slotName)) {
            const moves = solveSlotBFS(cube, slotName, 8);
            if (moves && moves.length > 0) {
                for (let m of moves) {
                    applyMove(cube, m);
                }
                f2lMoves.push(...moves);
            }
        }
    }

    return optimizeMoves(f2lMoves);
}

/**
 * Checks if a specific F2L slot is solved.
 */
function isSlotSolved(cube, slotName) {
    if (cube.D[1][1] !== 'w') return false;

    if (slotName === 'FR') {
        return cube.D[0][2] === 'w' &&
               cube.F[2][2] === cube.F[1][1] && cube.F[1][2] === cube.F[1][1] &&
               cube.R[2][0] === cube.R[1][1] && cube.R[1][0] === cube.R[1][1];
    }
    if (slotName === 'FL') {
        return cube.D[0][0] === 'w' &&
               cube.F[2][0] === cube.F[1][1] && cube.F[1][0] === cube.F[1][1] &&
               cube.L[2][2] === cube.L[1][1] && cube.L[1][2] === cube.L[1][1];
    }
    if (slotName === 'BR') {
        return cube.D[2][2] === 'w' &&
               cube.B[2][0] === cube.B[1][1] && cube.B[1][0] === cube.B[1][1] &&
               cube.R[2][2] === cube.R[1][1] && cube.R[1][2] === cube.R[1][1];
    }
    if (slotName === 'BL') {
        return cube.D[2][0] === 'w' &&
               cube.B[2][2] === cube.B[1][1] && cube.B[1][2] === cube.B[1][1] &&
               cube.L[2][0] === cube.L[1][1] && cube.L[1][0] === cube.L[1][1];
    }
    return false;
}

/**
 * Checks if all previously solved F2L slots remain intact.
 */
function checkSolvedSlotsIntact(cube, currentSlot) {
    const allSlots = ['FR', 'FL', 'BR', 'BL'];
    const idx = allSlots.indexOf(currentSlot);

    for (let i = 0; i < idx; i++) {
        if (!isSlotSolved(cube, allSlots[i])) return false;
    }
    return true;
}

/**
 * BFS search to solve target F2L slot.
 */
function solveSlotBFS(startCube, slotName, maxDepth) {
    // Select allowed face turns relevant to the slot
    let allowedMoves = ['U', "U'", 'U2'];
    if (slotName === 'FR') allowedMoves.push('R', "R'", 'R2', 'F', "F'", 'F2');
    else if (slotName === 'FL') allowedMoves.push('L', "L'", 'L2', 'F', "F'", 'F2');
    else if (slotName === 'BR') allowedMoves.push('R', "R'", 'R2', 'B', "B'", 'B2');
    else if (slotName === 'BL') allowedMoves.push('L', "L'", 'L2', 'B', "B'", 'B2');

    let queue = [{ cube: startCube, path: [] }];

    for (let depth = 0; depth <= maxDepth; depth++) {
        let nextQueue = [];
        for (let item of queue) {
            if (isSlotSolved(item.cube, slotName) &&
                isCrossSolved(item.cube) &&
                checkSolvedSlotsIntact(item.cube, slotName)) {
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

                    // Must preserve Cross and prior slots
                    if (isCrossSolved(nextCube) && checkSolvedSlotsIntact(nextCube, slotName)) {
                        nextQueue.push({ cube: nextCube, path: [...item.path, m] });
                    }
                }
            }
        }
        queue = nextQueue;
    }

    return [];
}

// Export for Node and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        solveF2L,
        isSlotSolved
    };
}
