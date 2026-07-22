/**
 * js/solver/cross.js
 * CFOP White Cross Solver Engine.
 * Solves all 4 White edge pieces (White-Green, White-Orange, White-Blue, White-Red) onto the D face.
 */

if (typeof require !== 'undefined') {
    var { cloneCube, isCrossSolved } = require('../core/cube.js');
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

    const moves = [];
    const targetEdges = [
        { sideColor: 'g', targetFace: 'F', dropTurn: 'F' },
        { sideColor: 'o', targetFace: 'R', dropTurn: 'R' },
        { sideColor: 'b', targetFace: 'B', dropTurn: 'B' },
        { sideColor: 'r', targetFace: 'L', dropTurn: 'L' }
    ];

    for (let target of targetEdges) {
        let stepMoves = solveOneCrossEdge(cube, target.sideColor, target.targetFace, target.dropTurn);
        moves.push(...stepMoves);
    }

    return optimizeMoves(moves);
}

function solveOneCrossEdge(cube, sideColor, targetFace, dropTurn) {
    const moves = [];
    const white = 'w';
    let safety = 0;

    while (safety < 20) {
        safety++;

        // Target edge solved check
        if (targetFace === 'F' && cube.D[0][1] === white && cube.F[2][1] === sideColor) break;
        if (targetFace === 'R' && cube.D[1][2] === white && cube.R[2][1] === sideColor) break;
        if (targetFace === 'B' && cube.D[2][1] === white && cube.B[2][1] === sideColor) break;
        if (targetFace === 'L' && cube.D[1][0] === white && cube.L[2][1] === sideColor) break;

        let pos = findCrossEdgePosition(cube, white, sideColor);
        if (!pos) break;

        // In bottom layer -> rotate face 180 to bring up to U layer
        if (pos.location === 'bottom') {
            const turn = pos.face + '2';
            applyMove(cube, turn);
            moves.push(turn);
            continue;
        }

        // In middle layer -> pop up to U layer
        if (pos.location === 'middle') {
            if (pos.face === 'F' && pos.sub === 'R') {
                applyMove(cube, "R"); applyMove(cube, "U'"); applyMove(cube, "R'");
                moves.push("R", "U'", "R'");
            } else if (pos.face === 'F' && pos.sub === 'L') {
                applyMove(cube, "L'"); applyMove(cube, "U"); applyMove(cube, "L");
                moves.push("L'", "U", "L");
            } else if (pos.face === 'B' && pos.sub === 'R') {
                applyMove(cube, "R'"); applyMove(cube, "U"); applyMove(cube, "R");
                moves.push("R'", "U", "R");
            } else if (pos.face === 'B' && pos.sub === 'L') {
                applyMove(cube, "L"); applyMove(cube, "U'"); applyMove(cube, "L'");
                moves.push("L", "U'", "L'");
            }
            continue;
        }

        // In top (U) layer -> rotate U to align over target face then insert
        if (pos.location === 'top') {
            const targetPosMap = { 'F': 'U-F', 'R': 'U-R', 'B': 'U-B', 'L': 'U-L' };
            const currentPos = pos.sub;
            const targetPos = targetPosMap[targetFace];

            if (currentPos !== targetPos) {
                const order = ['U-F', 'U-R', 'U-B', 'U-L'];
                const curIdx = order.indexOf(currentPos);
                const tarIdx = order.indexOf(targetPos);
                const diff = (tarIdx - curIdx + 4) % 4;

                let uTurn = diff === 1 ? 'U' : diff === 2 ? 'U2' : "U'";
                applyMove(cube, uTurn);
                moves.push(uTurn);
                continue;
            }

            if (pos.whiteOn === 'U') {
                const turn = dropTurn + '2';
                applyMove(cube, turn);
                moves.push(turn);
            } else {
                if (targetFace === 'F') {
                    applyMove(cube, "U'"); applyMove(cube, "R'"); applyMove(cube, "F"); applyMove(cube, "R");
                    moves.push("U'", "R'", "F", "R");
                } else if (targetFace === 'R') {
                    applyMove(cube, "U'"); applyMove(cube, "B'"); applyMove(cube, "R"); applyMove(cube, "B");
                    moves.push("U'", "B'", "R", "B");
                } else if (targetFace === 'B') {
                    applyMove(cube, "U'"); applyMove(cube, "L'"); applyMove(cube, "B"); applyMove(cube, "L");
                    moves.push("U'", "L'", "B", "L");
                } else if (targetFace === 'L') {
                    applyMove(cube, "U'"); applyMove(cube, "F'"); applyMove(cube, "L"); applyMove(cube, "F");
                    moves.push("U'", "F'", "L", "F");
                }
            }
            break;
        }
    }

    return moves;
}

function findCrossEdgePosition(cube, w, s) {
    if (cube.U[2][1] === w && cube.F[0][1] === s) return { location: 'top', sub: 'U-F', whiteOn: 'U' };
    if (cube.U[2][1] === s && cube.F[0][1] === w) return { location: 'top', sub: 'U-F', whiteOn: 'side' };

    if (cube.U[1][2] === w && cube.R[0][1] === s) return { location: 'top', sub: 'U-R', whiteOn: 'U' };
    if (cube.U[1][2] === s && cube.R[0][1] === w) return { location: 'top', sub: 'U-R', whiteOn: 'side' };

    if (cube.U[0][1] === w && cube.B[0][1] === s) return { location: 'top', sub: 'U-B', whiteOn: 'U' };
    if (cube.U[0][1] === s && cube.B[0][1] === w) return { location: 'top', sub: 'U-B', whiteOn: 'side' };

    if (cube.U[1][0] === w && cube.L[0][1] === s) return { location: 'top', sub: 'U-L', whiteOn: 'U' };
    if (cube.U[1][0] === s && cube.L[0][1] === w) return { location: 'top', sub: 'U-L', whiteOn: 'side' };

    if ((cube.F[1][2] === w && cube.R[1][0] === s) || (cube.F[1][2] === s && cube.R[1][0] === w)) return { location: 'middle', face: 'F', sub: 'R' };
    if ((cube.F[1][0] === w && cube.L[1][2] === s) || (cube.F[1][0] === s && cube.L[1][2] === w)) return { location: 'middle', face: 'F', sub: 'L' };
    if ((cube.B[1][0] === w && cube.R[1][2] === s) || (cube.B[1][0] === s && cube.R[1][2] === w)) return { location: 'middle', face: 'B', sub: 'R' };
    if ((cube.B[1][2] === w && cube.L[1][0] === s) || (cube.B[1][2] === s && cube.L[1][0] === w)) return { location: 'middle', face: 'B', sub: 'L' };

    if ((cube.D[0][1] === w && cube.F[2][1] === s) || (cube.D[0][1] === s && cube.F[2][1] === w)) return { location: 'bottom', face: 'F' };
    if ((cube.D[1][2] === w && cube.R[2][1] === s) || (cube.D[1][2] === s && cube.R[2][1] === w)) return { location: 'bottom', face: 'R' };
    if ((cube.D[2][1] === w && cube.B[2][1] === s) || (cube.D[2][1] === s && cube.B[2][1] === w)) return { location: 'bottom', face: 'B' };
    if ((cube.D[1][0] === w && cube.L[2][1] === s) || (cube.D[1][0] === s && cube.L[2][1] === w)) return { location: 'bottom', face: 'L' };

    return null;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        solveCross
    };
}
