/**
 * js/app.js
 * Main UI Controller for Rubik's Cube Solver (CFOP Method).
 */

let currentSelectedColor = 'w';
let currentCubeState = createSolvedCube();

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize 3D Viewport
    init3DScene('cubeCanvas');
    update3DCubeState(currentCubeState);

    // 2. Build 2D Unfolded Cube Net
    renderCubeNet();

    // 3. Setup Color Palette Swatches
    setupPalette();

    // 4. Input & Textarea Sync
    updateTextAreaFromState();

    // 5. Button Listeners
    document.getElementById('btnRealTime')?.addEventListener('click', handleShowRealTime);
    document.getElementById('btnSolveCFOP')?.addEventListener('click', handleSolveCFOP);
    document.getElementById('btnResetState')?.addEventListener('click', handleResetState);
    document.getElementById('btnScramble')?.addEventListener('click', handlePresetScramble);
    document.getElementById('btnResetView')?.addEventListener('click', reset3DView);

    // Live Sync Checkbox
    document.getElementById('cubeInput')?.addEventListener('input', handleTextInputChange);
});

/**
 * Strips whitespace, newlines, and non-color characters from input string.
 */
function sanitizeCubeString(rawStr) {
    if (!rawStr) return '';
    return rawStr.replace(/[^wygbroWYGBRO]/g, '').toLowerCase();
}

/**
 * Builds the 2D Unfolded Cube Net in HTML.
 */
function renderCubeNet() {
    const netContainer = document.getElementById('cubeNet');
    if (!netContainer) return;

    netContainer.innerHTML = '';
    const faces = ['U', 'L', 'F', 'R', 'B', 'D'];

    for (let faceName of faces) {
        const faceGrid = document.createElement('div');
        faceGrid.className = `face-grid face-${faceName}`;
        faceGrid.dataset.face = faceName;

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const facelet = document.createElement('div');
                const colorCode = currentCubeState[faceName][r][c];
                facelet.className = `facelet c-${colorCode}`;
                facelet.dataset.face = faceName;
                facelet.dataset.row = r;
                facelet.dataset.col = c;

                facelet.addEventListener('click', () => onFaceletClick(faceName, r, c, facelet));
                faceGrid.appendChild(facelet);
            }
        }
        netContainer.appendChild(faceGrid);
    }
}

/**
 * Palette Selection logic
 */
function setupPalette() {
    const swatches = document.querySelectorAll('.color-swatch');
    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            swatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            currentSelectedColor = swatch.dataset.color;
        });
    });
}

/**
 * Facelet Click Event
 */
function onFaceletClick(faceName, row, col, element) {
    currentCubeState[faceName][row][col] = currentSelectedColor;
    element.className = `facelet c-${currentSelectedColor}`;

    updateTextAreaFromState();

    const liveSyncEnabled = document.getElementById('chkLiveSync')?.checked;
    if (liveSyncEnabled) {
        update3DCubeState(currentCubeState);
    }
}

/**
 * Synchronizes 54-char string input area with state
 */
function updateTextAreaFromState() {
    const inputArea = document.getElementById('cubeInput');
    if (inputArea) {
        inputArea.value = cubeToString(currentCubeState);
    }
}

/**
 * Handles "SHOW IN REAL TIME" button click.
 */
function handleShowRealTime() {
    const inputArea = document.getElementById('cubeInput');
    const statusMsg = document.getElementById('statusMsg');

    if (inputArea) {
        const cleanStr = sanitizeCubeString(inputArea.value);
        if (cleanStr.length === 54) {
            currentCubeState = stringToCube(cleanStr);
            renderCubeNet();
            update3DCubeState(currentCubeState);

            if (statusMsg) {
                statusMsg.textContent = "3D VIEW UPDATED IN REAL TIME";
                statusMsg.style.color = "#00f0ff";
            }
        } else {
            if (statusMsg) {
                statusMsg.textContent = `INPUT LENGTH IS ${cleanStr.length}/54 CHARACTERS`;
                statusMsg.style.color = "#ff3366";
            }
            alert(`Input error: String contains ${cleanStr.length} valid color characters. Exactly 54 characters (w, y, g, b, r, o) are required.`);
        }
    }
}

/**
 * Handles text input change in textarea
 */
