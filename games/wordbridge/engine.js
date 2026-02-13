var ENGINE_BASE = (function () {
  var s = document.currentScript;
  if (s) return new URL(".", s.src).href;
  var h = window.location.href;
  return h.substring(0, h.lastIndexOf("/") + 1);
})();

let validWords = new Set();
let grid = [];
let hand = [];
let wordsPlaced = 0;
let gameOver = false;
let level = null;
let selectedCell = null;
let placementDirectionHorizontal = true;
let wordInProgress = [];
let handSelectionOrder = [];
let replaceMode = false;
let replaceRemaining = 0;

const LETTER_FREQUENCY = {
  E: 12, A: 9, I: 9, O: 8, N: 6, R: 6, T: 6,
  L: 4, S: 4, U: 4, D: 4, G: 3, B: 2, C: 2,
  M: 2, P: 2, F: 2, H: 2, V: 2, W: 2, Y: 2,
  K: 1, J: 1, X: 1, Q: 1, Z: 1
};

function getLetterPool() {
  const pool = [];
  for (const [letter, count] of Object.entries(LETTER_FREQUENCY)) {
    for (let i = 0; i < count; i++) pool.push(letter);
  }
  return pool;
}

const LETTER_POOL = getLetterPool();

const DIRS_4 = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function randomLetter() {
  return LETTER_POOL[Math.floor(Math.random() * LETTER_POOL.length)];
}

function randomPlank() {
  const list = level.planks || ["ING", "ED", "ER", "LY"];
  return list[Math.floor(Math.random() * list.length)];
}

function generateHand() {
  const size = level.handSize || 8;
  const plankChance = level.plankChance != null ? level.plankChance : 0.05;
  const out = [];
  for (let i = 0; i < size; i++) {
    if (level.planks && level.planks.length && Math.random() < plankChance) {
      out.push(randomPlank());
    } else {
      out.push(randomLetter());
    }
  }
  return out;
}

function generateTiles(count) {
  const plankChance = level.plankChance != null ? level.plankChance : 0.05;
  const out = [];
  for (let i = 0; i < count; i++) {
    if (level.planks && level.planks.length && Math.random() < plankChance) {
      out.push(randomPlank());
    } else {
      out.push(randomLetter());
    }
  }
  return out;
}

function generateOneTile() {
  const plankChance = level.plankChance != null ? level.plankChance : 0.05;
  if (level.planks && level.planks.length && Math.random() < plankChance) {
    return randomPlank();
  }
  return randomLetter();
}

function isValidWord(word) {
  return validWords.has(String(word).toLowerCase());
}

function inStartZone(r, c) {
  return level.startZone.some(([y, x]) => y === r && x === c);
}

function inFinishZone(r, c) {
  return level.finishZone.some(([y, x]) => y === r && x === c);
}

function getCell(r, c) {
  if (r < 0 || r >= level.gridHeight || c < 0 || c >= level.gridWidth) return null;
  return grid[r][c];
}

function hasExistingNeighbor(r, c, excludeR, excludeC) {
  for (const [dr, dc] of DIRS_4) {
    const nr = r + dr, nc = c + dc;
    if (nr === excludeR && nc === excludeC) continue;
    const cell = getCell(nr, nc);
    if (cell != null) return true;
  }
  return false;
}

function getRunVertical(r, c) {
  let top = r;
  while (top > 0 && getCell(top - 1, c) != null) top--;
  let bottom = r;
  while (bottom < level.gridHeight - 1 && getCell(bottom + 1, c) != null) bottom++;
  const letters = [];
  for (let row = top; row <= bottom; row++) letters.push(getCell(row, c));
  return letters.join("");
}

function getRunHorizontal(r, c) {
  let left = c;
  while (left > 0 && getCell(r, left - 1) != null) left--;
  let right = c;
  while (right < level.gridWidth - 1 && getCell(r, right + 1) != null) right++;
  const letters = [];
  for (let col = left; col <= right; col++) letters.push(getCell(r, col));
  return letters.join("");
}

