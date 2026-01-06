#ifndef MOVES_H
#define MOVES_H

#include <string>
using namespace std;
const int size = 3;
string R(char g[3][3], char w[3][3], char y[3][3], char r[3][3], char o[3][3], char b[3][3]);
string L(char g[3][3], char w[3][3], char y[3][3], char r[3][3], char o[3][3], char b[3][3]);
string U(char g[3][3], char w[3][3], char y[3][3], char r[3][3], char o[3][3], char b[3][3]);
string F(char g[3][3], char w[3][3], char y[3][3], char r[3][3], char o[3][3], char b[3][3]);
string x(char g[3][3], char w[3][3], char y[3][3], char r[3][3], char o[3][3], char b[3][3]);
string y(char g[3][3], char w[3][3], char y[3][3], char r[3][3], char o[3][3], char b[3][3]);

string R_prime(char g[3][3], char w[3][3], char y[3][3], char r[3][3], char o[3][3], char b[3][3]);
string L_prime(char g[3][3], char w[3][3], char y[3][3], char r[3][3], char o[3][3], char b[3][3]);
string U_prime(char g[3][3], char w[3][3], char y[3][3], char r[3][3], char o[3][3], char b[3][3]);
string F_prime(char g[3][3], char w[3][3], char y[3][3], char r[3][3], char o[3][3], char b[3][3]);
string x_prime(char g[3][3], char w[3][3], char y[3][3], char r[3][3], char o[3][3], char b[3][3]);
string y_prime(char g[3][3], char w[3][3], char y[3][3], char r[3][3], char o[3][3], char b[3][3]);

#endif
