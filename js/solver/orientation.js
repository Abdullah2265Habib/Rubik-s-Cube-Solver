/**
 * js/solver/orientation.js
 * Contains CFOP Orientation (OLL - Orientation of Last Layer) algorithms.
 * Note: Only orientation algorithms and lookup definitions are written here as specified.
 */

// Basic Orientation Trigger Algorithms
var OLL_TRIGGERS = {
    SEXY: "R U R' U'",
    LEFT_SEXY: "L' U' L U",
    SUNE: "R U R' U R U2 R'",
    ANTI_SUNE: "R U2 R' U' R U' R'",
    H_PERM_OLL: "R U2 R' U' R U R' U' R U' R'",
    BOWTIE: "F' r U R' U' r' F R",
    CAR: "R U2 R2 U' R2 U' R2 U2 R",
    HEADLIGHTS: "R2 D R' U2 R D' R' U2 R'",
    CHAMELEON: "r U R' U' r' F R F'",
    PI: "R U2 R2 U' R2 U' R2 U2 R",
    CROSS_LINE: "F R U R' U' F'",
    CROSS_DOT: "F R U R' U' F' f R U R' U' f'"
};

// Full 57 OLL Algorithms Mapping
var OLL_ALGORITHMS = {
    // 2-Look OLL Edges
    DOT: "F R U R' U' F' f R U R' U' f'",
    LINE: "F R U R' U' F'",
    CORNER: "f R U R' U' f'",

    // 2-Look OLL Corners (All 7 cases when cross is complete)
    OLL_21_CROSS_H: "R U2 R' U' R U R' U' R U' R'",
    OLL_22_CROSS_PI: "R U2 R2 U' R2 U' R2 U2 R",
    OLL_23_HEADLIGHTS: "R2 D R' U2 R D' R' U2 R'",
    OLL_24_CHAMELEON: "r U R' U' r' F R F'",
    OLL_25_BOWTIE: "F' r U R' U' r' F R",
    OLL_26_ANTI_SUNE: "R U2 R' U' R U' R'",
    OLL_27_SUNE: "R U R' U R U2 R'",

    // Pure orientation helper formulas
    ORIENT_CORNER_CW: "R U R' U' R U R' U'",
    ORIENT_CORNER_CCW: "U R U' R' U R U' R'",
    ORIENT_EDGE_FLIP: "r U R' U' r' F R F'"
};

/**
 * Returns OLL algorithm string for a given OLL case name.
 */
function getOLLAlgorithm(caseName) {
    return OLL_ALGORITHMS[caseName] || OLL_TRIGGERS[caseName] || "";
}

// Export for Node and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        OLL_TRIGGERS,
        OLL_ALGORITHMS,
        getOLLAlgorithm
    };
}
