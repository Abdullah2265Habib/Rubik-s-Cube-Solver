#include "firstLayer.h"
#include "moves.h"
#include "algorithms.h"
#include "utils.h"
#include <iostream>
using namespace std;

void firstLayer(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
    solveWhiteEdges(green, white, yellow, red, orange, blue);
    solveWhiteCorners(green, white, yellow, red, orange, blue);

    if (checkWhiteSide(green, white, yellow, red, orange, blue)) {

    }
    
}

bool checkFirstLayerCorner(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
    if (green[2][2] == green[1][1] && white[0][2] == white[1][1] && orange[2][0] == orange[1][1] &&
        green[2][0] == green[1][1] && white[0][0] == white[1][1] && red[2][2] == red[1][1] &&
        orange[2][2] == orange[1][1] && white[2][2] == white[1][1] && blue[2][0] == blue[1][1] &&
        red[2][0] == red[1][1] && white[2][0] == white[1][1] && blue[2][2] == blue[1][1])
        return true;

    return false;
}

void solveWhiteEdges(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
    //white on top
    int rotationCount = 0;
    while (!checkFirstLayerEdge(green, white, yellow, red, orange, blue)) {

        if (yellow[2][1] == 'w') {
            if (green[0][1] == green[1][1]) {
                F(green, white, yellow, red, orange, blue);
                F(green, white, yellow, red, orange, blue);
            }
            else {
                U_prime(green, white, yellow, red, orange, blue);
                y(green, white, yellow, red, orange, blue);
                continue;
            }
        }

        else if (yellow[0][1] == 'w' || yellow[1][0] == 'w' || yellow[1][2] == 'w') {
            U(green, white, yellow, red, orange, blue);
        }

        else if (green[0][1] == 'w' || red[0][1] == 'w' || orange[0][1] == 'w' || blue[0][1] == 'w') {
            if (yellow[2][1] == green[1][1] && green[0][1] == 'w') {
                M_prime(green, white, yellow, red, orange, blue);
                U(green, white, yellow, red, orange, blue);
                M(green, white, yellow, red, orange, blue);
                y(green, white, yellow, red, orange, blue);
                continue;
            }

            else if (yellow[2][1] == red[1][1] && green[0][1] == 'w') {
                U(green, white, yellow, red, orange, blue);
                y_prime(green, white, yellow, red, orange, blue);
                continue;

            }

            else if (yellow[2][1] == orange[1][1] && green[0][1] == 'w') {
                U_prime(green, white, yellow, red, orange, blue);
                y(green, white, yellow, red, orange, blue);
                continue;
            }

            else if (green[0][1] == 'w') {
                U(green, white, yellow, red, orange, blue);
                U(green, white, yellow, red, orange, blue);
                y(green, white, yellow, red, orange, blue);
                y(green, white, yellow, red, orange, blue);
                continue;
            }
            else if (red[0][1] == 'w') {
                U_prime(green, white, yellow, red, orange, blue);
                continue;
            }
            else if (orange[0][1] == 'w') {
                U(green, white, yellow, red, orange, blue);
            }
            else {
                U(green, white, yellow, red, orange, blue);
                U(green, white, yellow, red, orange, blue);
                continue;
            }
        }
        else if (green[1][0] == 'w' || green[1][2] == 'w' || red[1][0] == 'w' || red[1][2] == 'w' || orange[1][0] == 'w' || orange[1][2] == 'w' || blue[1][0] == 'w' || blue[1][2] == 'w') {
            
        }

    }
}

