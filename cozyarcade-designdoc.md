Cozy Arcade — Website Design Doc (2026)

## 1. Purpose & Non-Goals

**Purpose**

Cozy Arcade exists to host and present small, calm, playable experiences on the web.

The website's job is to:
- Get out of the way of play
- Provide gentle context, not explanation
- Scale from 1 game to many without changing its nature

**Explicit Non-Goals**

The site is not:
- A platform, community, or service
- A growth funnel
- A content feed
- A personal brand site
- A monetization experiment (for now)

Avoiding these keeps the site psychologically lightweight.

## 2. Core Principles

These principles should constrain every decision.

**1. Calm over clever**

If something draws attention to itself, it must earn that attention.

**2. Frictionless entry**

No accounts. No popups. No onboarding. No modal instructions.

**3. Durability**

The site should feel fine:
- Today and in three years
- On a slow laptop
- On a phone with poor reception

**4. Games are primary**

The site exists to serve the games, not the other way around.

**5. Paperback book layout**

Use a single `<main>` container for all content. Apply `max-width: 600px;` and `margin: 0 auto;` to reinforce the "paperback book" feel. Ensure padding is responsive (more breathing room on desktop, snug but clear on mobile).

## 3. Information Architecture

**Top-level pages (keep it small)**

- `/` (Home)
- `/games/{game-name}/`
- `/about`
- `/games/` (optional directory page)

**Home page (`/`)**

The home page is a quiet gallery.

Content:
- Site title
- One-sentence description
- A short list of games (3–7 items max)
- Subtle footer

No hero sections. No feature lists.

Example structure:

```
Cozy Arcade
"Small calm games you can play in the browser."

[Game list]

[Footer: about link, maybe a note]
```

## 4. Visual Design System

**Color**

Recommended scheme:
- Background: `#EBF0F2` (Sky Base — pale, cool fog)
- Text: `#3E4A59` (Deep Slate Blue)
- Muted Highlight: `#A3B5C0` (Glacial Blue)
- Human Touch: `#D9A294` (Muted Terracotta/Clay)

Design justification:
- Sky Base is forgiving — scales from 1 game to 20 without feeling cluttered
- Terracotta accent used sparingly (e.g., "About" link) adds human warmth
- Glacial Blue for subtle background shifts to define game areas without hard lines
- Cool palette stays calm; warm accent prevents coldness

**Typography**

Primary font: IBM Plex Serif
- Game titles: Semi-Bold
- Descriptions and body text: Regular with generous line-height (1.7)
- Base size: 16–18px

Fallback stack: Georgia, serif

Typography should disappear.

**Layout**

- Single-column by default
- Wide margins
- Maximum width constraint (600–900px)

Avoid:
- Grids
- Cards unless necessary
- Drop shadows
- Visual separators unless subtle

## 5. Interaction Design

**Navigation**

- Minimal
- Text links only
- No hamburger menus unless necessary on mobile

Typical nav: Home, About. Games are accessed via the home page list.

**Transitions**

- Subtle fade or none at all
- No sliding panels
- No parallax
- No scroll hijacking

If an animation is noticeable, it's probably too much.

## 6. Game Listing Pattern

Each game listing should feel like an invitation, not a pitch.

Elements per game:
- Title
- One-line description
- Status (optional: "playable," "prototype," "coming soon")

No thumbnails required initially.

Example:

```
Gentle Flow
A slow, continuous motion puzzle about guiding shapes.
```

Clicking the title goes directly into the game.

## 7. Game Page Contract

Every game page should follow the same implicit contract.

**Required:**
- Game loads quickly
- No ads
- No popups
- No overlays unless essential

**Implementation:**
Games should be embedded via an `<iframe>` or a `<canvas>` element. The parent page must remain static; the game should not "take over" the browser's scroll or navigation unless in fullscreen mode.

**Optional:**
- A single line of text above or below the game
- A subtle "back" link

**Avoid:**
- Instructions longer than one sentence
- Settings panels unless needed
- Explaining mechanics before play

Let the game teach itself.

## 8. About Page

The About page should be short and human.

**Purpose:**
- Explain intent
- Set expectations
- Reduce pressure

**Recommended content:**
- Why Cozy Arcade exists
- What kind of games live here
- What it is not trying to be

