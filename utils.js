// Utility functions for the Rubik's Cube Solver

function displayCube(front, bottom, top, left, right, back) {
    /*printing output in this format
            _ _ _
          | y y y |
          | y y y |
          | y y y |
            _ _ _
    r r r| g g g| o o o| b b b
    r r r| g g g| o o o| b b b
    r r r| g g g| o o o| b b b
            _ _ _
          | w w w |
          | w w w |
          | w w w |
            _ _ _
    */
    let output = "\n\t\t _____________\n";
    for (let i = 0; i < 3; i++) {
        output += "\t\t | ";
        for (let j = 0; j < 3; j++) {
            output += top[i][j] + " | ";
        }
        output += "\n\t\t _____________\n";
    }
    output += "\n";
    for (let i = 0; i < 3; i++) {
        output += "  | ";
        for (let j = 0; j < 3; j++) {
            output += left[i][j] + " | ";
        }
        output += " | ";
        for (let j = 0; j < 3; j++) {
            output += front[i][j] + " | ";
        }
        output += " | ";
        for (let j = 0; j < 3; j++) {
            output += right[i][j] + " | ";
        }
        output += " | ";
        for (let j = 0; j < 3; j++) {
            output += back[i][j] + " | ";
        }
        output += "\n  __________________________________________________________\n";
    }
    output += "\n\t\t | ";
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            output += bottom[i][j] + " | ";
        }
        output += "\n\t\t _____________\n";
        if (i < 3 - 1)
            output += "\t\t | ";
    }
    output += "\n\n";
    console.log(output);
    return output;
}

function inputCube(inputString) {
    // Parse input string to 3x3 array
    const face = [[], [], []];
    let index = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            face[i][j] = inputString[index];
            index++;
        }
    }
    return face;
}

function isSolved(front, bottom, top, left, right, back) {
    for (let i = 0; i < 3; i++) {
        if (front[i][0] !== front[i][1] || front[i][0] !== front[i][2]) {
            return false;
        }
        if (bottom[i][0] !== bottom[i][1] || bottom[i][0] !== bottom[i][2]) {
            return false;
        }
        if (top[i][0] !== top[i][1] || top[i][0] !== top[i][2]) {
            return false;
        }
        if (left[i][0] !== left[i][1] || left[i][0] !== left[i][2]) {
            return false;
        }
        if (right[i][0] !== right[i][1] || right[i][0] !== right[i][2]) {
            return false;
        }
        if (back[i][0] !== back[i][1] || back[i][0] !== back[i][2]) {
            return false;
        }
    }
    console.log("The cube is solved!");
    return true;
}

function processString(s) {
    let result = "";
    let n = s.length;

    for (let i = 0; i < n; i++) {
        if (i + 1 < n && s[i + 1] === "'") {
            result += s[i] + "'";
            i++;
        } else {
            result += s[i];
        }
    }
    return result;
}

// Helper function to copy a 3x3 array
function copyCube(cube) {
    return [
        [...cube[0]],
        [...cube[1]],
        [...cube[2]]
    ];
}
