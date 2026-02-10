let targetWord = "";
let tokens = 0;
let discoveredIndices = [];
let isGameOver = false;
let currentTheme = "";

function pickRandomTheme() {
  const themes = Object.keys(WORD_LIBRARY);
  const index = Math.floor(Math.random() * themes.length);
  return themes[index];
}

function pickRandomWordLength(theme) {
  const lengths = Object.keys(WORD_LIBRARY[theme]).map(Number).filter(len => WORD_LIBRARY[theme][len] && WORD_LIBRARY[theme][len].length > 0);
  const index = Math.floor(Math.random() * lengths.length);
  return lengths[index];
}

function pickRandomWord(theme, length) {
  const words = WORD_LIBRARY[theme][length];
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}

function renderSlots(length) {
  const slotsContainer = document.getElementById("slots");
  slotsContainer.innerHTML = "";
  for (let i = 0; i < length; i++) {
    const span = document.createElement("span");
    span.className = "slot";
    span.dataset.index = String(i);
    span.textContent = "";
    slotsContainer.appendChild(span);
  }
}

function updateTheme(theme) {
  const themeEl = document.getElementById("theme");
  if (theme) {
    const themeLower = theme.charAt(0) + theme.slice(1).toLowerCase();
    themeEl.textContent = themeLower;
  } else {
    themeEl.textContent = "";
  }
}

function updateTokens(tokens) {
  const tokensEl = document.getElementById("tokens");
  tokensEl.textContent = `${tokens}`;
}


function setStatus(message) {
  const statusEl = document.getElementById("status");
  statusEl.textContent = message || "";
}

function revealLetterAt(index) {
  const slotsContainer = document.getElementById("slots");
  const slot = slotsContainer.querySelector(`.slot[data-index="${index}"]`);
  if (!slot) return;
  slot.textContent = targetWord[index];
  slot.classList.add("revealed");
}

function handleSubmit(event) {
  event.preventDefault();
  if (isGameOver) {
    return;
  }

  const input = document.getElementById("guess-input");
  let guess = input.value.trim().toUpperCase();

  if (!guess) {
    return;
  }

  if (guess.length !== targetWord.length) {
    setStatus(`Use ${targetWord.length} letters.`);
    return;
  }

  const newlyDiscovered = [];

  for (let i = 0; i < targetWord.length; i++) {
    if (discoveredIndices.includes(i)) {
      continue;
    }

    if (guess[i] === targetWord[i]) {
      discoveredIndices.push(i);
      newlyDiscovered.push(i);
    } else {
      tokens -= 1;
    }
  }

  newlyDiscovered.forEach(revealLetterAt);
  updateTokens(tokens);

  if (discoveredIndices.length === targetWord.length) {
    isGameOver = true;
    setStatus("The word is said.");
    const slotsContainer = document.getElementById("slots");
    slotsContainer.classList.add("won");
  } else if (tokens <= 0) {
    isGameOver = true;
    setStatus("Resources exhausted.");
  } else {
    setStatus("");
  }

  input.value = "";
  input.focus();
}

function initGame() {
  currentTheme = pickRandomTheme();
  const length = pickRandomWordLength(currentTheme);
  targetWord = pickRandomWord(currentTheme, length).toUpperCase();

  tokens = length * 3;
  discoveredIndices = [];
  isGameOver = false;

  updateTheme(currentTheme);
  updateTokens(tokens);
  renderSlots(length);
  setStatus("");

  const slotsContainer = document.getElementById("slots");
  slotsContainer.classList.remove("won");

  const form = document.getElementById("guess-form");
  form.addEventListener("submit", handleSubmit);

  const input = document.getElementById("guess-input");
  input.value = "";
  input.focus();
}

window.addEventListener("DOMContentLoaded", initGame);