function validatePlacement(word, startRow, startCol, horizontal) {
  let w = String(word).toUpperCase();
  if (!w.length) return { ok: false, reason: "Empty word." };

  let prefix = "";
  if (horizontal) {
    let c = startCol - 1;
    while (c >= 0 && getCell(startRow, c) != null) {
      prefix = getCell(startRow, c) + prefix;
      c--;
    }
  } else {
    let r = startRow - 1;
    while (r >= 0 && getCell(r, startCol) != null) {
      prefix = getCell(r, startCol) + prefix;
      r--;
    }
  }
  const existingStart = getCell(startRow, startCol);
  const wordPart = (existingStart != null ? existingStart : "") + w;
  if (prefix.length > 0) {
    if (horizontal) startCol -= prefix.length;
    else startRow -= prefix.length;
  }

  let suffix = "";
  const rows = level.gridHeight, cols = level.gridWidth;
  if (horizontal) {
    let c = startCol + prefix.length + wordPart.length;
    while (c < cols && getCell(startRow, c) != null) {
      suffix += getCell(startRow, c);
      c++;
    }
  } else {
    let r = startRow + prefix.length + wordPart.length;
    while (r < rows && getCell(r, startCol) != null) {
      suffix += getCell(r, startCol);
      r++;
    }
  }
  w = prefix + wordPart + suffix;
  if (!isValidWord(w)) return { ok: false, reason: "Not a valid word." };

  const len = w.length;
  let endRow = startRow, endCol = startCol;
  if (horizontal) endCol = startCol + len - 1;
  else endRow = startRow + len - 1;

  if (horizontal && (startCol < 0 || endCol >= cols))
    return { ok: false, reason: "Word goes off the board." };
  if (!horizontal && (startRow < 0 || endRow >= rows))
    return { ok: false, reason: "Word goes off the board." };

  const cellsToFill = [];
  const newPositions = [];
  for (let i = 0; i < len; i++) {
    const r = horizontal ? startRow : startRow + i;
    const c = horizontal ? startCol + i : startCol;
    const existing = getCell(r, c);
    if (existing != null) {
      if (existing !== w[i])
        return { ok: false, reason: "Path is blocked." };
    } else {
      newPositions.push(i);
    }
    cellsToFill.push({ r, c, letter: w[i] });
  }

  const isFirstWord = wordsPlaced === 0;
  let connected = false;
  for (const { r, c } of cellsToFill) {
    if (inStartZone(r, c)) { connected = true; break; }
    if (hasExistingNeighbor(r, c, -1, -1)) { connected = true; break; }
  }
  if (!connected) {
    if (isFirstWord)
      return { ok: false, reason: "First word must touch the start zone." };
    return { ok: false, reason: "Word must connect to existing letters or start." };
  }

  const cellsToFillSet = new Set(cellsToFill.map(({ r, c }) => r + "," + c));
  function touchesExisting(r, c) {
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (!cellsToFillSet.has(nr + "," + nc) && getCell(nr, nc) != null) return true;
    }
    return false;
  }

  for (const { r, c, letter } of cellsToFill) {
    grid[r][c] = letter;
  }

  const perpendicularRuns = [];
  for (const { r, c } of cellsToFill) {
    if (!touchesExisting(r, c)) continue;
    const run = horizontal ? getRunVertical(r, c) : getRunHorizontal(r, c);
    if (run.length > 1) perpendicularRuns.push(run);
  }

  for (const run of perpendicularRuns) {
    if (!isValidWord(run)) {
      for (const { r, c } of cellsToFill) grid[r][c] = null;
      return { ok: false, reason: "Adjacent letters must form valid words." };
    }
  }

  for (const { r, c } of cellsToFill) grid[r][c] = null;
  if (newPositions.length === 0)
    return { ok: false, reason: "Place at least one new letter." };
  return { ok: true, cells: cellsToFill, newPositions };
}

function applyPlacement(result) {
  const cells = result.cells;
  const newPositions = result.newPositions || [];
  for (const { r, c, letter } of cells) {
    grid[r][c] = letter;
  }
  wordsPlaced++;
  const numNew = newPositions.length;
  const indicesToRemove = handSelectionOrder.slice(0, numNew).sort((a, b) => b - a);
  for (const i of indicesToRemove) {
    hand.splice(i, 1);
  }
  hand = hand.concat(generateTiles(indicesToRemove.length));
  handSelectionOrder = [];
  wordInProgress = [];
  selectedCell = null;
  render();
}

