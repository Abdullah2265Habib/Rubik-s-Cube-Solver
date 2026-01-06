//#include<iostream>
//#include<string>
//#include<cstring>
//using namespace std;
//#define size 3
//
//void input(char face[3][3]);
//void displayCube(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]);
//bool isSolved(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]);
//
//string R(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]);
//string L(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]);
//string U(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]);
//string F(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]);
//string x(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]);
//string y(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]);
//
//string R_prime(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]);
//string L_prime(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]);
//string U_prime(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]);
//string F_prime(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]);
//string x_prime(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]);
//string y_prime(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]);
//
//string RUR_primeU_prime(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]);
//string L_primeU_primeLU(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]);
//string FRUR_primeU_primeF_prime(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]);
//
//string firstLayer(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]);
//bool checkFirstLayerCorner(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]);
//
//int main() {
//    char bottom[3][3];
//    char top[3][3];
//    char left[3][3];
//    char right[3][3];
//    char back[3][3];
//    char front[3][3];
//    string moves = "";
//    //taking input
//    cout << "For Front Center\n";
//    input(front);
//    cout << "For Bottom Center\n";
//    input(bottom);
//    cout << "For Top Center\n";
//    input(top);
//    cout << "For Left Center\n";
//    input(left);
//    cout << "For Right Center\n";
//    input(right);
//    cout << "For Back Center\n";
//    input(back);
//
//
//
//    displayCube(front, bottom, top, left, right, back);
//    string solutionMoves = firstLayer(front, bottom, top, left, right, back);
//    cout << "\n\n\n\n\n";
//	displayCube(front, bottom, top, left, right, back);
//    cout << "Solution moves: " << solutionMoves << endl;
//    return 0;
//}
//string RUR_primeU_prime(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]) {
//    string moves = "";
//    moves += R(front, bottom, top, left, right, back);
//    moves += U(front, bottom, top, left, right, back);
//    moves += R_prime(front, bottom, top, left, right, back);
//    moves += U_prime(front, bottom, top, left, right, back);
//    return moves;
//}
//
//string L_primeU_primeLU(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]) {
//    string moves = "";
//    moves += L_prime(front, bottom, top, left, right, back);
//    moves += U_prime(front, bottom, top, left, right, back);
//    moves += L(front, bottom, top, left, right, back);
//    moves += U(front, bottom, top, left, right, back);
//    return moves;
//}
//
//string FRUR_primeU_primeF_prime(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]) {
//    string moves = "";
//    moves += F(front, bottom, top, left, right, back);
//    moves += R(front, bottom, top, left, right, back);
//    moves += U(front, bottom, top, left, right, back);
//    moves += R_prime(front, bottom, top, left, right, back);
//    moves += U_prime(front, bottom, top, left, right, back);
//    moves += F_prime(front, bottom, top, left, right, back);
//    return moves;
//}
//
//
//
//
//string firstLayer(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]) {
//    int i = 0;
//    int count = 0;
//    string moves = "";
//
//    while (i < 4) { // Only 4 corners in first layer
//        if (count < 4) { // Check all 4 orientations
//            if (top[2][2] == 'w' || right[0][0] == 'w' || front[0][2] == 'w') {
//                count = 0; // Reset count when white corner is found
//                //White on top
//                if (top[2][2] == 'w' && front[0][2] == right[1][1] && right[0][0] == front[1][1]) {
//                    moves += RUR_primeU_prime(front, bottom, top, left, right, back);
//                    moves += RUR_primeU_prime(front, bottom, top, left, right, back);
//                    moves += RUR_primeU_prime(front, bottom, top, left, right, back);
//                    ++i;
//                }
//                //White on front
//                else if (front[0][2] == 'w' && top[2][2] == front[1][1] && right[0][0] == right[1][1]) {
//                    moves += U(front, bottom, top, left, right, back);
//                    moves += R(front, bottom, top, left, right, back);
//                    moves += U_prime(front, bottom, top, left, right, back);
//                    moves += R_prime(front, bottom, top, left, right, back);
//                    ++i;
//                }
//                //White on right
//                else if (right[0][0] == 'w' && front[0][2] == front[1][1] && top[2][2] == right[1][1]) {
//                    moves += RUR_primeU_prime(front, bottom, top, left, right, back);
//                    ++i;
//                }
//                else {
//                    moves += U(front, bottom, top, left, right, back);
//                }
//                if (i < 4) {
//                    moves += y(front, bottom, top, left, right, back);
//                }
//            }
//            else {
//                ++count;
//                moves += y(front, bottom, top, left, right, back);
//            }
//        }
//        else {
//            //find another way. this is not working
//            if (bottom[0][2] == 'w' || front[2][2] == 'w' || right[2][0] == 'w') {
//                if (bottom[0][2] == 'w' && front[2][2] == front[1][1] && right[2][0] == right[1][1]) {
//                    ++i;
//                    count = 0;
//                    if (i < 4) {
//                        moves += y(front, bottom, top, left, right, back);
//                    }
//                }
//                else if ((front[2][2] == 'w' && bottom[0][2] == front[1][1] && right[2][0] == right[1][1]) ||
//                    (right[2][0] == 'w' && bottom[0][2] == right[1][1] && front[2][2] == front[1][1]) ||
//                    (bottom[0][2] != 'w' && ((front[2][2] == front[1][1] && right[2][0] == right[1][1]) ||
//                        (front[2][2] == right[1][1] && right[2][0] == front[1][1])))) {
//                    moves += RUR_primeU_prime(front, bottom, top, left, right, back);
//                    count = 0;
//                }
//                else {
//                    moves += RUR_primeU_prime(front, bottom, top, left, right, back);
//                    count = 0;
//                }
//            }
//            else {
//                moves += y(front, bottom, top, left, right, back);
//                count = 0;
//            }
//        }
//    }
//
//    return moves;
//}
//
//
//
//bool checkFirstLayerCorner(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]) {
//    // Implementation for checking if the first layer is solved
//    // This is a placeholder; you should implement the actual check
//    return false;
//}
//void displayCube(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]) {
//    /*printing output in this format
//              t t t
//              t t t
//              t t t
//              _ _ _
//        l l l| f f f| r r r| b b b
//        l l l| f f f| r r r| b b b
//        l l l| f f f| r r r| b b b
//              _ _ _
//              b b b
//              b b b
//              b b b
//    */
//    cout << "\t\t _____________\n";
//    for (int i = 0; i < size; i++) {
//        cout << "\t\t | ";
//        for (int j = 0; j < size; j++) {
//            cout << top[i][j] << " | ";
//        }
//        cout << "\n\t\t _____________\n";
//
//    }
//    for (int i = 0; i < size; i++) {
//        cout << "  | ";
//        for (int j = 0; j < size; j++) {
//            cout << left[i][j] << " | ";
//        }
//        cout << " | ";
//        for (int j = 0; j < size; j++) {
//            cout << front[i][j] << " | ";
//        }
//        cout << " | ";
//        for (int j = 0; j < size; j++) {
//            cout << right[i][j] << " | ";
//        }
//        cout << " | ";
//        for (int j = 0; j < size; j++) {
//            cout << back[i][j] << " | ";
//        }
//        cout << "\n  __________________________________________________________\n";
//    }
//    cout << "\t\t | ";
//    for (int i = 0; i < size; i++) {
//        for (int j = 0; j < size; j++) {
//            cout << bottom[i][j] << " | ";
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
//bool isSolved(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]) {
//
//
//    for (int i = 0; i < 3; i++) {
//        if (front[i][0] != front[i][1] || front[i][0] != front[i][2]) {
//            return false;
//        }
//        if (bottom[i][0] != bottom[i][1] || bottom[i][0] != bottom[i][2]) {
//            return false;
//        }
//        if (top[i][0] != top[i][1] || top[i][0] != top[i][2]) {
//            return false;
//        }
//        if (left[i][0] != left[i][1] || left[i][0] != left[i][2]) {
//            return false;
//        }
//        if (right[i][0] != right[i][1] || right[i][0] != right[i][2]) {
//            return false;
//        }
//        if (back[i][0] != back[i][1] || back[i][0] != back[i][2]) {
//            return false;
//        }
//    }
//    cout << "The cube is solved!" << endl;
//    return true;
//}
//string R(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]) {
//    char temp[3];
//    for (int i = 0; i < 3; i++) {
//        temp[i] = top[i][2];
//    }
//    for (int i = 0; i < 3; i++) {
//        top[i][2] = front[i][2];
//    }
//    for (int i = 0; i < 3; i++) {
//        front[i][2] = bottom[i][2];
//    }
//    for (int i = 0; i < 3; i++) {
//        bottom[i][2] = back[2-i][0];
//    }
//    for (int i = 0; i < 3; i++) {
//        back[2-i][0] = temp[i];
//    }
//    
//    // 1. Transpose
//    for (int i = 0; i < 3; i++) {
//        for (int j = i + 1; j < 3; j++) {
//            swap(right[i][j], right[j][i]);
//        }
//    }
//    
//    // 2. Reverse each row
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3/2; j++) {
//            swap(right[i][j], right[i][3-1-j]);
//        }
//    }
//    
//    return "R";
//}
//
//string L(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]) {
//    // Store the leftmost column of top face
//    char temp[3];
//    for (int i = 0; i < 3; i++) {
//        temp[i] = top[i][0];
//    }
//    // Move back's right column (reversed) to top's left column
//    for (int i = 0; i < 3; i++) {
//        top[i][0] = back[2 - i][2];
//    }
//    // Move bottom's left column to back's right column (reversed)
//    for (int i = 0; i < 3; i++) {
//        back[2 - i][2] = bottom[i][0];
//    }
//    // Move front's left column to bottom's left column
//    for (int i = 0; i < 3; i++) {
//        bottom[i][0] = front[i][0];
//    }
//    // Move temp (original top) to front's left column
//    for (int i = 0; i < 3; i++) {
//        front[i][0] = temp[i];
//    }
//    // Rotate left face counterclockwise (90 degrees)
//    // Method: transpose then reverse each column
//
//    // 1. Transpose
//    for (int i = 0; i < 3; i++) {
//        for (int j = i + 1; j < 3; j++) {
//            swap(left[i][j], left[j][i]);
//        }
//    }
//    // 2. Reverse each column
//    for (int j = 0; j < 3; j++) {
//        for (int i = 0; i < 3 / 2; i++) {
//            swap(left[i][j], left[3 - 1 - i][j]);
//        }
//    }
//    return "L";
//}
////gggggggggwwwwwwwwwyyyyyyyyyrrrrrrrrrooooooooobbbbbbbbb
//string R_prime(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]) {
//    //rotating R three times make it R' or R_prime
//    R(front, bottom, top, left, right, back);
//    R(front, bottom, top, left, right, back);
//    R(front, bottom, top, left, right, back);
//    return "R'";
//}
//string L_prime(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]) {
//    L(front, bottom, top, left, right, back);
//    L(front, bottom, top, left, right, back);
//    L(front, bottom, top, left, right, back);
//    return "L'";
//}
//string F(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]) {
//    char temp[3];
//    for (int i = 0; i < 3; i++) {
//        temp[i] = top[2][i];
//    }
//    for (int i = 0; i < 3; i++) {
//        top[2][i] = left[2 - i][2];
//    }
//    for (int i = 0; i < 3; i++) {
//        left[i][2] = bottom[0][i];
//    }
//    for (int i = 0; i < 3; i++) {
//        bottom[0][i] = right[2 - i][0];
//    }
//    for (int i = 0; i < 3; i++) {
//        right[i][0] = temp[i];
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = i + 1; j < 3; j++) {
//            swap(front[i][j], front[j][i]);
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3 / 2; j++) {
//            swap(front[i][j], front[i][3 - 1 - j]);
//        }
//    }
//    return "F";
//}
//string F_prime(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]) {
//	F(front, bottom, top, left, right, back);
//	F(front, bottom, top, left, right, back);
//	F(front, bottom, top, left, right, back);
//    return "F'";
//}
//string U(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]) {
//    char temp[3];
//    for (int i = 0; i < 3; i++) {
//        temp[i] = front[0][i];
//    }
//    for (int i = 0; i < 3; i++) {
//        front[0][i] = right[0][i];
//    }
//    for (int i = 0; i < 3; i++) {
//        right[0][i] = back[0][i];
//    }
//    for (int i = 0; i < 3; i++) {
//        back[0][i] = left[0][i];
//    }
//    for (int i = 0; i < 3; i++) {
//        left[0][i] = temp[i];
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = i + 1; j < 3; j++) {
//            swap(top[i][j], top[j][i]);
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3 / 2; j++) {
//            swap(top[i][j], top[i][3 - 1 - j]);
//        }
//    }
//    return "U";
//}
//void printFace(char face[3][3], string name) {
//    cout << name << " face:\n";
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            cout << face[i][j] << " ";
//        }
//        cout << "\n";
//    }
//    cout << "\n";
//}
//
//string U_prime(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]) {
//	U(front, bottom, top, left, right, back);
//	U(front, bottom, top, left, right, back);
//	U(front, bottom, top, left, right, back);
//    return "U'";
//}
//
//string x(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]) {
//    char temp_face[3][3];
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            temp_face[i][j] = front[i][j];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            front[i][j] = bottom[i][j];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            bottom[i][j] = back[2 - i][2 - j];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            back[i][j] = top[2 - i][2 - j];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            top[i][j] = temp_face[i][j];
//        }
//    }
//    char temp_left[3][3];
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            temp_left[i][j] = left[2 - j][i];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            left[i][j] = temp_left[i][j];
//        }
//    }
//
//    char temp_right[3][3];
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            temp_right[i][j] = right[j][2 - i];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            right[i][j] = temp_right[i][j];
//        }
//    }
//    return "x";
//}
//
//string x_prime(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]) {
//    x(front, bottom, top, left, right, back);
//    x(front, bottom, top, left, right, back);
//    x(front, bottom, top, left, right, back);
//    return "x'";
//}
//
//string y(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]) {
//    char temp_face[3][3];
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            temp_face[i][j] = front[i][j];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            front[i][j] = right[i][j];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            right[i][j] = back[i][j];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            back[i][j] = left[i][j];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            left[i][j] = temp_face[i][j];
//        }
//    }
//    char temp_top[3][3];
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            temp_top[i][j] = top[2 - j][i];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            top[i][j] = temp_top[i][j];
//        }
//    }
//
//    char temp_bottom[3][3];
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            temp_bottom[i][j] = bottom[j][2 - i];
//        }
//    }
//    for (int i = 0; i < 3; i++) {
//        for (int j = 0; j < 3; j++) {
//            bottom[i][j] = temp_bottom[i][j];
//        }
//    }
//    return "y";
//}
//string y_prime(char front[3][3], char bottom[3][3], char top[3][3], char left[3][3], char right[3][3], char back[3][3]) {
//    y(front, bottom, top, left, right, back);
//    y(front, bottom, top, left, right, back);
//    y(front, bottom, top, left, right, back);
//    return "y'";
//}