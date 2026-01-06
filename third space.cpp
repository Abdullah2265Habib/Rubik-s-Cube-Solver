//#include<iostream>
//#include<string>
//#include<cstring>
//using namespace std;
//#define size 3
//
//// Function prototypes
//void input(char face[3][3]);
//void displayCube(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]);
//bool isSolved(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]);
//
//string R(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]);
//string L(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]);
//string U(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]);
//string F(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]);
//string x(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]);
//string y(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]);
//
//string R_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]);
//string L_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]);
//string U_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]);
//string F_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]);
//string x_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]);
//string y_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]);
//
//string RUR_primeU_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]);
//string L_primeU_primeLU(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]);
//string FRUR_primeU_primeF_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]);
//
//string firstLayer(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]);
//bool checkFirstLayerCorner(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]);
//
//int main() {
//    char white[3][3];
//    char yellow[3][3];
//    char red[3][3];
//    char orange[3][3];
//    char blue[3][3];
//    char green[3][3];
//    string moves = "";
//    //taking input
//    cout << "For Green Center\n";
//    input(green);
//    cout << "For White Center\n";
//    input(white);
//    cout << "For Yellow Center\n";
//    input(yellow);
//    cout << "For Red Center\n";
//    input(red);
//    cout << "For Orange Center\n";
//    input(orange);
//    cout << "For Blue Center\n";
//    input(blue);
//
//    displayCube(green, white, yellow, red, orange, blue);
//    string solutionMoves = firstLayer(green, white, yellow, red, orange, blue);
//    cout << "Solution moves: " << solutionMoves << endl;
//    return 0;
//}
//
//// Other function definitions remain the same until the algorithm functions
//
//string RUR_primeU_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
//    string moves = "";
//    moves += R(green, white, yellow, red, orange, blue);
//    moves += U(green, white, yellow, red, orange, blue);
//    moves += R_prime(green, white, yellow, red, orange, blue);
//    moves += U_prime(green, white, yellow, red, orange, blue);
//    return moves;
//}
//
//string L_primeU_primeLU(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
//    string moves = "";
//    moves += L_prime(green, white, yellow, red, orange, blue);
//    moves += U_prime(green, white, yellow, red, orange, blue);
//    moves += L(green, white, yellow, red, orange, blue);
//    moves += U(green, white, yellow, red, orange, blue);
//    return moves;
//}
//
//string FRUR_primeU_primeF_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
//    string moves = "";
//    moves += F(green, white, yellow, red, orange, blue);
//    moves += R(green, white, yellow, red, orange, blue);
//    moves += U(green, white, yellow, red, orange, blue);
//    moves += R_prime(green, white, yellow, red, orange, blue);
//    moves += U_prime(green, white, yellow, red, orange, blue);
//    moves += F_prime(green, white, yellow, red, orange, blue);
//    return moves;
//}
//
//string firstLayer(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
//    int i = 0;
//    int count = 0;
//    string moves = ""; // Initialize moves string
//
//    while (i != 8) {
//        if (count != 4) {
//            if (yellow[2][2] == 'w' || orange[0][0] == 'w' || green[0][2] == 'w') {
//                count = 0;
//                if (yellow[2][2] == 'w' && (green[0][2] == orange[1][1] && orange[0][0] == green[1][1])) {
//                    moves += RUR_primeU_prime(green, white, yellow, red, orange, blue);
//                    moves += RUR_primeU_prime(green, white, yellow, red, orange, blue);
//                    moves += RUR_primeU_prime(green, white, yellow, red, orange, blue);
//                    ++i;
//                }
//                else if (green[0][2] == 'w' && (yellow[2][2] == green[1][1] && orange[0][0] == orange[1][1])) {
//                    moves += U(green, white, yellow, red, orange, blue);
//                    moves += R(green, white, yellow, red, orange, blue);
//                    moves += U_prime(green, white, yellow, red, orange, blue);
//                    moves += R_prime(green, white, yellow, red, orange, blue);
//                    ++i;
//                }
//                else if (orange[0][0] == 'w' && (green[0][2] == green[1][1] && yellow[2][2] == orange[1][1])) {
//                    moves += RUR_primeU_prime(green, white, yellow, red, orange, blue);
//                    ++i;
//                }
//                else {
//                    moves += y(green, white, yellow, red, orange, blue);
//                    moves += U_prime(green, white, yellow, red, orange, blue);
//                    continue;
//                }
//                moves += y(green, white, yellow, red, orange, blue);
//            }
//            else {
//                ++count;
//                moves += y(green, white, yellow, red, orange, blue);
//            }
//        }
//        else {
//            // Check if first layer is solved
//            if (white[0][0] == 'w' && white[0][2] == 'w' && white[2][0] == 'w' && white[2][2] == 'w' &&
//                green[0][0] == green[1][1] && green[0][2] == green[1][1] && green[2][0] == green[1][1] && green[2][2] == green[1][1] &&
//                orange[0][0] == orange[1][1] && orange[0][2] == orange[1][1] && orange[2][0] == orange[1][1] && orange[2][2] == orange[1][1] &&
//                blue[0][0] == blue[1][1] && blue[0][2] == blue[1][1] && blue[2][0] == blue[1][1] && blue[2][2] == blue[1][1] &&
//                red[0][0] == red[1][1] && red[0][2] == red[1][1] && red[2][0] == red[1][1] && red[2][2] == red[1][1]) {
//                return moves; // Return accumulated moves when solved
//            }
//
//            // Handle different cases for white corners
//            if (white[0][0] == 'w' && green[2][0] == green[1][1] && red[2][2] == red[1][1]) {
//                ++i;
//            }
//            else if (white[0][0] == 'w') {
//                moves += y_prime(green, white, yellow, red, orange, blue);
//                count = 0;
//                moves += RUR_primeU_prime(green, white, yellow, red, orange, blue);
//            }
//            // Add similar handling for other positions...
//        }
//    }
//    return moves; // Return moves after loop completes
//}
//bool checkFirstLayerCorner(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
//    // Implementation for checking if the first layer is solved
//    // This is a placeholder; you should implement the actual check
//    return false;
//}
//
//// Other function definitions remain unchanged...
//void displayCube(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
//    /*printing output in this format
//              y y y
//              y y y
//              y y y
//              _ _ _
//        r r r| g g g| o o o| b b b
//        r r r| g g g| o o o| b b b
//        r r r| g g g| o o o| b b b
//              _ _ _
//              w w w
//              w w w
//              w w w
//    */
//    cout << "\t\t _____________\n";
//    for (int i = 0; i < size; i++) {
//        cout << "\t\t | ";
//        for (int j = 0; j < size; j++) {
//            cout << yellow[i][j] << " | ";
//        }
//        cout << "\n\t\t _____________\n";
//
//    }
//    for (int i = 0; i < size; i++) {
//        cout << "  | ";
//        for (int j = 0; j < size; j++) {
//            cout << red[i][j] << " | ";
//        }
//        cout << " | ";
//        for (int j = 0; j < size; j++) {
//            cout << green[i][j] << " | ";
//        }
//        cout << " | ";
//        for (int j = 0; j < size; j++) {
//            cout << orange[i][j] << " | ";
//        }
//        cout << " | ";
//        for (int j = 0; j < size; j++) {
//            cout << blue[i][j] << " | ";
//        }
//        cout << "\n  __________________________________________________________\n";
//    }
//    cout << "\t\t | ";
//    for (int i = 0; i < size; i++) {
//        for (int j = 0; j < size; j++) {
//            cout << white[i][j] << " | ";
//        }
//        cout << "\n\t\t _____________\n";
//        if (i < size - 1)
//            cout << "\t\t | ";
//    }
//}
//
//
////wwwwwwwwwyyyyyyyyyrrrrrrrrroooooooooobbbbbbbbbggggggggg
//
//void input(char face[3][3]) {
//    for (int i = 0; i < size; i++) {
//        for (int j = 0; j < size; j++) {
//            cin >> face[i][j];
//        }
//    }
//}
//
//bool isSolved(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
//
//
//    for (int i = 0; i < 3; i++) {
//        if (green[i][0] != green[i][1] || green[i][0] != green[i][2]) {
//            return false;
//        }
//        if (white[i][0] != white[i][1] || white[i][0] != white[i][2]) {
//            return false;
//        }
//        if (yellow[i][0] != yellow[i][1] || yellow[i][0] != yellow[i][2]) {
//            return false;
//        }
//        if (red[i][0] != red[i][1] || red[i][0] != red[i][2]) {
//            return false;
//        }
//        if (orange[i][0] != orange[i][1] || orange[i][0] != orange[i][2]) {
//            return false;
//        }
//        if (blue[i][0] != blue[i][1] || blue[i][0] != blue[i][2]) {
//            return false;
//        }
//    }
//    cout << "The cube is solved!" << endl;
//    return true;
//}
//string R(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
//    //w.r.t green face
//    char temp1[3];
//    char temp2[3];
//    for (int i = 0; i < size; ++i) {
//        temp1[i] = yellow[i][2];
//        yellow[i][2] = green[i][2];
//        temp2[i] = blue[i][0];
//        blue[i][0] = temp1[i];
//        temp1[i] = white[i][2];
//        white[i][2] = temp2[i];
//        green[i][2] = temp1[i];
//    }
//    //rotating the orange face clockwise
//    //1.take transpose
//    for (int i = 0; i < size; ++i) {
//        for (int j = i; j < size; ++j) {
//            swap(orange[i][j], orange[j][i]);
//        }
//    }
//    //2.reverse each row
//    for (int i = 0; i < size; ++i) {
//        for (int j = 0; j < size / 2; ++j) {
//            swap(orange[i][j], orange[i][size - j - 1]);
//        }
//    }
//    return "R";
//}
//string L(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
//    //w.r.t green face
//    char temp1[3];
//    char temp2[3];
//    for (int i = 0; i < size; ++i) {
//        temp1[i] = yellow[i][0];
//        yellow[i][0] = blue[i][0];
//        temp2[i] = green[i][0];
//        green[i][0] = temp1[i];
//        temp1[i] = white[i][0];
//        white[i][0] = temp2[i];
//        blue[i][0] = temp1[i];
//    }
//    //rotating the red face anticlockwise
//    //1.take transpose
//    for (int i = 0; i < size; ++i) {
//        for (int j = i; j < size; ++j) {
//            swap(red[i][j], red[j][i]);
//        }
//    }
//    //2.reverse each column
//    for (int j = 0; j < size; ++j) {
//        for (int i = 0; i < size / 2; ++i) {
//            swap(red[i][j], red[size - i - 1][j]);
//        }
//    }
//    return "L";
//}
////gggggggggwwwwwwwwwyyyyyyyyyrrrrrrrrrooooooooobbbbbbbbb
//string R_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
//    //rotating R three times make it R' or R_prime
//    R(green, white, yellow, red, orange, blue);
//    R(green, white, yellow, red, orange, blue);
//    R(green, white, yellow, red, orange, blue);
//    return "R'";
//}
//string L_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
//    L(green, white, yellow, red, orange, blue);
//    L(green, white, yellow, red, orange, blue);
//    L(green, white, yellow, red, orange, blue);
//    return "L'";
//}
//string F(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
//    // Rotate green face clockwise
//    char temp_face[3][3];
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            temp_face[i][j] = green[2 - j][i];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            green[i][j] = temp_face[i][j];
//        }
//    }
//
//    // Adjust adjacent faces
//    char temp_row[3];
//    for (int i = 0; i < 3; i++) {
//        temp_row[i] = yellow[2][i];
//    }
//    for (int i = 0; i < 3; i++) {
//        yellow[2][i] = red[2 - i][2];
//    }
//    for (int i = 0; i < 3; i++) {
//        red[i][2] = white[0][i];
//    }
//    for (int i = 0; i < 3; i++) {
//        white[0][i] = orange[2 - i][0];
//    }
//    for (int i = 0; i < 3; i++) {
//        orange[i][0] = temp_row[i];
//    }
//    return "F";
//}
//
//string F_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
//    // Rotate green face counterclockwise
//    char temp_face[3][3];
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            temp_face[i][j] = green[j][2 - i];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            green[i][j] = temp_face[i][j];
//        }
//    }
//
//    // Adjust adjacent faces
//    char temp_row[3];
//    for (int i = 0; i < 3; i++) {
//        temp_row[i] = yellow[2][i];
//    }
//    for (int i = 0; i < 3; i++) {
//        yellow[2][i] = orange[i][0];
//    }
//    for (int i = 0; i < 3; i++) {
//        orange[i][0] = white[0][2 - i];
//    }
//    for (int i = 0; i < 3; i++) {
//        white[0][i] = red[i][2];
//    }
//    for (int i = 0; i < 3; i++) {
//        red[i][2] = temp_row[2 - i];
//    }
//    return "F'";
//}
//
//string U(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
//    // Rotate yellow face clockwise
//    char temp_face[3][3];
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            temp_face[i][j] = yellow[2 - j][i];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            yellow[i][j] = temp_face[i][j];
//        }
//    }
//
//    // Adjust adjacent faces
//    char temp_row[3];
//    for (int i = 0; i < 3; i++) {
//        temp_row[i] = red[0][i];
//    }
//    for (int i = 0; i < 3; i++) {
//        red[0][i] = green[0][i];
//    }
//    for (int i = 0; i < 3; i++) {
//        green[0][i] = orange[0][i];
//    }
//    for (int i = 0; i < 3; i++) {
//        orange[0][i] = blue[0][i];
//    }
//    for (int i = 0; i < 3; i++) {
//        blue[0][i] = temp_row[i];
//    }
//    return "U";
//}
//
//string U_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
//    // Rotate yellow face counterclockwise
//    char temp_face[3][3];
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            temp_face[i][j] = yellow[j][2 - i];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            yellow[i][j] = temp_face[i][j];
//        }
//    }
//
//    // Adjust adjacent faces
//    char temp_row[3];
//    for (int i = 0; i < 3; i++) {
//        temp_row[i] = red[0][i];
//    }
//    for (int i = 0; i < 3; i++) {
//        red[0][i] = blue[0][i];
//    }
//    for (int i = 0; i < 3; i++) {
//        blue[0][i] = orange[0][i];
//    }
//    for (int i = 0; i < 3; i++) {
//        orange[0][i] = green[0][i];
//    }
//    for (int i = 0; i < 3; i++) {
//        green[0][i] = temp_row[i];
//    }
//    return "U'";
//}
//
//string x(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
//    // Rotate entire cube around x-axis (front-back axis) clockwise
//    char temp_face[3][3];
//
//    // Save green face
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            temp_face[i][j] = green[i][j];
//        }
//    }
//
//    // Green becomes white
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            green[i][j] = white[i][j];
//        }
//    }
//
//    // White becomes blue (rotated 180 degrees)
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            white[i][j] = blue[2 - i][2 - j];
//        }
//    }
//
//    // Blue becomes yellow (rotated 180 degrees)
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            blue[i][j] = yellow[2 - i][2 - j];
//        }
//    }
//
//    // Yellow becomes temp_face (original green)
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            yellow[i][j] = temp_face[i][j];
//        }
//    }
//
//    // Rotate red clockwise and orange counterclockwise
//    char temp_red[3][3];
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            temp_red[i][j] = red[2 - j][i];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            red[i][j] = temp_red[i][j];
//        }
//    }
//
//    char temp_orange[3][3];
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            temp_orange[i][j] = orange[j][2 - i];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            orange[i][j] = temp_orange[i][j];
//        }
//    }
//    return "x";
//}
//
//string x_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
//    // Rotate entire cube around x-axis counterclockwise (equivalent to three x moves)
//    x(green, white, yellow, red, orange, blue);
//    x(green, white, yellow, red, orange, blue);
//    x(green, white, yellow, red, orange, blue);
//    return "x'";
//}
//
//string y(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
//    // Rotate entire cube around y-axis (vertical axis) clockwise
//    char temp_face[3][3];
//
//    // Save green face
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            temp_face[i][j] = green[i][j];
//        }
//    }
//
//    // Green becomes orange
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            green[i][j] = orange[i][j];
//        }
//    }
//
//    // Orange becomes blue
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            orange[i][j] = blue[i][j];
//        }
//    }
//
//    // Blue becomes red
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            blue[i][j] = red[i][j];
//        }
//    }
//
//    // Red becomes temp_face (original green)
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            red[i][j] = temp_face[i][j];
//        }
//    }
//
//    // Rotate yellow clockwise and white counterclockwise
//    char temp_yellow[3][3];
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            temp_yellow[i][j] = yellow[2 - j][i];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            yellow[i][j] = temp_yellow[i][j];
//        }
//    }
//
//    char temp_white[3][3];
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            temp_white[i][j] = white[j][2 - i];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            white[i][j] = temp_white[i][j];
//        }
//    }
//    return "y";
//}
//
//string y_prime(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
//    // Rotate entire cube around y-axis counterclockwise (equivalent to three y moves)
//    y(green, white, yellow, red, orange, blue);
//    y(green, white, yellow, red, orange, blue);
//    y(green, white, yellow, red, orange, blue);
//    return "y'";
//}