# Immune System Adventure - Task Tracker

## Project Status: ✅ Complete (Full-Screen Redesign)

### Latest Changes (Session 6)
- **QuestionLayout integration** complete for all interactive scenes
- **App.jsx Refactor**: robust progress tracking and cleaner rendering
- **GameOverScreen**: Extracted and redesigned
- **PathwayChoice**: Updated to QuestionLayout

---

## Design System

### Dialogue Layout (Story)
```
┌─────────────┬─────────────────────────┬─────────────┐
│   IVAN      │       CONTENT           │   DOCTOR    │
│   (280px)   │       (flex)            │   (280px)   │
└─────────────┴─────────────────────────┴─────────────┘
```

### Question Layout (Interactive)
```
┌─────────────┬─────────────────────────┬─────────────┐
│  PROGRESS   │       CONTENT           │   VISUAL    │
│   (200px)   │       (flex)            │   (200px)   │
│   Lives/Act │   Game Mechanics        │   Kawaii    │
└─────────────┴─────────────────────────┴─────────────┘
```

###- [x] Create project structure
- [x] Implement core game engine (App.jsx)
- [x] Basic character avatars (Characters.jsx)
- [x] Components
    - [x] DialogueBox
    - [x] ChoicePanel
    - [x] RecruitPanel
    - [x] ActionScene
    - [x] PathwayChoice
    - [x] Victory/Finale Scenes
    - [x] OrderingPanel
    - [x] MatchingPanel
    - [x] FillBlankPanel
    - [x] TrueFalsePanel
    - [x] CategorySortPanel
    - [x] TimerPanel
    - [x] GameOverScreen
    - [x] ReadyScreen
    - [x] ShootingGame
    - [x] AnimationScene
    - [x] CertificateView
- [x] Data Layer
    - [x] Initial storyData.js structure
    - [x] Implement Act 1 (Ivan gets sick)
    - [x] Implement Cell-Mediated Path logic (Act 2)
    - [ ] Implement Humoral Path logic (Act 2)
- [x] Styling & Polish
    - [x] Tailwind setup
    - [x] Character animations/transitions
    - [x] Responsive layout

## Current Focus: Refinement & Validation
- [x] Update Act 1 to include specific "Raw Meat" scene and visual.
- [x] Implement "Ready for Battle" concept.
- [x] Implement "Shooting Game" minigame.
- [x] Implement "Certificate" generation.
- [x] Add Scientific/Live Diagram animations.
- [x] Dynamic Kawaii Character in QuestionLayout (shows speaker).
- [x] Remove Shooting Game "Target" Highlight.
- [ ] Test entire Cell-Mediated flow.
- [x] Polished Shooting Game (better visuals, crosshair, feedback).
- [x] Generated and integrated Raw Meat asset.

---

## Interaction Types

| Type | Description | Status |
|------|-------------|--------|
| choice | Multiple choice question | ✅ |
| timer | MCQ with countdown | ✅ |
| fill_blank | Type the answer | ✅ |
| true_false | True or False | ✅ |
| category_sort | Drag items to categories | ✅ |
| ordering | Reorder items | ✅ |
| matching | Match pairs | ✅ |
| recruit | Select characters | ✅ |
| action | QTE timing game | ✅ |
| finale | Shrinking circle timing | ✅ |

---

## Deployment

- **Domain**: bio-app.mashbyte.com
- **Host**: GitHub Pages via GitHub Actions
- **Base**: `/` (custom domain)
- **CNAME**: In `public/CNAME`

### To deploy:
```bash
git add .
git commit -m "Full-screen layout redesign"
git push
```

---

## Tech Stack
- React + Vite
- Tailwind CSS
- Framer Motion
- react-kawaii (cells, enemies)
- react-nice-avatar (humans)
- lucide-react (icons)
