# Word Bridge - Game Design Document

## High-Level Concept

**Genre:** Solo Word Puzzle / Path-Building Game  
**Platform:** Web Browser (HTML/CSS/JavaScript)  
**Core Loop:** Build a continuous path of valid words from Start to Finish across a canyon grid

**Elevator Pitch:** Bridge a canyon by placing words like planks. Every letter must connect cleanly—no gibberish allowed. Race against your own best score to find the most efficient path.

---

## 1. Core Mechanics

### 1.1 The Board
- **Grid-based canyon** (recommend starting with 15×25 for Level 1)
- **Start Zone** on the left edge (3-5 cells marked)
- **Finish Zone** on the right edge (3-5 cells marked)
- Board can have obstacles/narrow passages in later levels

### 1.2 Game Pieces

**Standard Letter Tiles:**
- Single letters A-Z
- Drawn from a pool/hand (recommend 7-tile hand like Scrabble)
- Replenished after each word placement

**Letter Planks (Multi-letter blocks):**
- Common digraphs and suffixes: `ING`, `SH`, `CH`, `TH`, `QU`, `PH`, `EY`, `ED`, `ER`, `LY`
- Physical blocks that occupy multiple grid spaces
- Cannot be broken apart—must be placed as a unit
- Distributed randomly in player's available pieces (recommend 15-30% of available pieces)

### 1.3 Placement Rules

**The Connection Rule:**
- Every word must connect to at least one letter already on the board
- First word must touch the Start Zone
- Final word must touch the Finish Zone

**Direction:**
- Words can be placed Horizontally (left-to-right only) or Vertically (top-to-bottom only)

**The "Clean Touch" Rule (CRITICAL):**
- When placing a word, every letter that touches an existing letter must form a valid word
- Example: Placing `CAT` vertically where the `A` is adjacent to an existing `R`:
  - This creates `AR` horizontally—must be a valid word ✓
- Example: Placing `DOG` where the `O` touches an existing `X`:
  - This creates `OX` or `XO`—one must be valid, or placement is illegal ✗

**Plank Placement:**
- Planks count as a single "word placement" turn
- They occupy multiple consecutive grid spaces
- All letters in a plank are considered when checking Clean Touch rule
- Planks allow "leaping" over problem areas to find clean placement zones

### 1.4 Valid Words
- Use provided `scrabble_words.json` wordlist (CSW24 - 280,887 words)
- Case-insensitive matching
- No proper nouns, abbreviations (already filtered in Scrabble list)

---

## 2. Winning & Scoring

### 2.1 Win Condition
Place a word that touches any cell in the Finish Zone with all placement rules satisfied.

### 2.2 Scoring System (Recommend Star Rating)

**⭐ One Star:** Complete the level
**⭐⭐ Two Stars:** Complete in ≤ PAR words (set per level)
**⭐⭐⭐ Three Stars:** Complete in ≤ EXPERT PAR words (set per level)

**Alternate Scoring Ideas:**
- Track "Words Used" as primary metric (lower is better)
- Track "Total Letters Placed" / "Words Used" ratio (higher is better)
- Bonus points for using all letters in hand
- Bonus for using difficult letters (Q, X, Z)

### 2.3 Failure State
**Gridlock:** Player cannot make any legal move
- Display "No valid moves remaining!"
- Offer "Restart Level" button
- Could offer "Undo Last Word" as quality-of-life feature (decision: undo limit or unlimited?)

---

## 3. User Interface & Controls

### 3.1 Screen Layout

```
┌─────────────────────────────────────────┐
│  LEVEL 3      ⭐⭐☆   PAR: 8 words      │
│  Current: 5 words used                  │
├─────────────────────────────────────────┤
│                                         │
│   [START]                      [FINISH] │
│      █                              █   │
│      █  C A T                       █   │
│      █    O                         █   │
│      █    D                         █   │
│      █                              █   │
│                                         │
│          ← CANYON GRID →               │
│                                         │
├─────────────────────────────────────────┤
│  YOUR TILES:                            │
│  [A] [E] [T] [R] [ING] [S] [N]         │
│                                         │
│  [Clear] [Undo] [Hint?]                │
└─────────────────────────────────────────┘
```

### 3.2 Interaction Flow

**Placing a Word:**
1. Click starting grid cell
2. Choose direction (horizontal/vertical) via buttons or hotkeys
3. Click letters from hand to spell word
4. Click "Place Word" or press Enter
5. Game validates:
   - Is it a dictionary word?
   - Does it connect properly?
   - Does it satisfy Clean Touch rule?
6. If valid: word placed, tiles replenished, score updated
7. If invalid: show error message explaining why

**Visual Feedback:**
- Highlight valid placement zones (green)
- Highlight cells that would violate Clean Touch (red)
- Ghost preview of word before confirming
- Animate tiles sliding into place

