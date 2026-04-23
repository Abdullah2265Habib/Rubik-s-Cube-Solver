// First Layer Solving for Rubik's Cube

function firstLayer(front, bottom, top, left, right, back) {
    solveWhiteEdges(front, bottom, top, left, right, back);
    solveWhiteCorners(front, bottom, top, left, right, back);

    if (checkWhiteSide(front, bottom, top, left, right, back)) {
        // move to second layer
        console.log("First layer completed");
    } else {
        console.log("error");
    }
}

function solveWhiteEdges(front, bottom, top, left, right, back) {
    let rotationCount = 0;
    while (!checkFirstLayerEdge(front, bottom, top, left, right, back)) {
        
        // bottom on top-front edge upwards
        if (top[2][1] === 'w') {
            if (front[0][1] === front[1][1]) {
                F(front, bottom, top, left, right, back);
                F(front, bottom, top, left, right, back);
                displayCube(front, bottom, top, left, right, back);
            } else {
                U_prime(front, bottom, top, left, right, back);
                y(front, bottom, top, left, right, back);
                displayCube(front, bottom, top, left, right, back);
                continue;
            }
        }
        // bottom on top
        else if (top[0][1] === 'w' || top[1][0] === 'w' || top[1][2] === 'w') {
            U(front, bottom, top, left, right, back);
            displayCube(front, bottom, top, left, right, back);
            continue;
        } else if (front[0][1] === 'w' || left[0][1] === 'w' || right[0][1] === 'w' || back[0][1] === 'w') {
            if (top[2][1] === front[1][1] && front[0][1] === 'w') {
                U(front, bottom, top, left, right, back);
                M_prime(front, bottom, top, left, right, back);
                U_prime(front, bottom, top, left, right, back);
                M(front, bottom, top, left, right, back);
                y(front, bottom, top, left, right, back);
                displayCube(front, bottom, top, left, right, back);
                continue;
            } else {
                if (front[0][1] === 'w') {
                    U_prime(front, bottom, top, left, right, back);
                    y(front, bottom, top, left, right, back);
                    continue;
                }
                U_prime(front, bottom, top, left, right, back);
            }
        }
        // bottom in middle layer
        else if (front[1][0] === 'w' || front[1][2] === 'w' || left[1][0] === 'w' || left[1][2] === 'w' || 
                 right[1][0] === 'w' || right[1][2] === 'w' || back[1][0] === 'w' || back[1][2] === 'w') {
            
            // bottom on front face
            if (front[1][0] === 'w' && left[1][2] === left[1][1]) {
                L(front, bottom, top, left, right, back);
                displayCube(front, bottom, top, left, right, back);
                continue;
            } else if (front[1][0] === 'w') {
                L_primeU_primeLU(front, bottom, top, left, right, back);
                displayCube(front, bottom, top, left, right, back);
                continue;
            } else if (front[1][2] === 'w' && right[1][0] === right[1][1]) {
                R_prime(front, bottom, top, left, right, back);
                displayCube(front, bottom, top, left, right, back);
                continue;
            } else if (front[1][2] === 'w') {
                RUR_primeU_prime(front, bottom, top, left, right, back);
                displayCube(front, bottom, top, left, right, back);
                continue;
            }
            // bottom on left-side
            else if (left[1][2] === 'w' || left[1][0] === 'w') {
                if (left[1][2] === 'w') {
                    if (front[1][0] === front[1][1]) {
                        F_prime(front, bottom, top, left, right, back);
                        displayCube(front, bottom, top, left, right, back);
                        continue;
                    } else {
                        L_primeU_primeLU(front, bottom, top, left, right, back);
                        displayCube(front, bottom, top, left, right, back);
                        continue;
                    }
                } else {
                    y_prime(front, bottom, top, left, right, back);
                    displayCube(front, bottom, top, left, right, back);
                    continue;
                }
            }
            // bottom on right-side
            else if (right[1][0] === 'w' || right[1][2] === 'w') {
                if (right[1][0] === 'w') {
                    if (front[1][2] === front[1][1]) {
                        F(front, bottom, top, left, right, back);
                        displayCube(front, bottom, top, left, right, back);
                        continue;
                    } else {
                        RUR_primeU_prime(front, bottom, top, left, right, back);
                        displayCube(front, bottom, top, left, right, back);
                        continue;
                    }
                } else {
                    y(front, bottom, top, left, right, back);
                    displayCube(front, bottom, top, left, right, back);
                    continue;
                }
            }
            // bottom on back
            else {
                y(front, bottom, top, left, right, back);
                y(front, bottom, top, left, right, back);
                displayCube(front, bottom, top, left, right, back);
                continue;
            }
        }
        // bottom on bottom
        else {
            if  bottom[0][1] === bottom[1][1]) {
                if (front[2][1] === front[1][1]) {
                    y(front, bottom, top, left, right, back);
                    displayCube(front, bottom, top, left, right, back);
                    continue;
                } else {
                    F(front, bottom, top, left, right, back);
                    F(front, bottom, top, left, right, back);
                    displayCube(front, bottom, top, left, right, back);
                    continue;
                }
            } else {
                M_prime(front, bottom, top, left, right, back);
                U(front, bottom, top, left, right, back);
                M(front, bottom, top, left, right, back);
                U_prime(front, bottom, top, left, right, back);
                displayCube(front, bottom, top, left, right, back);
                continue;
            }
        }
    }
}