**Avoid:**
- Personal biography
- Roadmaps
- Promises
- Calls to action

This page exists to lower expectations, not raise them.

## 9. Technical Constraints (Deliberate)

**Stack**

- Plain HTML, CSS, JS
- No frameworks required
- No build step required

**Performance**

- Fast on first load
- Minimal JS on non-game pages
- No third-party scripts by default

Analytics, if ever added, must be invisible and optional.

## 10. Accessibility (Baseline)

Baseline expectations:
- Semantic HTML
- Keyboard navigation works
- No flashing
- No autoplay sound

Canvas games will have limits; the site itself should not add barriers.

## 11. Future-Proofing Without Overbuilding

**Things you can add later without regret:**
- More games
- A `/games/` index page
- Tags or categories
- Simple save states per game

**Things to avoid designing for now:**
- Accounts
- Comments
- Ratings
- Social features
- Monetization

## 12. CSS Variables & Color Implementation

All colors, spacing, and typography must use these CSS variables:

```css
:root {
  --bg-color: #EBF0F2;        /* Sky Base */
  --text-primary: #3E4A59;    /* Deep Slate */
  --text-muted: #70757A;      /* For descriptions */
  --accent: #D9A294;          /* Terracotta */
  --subtle-ui: #A3B5C0;       /* Glacial Blue */
  --font-main: 'IBM Plex Serif', Georgia, serif;
}
```

**Variable Enforcement:**
- No hard-coded hex codes in CSS body
- All colors must reference variables
- All fonts must use `--font-main`

## 13. Technical Implementation & Guardrails

**The "Sovereign Game" Architecture**

The Gallery vs. The Art:
- The root `style.css` and `index.html` are the "Gallery"
- They must never contain code specific to an individual game
- Each game lives in its own subdirectory (e.g., `/games/game-name/`)
- Each game is an independent unit with its own HTML/JS/CSS
- Games are displayed via clean `<iframe>` or `<canvas>` embedding

**CSS Implementation Rules**

- **Tag-First Rule:** Style HTML tags directly (`h1`, `p`, `main`) rather than creating classes. Only use classes when absolutely necessary for unique components.
- **No Frameworks:** Never use Tailwind, Bootstrap, or any utility-class library.
- **Line Limit:** Keep global `style.css` under 200 lines. If it exceeds this, the design is becoming too "clever."

**The "Never" List (Strict Prohibitions)**

- Never use external CDNs for fonts or libraries. Everything must be local.
- Never use "Scroll Hijacking" or smooth-scrolling scripts.
- Never use "Hero" sections or modern marketing "Gradients."
- Never add "Social Sharing" buttons, "Like" counts, or "Comment" sections.
- Never use icon libraries (FontAwesome, etc.). If an icon is needed, use a single, locally-hosted SVG.

**The "Always" List (Mandatory Practices)**

- Always use semantic HTML (`<main>`, `<article>`, `<nav>`, `<footer>`).
- Always prioritize loading speed. The home page should be near-instant.
- Always use a single-column layout with a `max-width` between `600px` and `800px`.
- Always include a subtle "fade-in" animation (0.5s) on the body to signal a calm transition.

**Folder Structure Requirement**

```
├── /assets/          (SVG icons and site-wide images)
├── /fonts/           (IBM Plex Serif woff2 files)
├── /games/           (One folder per game)
├── index.html        (The Gallery / Home)
├── about.html        (The Human element)
└── style.css         (The only global stylesheet)
```

## 14. Font Asset Management (Local Hosting)

To maintain the "Durability" and "No Third-Party" rules, fonts must be served from the local `/fonts/` directory.

**Acquisition:**
- Download `IBM-Plex-Serif-Regular.woff2` and `IBM-Plex-Serif-SemiBold.woff2` files

**Implementation:**
- Use the `@font-face` CSS rule to map these files to the `--font-main` variable

**Preloading:**
- Add a `<link rel="preload">` tag in the `<head>` of `index.html` for the "Regular" weight to prevent any "flash of unstyled text" (FOUT)

## 15. Definition of "Done" for the Website

The site is "done" when:
- It hosts one playable game
- It feels calm to load and browse
- Nothing asks the user for anything
- You don't feel pressure to improve it immediately