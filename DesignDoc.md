# CozyArcade Design Document

## Overview

CozyArcade is a web platform for browser-based games with a unique intergalactic aesthetic. The platform aims to provide a world-class product experience while maintaining simplicity and elegance in its design and functionality.

**Domain:** cozyarcade.games  
**Brand Name:** CozyArcade

## Vision Statement

CozyArcade creates a space where players can escape into beautifully crafted browser games within an intriguing cosmic environment. We prioritize quality over quantity, focusing on delivering a seamless, engaging experience that feels both familiar and fresh.

## Platform Architecture

### Repository Structure

- **Platform Repository (cozy-arcade)**

  - Main platform codebase (cozyarcade.games)
  - Game discovery and showcase
  - User authentication and profiles
  - High score tracking
  - Platform-wide styling and components

- **Game Repositories**
  - Each game has its own repository (e.g., cozy-ballerflow)
  - Games deploy to subdirectories of main domain
  - Games share Supabase instance for:
    - User authentication
    - Score tracking
    - Game state persistence

### Game Integration

- **Hosting Strategy**

  - Platform hosted on Netlify (cozyarcade.games)
  - Games deploy as subdirectories (e.g., cozyarcade.games/ballerflow)
  - Single Netlify site with multiple deploy contexts
  - Clean URLs and seamless navigation

- **Data Flow**
  - Games authenticate users via shared Supabase instance
  - Platform displays game metadata (title, description, thumbnails)
  - High scores and achievements sync to platform
  - User progress persists across sessions

## Technical Architecture

### Hosting & Infrastructure

- **Frontend Hosting:** Netlify (Free tier)
- **Backend Services:** Supabase (Free tier)
  - Authentication system
  - Game storage and metadata
  - User data management
  - Leaderboards
  - Basic analytics

### Tech Stack

- **Platform Frontend:**

  - React.js/Next.js
  - TailwindCSS for styling
  - Three.js for interactive backgrounds

- **Game Development:**

  - Independent tech stack per game
  - HTML5 + Canvas/WebGL recommended
  - Common frameworks: Phaser, PixiJS
  - Must integrate with Supabase for auth/data

- **Backend:**
  - Supabase for serverless functions
  - PostgreSQL database (via Supabase)

## Brand Standards & Design System

### Theme: Intergalactic Flow

The design aesthetic centers around an intergalactic, cosmic theme that creates a sense of wonder while maintaining a cozy, approachable feeling.

### Color Palette

**Primary Colors:**

- Deep Space Blue: `#0A0E1F`
- Cosmic Purple: `#4A1E9E`
- Nebula Pink: `#FF16B0`
- Star Glow: `#F8F7FF`

**Secondary Colors:**

- Asteroid Gray: `#2E3754`
- Aurora Green: `#26EDBB`
- Comet Teal: `#22A5B3`
- Galaxy Gold: `#FFD166`

### Typography

**Headings:** Exo 2 (Space-inspired, modern geometric)

```css
font-family: "Exo 2", sans-serif;
```

**Body Text:** Inter (Clean, highly readable)

```css
font-family: "Inter", sans-serif;
```

### UI Elements

**Buttons:**

- Slightly rounded corners (8px border-radius)
- Subtle glow effect on hover
- Gradient backgrounds using primary colors

**Cards/Containers:**

- Translucent backgrounds with blur effect
- Thin, glowing borders
- Subtle parallax effects when scrolling

**Iconography:**

- Line icons with rounded caps
- Consistent 2px stroke weight
- Animated on interaction

### Animation Guidelines

- Smooth transitions (300-500ms)
- Easing functions that mimic celestial movement
- Particle effects for loading states
- Subtle background animation (floating stars, nebula shifts)

### Brand Assets

**Logo:**

- Primary logo: Text "CozyArcade" with simplified galaxy swirl
- Icon-only version: Galaxy swirl for favicon and small applications
- Animation: Gentle pulsing glow effect on logo hover

**Mascot:**

- Optional space explorer character that guides new users

## User Experience

### Core User Flows

1. **Discovery Flow**
   - Homepage featuring curated game selection
   - Category-based browsing
   - Search functionality with visual results
2. **Game Experience Flow**
   - Seamless game loading with ambient background
   - Minimal UI during gameplay
   - Easy access to pause/settings
3. **Account Flow**
   - Single-click sign-up/login via Supabase Auth
   - Progressive profile building
   - Game progress syncing across devices

### Accessibility Guidelines

- WCAG 2.1 AA compliance minimum
- High contrast mode option
- Keyboard navigation support
- Screen reader friendly structure
- Focus states clearly visible

## Development Roadmap

### Phase 1: MVP (Months 1-2)

- [x] Domain registration and setup
- [x] Database schema design and documentation
- [ ] Basic branding elements finalized
- [x] Platform landing page deployed to Netlify
- [x] Supabase integration for authentication
  - [x] GitHub authentication enabled
  - [x] Database tables and policies configured
  - [x] Basic game management working
- [ ] Game showcase page structure
  - [ ] Game card design
  - [ ] Game embedding system
  - [ ] Score display
- [ ] First game repository setup
  - [ ] Basic game implementation
  - [ ] Platform integration testing
- [ ] Basic user profiles

**Milestone: Public Beta Launch**

### Phase 2: Core Experience (Months 3-4)

