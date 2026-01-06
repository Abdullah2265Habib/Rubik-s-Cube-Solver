#include "algorithms.h"
#include "moves.h"

void RUR_primeU_prime(char g[3][3], char w[3][3], char y[3][3],
    char r[3][3], char o[3][3], char b[3][3]) {
    R(g, w, y, r, o, b);
    U(g, w, y, r, o, b);
    R_prime(g, w, y, r, o, b);
    U_prime(g, w, y, r, o, b);
}

void L_primeU_primeLU(char g[3][3], char w[3][3], char y[3][3],
    char r[3][3], char o[3][3], char b[3][3]) {
    L_prime(g, w, y, r, o, b);
    U_prime(g, w, y, r, o, b);
    L(g, w, y, r, o, b);
    U(g, w, y, r, o, b);
}

void FRUR_primeU_primeF_prime(char g[3][3], char w[3][3], char y[3][3],
    char r[3][3], char o[3][3], char b[3][3]) {
    F(g, w, y, r, o, b);
    R(g, w, y, r, o, b);
    U(g, w, y, r, o, b);
    R_prime(g, w, y, r, o, b);
    U_prime(g, w, y, r, o, b);
    F_prime(g, w, y, r, o, b);
}
void URU_primeR_prime(char g[3][3], char w[3][3], char y[3][3],
    char r[3][3], char o[3][3], char b[3][3]) {
    U(g, w, y, r, o, b);
    R(g, w, y, r, o, b);
    U_prime(g, w, y, r, o, b);
    R_prime(g, w, y, r, o, b);
}