1. Project Overview
Title: Unsaid

Core Concept: A minimalist word deduction game where restraint creates meaning. Players reveal a hidden word by guessing correct letter-positions. Unlike Wordle, there are no "near-miss" (yellow) hints. Every incorrect letter guess depletes a finite pool of tokens.

2. Directory Structure
All files reside in games/unsaid/:

index.html: Entry point.

style.css: Custom game styling using the Deep Juniper (dark focus-mode) palette.

engine.js: Game logic and state management.

data.js: The dictionary of themes and words.

3. Visual Identity (Deep Juniper Palette)
Use the following CSS variables for all styling:

--bg: #2D3A3A; (Deep Juniper — primary background, dark focus-mode)

--text-primary: #EBF0F2; (Sky White — active text/input, inverse of Cozy Arcade bg)

--text-muted: #94A3A2; (Mist — labels e.g. theme name, recedes so words pop)

--frame-line: #455453; (Slate — borders for empty slots)

--reveal: #E28D77; (Warm Terracotta — correctly guessed letters)

4. Game Logic & Mechanics
State Management
TargetWord: String (4, 5, or 6 characters).

Tokens: Integer (Calculated as WordLength * 4).

DiscoveredIndices: Array of integers tracking which positions have been revealed.

The Guess Loop
Input: User submits a word of length N.

Validation:

Iterate through each letter index of the guess.

If Guess[index] === TargetWord[index] AND index is not already discovered:

Add index to DiscoveredIndices.

Update UI to display the letter in the slot using --reveal color.

If Guess[index] !== TargetWord[index] AND index is not already discovered:

Deduct 1 Token.

Win Condition: DiscoveredIndices.length === TargetWord.length.

Loss Condition: Tokens <= 0.

5. Data Structure (data.js)
The WORD_LIBRARY is a nested object:

JavaScript

const WORD_LIBRARY = {
    "THEME_NAME": {
        4: ["WORD", "WORD"],
        5: ["WORD", "WORD"],
        6: ["WORD", "WORD"]
    }
};
6. Functional Requirements for Cursor
Initialization: On load, pick a random Theme, then a random Length (4-6), then a random Word.

No Redundant Penalties: If a player has already discovered the letter at index 0, subsequent guesses for index 0 should not deduct tokens or trigger logic.

Input Handling: Automatically convert input to uppercase. Clear input field after every "Commit."

Tactile UI: * Empty slots should be simple bottom-borders (--frame-line).

Locked letters should transition in with a subtle opacity fade.

7. Tone & UX Constraints
Typography: Serif fonts (e.g., 'Times New Roman' or 'Georgia') to match the archival feel.

Feedback: Keep messages sparse. Instead of "You Win!", use "The word is said." Instead of "Game Over," use "Resources exhausted."