# Letter Weight - Game Design Document

**Version:** 0.1  
**Date:** February 13, 2026  
**Designer:** [Your Name]  
**Site:** cozyarcade.games

---

## High-Level Concept

A word puzzle game about letter values and categorical thinking. Players build a list of words within a category to reach an exact target weight, where A=1, B=2... Z=26.

**Core Loop:**  
Pick category → See target weight → Type valid words → Balance to exact total → Win

---

## Theme & Categories

### The Role of Theme
The category serves multiple purposes:
1. **Constraint** - Limits the word space (can't just type "A" repeatedly)
2. **Discovery** - Players learn new words in familiar domains
3. **Personality** - Categories give each puzzle flavor and variety

### Category Selection Criteria
Good categories should:
- Have 20+ valid words minimum
- Include words of varying lengths (3-10 letters)
- Be culturally recognizable
- Offer a range of letter-value diversity

*Note: All categories are equal difficulty. Natural variation comes from player's familiarity with the domain and the random target weight.*

### Colour palette

Letter Weight uses its own palette (same as other Cozy Arcade word games). Define in `style.css` as CSS custom properties:

| Token | Hex | Use |
|-------|-----|-----|
| `--bg` | #F3F4F6 | Page background |
| `--text-primary` | #3E3A36 | Primary text |
| `--text-muted` | #6F8895 | Secondary text, labels |
| `--accent` | #C26D52 | Primary accent — links, buttons, highlights, focus |
| `--accent-secondary` | #6F8895 | Secondary accent |
| `--surface` | #FAFAF8 | Game surface — keys, panels, elevated UI |

### Category List (v1)

Random category selected on each reload. All categories treated equally.



### Target Weight Ranges
- **Easy:** 30-60 (achievable with 2-4 short words)
- **Medium:** 70-120 (requires 3-6 words, planning needed)
- **Hard:** 130-200 (long word lists, lots of backtracking)

### MVP Behavior (v1)
- Random category selected on page load/reload
- Random target weight generated (likely 50-150 range)
- Refresh page = new category + new target

### Future Ideas
- Daily challenge mode (same category + target for everyone)
- Leaderboard: fewest words used, fastest time
- "Par" system: Can you do it in X words or fewer?

---

## UI/UX Specification

### Layout
- **Top:** Category name (e.g., "TREES") and Target Weight (e.g., "50")
- **Middle:** Current word list with individual weights, running total
- **Bottom:** On-screen keyboard with letter values (A=1, B=2... Z=26)

### Typing Flow
1. Player clicks letters on keyboard
2. Word builds above keyboard as they type
3. Real-time weight calculation shows beside the forming word
4. Player hits SUBMIT when word is complete
5. If valid + in category: word added to list, total updates
6. If invalid: simple error message, word clears

### Win Condition
- Player hits exact target weight
- Simple win message appears
- No stats, no fanfare (MVP)

### Visual Feedback
- Running total displayed prominently (e.g., "27/50")
- Each submitted word shows in list with its weight
- Clear indication when over/under target

---

## Next Steps

- [ ] Finalize category list (10-15 categories for v1)
- [ ] Build word validation dictionary for each category
- [ ] Define UI layout and information hierarchy
- [ ] Determine word list interaction model
- [ ] Create wireframes
- [ ] Prototype core mechanic

---

## Notes & Ideas

- Consider letter value visualization (maybe hovering over a word shows the breakdown?)
- Sound design: satisfying "ding" when you hit exact target?
- Color coding: green when under target, red when over?
- Could have a "free play" mode vs "daily challenge" mode