- [ ] Enhanced UI with cosmic design system
- [ ] Game categories and discovery features
- [ ] User game progress tracking
- [ ] Simple leaderboards
- [ ] Basic feedback system
- [ ] Responsive design optimization

**Milestone: Official Launch**

### Phase 3: Community Building (Months 5-7)

- [ ] User collections/favorites
- [ ] Game ratings and reviews
- [ ] Simple social features (friend lists, activity feed)
- [ ] Game recommendations
- [ ] Developer portal for game submissions

**Milestone: Community Edition**

### Phase 4: Expansion (Months 8-12)

- [ ] Premium game integration
- [ ] Enhanced analytics
- [ ] API for third-party developers
- [ ] Offline game support
- [ ] Mobile experience optimization
- [ ] Exploration of non-browser game integration

**Milestone: Platform Expansion**

## Game Selection Strategy

### Initial Focus

- Casual games with short play sessions
- Visually aligned with cosmic aesthetic
- Games that work well on multiple devices
- Mix of puzzle, adventure, and relaxing experiences

### Curation Guidelines

- High-quality graphics and sound
- Intuitive controls
- Cross-browser compatibility
- Loading time under 5 seconds
- Consistent with "cozy gaming" ethos

## Performance Metrics

### Technical KPIs

- Page load time < 2 seconds
- Time to interactive < 3 seconds
- Game loading time < 5 seconds
- 99.9% uptime

### User Experience KPIs

- Session duration > 10 minutes
- Return rate > 40%
- Game completion rate > 60%
- User satisfaction score > 4.5/5

## Content Strategy

### Game Descriptions

- Concise (50-100 words)
- Highlight unique features
- Include atmospheric elements
- Mention play time expectations

### Microcopy Guidelines

- Friendly and inviting tone
- Space-themed terminology (e.g., "Launching game" vs "Loading")
- Emphasis on discovery and exploration

## Potential Future Expansion

While maintaining our MVP focus, these areas have been identified for potential future growth:

1. **Mobile App Wrapper**

   - Progressive Web App initially
   - Native wrappers for iOS/Android later

2. **Creator Program**

   - Tools for indie developers
   - Revenue sharing model
   - Game jam hosting

3. **Premium Features**
   - Ad-free experience
   - Early access to new games
   - Exclusive cosmic themes

## Implementation Notes

### Security Considerations

- HTTPS enforcement
- Content Security Policy implementation
- Regular security audits
- Data minimization practice

### Analytics Implementation

- Privacy-focused analytics
- Heat mapping for UI optimization
- Funnel analysis for game discovery
- Retention tracking

### SEO Strategy

- Schema markup for games
- Optimized game category pages
- Developer spotlight content
- Gaming trend articles

## Conclusion

CozyArcade aims to create a unique space in browser-based gaming by combining elegant design, seamless performance, and carefully curated games. By focusing on our intergalactic aesthetic while maintaining simplicity, we'll create an experience that stands out in the crowded gaming market.

This document serves as a living guide that will evolve as the project develops, always keeping our core principles of quality, simplicity, and wonder at the forefront.

## Game Development Guide for Luke

### Repository and Deployment Structure

- Each game gets its own repository

  ```
  cozy-arcade/              # Main platform repo
    src/
      app/
        page.tsx           # Landing/showcase page
        games/            # Game listing and metadata

  cozy-ballerflow/         # Game repo (example)
    src/
      app/
        page.tsx          # Game entry point
      game/              # Game logic
      components/        # Game UI
  ```

### Deployment Strategy

1. **Repository Setup**

   - Create new repo for each game (e.g., `cozy-ballerflow`)
   - Use Next.js + TypeScript (consistent with platform)
   - Independent development and version control

2. **Netlify Configuration**

   - Use existing Netlify site (cozy-arcade)
   - Add deploy context for game repository
   - Configure build settings for subdirectory deployment
   - Example path: `cozyarcade.games/ballerflow`

3. **Environment Setup**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=same-as-platform
   NEXT_PUBLIC_SUPABASE_ANON_KEY=same-as-platform
   ```

### Supabase Integration

```typescript
// In your game's lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Use same Supabase instance as platform
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Example score saving
async function saveScore(score: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("game_scores").insert({
    game_id: "ballerflow",
    user_id: user.id,
    score: score,
  });
}
```

### Development Workflow

1. Start new game project:

   ```bash
   # Ask AI: "Help me create a new game repository"
   npx create-next-app cozy-ballerflow
   ```

2. Develop game independently:

   - Build and test locally
   - Use platform's Supabase for auth/data
   - Follow cosmic theme guidelines

3. Deploy:
   - Push to GitHub
   - Configure Netlify deploy settings
   - Game available at cozyarcade.games/game-name

### Integration Checklist

- [ ] Uses platform's Supabase instance
- [ ] Follows cosmic theme
- [ ] Handles authentication
- [ ] Saves scores properly
- [ ] Responsive design
- [ ] Fast loading (< 3s)
- [ ] Error handling
- [ ] Pause functionality

### Tech Stack Options

- Canvas API for simple 2D games
- Phaser.js for complex 2D games
- Three.js for 3D games
- React components for UI

### Testing Focus

- Cross-browser compatibility
- Responsive design
- Performance metrics
- Score saving reliability
- Authentication flow
- Error handling

Note: Each game is an independent project that deploys to the main platform's domain. Use the AI assistant in each game's project for specific implementation help.
