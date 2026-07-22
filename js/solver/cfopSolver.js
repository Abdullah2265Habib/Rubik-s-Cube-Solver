/**
 * js/solver/cfopSolver.js
 * CFOP Coordinator Engine.
 * Solves the Rubik's Cube step-by-step using CFOP (Cross -> F2L -> OLL -> PLL).
 */

// Variable declarations for hosting/importing
var cloneCube, isCubeSolved, isCrossSolved, isF2LSolved, validateCubeState;
var applyMove, applyAlgorithm, optimizeMoves;
var solveCross, solveF2L;
var getOLLAlgorithm, OLL_ALGORITHMS, getPLLAlgorithm, PLL_ALGORITHMS;

if (typeof require !== 'undefined') {
    var _cubeModule = require('../core/cube.js');
    var _movesModule = require('../core/moves.js');
    var _crossModule = require('./cross.js');
    var _f2lModule = require('./f2l.js');
    var _ollModule = require('./orientation.js');
    var _pllModule = require('./permutation.js');

    cloneCube = _cubeModule.cloneCube;
    isCubeSolved = _cubeModule.isCubeSolved;
    isCrossSolved = _cubeModule.isCrossSolved;
    isF2LSolved = _cubeModule.isF2LSolved;
    validateCubeState = _cubeModule.validateCubeState;

    applyMove = _movesModule.applyMove;
    applyAlgorithm = _movesModule.applyAlgorithm;
    optimizeMoves = _movesModule.optimizeMoves;

    solveCross = _crossModule.solveCross;
    solveF2L = _f2lModule.solveF2L;

    getOLLAlgorithm = _ollModule.getOLLAlgorithm;
    OLL_ALGORITHMS = _ollModule.OLL_ALGORITHMS;
    getPLLAlgorithm = _pllModule.getPLLAlgorithm;
    PLL_ALGORITHMS = _pllModule.PLL_ALGORITHMS;
} else {
    // In browser, fall back to global scope (window or globalThis) variables
    var g = (typeof window !== 'undefined') ? window : (typeof globalThis !== 'undefined' ? globalThis : {});
    cloneCube = g.cloneCube;
    isCubeSolved = g.isCubeSolved;
    isCrossSolved = g.isCrossSolved;
    isF2LSolved = g.isF2LSolved;
    validateCubeState = g.validateCubeState;

    applyMove = g.applyMove;
    applyAlgorithm = g.applyAlgorithm;
    optimizeMoves = g.optimizeMoves;

    solveCross = g.solveCross;
    solveF2L = g.solveF2L;

    getOLLAlgorithm = g.getOLLAlgorithm;
    OLL_ALGORITHMS = g.OLL_ALGORITHMS;
    getPLLAlgorithm = g.getPLLAlgorithm;
    PLL_ALGORITHMS = g.PLL_ALGORITHMS;
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
    if (!isOLLSolved(current)) {
        const ollMoves = [];
        const edgeMoves = solveOllEdges(current);
        if (edgeMoves && edgeMoves.length > 0) {
            for (let m of edgeMoves) {
                applyMove(current, m);
            }
            ollMoves.push(...edgeMoves);
        }
        const cornerMoves = solveOllCorners(current);
        if (cornerMoves && cornerMoves.length > 0) {
            for (let m of cornerMoves) {
                applyMove(current, m);
            }
            ollMoves.push(...cornerMoves);
        }
        allMoves.push(...ollMoves);
        steps.push({
            name: "Orientation of Last Layer (OLL)",
            moves: ollMoves,
            moveCount: ollMoves.length,
            cubeState: cloneCube(current),
            completed: isOLLSolved(current)
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
        const pllMoves = solvePll(current) || [];
        if (pllMoves.length > 0) {
            for (let m of pllMoves) {
                applyMove(current, m);
            }
            allMoves.push(...pllMoves);
        }
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
        solved: isCubeSolved(current)
    };
}

/**
 * Checks if the entire top layer face (Yellow) is fully oriented.
 */
function isOLLSolved(cube) {
    const topColor = cube.U[1][1];
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (cube.U[r][c] !== topColor) return false;
        }
    }
    return true;
}