function solveWhiteCorners(front, bottom, top, left, right, back) {
    let bottomCount = 0;
    let foundPieceInTopLayer = false;
    let pieceBelong = false;
    let rotationCount = 0;
    
    while (!checkFirstLayerCorner(front, bottom, top, left, right, back)) {
        if (top[2][2] === 'w' || front[0][2] === 'w' || right[0][0] === 'w') {
            foundPieceInTopLayer = true;
            rotationCount = 0;

            // algorithms to solve the piece
            if (front[0][2] === 'w' && (right[0][0] === right[1][1] && top[2][2] === front[1][1])) {
                URU_primeR_prime(front, bottom, top, left, right, back);
                displayCube(front, bottom, top, left, right, back);
            } else if (right[0][0] === 'w' && (front[0][2] === front[1][1] && top[2][2] === right[1][1])) {
                RUR_primeU_prime(front, bottom, top, left, right, back);
                displayCube(front, bottom, top, left, right, back);
            } else if (top[2][2] === 'w' && (right[0][0] === front[1][1] && front[0][2] === right[1][1])) {
                RUR_primeU_prime(front, bottom, top, left, right, back);
                displayCube(front, bottom, top, left, right, back);
                RUR_primeU_prime(front, bottom, top, left, right, back);
                displayCube(front, bottom, top, left, right, back);
                RUR_primeU_prime(front, bottom, top, left, right, back);
                displayCube(front, bottom, top, left, right, back);
            } else {
                if (top[2][2] === front[1][1] || front[0][2] === front[1][1] || right[0][0] === front[1][1]) {
                    // move to left
                    U(front, bottom, top, left, right, back);
                    displayCube(front, bottom, top, left, right, back);
                    y_prime(front, bottom, top, left, right, back);
                    displayCube(front, bottom, top, left, right, back);
                } else if (top[2][2] === right[1][1] || front[0][2] === right[1][1] || right[0][0] === right[1][1]) {
                    // move to right
                    U_prime(front, bottom, top, left, right, back);
                    displayCube(front, bottom, top, left, right, back);
                    y(front, bottom, top, left, right, back);
                    displayCube(front, bottom, top, left, right, back);
                } else {
                    U(front, bottom, top, left, right, back);
                    displayCube(front, bottom, top, left, right, back);
                    U(front, bottom, top, left, right, back);
                    displayCube(front, bottom, top, left, right, back);
                    y(front, bottom, top, left, right, back);
                    displayCube(front, bottom, top, left, right, back);
                    y(front, bottom, top, left, right, back);
                    displayCube(front, bottom, top, left, right, back);
                }
            }
        } else if (rotationCount !== 4) {
            y_prime(front, bottom, top, left, right, back);
            displayCube(front, bottom, top, left, right, back);
            rotationCount++;
        } else {
            while (bottomCount < 4) {
                if  bottom[0][2] === bottom[1][1] && front[2][2] === front[1][1] && right[2][0] === right[1][1]) {
                    y(front, bottom, top, left, right, back);
                    displayCube(front, bottom, top, left, right, back);
                    ++bottomCount;
                    continue;
                } else {
                    rotationCount = 0;
                    bottomCount = 0;
                    RUR_primeU_prime(front, bottom, top, left, right, back);
                    displayCube(front, bottom, top, left, right, back);
                    break;
                }
            }
        }
    }
}

function checkFirstLayerEdge(front, bottom, top, left, right, back) {
    if  bottom[0][1] === bottom[1][1] && front[2][1] === front[1][1] &&
     bottom[1][0] === bottom[1][1] && left[2][1] === left[1][1] &&
     bottom[1][2] === bottom[1][1] && right[2][1] === right[1][1] &&
     bottom[2][1] === bottom[1][1] && back[2][1] === back[1][1]) {
        return true;
    }
    return false;
}

function checkFirstLayerCorner(front, bottom, top, left, right, back) {
    if (front[2][2] === front[1][1] && bottom[0][2] === bottom[1][1] && right[2][0] === right[1][1] &&
        front[2][0] === front[1][1] && bottom[0][0] === bottom[1][1] && left[2][2] === left[1][1] &&
        right[2][2] === right[1][1] && bottom[2][2] === bottom[1][1] && back[2][0] === back[1][1] &&
        left[2][0] === left[1][1] && bottom[2][0] === bottom[1][1] && back[2][2] === back[1][1])
        return true;
    return false;
}

function checkWhiteSide(front, bottom, top, left, right, back) {
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            if  bottom[0][0] === bottom[0][1] && bottom[0][1] === bottom[0][2] &&
             bottom[0][2] === bottom[1][0] && bottom[1][0] === bottom[1][1] &&
             bottom[1][1] === bottom[1][2] && bottom[1][2] === bottom[2][0] &&
             bottom[2][0] === bottom[2][1] && bottom[2][1] === bottom[2][2]) {
                console.log("\n\n\t\t\tFirst Layer Completed\n\n");
                return true;
            }
        }
    }
    return false;
}
