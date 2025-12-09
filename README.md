# Education Narrative Website

A modern, narrative-based educational website built with React, Vite, and Tailwind CSS.

## Tech Stack

- **React** - UI Library
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **AOS** - Scroll Animations
- **shadcn/ui** - UI Components (ready for installation)

## Project Structure

```
src/
├── components/     # UI Components
├── logic/          # Custom hooks and business logic
├── styles/         # Custom CSS styles
├── assets/         # Images, fonts, etc.
├── App.jsx         # Main application
└── main.jsx        # Entry point
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Installing shadcn/ui

To add shadcn/ui components:

```bash
npx shadcn@latest init
```

Then add components as needed:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
# ... etc
```

## Development

The project follows a modular structure:
- Place all React components in `src/components/`
- Put custom hooks and logic in `src/logic/`
- Add component-specific styles in `src/styles/`
