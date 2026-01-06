#include "utils.h"
#include <iostream>
using namespace std;

void displayCube(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {
	/*printing output in this format
			  y y y
			  y y y
			  y y y
			  _ _ _
		r r r| g g g| o o o| b b b
		r r r| g g g| o o o| b b b
		r r r| g g g| o o o| b b b
			  _ _ _
			  w w w
			  w w w
			  w w w
	*/
	cout << "\t\t _____________\n";
	for (int i = 0; i < 3; i++) {
		cout << "\t\t | ";
		for (int j = 0; j < 3; j++) {
			cout << yellow[i][j] << " | ";
		}
		cout << "\n\t\t _____________\n";

	}
	cout << "\n";
	for (int i = 0; i < 3; i++) {
		cout << "  | ";
		for (int j = 0; j < 3; j++) {
			cout << red[i][j] << " | ";
		}
		cout << " | ";
		for (int j = 0; j < 3; j++) {
			cout << green[i][j] << " | ";
		}
		cout << " | ";
		for (int j = 0; j < 3; j++) {
			cout << orange[i][j] << " | ";
		}
		cout << " | ";
		for (int j = 0; j < 3; j++) {
			cout << blue[i][j] << " | ";
		}
		cout << "\n  __________________________________________________________\n";
	}
	cout << "\n\t\t | ";
	for (int i = 0; i < 3; i++) {
		for (int j = 0; j < 3; j++) {
			cout << white[i][j] << " | ";
		}
		cout << "\n\t\t _____________\n";
		if (i < 3 - 1)
			cout << "\t\t | ";
	}
	cout << "\n\n";
}


//wwwwwwwwwyyyyyyyyyrrrrrrrrroooooooooobbbbbbbbbggggggggg

void input(char face[3][3]) {
	for (int i = 0; i < 3; i++) {
		for (int j = 0; j < 3; j++) {
			cin >> face[i][j];
		}
	}
}

bool isSolved(char green[3][3], char white[3][3], char yellow[3][3], char red[3][3], char orange[3][3], char blue[3][3]) {


	for (int i = 0; i < 3; i++) {
		if (green[i][0] != green[i][1] || green[i][0] != green[i][2]) {
			return false;
		}
		if (white[i][0] != white[i][1] || white[i][0] != white[i][2]) {
			return false;
		}
		if (yellow[i][0] != yellow[i][1] || yellow[i][0] != yellow[i][2]) {
			return false;
		}
		if (red[i][0] != red[i][1] || red[i][0] != red[i][2]) {
			return false;
		}
		if (orange[i][0] != orange[i][1] || orange[i][0] != orange[i][2]) {
			return false;
		}
		if (blue[i][0] != blue[i][1] || blue[i][0] != blue[i][2]) {
			return false;
		}
	}
	cout << "The cube is solved!" << endl;
	return true;
}

string processString(const string& s) {
	string result;
	int n = s.size();

	for (int i = 0; i < n; ) {
		char current = s[i];
		int count = 0;

		while (i < n && s[i] == current) {
			count++;
			i++;
		}

		if (count == 3) {
			result += current;
			result += '\'';
		}
		else if (count == 4) {
			continue;
		}
		else if (count >= 5) {
			result += current;
		}
		else {
			result.append(count, current);
		}
	}

	return result;
}