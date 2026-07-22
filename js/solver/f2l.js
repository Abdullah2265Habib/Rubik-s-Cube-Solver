/**
 * js/solver/f2l.js
 * CFOP First Two Layers (F2L) Solver Engine.
 * Solves the 4 F2L corner-edge pairs (First Layer Corners + Second Layer Edges) deterministically.
 */

if (typeof require !== 'undefined') {
    var { cloneCube, isF2LSolved, isCrossSolved } = require('../core/cube.js');
    var { applyMove, applyAlgorithm, optimizeMoves } = require('../core/moves.js');
}

/**
 * Solves all 4 F2L slots.
 */
function solveF2L(initialCube) {
    let cube = cloneCube(initialCube);
    if (isF2LSolved(cube)) return [];

    const moves = [];

    // Phase 1: First Layer White Corners
    const cornerMoves = solveFirstLayerCorners(cube);
    moves.push(...cornerMoves);

    // Phase 2: Second Layer Edges
    const edgeMoves = solveSecondLayerEdges(cube);
    moves.push(...edgeMoves);

    return optimizeMoves(moves);
}

// -------------------------------------------------------------
// Phase 1: First Layer Corners
// -------------------------------------------------------------

function solveFirstLayerCorners(cube) {
    const moves = [];
    const slots = [
        { name: 'FR', c1: 'g', c2: 'o', cornerPos: 'FR' },
        { name: 'FL', c1: 'g', c2: 'r', cornerPos: 'FL' },
        { name: 'BR', c1: 'b', c2: 'o', cornerPos: 'BR' },
        { name: 'BL', c1: 'b', c2: 'r', cornerPos: 'BL' }
    ];

    for (let slot of slots) {
        let stepMoves = solveOneCorner(cube, slot);
        moves.push(...stepMoves);
    }
    return moves;
}

function solveOneCorner(cube, slot) {
    const moves = [];
    const white = 'w';
    let safety = 0;

    while (safety < 15) {
        safety++;
        if (isCornerSolved(cube, slot)) break;

        let pos = findCornerPos(cube, white, slot.c1, slot.c2);
        if (!pos) break;

        // If in bottom layer (wrong slot or flipped), pop to U layer
        if (pos.layer === 'bottom') {
            let popAlg = getPopCornerAlg(pos.slot);
            applyAlgorithm(cube, popAlg);
            moves.push(...popAlg.trim().split(/\s+/));
            continue;
        }

        // Now in U layer: rotate U until above target slot
        if (pos.layer === 'top') {
            const targetPos = 'U-' + slot.name; // e.g. U-FR
            if (pos.sub !== targetPos) {
                const order = ['U-FR', 'U-BR', 'U-BL', 'U-FL'];
                const curIdx = order.indexOf(pos.sub);
                const tarIdx = order.indexOf(targetPos);
                const diff = (tarIdx - curIdx + 4) % 4;

                let uTurn = diff === 1 ? 'U' : diff === 2 ? 'U2' : "U'";
                applyMove(cube, uTurn);
                moves.push(uTurn);
                continue;
            }

            // Directly above target slot: insert corner
            let insertAlg = getInsertCornerAlg(slot.name, pos.whiteFacing);
            applyAlgorithm(cube, insertAlg);
            moves.push(...insertAlg.trim().split(/\s+/));
            break;
        }
    }

    return moves;
}

function isCornerSolved(cube, slot) {
    if (slot.name === 'FR') return cube.D[0][2] === 'w' && cube.F[2][2] === 'g' && cube.R[2][0] === 'o';
    if (slot.name === 'FL') return cube.D[0][0] === 'w' && cube.F[2][0] === 'g' && cube.L[2][2] === 'r';
    if (slot.name === 'BR') return cube.D[2][2] === 'w' && cube.B[2][0] === 'b' && cube.R[2][2] === 'o';
    if (slot.name === 'BL') return cube.D[2][0] === 'w' && cube.B[2][2] === 'b' && cube.L[2][0] === 'r';
    return false;
}