function checkWin(lastCells) {
  for (const { r, c } of lastCells) {
    if (inFinishZone(r, c)) return true;
  }
  return false;
}

/** From (startRow, startCol) in direction, collect up to maxSlots empty cells (slot positions). */
function getSlotPositions(startRow, startCol, horizontal, maxSlots) {
  const slots = [];
  let r = startRow, c = startCol;
  const rows = level.gridHeight, cols = level.gridWidth;
  while (slots.length < maxSlots && r >= 0 && r < rows && c >= 0 && c < cols) {
    if (getCell(r, c) == null) slots.push({ r, c });
    if (horizontal) c++; else r++;
  }
  return slots;
}

/** Preview: one letter per cell; planks expand into consecutive cells. nextSlot = where next tile goes. */
function getPreviewCells() {
  if (!selectedCell) return { cells: [], nextSlot: null };
  const sr = selectedCell.r, sc = selectedCell.c;
  const totalLetters = wordInProgress.reduce((sum, tile) => sum + tile.length, 0);
  const slots = getSlotPositions(sr, sc, placementDirectionHorizontal, totalLetters + 1);
  const cells = [];
  let slotIndex = 0;
  for (const tile of wordInProgress) {
    for (const letter of tile) {
      if (slotIndex < slots.length) {
        cells.push({ r: slots[slotIndex].r, c: slots[slotIndex].c, letter });
        slotIndex++;
      }
    }
  }
  const nextSlot = slots[totalLetters] || null;
  return { cells, nextSlot };
}

function getPlacementWord() {
  if (!selectedCell || wordInProgress.length === 0) return "";
  let r = selectedCell.r, c = selectedCell.c;
  const rows = level.gridHeight, cols = level.gridWidth;
  let word = "";
  let i = 0;
  while (i < wordInProgress.length && r >= 0 && r < rows && c >= 0 && c < cols) {
    const existing = getCell(r, c);
    if (existing != null) {
      word += existing;
    } else {
      word += wordInProgress[i];
      i++;
    }
    if (placementDirectionHorizontal) c++; else r++;
  }
  return word;
}