/**
 * Checks if the four edges on the U face are oriented.
 */
function isEdgesOriented(cube) {
    const topColor = cube.U[1][1];
    return cube.U[0][1] === topColor &&
           cube.U[1][0] === topColor &&
           cube.U[1][2] === topColor &&
           cube.U[2][1] === topColor;
}

/**
 * Solves OLL Step 1 (Edge Orientation).
 */
function solveOllEdges(cube) {
    if (isEdgesOriented(cube)) {
        return [];
    }

    const aufChoices = ["", "U", "U2", "U'"];
    const algChoices = [
        { name: "LINE", alg: OLL_ALGORITHMS.LINE },
        { name: "CORNER", alg: OLL_ALGORITHMS.CORNER },
        { name: "DOT", alg: OLL_ALGORITHMS.DOT }
    ];

    for (let auf of aufChoices) {
        for (let choice of algChoices) {
            let temp = cloneCube(cube);
            let moves = [];
            if (auf) {
                applyMove(temp, auf);
                moves.push(auf);
            }
            applyAlgorithm(temp, choice.alg);
            moves.push(...choice.alg.split(/\s+/));

            if (isEdgesOriented(temp)) {
                return moves;
            }
        }
    }

    return [];
}

/**
 * Solves OLL Step 2 (Corner Orientation).
 */
function solveOllCorners(cube) {
    if (isOLLSolved(cube)) {
        return [];
    }

    const aufChoices = ["", "U", "U2", "U'"];
    const algChoices = [
        { name: "OLL_21_CROSS_H", alg: OLL_ALGORITHMS.OLL_21_CROSS_H },
        { name: "OLL_22_CROSS_PI", alg: OLL_ALGORITHMS.OLL_22_CROSS_PI },
        { name: "OLL_23_HEADLIGHTS", alg: OLL_ALGORITHMS.OLL_23_HEADLIGHTS },
        { name: "OLL_24_CHAMELEON", alg: OLL_ALGORITHMS.OLL_24_CHAMELEON },
        { name: "OLL_25_BOWTIE", alg: OLL_ALGORITHMS.OLL_25_BOWTIE },
        { name: "OLL_26_ANTI_SUNE", alg: OLL_ALGORITHMS.OLL_26_ANTI_SUNE },
        { name: "OLL_27_SUNE", alg: OLL_ALGORITHMS.OLL_27_SUNE }
    ];

    for (let auf of aufChoices) {
        for (let choice of algChoices) {
            let temp = cloneCube(cube);
            let moves = [];
            if (auf) {
                applyMove(temp, auf);
                moves.push(auf);
            }
            applyAlgorithm(temp, choice.alg);
            moves.push(...choice.alg.split(/\s+/));

            if (isOLLSolved(temp)) {
                return moves;
            }
        }
    }

    return [];
}

/**
 * Solves Permutation of Last Layer (PLL).
 */
function solvePll(cube) {
    if (isCubeSolved(cube)) {
        return [];
    }

    const aufChoices = ["", "U", "U2", "U'"];

    // First check if just an AUF solves the cube
    for (let auf of aufChoices) {
        let temp = cloneCube(cube);
        if (auf) applyMove(temp, auf);
        if (isCubeSolved(temp)) {
            return auf ? [auf] : [];
        }
    }

    // Try all PLL algorithms with all combinations of auf1 and auf2
    for (let key in PLL_ALGORITHMS) {
        const alg = PLL_ALGORITHMS[key];
        for (let auf1 of aufChoices) {
            for (let auf2 of aufChoices) {
                let temp = cloneCube(cube);
                let moves = [];
                if (auf1) {
                    applyMove(temp, auf1);
                    moves.push(auf1);
                }
                applyAlgorithm(temp, alg);
                moves.push(...alg.split(/\s+/));
                if (auf2) {
                    applyMove(temp, auf2);
                    moves.push(auf2);
                }

                if (isCubeSolved(temp)) {
                    return moves;
                }
            }
        }
    }

    return [];
}

// Export for Node and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        solveCFOP
    };
}