void solveWhiteCorners(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
    int bottomCount = 0;
    bool foundPieceInTopLayer = false;
    bool pieceBelong = false;
    int rotationCount = 0;
    while (!checkFirstLayerCorner(green, white, yellow, red, orange, blue)) {
        if (yellow[2][2] == 'w' || green[0][2] == 'w' || orange[0][0] == 'w') {
            foundPieceInTopLayer = true;
            rotationCount = 0;

            //algorithms to solve the piece 
            if (green[0][2] == 'w' && (orange[0][0] == orange[1][1] && yellow[2][2] == green[1][1])) {
                URU_primeR_prime(green, white, yellow, red, orange, blue);
                displayCube(green, white, yellow, red, orange, blue);
            }
            else if (orange[0][0] == 'w' && (green[0][2] == green[1][1] && yellow[2][2] == orange[1][1])) {
                RUR_primeU_prime(green, white, yellow, red, orange, blue);
                displayCube(green, white, yellow, red, orange, blue);
            }
            else if (yellow[2][2] == 'w' && (orange[0][0] == green[1][1] && green[0][2] == orange[1][1])) {
                RUR_primeU_prime(green, white, yellow, red, orange, blue);
                displayCube(green, white, yellow, red, orange, blue);
                RUR_primeU_prime(green, white, yellow, red, orange, blue);
                displayCube(green, white, yellow, red, orange, blue);
                RUR_primeU_prime(green, white, yellow, red, orange, blue);
                displayCube(green, white, yellow, red, orange, blue);
            }
            else {
                if (yellow[2][2] == green[1][1] || green[0][2] == green[1][1] || orange[0][0] == green[1][1]) { //move to left
                    U(green, white, yellow, red, orange, blue);
                    displayCube(green, white, yellow, red, orange, blue);
                    y_prime(green, white, yellow, red, orange, blue);
                    displayCube(green, white, yellow, red, orange, blue);
                }
                else if (yellow[2][2] == orange[1][1] || green[0][2] == orange[1][1] || orange[0][0] == orange[1][1]) { //move to right
                    U_prime(green, white, yellow, red, orange, blue);
                    displayCube(green, white, yellow, red, orange, blue);
                    y(green, white, yellow, red, orange, blue);
                    displayCube(green, white, yellow, red, orange, blue);
                }
                else {
                    U(green, white, yellow, red, orange, blue);
                    displayCube(green, white, yellow, red, orange, blue);
                    U(green, white, yellow, red, orange, blue);
                    displayCube(green, white, yellow, red, orange, blue);
                    y(green, white, yellow, red, orange, blue);
                    displayCube(green, white, yellow, red, orange, blue);
                    y(green, white, yellow, red, orange, blue);
                    displayCube(green, white, yellow, red, orange, blue);
                }
            }
        }
        else if (rotationCount != 4) {
            y_prime(green, white, yellow, red, orange, blue);
            displayCube(green, white, yellow, red, orange, blue);
            rotationCount++;
        }
        else {
            while (bottomCount < 4) {
                if (white[0][2] == white[1][1] && green[2][2] == green[1][1] && orange[2][0] == orange[1][1]) {
                    y(green, white, yellow, red, orange, blue);
                    displayCube(green, white, yellow, red, orange, blue);
                    ++bottomCount;
                    continue;
                }
                else {
                    rotationCount = 0;
                    bottomCount = 0;
                    RUR_primeU_prime(green, white, yellow, red, orange, blue);
                    displayCube(green, white, yellow, red, orange, blue);
                    break;;
                }
            }

        }
    }
}

bool checkFirstLayerEdge(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
    if (white[0][1] == white[1][1] && green[2][1] == green[1][1] &&
        white[1][0] == white[1][1] && red[2][1] == red[1][1] &&
        white[1][2] == white[1][1] && orange[2][1] == orange[1][1] &&
        white[2][1] == white[1][1] && blue[2][1] == blue[1][1]) {
        return true;
    }

    return false;
}

bool checkWhiteSide(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < 3; ++j) {
            if (white[0][0] == white[0][1] && white[0][1] == white[0][2] &&
                white[0][2] == white[1][0] && white[1][0] == white[1][1] &&
                white[1][1] == white[1][2] && white[1][2] == white[2][0] &&
                white[2][0] == white[2][1] && white[2][1] == white[2][2]) {
                cout << "\n\n\t\t\tFirst Layer Completed\n\n";
                return true;
            }
        }
    }

    return false;
}