### 3.3 Mobile Considerations
- Tap to select grid cell
- Tap letters from hand to build word
- Swipe to choose direction (or toggle button)
- Large touch targets (minimum 44×44px)

---

## 4. Progression & Level Design

### 4.1 Difficulty Curve

**Level 1-3: Tutorial**
- Wide open 15×25 canyon
- Generous plank distribution (30%)
- PAR set high to encourage experimentation
- Hint system explains Clean Touch rule

**Level 4-10: Learning**
- Introduce narrow passages (12×25, 10×30)
- Reduce plank distribution (20%)
- Tighter PAR requirements

**Level 11-20: Mastery**
- Complex layouts: branches, obstacles, islands
- Minimal planks (10-15%)
- Very tight PAR for 3-star rating
- "Canyon variants": vertical emphasis, diagonal paths

**Level 21+: Expert**
- Asymmetric/unusual shapes
- Letter restrictions (no vowels in hand for 3 turns)
- Time challenges (optional)

### 4.2 Level Elements

**Obstacles (optional for later levels):**
- Rocks: impassable cells
- Narrow bridges: force single-file word placement
- Split paths: choose your route wisely

**Special Zones (optional):**
- Bonus cells: if word passes through, get extra tiles/planks
- Restricted cells: only certain letters allowed

---

## 5. Technical Implementation

### 5.1 Core Data Structures

```javascript
// Game State
const gameState = {
  level: 1,
  grid: Array(25).fill(null).map(() => Array(15).fill(null)),
  startZone: [[0,6], [0,7], [0,8]], // [row, col] coordinates
  finishZone: [[24,6], [24,7], [24,8]],
  hand: ['A', 'E', 'T', 'R', 'ING', 'S', 'N'],
  wordsPlaced: 0,
  score: 0,
  par: 8,
  expertPar: 5
};

// Word List (loaded once)
let validWords = new Set(); // from scrabble_words.json

// Board Cell
const cell = {
  letter: 'A',
  isPlank: false,
  plankId: null, // if part of a plank, reference the plank
  wordId: 'word_1' // track which word placed this
};
```

### 5.2 Word Validation Logic

```javascript
function isValidPlacement(word, startRow, startCol, direction) {
  // 1. Check if word is in dictionary
  if (!validWords.has(word.toLowerCase())) return false;
  
  // 2. Check if path is clear on grid
  // 3. Check if word connects to existing letters (or start zone)
  // 4. Check Clean Touch rule for all perpendicular adjacencies
  // 5. Return true/false
}

function checkCleanTouch(row, col, letter) {
  // Check all 4 directions for adjacent letters
  // If letters exist, verify they form valid words
  // Return true only if all touches are clean
}
```

### 5.3 File Structure

```
/project-root
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── game.js (core game logic)
│   ├── board.js (grid rendering)
│   ├── validation.js (word checking)
│   └── ui.js (controls, animations)
├── data/
│   ├── scrabble_words.json (280k words)
│   └── levels.json (level definitions)
└── assets/
    ├── images/ (tiles, backgrounds)
    └── sounds/ (optional: place, error, win)
```

### 5.4 Dictionary Integration

```javascript
// Load dictionary on game start
async function loadDictionary() {
  const response = await fetch('data/scrabble_words.json');
  const words = await response.json();
  validWords = new Set(words);
  console.log(`Loaded ${validWords.size} valid words`);
}

// Fast lookup
function isValidWord(word) {
  return validWords.has(word.toLowerCase());
}
```

---

## 6. Polish & Juice

### 6.1 Visual Polish
- Smooth tile animations (slide into place, 200ms)
- Particle effects when word is successfully placed
- Board shakes/red flash on invalid placement
- Star pop-in animation on level complete

### 6.2 Audio (Optional)
- Soft "click" when selecting tiles
- Satisfying "thunk" when placing word
- Error sound (gentle, not harsh)
- Victory jingle on level complete
- Ambient canyon wind background?

### 6.3 Quality of Life
- Undo last word (recommend 1 undo per level)
- Hint system: "A valid word starting here is ____"
- Ghost/preview of word before placing
- Auto-save progress (localStorage)
- Keyboard shortcuts (WASD for direction, Enter to confirm)

---

## 7. Plank Distribution Details

### 7.1 Recommended Planks
**High Value (common, useful):**
- ING (verb forms)
- ED (past tense)
- ER (comparatives, agent nouns)
- LY (adverbs)

**Medium Value (situational):**
- SH, CH, TH (digraphs)
- QU (enables Q usage)
- PH (less common)

**Low Value (rare but powerful):**
- EY (plurals, adjectives)
- TION (if you want longer planks for hard levels)

### 7.2 Plank Generation Algorithm

```javascript
function generateHand(level) {
  const handSize = 7;
  const plankChance = Math.max(0.1, 0.3 - (level * 0.01)); // 30% → 10%
  const hand = [];
  
  for (let i = 0; i < handSize; i++) {
    if (Math.random() < plankChance) {
      hand.push(randomPlank()); // from plank list
    } else {
      hand.push(randomLetter()); // weighted by frequency
    }
  }
  return hand;
}
```