function renderBoard() {
  const { cells: previewCells, nextSlot } = getPreviewCells();
  const previewMap = new Map(previewCells.map(({ r, c, letter }) => [r + "," + c, letter]));

  const board = document.getElementById("board");
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${level.gridWidth}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${level.gridHeight}, 1fr)`;

  for (let r = 0; r < level.gridHeight; r++) {
    for (let c = 0; c < level.gridWidth; c++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = String(r);
      cell.dataset.col = String(c);
      cell.setAttribute("role", "gridcell");

      if (inStartZone(r, c)) cell.classList.add("start");
      if (inFinishZone(r, c)) cell.classList.add("finish");
      const key = r + "," + c;
      const previewLetter = previewMap.get(key);
      if (previewLetter != null) {
        cell.textContent = previewLetter;
        cell.classList.add("preview");
      } else if (grid[r][c] != null) {
        cell.classList.add("filled");
        cell.textContent = grid[r][c];
      }
      if (nextSlot && nextSlot.r === r && nextSlot.c === c) {
        cell.classList.add("next-slot");
      }
      if (selectedCell && selectedCell.r === r && selectedCell.c === c) {
        cell.classList.add("selected");
      }

      cell.addEventListener("click", () => onCellClick(r, c));
      board.appendChild(cell);
    }
  }
}

function renderHand() {
  const container = document.getElementById("hand");
  container.innerHTML = "";
  hand.forEach((tile, i) => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "tile" + (tile.length > 1 ? " plank" : "");
    if (handSelectionOrder.includes(i)) el.classList.add("selected");
    el.textContent = tile;
    el.dataset.index = String(i);
    el.addEventListener("click", () => onTileClick(i));
    container.appendChild(el);
  });
}

function setMessage(text) {
  document.getElementById("message").textContent = text || "";
}

function setStatus(text) {
  document.getElementById("status").textContent = text || "";
}

function updateWordsUsed() {
  document.getElementById("words-used").textContent = "Words: " + wordsPlaced;
}

function updateReplaceUI() {
  const rack = document.querySelector(".tile-rack");
  const btn = document.getElementById("btn-replace");
  const labelEl = btn ? btn.querySelector(".replace-btn-label") : null;
  const countEl = document.getElementById("replace-count");
  if (!rack || !btn || !labelEl || !countEl) return;
  if (replaceMode) {
    rack.classList.add("replace-mode");
    labelEl.textContent = "Cancel";
    countEl.textContent = "";
    countEl.hidden = true;
    setMessage("Click a tile to replace it.");
  } else {
    rack.classList.remove("replace-mode");
    labelEl.textContent = "Replace";
    countEl.textContent = String(replaceRemaining);
    countEl.hidden = false;
  }
  btn.disabled = replaceRemaining === 0;
}

function render() {
  renderBoard();
  renderHand();
  updateWordsUsed();
  updateReplaceUI();
  setStatus(gameOver ? "Game over." : "");
}

function onCellClick(r, c) {
  if (gameOver) return;
  selectedCell = { r, c };
  wordInProgress = [];
  handSelectionOrder = [];
  setMessage("");
  render();
}

function onTileClick(index) {
  if (gameOver) return;
  if (replaceMode && replaceRemaining > 0) {
    replaceTileAt(index);
    return;
  }
  if (!selectedCell) return;
  const pos = handSelectionOrder.indexOf(index);
  if (pos !== -1) {
    handSelectionOrder.splice(pos, 1);
  } else {
    handSelectionOrder.push(index);
  }
  wordInProgress = handSelectionOrder.map(i => hand[i]);
  render();
}

function onPlace() {
  if (gameOver || !selectedCell) {
    setMessage("Select a cell first.");
    return;
  }
  const word = getPlacementWord();
  if (!word) {
    setMessage("Select tiles to spell a word.");
    return;
  }

  const result = validatePlacement(
    word,
    selectedCell.r,
    selectedCell.c,
    placementDirectionHorizontal
  );

  if (!result.ok) {
    setMessage(result.reason);
    return;
  }

  applyPlacement(result);

  if (checkWin(result.cells)) {
    gameOver = true;
    setMessage("You reached the finish! Bridge complete.");
    render();
    return;
  }
  setMessage("");
}

function onClear() {
  selectedCell = null;
  wordInProgress = [];
  handSelectionOrder = [];
  setMessage("");
  render();
}

function replaceTileAt(index) {
  hand[index] = generateOneTile();
  replaceRemaining--;
  if (replaceRemaining === 0) {
    replaceMode = false;
    setMessage("");
  }
  render();
}

function onReplaceClick() {
  if (replaceMode) {
    replaceMode = false;
    setMessage("");
  } else if (replaceRemaining > 0) {
    replaceMode = true;
  }
  render();
}

function onRestart() {
  initLevel();
  render();
}

function setDirection(horizontal) {
  placementDirectionHorizontal = horizontal;
  document.getElementById("dir-h").setAttribute("aria-pressed", horizontal ? "true" : "false");
  document.getElementById("dir-v").setAttribute("aria-pressed", horizontal ? "false" : "true");
  render();
}

function initLevel() {
  level = LEVEL_1;
  grid = Array(level.gridHeight).fill(null).map(() => Array(level.gridWidth).fill(null));
  hand = generateHand();
  wordsPlaced = 0;
  gameOver = false;
  selectedCell = null;
  wordInProgress = [];
  handSelectionOrder = [];
  replaceMode = false;
  replaceRemaining = (level.replacePerLevel != null && level.replacePerLevel >= 0) ? level.replacePerLevel : 3;
  setMessage("");
  setStatus("");
}

async function init() {
  const wordbankUrl = new URL("wordbank.json", ENGINE_BASE).href;
  const res = await fetch(wordbankUrl);
  const words = await res.json();
  validWords = new Set(words.map(w => String(w).toLowerCase()));

  initLevel();

  document.getElementById("btn-place").addEventListener("click", onPlace);
  document.getElementById("btn-clear").addEventListener("click", onClear);
  document.getElementById("btn-replace").addEventListener("click", onReplaceClick);
  document.getElementById("btn-restart").addEventListener("click", onRestart);

  document.getElementById("dir-h").addEventListener("click", () => setDirection(true));
  document.getElementById("dir-v").addEventListener("click", () => setDirection(false));

  render();
}

window.addEventListener("DOMContentLoaded", init);