function findCornerPos(cube, w, c1, c2) {
    // Check U layer (Top)
    // U-FR
    if (isCornerMatch(cube.U[2][2], cube.F[0][2], cube.R[0][0], w, c1, c2)) {
        let facing = cube.U[2][2] === w ? 'U' : (cube.R[0][0] === w ? 'R' : 'F');
        return { layer: 'top', sub: 'U-FR', whiteFacing: facing };
    }
    // U-FL
    if (isCornerMatch(cube.U[2][0], cube.F[0][0], cube.L[0][2], w, c1, c2)) {
        let facing = cube.U[2][0] === w ? 'U' : (cube.F[0][0] === w ? 'F' : 'L');
        return { layer: 'top', sub: 'U-FL', whiteFacing: facing };
    }
    // U-BR
    if (isCornerMatch(cube.U[0][2], cube.B[0][0], cube.R[0][2], w, c1, c2)) {
        let facing = cube.U[0][2] === w ? 'U' : (cube.B[0][0] === w ? 'B' : 'R');
        return { layer: 'top', sub: 'U-BR', whiteFacing: facing };
    }
    // U-BL
    if (isCornerMatch(cube.U[0][0], cube.B[0][2], cube.L[0][0], w, c1, c2)) {
        let facing = cube.U[0][0] === w ? 'U' : (cube.L[0][0] === w ? 'L' : 'B');
        return { layer: 'top', sub: 'U-BL', whiteFacing: facing };
    }

    // Check D layer (Bottom)
    if (isCornerMatch(cube.D[0][2], cube.F[2][2], cube.R[2][0], w, c1, c2)) return { layer: 'bottom', slot: 'FR' };
    if (isCornerMatch(cube.D[0][0], cube.F[2][0], cube.L[2][2], w, c1, c2)) return { layer: 'bottom', slot: 'FL' };
    if (isCornerMatch(cube.D[2][2], cube.B[2][0], cube.R[2][2], w, c1, c2)) return { layer: 'bottom', slot: 'BR' };
    if (isCornerMatch(cube.D[2][0], cube.B[2][2], cube.L[2][0], w, c1, c2)) return { layer: 'bottom', slot: 'BL' };

    return null;
}

function isCornerMatch(a, b, c, w, c1, c2) {
    const colors = [a, b, c];
    return colors.includes(w) && colors.includes(c1) && colors.includes(c2);
}

function getPopCornerAlg(slot) {
    if (slot === 'FR') return "R U R' U'";
    if (slot === 'FL') return "L' U' L U";
    if (slot === 'BR') return "R' U' R U";
    if (slot === 'BL') return "L U L' U'";
    return "R U R' U'";
}

function getInsertCornerAlg(slot, facing) {
    if (slot === 'FR') {
        if (facing === 'R') return "R U R'";
        if (facing === 'F') return "F' U' F";
        return "R U2 R' U' R U R'";
    }
    if (slot === 'FL') {
        if (facing === 'F') return "F U F'";
        if (facing === 'L') return "L' U' L";
        return "L' U2 L U L' U' L";
    }
    if (slot === 'BR') {
        if (facing === 'B') return "B U B'";
        if (facing === 'R') return "R' U' R";
        return "R' U2 R U R' U' R";
    }
    if (slot === 'BL') {
        if (facing === 'L') return "L U L'";
        if (facing === 'B') return "B' U' B";
        return "B' U2 B U B' U' B";
    }
    return "R U R'";
}

// -------------------------------------------------------------
// Phase 2: Second Layer Edges
// -------------------------------------------------------------

function solveSecondLayerEdges(cube) {
    const moves = [];
    const edgeSlots = [
        { name: 'FR', c1: 'g', c2: 'o' },
        { name: 'FL', c1: 'g', c2: 'r' },
        { name: 'BR', c1: 'b', c2: 'o' },
        { name: 'BL', c1: 'b', c2: 'r' }
    ];

    for (let slot of edgeSlots) {
        let stepMoves = solveOneSecondLayerEdge(cube, slot);
        moves.push(...stepMoves);
    }

    return moves;
}

