#include "firstLayer.h"
#include "moves.h"
#include "algorithms.h"
#include "utils.h"
#include <iostream>
using namespace std;

void firstLayer(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
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
            //else ifs are pending
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
bool checkFirstLayerCorner(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
    if (green[2][2] == green[1][1] && white[0][2] == white[1][1] && orange[2][0] == orange[1][1] &&
        green[2][0] == green[1][1] && white[0][0] == white[1][1] && red[2][2] == red[1][1] &&
        orange[2][2] == orange[1][1] && white[2][2] == white[1][1] && blue[2][0] == blue[1][1] &&
        red[2][0] == red[1][1] && white[2][0] == white[1][1] && blue[2][2] == blue[1][1])
        return true;

    return false;
}
bool checkWhiteInTopLayer(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
    if (yellow[2][2] == 'w' || yellow[2][0] == 'w' || yellow[0][0] == 'w' || yellow[0][2] == 'w' ||
        green[0][0] == 'w' || green[0][2] == 'w' ||
        red[0][0] == 'w' || red[0][2] == 'w' || 
        orange[0][0] == 'w' || orange[0][2] == 'w' || 
        blue[0][0] == 'w' || blue[0][2] == 'w')
        return true;

    return false;
}