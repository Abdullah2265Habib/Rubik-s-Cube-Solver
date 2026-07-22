/**
 * js/solver/f2l.js
 * CFOP First Two Layers (F2L) Solver Engine.
 * Solves the 4 White Corners + 4 Middle Edges deterministically.
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

    // Phase 1: 4 White Corners
    const cornerMoves = solveAllCorners(cube);
    moves.push(...cornerMoves);

    // Phase 2: 4 Middle Edges
    const edgeMoves = solveAllMiddleEdges(cube);
    moves.push(...edgeMoves);

    return optimizeMoves(moves);
}

// -------------------------------------------------------------
// Phase 1: White Corners
// -------------------------------------------------------------

function solveAllCorners(cube) {
    const moves = [];
    const slots = [
        { name: 'FR', c1: 'g', c2: 'o' },
        { name: 'FL', c1: 'g', c2: 'r' },
        { name: 'BR', c1: 'b', c2: 'o' },
        { name: 'BL', c1: 'b', c2: 'r' }
    ];

    for (let slot of slots) {
        let count = 0;
        while (count < 10) {
            count++;
            if (isCornerSolved(cube, slot)) break;

            let pos = findCornerPos(cube, slot.c1, slot.c2);
            if (!pos) break;

            if (pos.layer === 'bottom') {
                let pop = getPopCornerAlg(pos.slot);
                applyAlgorithm(cube, pop);
                moves.push(...pop.trim().split(/\s+/));
                continue;
            }

            if (pos.layer === 'top') {
                let targetPos = 'U-' + slot.name;
                if (pos.sub !== targetPos) {
                    let uTurn = getUTurn(pos.sub, targetPos);
                    applyMove(cube, uTurn);
                    moves.push(uTurn);
                    continue;
                }

                let ins = getInsertCornerAlg(slot.name, pos.facing);
                applyAlgorithm(cube, ins);
                moves.push(...ins.trim().split(/\s+/));
                break;
            }
        }
    }
    return moves;
}

function isCornerSolved(cube, slot) {
    if (cube.D[1][1] !== 'w') return false;
    if (slot.name === 'FR') return cube.D[0][2] === 'w' && cube.F[2][2] === 'g' && cube.R[2][0] === 'o';
    if (slot.name === 'FL') return cube.D[0][0] === 'w' && cube.F[2][0] === 'g' && cube.L[2][2] === 'r';
    if (slot.name === 'BR') return cube.D[2][2] === 'w' && cube.B[2][0] === 'b' && cube.R[2][2] === 'o';
    if (slot.name === 'BL') return cube.D[2][0] === 'w' && cube.B[2][2] === 'b' && cube.L[2][0] === 'r';
    return false;
}

function findCornerPos(cube, c1, c2) {
    const w = 'w';
    if (isCornerMatch(cube.U[2][2], cube.F[0][2], cube.R[0][0], w, c1, c2)) return { layer: 'top', sub: 'U-FR', facing: cube.U[2][2] === w ? 'U' : (cube.R[0][0] === w ? 'side2' : 'side1') };
    if (isCornerMatch(cube.U[2][0], cube.F[0][0], cube.L[0][2], w, c1, c2)) return { layer: 'top', sub: 'U-FL', facing: cube.U[2][0] === w ? 'U' : (cube.F[0][0] === w ? 'side1' : 'side2') };
    if (isCornerMatch(cube.U[0][2], cube.B[0][0], cube.R[0][2], w, c1, c2)) return { layer: 'top', sub: 'U-BR', facing: cube.U[0][2] === w ? 'U' : (cube.B[0][0] === w ? 'side1' : 'side2') };
    if (isCornerMatch(cube.U[0][0], cube.B[0][2], cube.L[0][0], w, c1, c2)) return { layer: 'top', sub: 'U-BL', facing: cube.U[0][0] === w ? 'U' : (cube.L[0][0] === w ? 'side2' : 'side1') };

    if (isCornerMatch(cube.D[0][2], cube.F[2][2], cube.R[2][0], w, c1, c2)) return { layer: 'bottom', slot: 'FR' };
    if (isCornerMatch(cube.D[0][0], cube.F[2][0], cube.L[2][2], w, c1, c2)) return { layer: 'bottom', slot: 'FL' };
    if (isCornerMatch(cube.D[2][2], cube.B[2][0], cube.R[2][2], w, c1, c2)) return { layer: 'bottom', slot: 'BR' };
    if (isCornerMatch(cube.D[2][0], cube.B[2][2], cube.L[2][0], w, c1, c2)) return { layer: 'bottom', slot: 'BL' };

    return null;
}

function isCornerMatch(a, b, c, w, c1, c2) {
    const list = [a, b, c];
    return list.includes(w) && list.includes(c1) && list.includes(c2);
}

function getUTurn(curPos, tarPos) {
    const order = ['U-FR', 'U-BR', 'U-BL', 'U-FL'];
    const curIdx = order.indexOf(curPos);
    const tarIdx = order.indexOf(tarPos);
    const diff = (tarIdx - curIdx + 4) % 4;
    return diff === 1 ? 'U' : (diff === 2 ? 'U2' : "U'");
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
        if (facing === 'side2') return "R U R'";
        if (facing === 'side1') return "F' U' F";
        return "R U2 R' U' R U R'";
    }
    if (slot === 'FL') {
        if (facing === 'side1') return "F U F'";
        if (facing === 'side2') return "L' U' L";
        return "L' U2 L U L' U' L";
    }
    if (slot === 'BR') {
        if (facing === 'side1') return "B U B'";
        if (facing === 'side2') return "R' U' R";
        return "R' U2 R U R' U' R";
    }
    if (slot === 'BL') {
        if (facing === 'side2') return "L U L'";
        if (facing === 'side1') return "B' U' B";
        return "L U2 L' U' L U L'";
    }
    return "R U R'";
}

// -------------------------------------------------------------
// Phase 2: Middle Edges
// -------------------------------------------------------------

function solveAllMiddleEdges(cube) {
    const moves = [];
    const edgeSlots = [
        { name: 'FR', c1: 'g', c2: 'o' },
        { name: 'FL', c1: 'g', c2: 'r' },
        { name: 'BR', c1: 'b', c2: 'o' },
        { name: 'BL', c1: 'b', c2: 'r' }
    ];

    for (let slot of edgeSlots) {
        let count = 0;
        while (count < 10) {
            count++;
            if (isMiddleEdgeSolved(cube, slot)) break;

            let pos = findMiddleEdge(cube, slot.c1, slot.c2);
            if (!pos) break;

            if (pos.layer === 'middle') {
                let pop = getPopEdgeAlg(pos.slot);
                applyAlgorithm(cube, pop);
                moves.push(...pop.trim().split(/\s+/));
                let fixCorners = solveAllCorners(cube);
                moves.push(...fixCorners);
                continue;
            }

            if (pos.layer === 'top') {
                const centerColor = cube[pos.sideFace][1][1];
                if (pos.sideColor !== centerColor) {
                    applyMove(cube, 'U');
                    moves.push('U');
                    continue;
                }

                let insertAlg = getDirectInsertEdgeAlg(pos.sideFace, pos.topColor);
                if (insertAlg) {
                    applyAlgorithm(cube, insertAlg);
                    moves.push(...insertAlg.trim().split(/\s+/));
                    let fixCorners = solveAllCorners(cube);
                    moves.push(...fixCorners);
                    break;
                } else {
                    applyMove(cube, 'U');
                    moves.push('U');
                }
            }
        }
    }
    return moves;
}

function isMiddleEdgeSolved(cube, slot) {
    if (slot.name === 'FR') return cube.F[1][2] === 'g' && cube.R[1][0] === 'o';
    if (slot.name === 'FL') return cube.F[1][0] === 'g' && cube.L[1][2] === 'r';
    if (slot.name === 'BR') return cube.B[1][0] === 'b' && cube.R[1][2] === 'o';
    if (slot.name === 'BL') return cube.B[1][2] === 'b' && cube.L[1][0] === 'r';
    return false;
}

function findMiddleEdge(cube, c1, c2) {
    if (isEdgeMatch(cube.U[2][1], cube.F[0][1], c1, c2)) return { layer: 'top', sideFace: 'F', sideColor: cube.F[0][1], topColor: cube.U[2][1] };
    if (isEdgeMatch(cube.U[1][2], cube.R[0][1], c1, c2)) return { layer: 'top', sideFace: 'R', sideColor: cube.R[0][1], topColor: cube.U[1][2] };
    if (isEdgeMatch(cube.U[0][1], cube.B[0][1], c1, c2)) return { layer: 'top', sideFace: 'B', sideColor: cube.B[0][1], topColor: cube.U[0][1] };
    if (isEdgeMatch(cube.U[1][0], cube.L[0][1], c1, c2)) return { layer: 'top', sideFace: 'L', sideColor: cube.L[0][1], topColor: cube.U[1][0] };

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

function getDirectInsertEdgeAlg(currentFace, topColor) {
    if (currentFace === 'F') {
        if (topColor === 'o') return "U R U' R' U' F' U F";
        if (topColor === 'r') return "U' L' U L U F U' F'";
    }
    if (currentFace === 'R') {
        if (topColor === 'b') return "U B U' B' U' R' U R";
        if (topColor === 'g') return "U' F' U F U R U' R'";
    }
    if (currentFace === 'B') {
        if (topColor === 'r') return "U L U' L' U' B' U B";
        if (topColor === 'o') return "U' R' U R U B U' B'";
    }
    if (currentFace === 'L') {
        if (topColor === 'g') return "U F U' F' U' L' U L";
        if (topColor === 'b') return "U' B' U B U L U' L'";
    }
    return null;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        solveF2L
    };
}
