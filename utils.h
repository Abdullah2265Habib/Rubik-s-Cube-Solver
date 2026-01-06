#ifndef UTILS_H
#define UTILS_H
#include<string>
#include <cstring>
void input(char face[3][3]);
void displayCube(char g[3][3], char w[3][3], char y[3][3],
    char r[3][3], char o[3][3], char b[3][3]);

bool isSolved(char g[3][3], char w[3][3], char y[3][3],
    char r[3][3], char o[3][3], char b[3][3]);

std::string processString(const std::string& s);

#endif