---

## 8. Future Expansion Ideas

### 8.1 Additional Modes
- **Daily Challenge:** Everyone gets same board, compete for best score
- **Time Attack:** Complete as fast as possible
- **Zen Mode:** No par, no pressure, just build
- **Endless Canyon:** Procedurally generated infinite levels

### 8.2 Advanced Mechanics
- **Wildcard Tiles:** Blank tile can be any letter
- **Power-Ups:** 
  - "Dynamite" - destroy a placed word to try again
  - "Bridge Builder" - get 3 extra planks
  - "Dictionary" - reveal if a word is valid before placing
- **Themed Levels:** Only food words, only 4-letter words, etc.

### 8.3 Social Features
- Share completion screenshot with star rating
- Leaderboard for speedruns
- Export/import custom levels

---

## 9. Open Questions / Design Decisions

**Question 1:** Should tiles be replenished after EACH word, or after every N words?
- **Recommendation:** After each word (feels more forgiving)

**Question 2:** Should there be a "Shuffle Hand" button?
- **Recommendation:** Yes, unlimited shuffles (doesn't affect strategy)

**Question 3:** How many undos should players get?
- **Option A:** 1 undo per level (forces careful play)
- **Option B:** Unlimited (more casual, less frustrating)
- **Recommendation:** Start with Option B, add Option A as "hard mode"

**Question 4:** Should the game show all possible valid placements?
- **Recommendation:** No for default mode (too easy), but add as "assist mode" toggle

**Question 5:** Minimum word length?
- **Recommendation:** 2 letters minimum (allows strategic small connectors)

---

## 10. Success Metrics

**For MVP:**
- ✅ Player can complete 3 levels without confusion
- ✅ Clean Touch rule is intuitive after tutorial
- ✅ Dictionary lookup is instant (<50ms)
- ✅ No game-breaking bugs in core placement logic

**For Polish:**
- ✅ Levels feel distinct and progressively harder
- ✅ Players understand why moves are invalid
- ✅ Game feels satisfying to play (animations, feedback)
- ✅ Mobile experience is smooth (if applicable)

**For Launch:**
- ✅ 20+ levels designed and playtested
- ✅ Star rating system encourages replay
- ✅ Players can complete game in 30-60 minutes
- ✅ Share functionality works

---

## Appendix A: Example Level JSON

```json
{
  "level": 1,
  "name": "First Steps",
  "par": 10,
  "expertPar": 6,
  "gridWidth": 15,
  "gridHeight": 25,
  "startZone": [[0, 6], [0, 7], [0, 8]],
  "finishZone": [[24, 6], [24, 7], [24, 8]],
  "obstacles": [],
  "plankChance": 0.3,
  "hint": "Try using ING to bridge long distances!"
}
```

## Appendix B: Sample Clean Touch Scenarios

**Scenario 1: Valid Placement**
```
Existing:  C A T
          
New:       D O G (placed vertically, 'D' below 'T')

Check: T-D forms "TD" - NOT a word! ❌ INVALID
```

**Scenario 2: Valid Placement**
```
Existing:  C A T

New:       A R E (placed vertically, 'A' below 'C')

Check: C-A forms "CA" - not a word
But wait, what if we consider the full vertical word "CARE"?
Decision: We need to check ALL perpendicular words formed.

Actually: We're placing "ARE", which shares 'A' with position below 'C'.
This creates vertical "CA..." which isn't complete.

REVISED RULE: Only check fully formed words (complete on both sides).
```

**Clearer Example:**
```
Grid:     _ F _
          _ O _
          S A T

Place "DOG" horizontally at row 2, starting at column 0:

D O G
_ F _
_ O _
S A T

Now check: Column 1 reads "O-O-A" → OOA? Not a word unless...
Actually column 1 reads just "O" "O" "A" separately.

FINAL RULE CLARIFICATION:
- Only check words formed where new letters connect to existing letters
- Must form complete words (not orphaned letters)
```

This needs playtesting to finalize exact rule interpretation!

---

## Appendix C: Tile Frequency Distribution

Use Scrabble letter distribution as baseline:

```javascript
const letterFrequency = {
  'E': 12, 'A': 9, 'I': 9, 'O': 8, 'N': 6, 'R': 6, 'T': 6,
  'L': 4, 'S': 4, 'U': 4, 'D': 4, 'G': 3, 'B': 2, 'C': 2,
  'M': 2, 'P': 2, 'F': 2, 'H': 2, 'V': 2, 'W': 2, 'Y': 2,
  'K': 1, 'J': 1, 'X': 1, 'Q': 1, 'Z': 1
};
```

---

## Version History
- **v1.0** (Current) - Initial game design document
- Playtesting feedback will drive v1.1 revisions
