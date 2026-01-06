#include <iostream>
#include "utils.h"
#include "firstLayer.h"
#include "algorithms.h"
#include "moves.h"
using namespace std;

int main() {
    char white[3][3], yellow[3][3], red[3][3];
    char orange[3][3], blue[3][3], green[3][3];

    cout << "For Green Center\n";   
    input(green);
    input(white);
    input(yellow);
    input(red);
    input(orange);
    input(blue);
    displayCube(green, white, yellow, red, orange, blue);
    firstLayer(green, white, yellow, red, orange, blue);
    //U(green, white, yellow, red, orange, blue);
    //displayCube(green, white, yellow, red, orange, blue);
    system("pause");
    return 0;
}
