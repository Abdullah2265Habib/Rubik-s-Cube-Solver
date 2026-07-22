/**
 * js/solver/permutation.js
 * Contains CFOP Permutation (PLL - Permutation of Last Layer) algorithms.
 * Note: Only permutation algorithms and lookup definitions are written here as specified.
 */

// Core PLL Algorithms for CFOP
const PLL_ALGORITHMS = {
    // Corner Permutations (2-Look PLL Step 1)
    Aa_PERM: "x R' D2 R U R' D2 R U' x'",
    Ab_PERM: "x R2 D2 R U R' D2 R U' R x'",
    E_PERM: "x' R U' R' D R U R' D' R U R' D R U' R' D' x",

    // Edge Permutations (2-Look PLL Step 2)
    Ua_PERM: "R U' R U R U R U' R' U' R2",
    Ub_PERM: "R2 U R U R' U' R' U' R' U R'",
    H_PERM: "M2 U M2 U2 M2 U M2",
    Z_PERM: "M' U M2 U M2 U M' U2 M2",

    // Full 21 PLL Algorithms
    T_PERM: "R U R' U' R' F R2 U' R' U' R U R' F'",
    Jb_PERM: "R U R' F' R U R' U' R' F R2 U' R'",
    Ja_PERM: "L' U' L F L' U' L U L F' L2 U L",
    Y_PERM: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
    Ra_PERM: "R U R' F' R U2 R' U2 R' F R U R U2 R'",
    Rb_PERM: "R' U2 R U2 R' F R U R' U' R' F' R2 U'",
    F_PERM: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
    V_PERM: "R' U R' U' y R' F' R2 U' R' U R' F R F",
    Na_PERM: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
    Nb_PERM: "R' U R U' R' F' U' F R U R' F R' F' R U' R",
    Ga_PERM: "R2 U R' U R' U' R U' R2 U' D R' U R D'",
    Gb_PERM: "R' U' R y R2 u R' U R U' R u' R2",
    Gc_PERM: "R2 U' R U' R U R' U R2 U D' R U' R' D",
    Gd_PERM: "R U R' y' R2 u' R U' R' U R' u R2"
};

/**
 * Returns PLL algorithm string for a given case name.
 */
function getPLLAlgorithm(caseName) {
    return PLL_ALGORITHMS[caseName] || "";
}

// Export for Node and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PLL_ALGORITHMS,
        getPLLAlgorithm
    };
}
