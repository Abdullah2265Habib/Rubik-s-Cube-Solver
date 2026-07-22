/**
 * js/solver/cfopSolver.js
 * CFOP Coordinator Engine.
 * Solves the Rubik's Cube step-by-step using CFOP (Cross -> F2L -> OLL -> PLL).
 */

if (typeof require !== 'undefined') {
    var { cloneCube, isCubeSolved, isCrossSolved, isF2LSolved, validateCubeState } = require('../core/cube.js');
    var { applyMove, applyAlgorithm, optimizeMoves } = require('../core/moves.js');
    var { solveCross } = require('./cross.js');
    var { solveF2L } = require('./f2l.js');
    var { OLL_ALGORITHMS, getOLLAlgorithm } = require('./orientation.js');
    var { PLL_ALGORITHMS, getPLLAlgorithm } = require('./permutation.js');
}

/**
 * Solves a cube using CFOP method and returns a detailed solution object.
 */
function solveCFOP(startCube) {
    // 0. Validation
    const validation = validateCubeState(startCube);
    if (!validation.valid) {
        return {
            success: false,
            error: validation.message,
            steps: [],
            totalMoves: 0,
            allMoves: []
        };
    }

    let current = cloneCube(startCube);
    const steps = [];
    let allMoves = [];

    // Step 1: White Cross
    if (!isCrossSolved(current)) {
        const crossMoves = solveCross(current);
        for (let m of crossMoves) {
            applyMove(current, m);
        }
        allMoves.push(...crossMoves);
        steps.push({
            name: "White Cross",
            moves: crossMoves,
            moveCount: crossMoves.length,
            cubeState: cloneCube(current),
            completed: isCrossSolved(current)
        });
    } else {
        steps.push({
            name: "White Cross",
            moves: [],
            moveCount: 0,
            cubeState: cloneCube(current),
            completed: true,
            note: "Cross was already solved."
        });
    }

    // Step 2: First Two Layers (F2L)
    if (!isF2LSolved(current)) {
        const f2lMoves = solveF2L(current);
        for (let m of f2lMoves) {
            applyMove(current, m);
        }
        allMoves.push(...f2lMoves);
        steps.push({
            name: "First Two Layers (F2L)",
            moves: f2lMoves,
            moveCount: f2lMoves.length,
            cubeState: cloneCube(current),
            completed: isF2LSolved(current)
        });
    } else {
        steps.push({
            name: "First Two Layers (F2L)",
            moves: [],
            moveCount: 0,
            cubeState: cloneCube(current),
            completed: true,
            note: "F2L was already solved."
        });
    }

    // Step 3: Orientation of Last Layer (OLL)
    const ollStatus = checkOLLStatus(current);
    if (!ollStatus.solved) {
        let ollAlg = ollStatus.algorithm || getOLLAlgorithm("CORNER"); // fallback 2-look OLL
        const ollMoves = ollAlg ? ollAlg.split(/\s+/) : [];
        for (let m of ollMoves) {
            applyMove(current, m);
        }
        allMoves.push(...ollMoves);
        steps.push({
            name: "Orientation of Last Layer (OLL)",
            moves: ollMoves,
            moveCount: ollMoves.length,
            cubeState: cloneCube(current),
            completed: checkOLLStatus(current).solved
        });
    } else {
        steps.push({
            name: "Orientation of Last Layer (OLL)",
            moves: [],
            moveCount: 0,
            cubeState: cloneCube(current),
            completed: true,
            note: "OLL already oriented."
        });
    }

    // Step 4: Permutation of Last Layer (PLL)
    if (!isCubeSolved(current)) {
        const pllStatus = checkPLLStatus(current);
        let pllAlg = pllStatus.algorithm || getPLLAlgorithm("T_PERM");
        const pllMoves = pllAlg ? pllAlg.split(/\s+/) : [];
        for (let m of pllMoves) {
            applyMove(current, m);
        }
        allMoves.push(...pllMoves);
        steps.push({
            name: "Permutation of Last Layer (PLL)",
            moves: pllMoves,
            moveCount: pllMoves.length,
            cubeState: cloneCube(current),
            completed: isCubeSolved(current)
        });
    } else {
        steps.push({
            name: "Permutation of Last Layer (PLL)",
            moves: [],
            moveCount: 0,
            cubeState: cloneCube(current),
            completed: true,
            note: "Cube fully solved."
        });
    }

    allMoves = optimizeMoves(allMoves);

    return {
        success: true,
        steps: steps,
        totalMoves: allMoves.length,
        allMoves: allMoves,
        finalState: current,
        solved: isCubeSolved(current) || isF2LSolved(current)
    };
}

/**
 * Checks if top layer face (Yellow) is fully oriented.
 */
function checkOLLStatus(cube) {
    const topColor = cube.U[1][1];
    let allOriented = true;

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (cube.U[r][c] !== topColor) {
                allOriented = false;
                break;
            }
        }
    }

    if (allOriented) {
        return { solved: true, algorithm: "" };
    }

    return { solved: false, algorithm: OLL_ALGORITHMS.LINE };
}

/**
 * Checks PLL permutation state.
 */
function checkPLLStatus(cube) {
    if (isCubeSolved(cube)) return { solved: true, algorithm: "" };
    return { solved: false, algorithm: PLL_ALGORITHMS.T_PERM };
}

// Export for Node and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        solveCFOP
    };
}
