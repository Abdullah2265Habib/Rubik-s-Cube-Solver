# 🧩 Rubik's Cube Solver (CFOP Method)

A modern, web-based Rubik's Cube solver utilizing the **CFOP Method (Cross ➔ F2L ➔ OLL ➔ PLL)** with an interactive **2D Unfolded Net Editor** and a **Real-Time 3D Visualizer** powered by Three.js.

---

## ✨ Features

- **CFOP Solving Engine**:
  - **White Cross**: Deterministically solves the bottom white cross.
  - **First Two Layers (F2L)**: Solves all 4 bottom corner and middle edge slots.
  - **Orientation of Last Layer (OLL)**: Dynamically evaluates the top yellow layer using 2-Look OLL (Edge Orientation & Corner Orientation) and selects the correct algorithms with appropriate U-face alignments (AUF).
  - **Permutation of Last Layer (PLL)**: Evaluates the top layer permutation, matching it against the full 21 PLL algorithms (Aa, Ab, E, T, J, Y, R, F, V, N, G, U, H, Z) to find the correct algorithm and AUF alignment to solve the cube.
- **Real-Time 3D Visualizer**: A Three.js-powered interactive viewport that updates on-the-fly and animates the cube moves.
- **Interactive 2D Net Editor**: Click and paint colors directly onto a flat representation of the cube.
- **54-Character State Sync**: Raw text input/output string representation synchronized instantly with both the 2D Net and the 3D visualizer.

---

## 📂 Project Structure

```
├── css/
│   └── style.css            # Stylesheet for UI layout, dark theme, and buttons
├── js/
│   ├── core/
│   │   ├── cube.js          # Core cube state, validation, and solver verification
│   │   └── moves.js         # Core cube move operations (rotations, slices, wide moves)
│   ├── solver/
│   │   ├── cross.js         # White cross solver logic
│   │   ├── f2l.js           # First Two Layers (F2L) solver logic
│   │   ├── orientation.js   # OLL algorithms definition and triggers
│   │   ├── permutation.js   # PLL algorithms definition
│   │   └── cfopSolver.js    # CFOP coordination engine and OLL/PLL search engines
│   ├── view/
│   │   └── cube3d.js        # Three.js visualizer scene logic
│   └── app.js               # Main UI controller, event listeners, and net render
├── index.html               # Main application index file
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

No compilation or installation is necessary. Since this is a pure front-end web application:

1. Clone or download the repository.
2. Open `index.html` directly in any modern web browser.
3. *Alternative (Recommended)*: Serve it locally using a static file server to avoid CORS issues with local assets in some browsers:
   ```bash
   npx http-server -p 8080
   ```
   Then open `http://127.0.0.1:8080` in your browser.

---

## 🎮 How to Use

1. **Input State**:
   - **Click to Paint**: Click a color in the palette selector, then click any facelet on the 2D Net to paint it.
   - **Paste String**: Paste a 54-character state string (representing U, L, F, R, B, D facelets) into the textarea.
   - **Scramble**: Click the **SCRAMBLE** button to generate a random, valid state.
2. **Solve**:
   - Click the **SOLVE CFOP** button.
   - The solution breakdown will appear at the bottom of the page, showing the specific moves used for **White Cross**, **F2L**, **OLL**, and **PLL**.
   - Watch the Three.js 3D visualizer execute the moves in real time!