function handleTextInputChange() {
    const inputArea = document.getElementById('cubeInput');
    if (inputArea) {
        const cleanStr = sanitizeCubeString(inputArea.value);
        if (cleanStr.length === 54) {
            try {
                currentCubeState = stringToCube(cleanStr);
                renderCubeNet();
                const liveSyncEnabled = document.getElementById('chkLiveSync')?.checked;
                if (liveSyncEnabled) {
                    update3DCubeState(currentCubeState);
                }
            } catch (e) {
                // ignore partial typing
            }
        }
    }
}

/**
 * Handles "SOLVE CFOP" button click.
 */
function handleSolveCFOP() {
    const inputArea = document.getElementById('cubeInput');
    if (inputArea) {
        const cleanStr = sanitizeCubeString(inputArea.value);
        if (cleanStr.length === 54) {
            currentCubeState = stringToCube(cleanStr);
            renderCubeNet();
            update3DCubeState(currentCubeState);
        }
    }

    const result = solveCFOP(currentCubeState);
    displaySolutionResult(result);

    // Scroll to solution section
    const container = document.getElementById('solutionOutput');
    if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Renders structured CFOP solution in UI
 */
function displaySolutionResult(result) {
    const container = document.getElementById('solutionOutput');
    const statusMsg = document.getElementById('statusMsg');
    if (!container) return;

    if (!result.success) {
        if (statusMsg) {
            statusMsg.textContent = "SOLVER ERROR: INVALID CUBE STATE";
            statusMsg.style.color = "#ff3366";
        }
        container.innerHTML = `
            <div class="step-card" style="border-color: var(--accent-red)">
                <div class="step-header" style="color: var(--accent-red)">
                    <span>INVALID CUBE STATE</span>
                </div>
                <p style="color: var(--text-muted)">${result.error}</p>
            </div>
        `;
        return;
    }

    if (statusMsg) {
        statusMsg.textContent = `SOLVED IN ${result.totalMoves} MOVES (CFOP)`;
        statusMsg.style.color = "#00e676";
    }

    let html = `
        <div class="step-card" style="border-color: var(--accent-green)">
            <div class="step-header">
                <span>CFOP SOLUTION SUMMARY</span>
                <span class="badge-sharp" style="color: var(--accent-green); border-color: var(--accent-green);">${result.totalMoves} MOVES TOTAL</span>
            </div>
            <div class="move-box">${result.allMoves.join(' ') || 'CUBE ALREADY SOLVED'}</div>
        </div>
    `;

    for (let step of result.steps) {
        html += `
            <div class="step-card">
                <div class="step-header">
                    <span>STEP: ${step.name.toUpperCase()}</span>
                    <span class="badge-sharp">${step.moveCount} MOVES</span>
                </div>
                <div class="move-box">${step.moves.join(' ') || '(0 Moves - Step complete)'}</div>
                ${step.note ? `<p style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">${step.note}</p>` : ''}
            </div>
        `;
    }

    container.innerHTML = html;
}

/**
 * Reset cube to solved
 */
function handleResetState() {
    currentCubeState = createSolvedCube();
    renderCubeNet();
    updateTextAreaFromState();
    update3DCubeState(currentCubeState);

    const container = document.getElementById('solutionOutput');
    if (container) {
        container.innerHTML = `
            <div class="step-card">
                <p style="color: var(--text-muted); font-family: var(--font-mono); font-size: 0.9rem;">
                    Cube reset to initial solved state.
                </p>
            </div>
        `;
    }

    const statusMsg = document.getElementById('statusMsg');
    if (statusMsg) {
        statusMsg.textContent = "SYSTEM READY";
        statusMsg.style.color = "#00e676";
    }
}

/**
 * Generate Scramble
 */
function handlePresetScramble() {
    currentCubeState = createSolvedCube();
    const scrambleMoves = ["R", "U", "R'", "F", "R", "U'", "R'", "U", "F'", "R", "U2", "R'", "D2", "L2", "F2"];
    applyAlgorithm(currentCubeState, scrambleMoves.join(' '));

    renderCubeNet();
    updateTextAreaFromState();
    update3DCubeState(currentCubeState);

    const statusMsg = document.getElementById('statusMsg');
    if (statusMsg) {
        statusMsg.textContent = "SCRAMBLE APPLIED";
        statusMsg.style.color = "#ffd600";
    }
}
