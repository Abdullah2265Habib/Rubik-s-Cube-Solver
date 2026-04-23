// Algorithms for Rubik's Cube

function RUR_primeU_prime(g, w, y, r, o, b) {
    R(g, w, y, r, o, b);
    U(g, w, y, r, o, b);
    R_prime(g, w, y, r, o, b);
    U_prime(g, w, y, r, o, b);
}

function L_primeU_primeLU(g, w, y, r, o, b) {
    L_prime(g, w, y, r, o, b);
    U_prime(g, w, y, r, o, b);
    L(g, w, y, r, o, b);
    U(g, w, y, r, o, b);
}

function FRUR_primeU_primeF_prime(g, w, y, r, o, b) {
    F(g, w, y, r, o, b);
    R(g, w, y, r, o, b);
    U(g, w, y, r, o, b);
    R_prime(g, w, y, r, o, b);
    U_prime(g, w, y, r, o, b);
    F_prime(g, w, y, r, o, b);
}

function URU_primeR_prime(g, w, y, r, o, b) {
    U(g, w, y, r, o, b);
    R(g, w, y, r, o, b);
    U_prime(g, w, y, r, o, b);
    R_prime(g, w, y, r, o, b);
}
