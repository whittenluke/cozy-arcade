(function () {
  "use strict";

  const KEY_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  const TARGET_MIN = 50;
  const TARGET_MAX = 150;
  const TILT_MAX_DEG = 8;

  let category = null;
  let targetWeight = 0;
  let currentWeight = 0;
  let wordList = [];
  let validWords = new Set();
  let currentWord = "";
  let gameOver = false;

  const themeEl = document.getElementById("theme");
  const targetWeightEl = document.getElementById("target-weight");
  const wordsListEl = document.getElementById("words-list");
  const weightCounterEl = document.getElementById("weight-counter");
  const wordDisplayEl = document.getElementById("word-display");
  const wordWeightDisplayEl = document.getElementById("word-weight-display");
  const errorMessageEl = document.getElementById("error-message");
  const winMessageEl = document.getElementById("win-message");
  const scaleBeamEl = document.getElementById("scale-beam");
  const btnSubmit = document.getElementById("btn-submit");
  const keyboardEl = document.getElementById("keyboard");
  const rulesDialog = document.getElementById("rules-dialog");
  const btnRules = document.getElementById("btn-rules");
  const btnCloseRules = document.getElementById("btn-close-rules");

  function letterValue(ch) {
    const code = ch.toUpperCase().charCodeAt(0);
    if (code >= 65 && code <= 90) return code - 64;
    return 0;
  }

  function wordWeight(str) {
    return str.replace(/\s/g, "").split("").reduce((sum, c) => sum + letterValue(c), 0);
  }

  function initGame() {
    const categories = Object.keys(LETTERWEIGHT_DATA);
    category = categories[Math.floor(Math.random() * categories.length)];
    const words = LETTERWEIGHT_DATA[category];
    validWords = new Set(words);
    targetWeight = TARGET_MIN + Math.floor(Math.random() * (TARGET_MAX - TARGET_MIN + 1));
    currentWeight = 0;
    wordList = [];
    currentWord = "";
    gameOver = false;

    themeEl.textContent = category;
    targetWeightEl.textContent = String(targetWeight);
    updateWordsList();
    updateWeightCounter();
    updateScaleTilt();
    updateWordDisplay();
    updateWordWeightDisplay();
    clearError();
    winMessageEl.hidden = true;
    btnSubmit.disabled = false;
  }

  function removeWord(index) {
    if (index < 0 || index >= wordList.length) return;
    const w = wordWeight(wordList[index]);
    wordList.splice(index, 1);
    currentWeight -= w;
    if (gameOver && currentWeight !== targetWeight) {
      gameOver = false;
      winMessageEl.hidden = true;
      btnSubmit.disabled = false;
    }
    updateWordsList();
    updateWeightCounter();
    updateScaleTilt();
    clearError();
  }

  function updateWordsList() {
    wordsListEl.innerHTML = "";
    if (wordList.length === 0) {
      const empty = document.createElement("span");
      empty.className = "words-empty";
      empty.textContent = "—";
      wordsListEl.appendChild(empty);
      return;
    }
    wordList.forEach(function (w, i) {
      const wt = wordWeight(w);
      const wrap = document.createElement("span");
      wrap.className = "word-chip";
      const label = document.createElement("span");
      label.className = "word-chip-label";
      label.innerHTML = w + " <em>(" + wt + ")</em>";
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "chip-remove";
      removeBtn.setAttribute("aria-label", "Remove " + w);
      removeBtn.textContent = "×";
      removeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        removeWord(i);
      });
      wrap.appendChild(label);
      wrap.appendChild(removeBtn);
      wordsListEl.appendChild(wrap);
    });
  }

  function updateWeightCounter() {
    weightCounterEl.textContent = currentWeight + " / " + targetWeight;
  }

  function updateScaleTilt() {
    const diff = targetWeight - currentWeight;
    const deg = Math.max(-TILT_MAX_DEG, Math.min(TILT_MAX_DEG, diff * 0.12));
    scaleBeamEl.style.transform = "rotate(" + deg + "deg)";
  }

  function updateWordDisplay() {
    wordDisplayEl.textContent = currentWord || " ";
  }

  function updateWordWeightDisplay() {
    if (currentWord.length === 0) {
      wordWeightDisplayEl.textContent = "";
      return;
    }
    const w = wordWeight(currentWord);
    wordWeightDisplayEl.textContent = "= " + w;
  }

  function clearError() {
    errorMessageEl.textContent = "";
  }

  function setError(msg) {
    errorMessageEl.textContent = msg;
  }

  function checkWin() {
    if (currentWeight === targetWeight) {
      gameOver = true;
      winMessageEl.hidden = false;
      btnSubmit.disabled = true;
    }
  }

  function addLetter(letter) {
    if (gameOver) return;
    currentWord += letter.toUpperCase();
    updateWordDisplay();
    updateWordWeightDisplay();
    clearError();
  }

  function backspace() {
    if (gameOver) return;
    currentWord = currentWord.slice(0, -1);
    updateWordDisplay();
    updateWordWeightDisplay();
    clearError();
  }

  function submitWord() {
    if (gameOver) return;
    const normalized = currentWord.toLowerCase().replace(/\s/g, "");
    if (normalized.length === 0) {
      setError("Type a word first.");
      return;
    }
    if (!validWords.has(normalized)) {
      setError("That word isn't in this category.");
      return;
    }
    const w = wordWeight(normalized);
    wordList.push(normalized);
    currentWeight += w;
    currentWord = "";
    updateWordsList();
    updateWeightCounter();
    updateScaleTilt();
    updateWordDisplay();
    updateWordWeightDisplay();
    clearError();
    checkWin();
  }

  function buildKeyboard() {
    keyboardEl.innerHTML = "";
    KEY_ROWS.forEach(function (row) {
      const rowEl = document.createElement("div");
      rowEl.className = "keyboard-row";
      row.split("").forEach(function (letter) {
        const val = letterValue(letter);
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "keyboard-key";
        btn.setAttribute("data-letter", letter);
        btn.innerHTML = "<span class=\"key-letter\">" + letter + "</span><span class=\"key-value\">" + val + "</span>";
        btn.addEventListener("click", function () {
          addLetter(letter);
        });
        rowEl.appendChild(btn);
      });
      keyboardEl.appendChild(rowEl);
    });
    const backspaceRow = document.createElement("div");
    backspaceRow.className = "keyboard-row";
    const backspaceBtn = document.createElement("button");
    backspaceBtn.type = "button";
    backspaceBtn.className = "keyboard-key key-backspace";
    backspaceBtn.textContent = "⌫";
    backspaceBtn.setAttribute("aria-label", "Backspace");
    backspaceBtn.addEventListener("click", backspace);
    backspaceRow.appendChild(backspaceBtn);
    keyboardEl.appendChild(backspaceRow);
  }

  function init() {
    initGame();
    buildKeyboard();
    btnSubmit.addEventListener("click", submitWord);
    btnRules.addEventListener("click", function () {
      rulesDialog.showModal();
    });
    btnCloseRules.addEventListener("click", function () {
      rulesDialog.close();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