function solveOneSecondLayerEdge(cube, slot) {
    const moves = [];
    let safety = 0;

    while (safety < 15) {
        safety++;
        if (isEdgeSlotSolved(cube, slot)) break;

        let pos = findMiddleEdgePos(cube, slot.c1, slot.c2);
        if (!pos) break;

        // If in middle layer (wrong slot or flipped), pop to U layer
        if (pos.layer === 'middle') {
            let popAlg = getPopEdgeAlg(pos.slot);
            applyAlgorithm(cube, popAlg);
            moves.push(...popAlg.trim().split(/\s+/));
            // Restore corner if needed
            let fixCornerMoves = solveFirstLayerCorners(cube);
            moves.push(...fixCornerMoves);
            continue;
        }

        // In U layer: rotate U until top/side color matches center
        if (pos.layer === 'top') {
            let insertAlg = getInsertEdgeAlg(slot.name, pos.sideColor, pos.topColor, cube);
            if (insertAlg) {
                applyAlgorithm(cube, insertAlg);
                moves.push(...insertAlg.trim().split(/\s+/));
                break;
            } else {
                applyMove(cube, 'U');
                moves.push('U');
            }
        }
    }

    return moves;
}

function isEdgeSlotSolved(cube, slot) {
    if (slot.name === 'FR') return cube.F[1][2] === 'g' && cube.R[1][0] === 'o';
    if (slot.name === 'FL') return cube.F[1][0] === 'g' && cube.L[1][2] === 'r';
    if (slot.name === 'BR') return cube.B[1][0] === 'b' && cube.R[1][2] === 'o';
    if (slot.name === 'BL') return cube.B[1][2] === 'b' && cube.L[1][0] === 'r';
    return false;
}

function findMiddleEdgePos(cube, c1, c2) {
    // Top layer edges
    if (isEdgeMatch(cube.U[2][1], cube.F[0][1], c1, c2)) return { layer: 'top', sideFace: 'F', topColor: cube.U[2][1], sideColor: cube.F[0][1] };
    if (isEdgeMatch(cube.U[1][2], cube.R[0][1], c1, c2)) return { layer: 'top', sideFace: 'R', topColor: cube.U[1][2], sideColor: cube.R[0][1] };
    if (isEdgeMatch(cube.U[0][1], cube.B[0][1], c1, c2)) return { layer: 'top', sideFace: 'B', topColor: cube.U[0][1], sideColor: cube.B[0][1] };
    if (isEdgeMatch(cube.U[1][0], cube.L[0][1], c1, c2)) return { layer: 'top', sideFace: 'L', topColor: cube.U[1][0], sideColor: cube.L[0][1] };

    // Middle layer edges
    if (isEdgeMatch(cube.F[1][2], cube.R[1][0], c1, c2)) return { layer: 'middle', slot: 'FR' };
    if (isEdgeMatch(cube.F[1][0], cube.L[1][2], c1, c2)) return { layer: 'middle', slot: 'FL' };
    if (isEdgeMatch(cube.B[1][0], cube.R[1][2], c1, c2)) return { layer: 'middle', slot: 'BR' };
    if (isEdgeMatch(cube.B[1][2], cube.L[1][0], c1, c2)) return { layer: 'middle', slot: 'BL' };

    return null;
}

function isEdgeMatch(a, b, c1, c2) {
    return (a === c1 && b === c2) || (a === c2 && b === c1);
}

function getPopEdgeAlg(slot) {
    if (slot === 'FR') return "U R U' R' U' F' U F";
    if (slot === 'FL') return "U' L' U L U F U' F'";
    if (slot === 'BR') return "U R' U' R U' B' U B";
    if (slot === 'BL') return "U' L U L' U B U' B'";
    return "U R U' R' U' F' U F";
}

function getInsertEdgeAlg(slotName, sideColor, topColor, cube) {
    // Check matching face center
    if (slotName === 'FR') {
        if (sideColor === 'g') return "U R U' R' U' F' U F";
        if (sideColor === 'o') return "U' F' U F U R U' R'";
    }
    if (slotName === 'FL') {
        if (sideColor === 'g') return "U' L' U L U F U' F'";
        if (sideColor === 'r') return "U F U' F' U' L' U L";
    }
    if (slotName === 'BR') {
        if (sideColor === 'b') return "U R' U' R U' B' U B";
        if (sideColor === 'o') return "U' B' U B U R' U' R";
    }
    if (slotName === 'BL') {
        if (sideColor === 'b') return "U' L U L' U B U' B'";
        if (sideColor === 'r') return "U B U' B' U' L U L'";
    }
    return null;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        solveF2L
    };
}
