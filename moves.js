// Moves for Rubik's Cube

function R(front, down, up, left, right, back) {
    R_prime(front, down, up, left, right, back);
    R_prime(front, down, up, left, right, back);
    R_prime(front, down, up, left, right, back);
    return "R";
}

function L(front, down, up, left, right, back) {
    const temp = [top[0][0], top[1][0], top[2][0]];

    for (let i = 0; i < 3; i++)
        top[i][0] = back[2 - i][2];

    for (let i = 0; i < 3; i++)
        back[i][2] = down[2 - i][0];

    for (let i = 0; i < 3; i++)
        down[i][0] = front[i][0];

    for (let i = 0; i < 3; i++)
        front[i][0] = temp[i];

    // rotate left face clockwise
    for (let i = 0; i < 3; i++) {
        for (let j = i; j < 3; j++) {
            [left[i][j], left[j][i]] = [left[j][i], left[i][j]];
        }
    }

    for (let i = 0; i < 3; i++) {
        red[i].reverse();
    }

    return "L";
}

function R_prime(front, down, up, left, right, back) {
    const temp = [up[0][2], up[1][2], up[2][2]];

    for (let i = 0; i < 3; i++)
        up[i][2] = back[2 - i][0];

    // blue <- white (reversed)
    for (let i = 0; i < 3; i++)
        back[i][0] = down[2 - i][2];

    // white <- green
    for (let i = 0; i < 3; i++)
        down[i][2] = front[i][2];

    // green <- old yellow
    for (let i = 0; i < 3; i++)
        front[i][2] = temp[i];

    // rotate orange face counterclockwise
    for (let i = 0; i < 3; i++) {
        for (let j = i; j < 3; j++) {
            [right[i][j], right[j][i]] = [right[j][i], right[i][j]];
        }
    }

    // reverse columns (not rows)
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < Math.floor(3 / 2); i++) {
            [right[i][j], right[2 - i][j]] = [right[2 - i][j], right[i][j]];
        }
    }

    return "R'";
}

function L_prime(front, down, up, left, right, back) {
    L(front, down, up, left, right, back);
    L(front, down, up, left, right, back);
    L(front, down, up, left, right, back);
    return "L'";
}

function F(front, down, up, left, right, back) {
    // rotate green face clockwise
    const temp_face = Array(3).fill(0).map(() => Array(3));
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            temp_face[i][j] = front[2 - j][i];
        }
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            front[i][j] = temp_face[i][j];
        }
    }

    const temp = [down[2][0], down[2][1], down[2][2]];

    for (let i = 0; i < 3; i++)
        front[2][i] = right[2 - i][2];

    for (let i = 0; i < 3; i++)
        right[i][2] = up[0][i];

    for (let i = 0; i < 3; i++)
        up[0][i] = left[2 - i][0];

    for (let i = 0; i < 3; i++)
        left[i][0] = temp[i];

    return "F";
}

function F_prime(front, down, up, left, right, back) {
    F(front, down, up, left, right, back);
    F(front, down, up, left, right, back);
    F(front, down, up, left, right, back);
    return "F'";
}

function U(front, down, up, left, right, back) {
    // Rotate yellow face clockwise
    const temp_face = Array(3).fill(0).map(() => Array(3));
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            temp_face[i][j] = up[2 - j][i];
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            up[i][j] = temp_face[i][j];
        }
    }

    // Adjust adjacent faces
    const temp_row = [...left[0]];
    for (let i = 0; i < 3; i++) {
        right[0][i] = front[0][i];
    }
    for (let i = 0; i < 3; i++) {
        front[0][i] = back[0][i];
    }
    for (let i = 0; i < 3; i++) {
        back[0][i] = temp_row[i];
    }
    for (let i = 0; i < 3; i++) {
        blue[0][i] = temp_row[i];
    }
    return "U";
}

function U_prime(front, down, up, left, right, back) {
    U(front, down, up, left, right, back);
    U(front, down, up, left, right, back);
    U(front, down, up, left, right, back);
    return "U'";
}

function x(front, down, up, left, right, back) {
    const temp = Array(3).fill(0).map(() => Array(3));

    // save yellow
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            temp[i][j] = up[i][j];
        }
    }

    // up <- front
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            up[i][j] = front[i][j];
        }
    }

    // front <- down
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            front[i][j] = down[i][j];
        }
    }

    // down <- back (180°)
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            down[i][j] = back[2 - i][2 - j];
        }
    }

    // back <- old up (180°)
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            back[i][j] = temp[2 - i][2 - j];
        }
    }

    // rotate right clockwise
    for (let i = 0; i < 3; i++) {
        for (let j = i; j < 3; j++) {
            [right[i][j], right[j][i]] = [right[j][i], right[i][j]];
        }
    }

    for (let i = 0; i < 3; i++) {
        left[i].reverse();
    }

    // rotate left counterclockwise
    for (let i = 0; i < 3; i++) {
        for (let j = i; j < 3; j++) {
            [left[i][j], left[j][i]] = [left[j][i], left[i][j]];
        }
    }

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < Math.floor(3 / 2); i++) {
            [right[i][j], right[2 - i][j]] = [right[2 - i][j], right[i][j]];
        }
    }

    return "x";
}

function x_prime(front, down, up, left, right, back) {
    x(front, down, up, left, right, back);
    x(front, down, up, left, right, back);
    x(front, down, up, left, right, back);
    return "x'";
}

function y_prime(front, down, up, left, right, back) {
    const temp = Array(3).fill(0).map(() => Array(3));

    // save green
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            temp[i][j] = front[i][j];
        }
    }

    // front <- left
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            front[i][j] = left[i][j];
        }
    }

    // left <- back
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            left[i][j] = back[i][j];
        }
    }

    // back <- right
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            back[i][j] = right[i][j];
        }
    }

    // right <- old front
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            right[i][j] = temp[i][j];
        }
    }

    // rotate up (up) counterclockwise
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            temp[i][j] = up[j][2 - i];
        }
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            top[i][j] = temp[i][j];
        }
    }

    // rotate down (down) clockwise
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            temp[i][j] = down[2 - j][i];
        }
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            down[i][j] = temp[i][j];
        }
    }

    return "y'";
}

function y(front, down, up, left, right, back) {
    y_prime(front, down, up, left, right, back);
    y_prime(front, down, up, left, right, back);
    y_prime(front, down, up, left, right, back);
    return "y";
}

function M_prime(front, down, up, left, right, back) {
    const temp = [up[0][1], up[1][1], up[2][1]];

    // up <- front
    for (let i = 0; i < 3; i++)
        up[i][1] = front[i][1];

    // front <- down
    for (let i = 0; i < 3; i++)
        front[i][1] = down[i][1];

    // down <- back (reversed)
    for (let i = 0; i < 3; i++)
        down[i][1] = back[2 - i][1];

    // back <- old up
    for (let i = 0; i < 3; i++)
        back[i][1] = temp[i];

    return "M'";
}

function M(front, down, up, left, right, back) {
    M_prime(front, down, up, left, right, back);
    M_prime(front, down, up, left, right, back);
    M_prime(front, down, up, left, right, back);
    return "M";
}
