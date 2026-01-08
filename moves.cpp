#include "moves.h"
#include <algorithm>
#include "utils.h"
string R(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {

    R_prime(green, white, yellow, red, orange, blue);
    R_prime(green, white, yellow, red, orange, blue);
    R_prime(green, white, yellow, red, orange, blue);

    return "R";
}

string L(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {

    char temp[3];

    for (int i = 0; i < 3; i++)
        temp[i] = yellow[i][0];

    for (int i = 0; i < 3; i++)
        yellow[i][0] = blue[2 - i][2];

    for (int i = 0; i < 3; i++)
        blue[i][2] = white[2 - i][0];

    for (int i = 0; i < 3; i++)
        white[i][0] = green[i][0];

    for (int i = 0; i < 3; i++)
        green[i][0] = temp[i];

    // rotate red face clockwise
    for (int i = 0; i < 3; i++)
        for (int j = i; j < 3; j++)
            swap(red[i][j], red[j][i]);

    for (int i = 0; i < 3; i++)
        reverse(red[i], red[i] + 3);

    return "L";
}

//gggggggggwwwwwwwwwyyyyyyyyyrrrrrrrrrooooooooobbbbbbbbb
string R_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
    char temp[3];

    for (int i = 0; i < 3; i++)
        temp[i] = yellow[i][2];

    for (int i = 0; i < 3; i++)
        yellow[i][2] = blue[2 - i][0];

    // blue <- white (reversed)
    for (int i = 0; i < 3; i++)
        blue[i][0] = white[2 - i][2];

    // white <- green
    for (int i = 0; i < 3; i++)
        white[i][2] = green[i][2];

    // green <- old yellow
    for (int i = 0; i < 3; i++)
        green[i][2] = temp[i];

    // rotate orange face counterclockwise
    for (int i = 0; i < 3; i++)
        for (int j = i; j < 3; j++)
            swap(orange[i][j], orange[j][i]);

    // reverse columns (not rows)
    for (int j = 0; j < 3; j++)
        for (int i = 0; i < 3 / 2; i++)
            swap(orange[i][j], orange[2 - i][j]);


    return "R'";
}

string L_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
    L(green, white, yellow, red, orange, blue);
    L(green, white, yellow, red, orange, blue);
    L(green, white, yellow, red, orange, blue);
    return "L'";
}
string F(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {

    // rotate green face clockwise
    char temp_face[3][3];
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            temp_face[i][j] = green[2 - j][i];

    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            green[i][j] = temp_face[i][j];

    char temp[3];

    for (int i = 0; i < 3; i++)
        temp[i] = yellow[2][i];

    for (int i = 0; i < 3; i++)
        yellow[2][i] = red[2 - i][2];

    for (int i = 0; i < 3; i++)
        red[i][2] = white[0][i];

    for (int i = 0; i < 3; i++)
        white[0][i] = orange[2 - i][0];

    for (int i = 0; i < 3; i++)
        orange[i][0] = temp[i];

    return "F";
}

string F_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
    F(green, white, yellow, red, orange, blue);
    F(green, white, yellow, red, orange, blue);
    F(green, white, yellow, red, orange, blue);
    return "F'";
}

string U(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
    // Rotate yellow face clockwise
    char temp_face[3][3];
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            temp_face[i][j] = yellow[2 - j][i];
        }
    }
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            yellow[i][j] = temp_face[i][j];
        }
    }

    // Adjust adjacent faces
    char temp_row[3];
    for (int i = 0; i < 3; i++) {
        temp_row[i] = red[0][i];
    }
    for (int i = 0; i < 3; i++) {
        red[0][i] = green[0][i];
    }
    for (int i = 0; i < 3; i++) {
        green[0][i] = orange[0][i];
    }
    for (int i = 0; i < 3; i++) {
        orange[0][i] = blue[0][i];
    }
    for (int i = 0; i < 3; i++) {
        blue[0][i] = temp_row[i];
    }
    return "U";
}

string U_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
    U(green, white, yellow, red, orange, blue);
    U(green, white, yellow, red, orange, blue);
    U(green, white, yellow, red, orange, blue);
    return "U'";
}

string x(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {

    char temp[3][3];

    // save yellow
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            temp[i][j] = yellow[i][j];

    // up <- front
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            yellow[i][j] = green[i][j];

    // front <- down
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            green[i][j] = white[i][j];

    // down <- back (180°)
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            white[i][j] = blue[2 - i][2 - j];

    // back <- old up (180°)
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            blue[i][j] = temp[2 - i][2 - j];

    // rotate right clockwise
    for (int i = 0; i < 3; i++)
        for (int j = i; j < 3; j++)
            swap(orange[i][j], orange[j][i]);

    for (int i = 0; i < 3; i++)
        reverse(orange[i], orange[i] + 3);

    // rotate left counterclockwise
    for (int i = 0; i < 3; i++)
        for (int j = i; j < 3; j++)
            swap(red[i][j], red[j][i]);

    for (int j = 0; j < 3; j++)
        for (int i = 0; i < 3 / 2; i++)
            swap(red[i][j], red[2 - i][j]);

    return "x";
}

string x_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
    // Rotate entire cube around x-axis counterclockwise (equivalent to three x moves)
    x(green, white, yellow, red, orange, blue);
    x(green, white, yellow, red, orange, blue);
    x(green, white, yellow, red, orange, blue);
    return "x'";
}

string y_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {

    char temp[3][3];

    // save green
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            temp[i][j] = green[i][j];

    // front <- left
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            green[i][j] = red[i][j];

    // left <- back
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            red[i][j] = blue[i][j];

    // back <- right
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            blue[i][j] = orange[i][j];

    // right <- old front
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            orange[i][j] = temp[i][j];

    // rotate up (yellow) counterclockwise
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            temp[i][j] = yellow[j][2 - i];

    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            yellow[i][j] = temp[i][j];

    // rotate down (white) clockwise
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            temp[i][j] = white[2 - j][i];

    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            white[i][j] = temp[i][j];


    return "y'";
}

string y(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
    // Rotate entire cube around y-axis counterclockwise (equivalent to three y moves)
    y_prime(green, white, yellow, red, orange, blue);
    y_prime(green, white, yellow, red, orange, blue);
    y_prime(green, white, yellow, red, orange, blue);
    return "y";
}

string M_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3])
{
    char temp[3];

    // save yellow middle column
    for (int i = 0; i < 3; i++)
        temp[i] = yellow[i][1];

    // yellow <- green
    for (int i = 0; i < 3; i++)
        yellow[i][1] = green[i][1];

    // green <- white
    for (int i = 0; i < 3; i++)
        green[i][1] = white[i][1];

    // white <- blue (reversed)
    for (int i = 0; i < 3; i++)
        white[i][1] = blue[2 - i][1];

    // blue <- old yellow (reversed)
    for (int i = 0; i < 3; i++)
        blue[i][1] = temp[2 - i];

    return "M'";
}

string M(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
    M_prime(green, white, yellow, red, orange, blue);
    M_prime(green, white, yellow, red, orange, blue);
    M_prime(green, white, yellow, red, orange, blue);

    return "M";
}
