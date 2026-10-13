# 🎬 MovieExplorer

**🔗 Live Link:** https://globalmovieexplorer.netlify.app

A responsive Movie Explorer application built with React. Browse movies, search by title, and view detailed information in an interactive modal — powered by the free [TVMaze API](https://www.tvmaze.com/api).

## ✨ Features

### 1. Home Page
- **Navbar** — brand logo, Home / Movies links, prominent Explore button, mobile hamburger menu
- **Hero Banner** — background image + gradient, `DISCOVER MOVIES` heading, short description, `Explore Now →` CTA navigating to the Movie Listing Page
- **Top Rated strip** — top 4 shows by rating with reusable cards
- **Footer** — app name, © 2026 MovieExplorer, TVMaze API / GitHub links

### 2. Movie Listing Page
- **Search bar** — prominent, debounced live search by movie title
  - Empty query → `GET https://api.tvmaze.com/shows`
  - With query → `GET https://api.tvmaze.com/search/shows?q=:query`
- **Movie cards** (reusable `MovieCard` component)
  - Poster image (fallback 🎬 if missing)
  - Title, ⭐ rating, 📅 release year
  - `See Details` button
- **Responsive grid** — `grid-cols-1 → min-[480px]:2 → md:3 → lg:4`
- Loading skeletons, error + retry, empty (`No movies found`) states

### 3. Movie Details Modal
- Backdrop / large poster image
- Title, ⭐ rating | 📅 release date
- Overview / summary (HTML stripped)
- Genres, status, language, runtime, network, official site link
- Closable via ✕ button, ❌ Close button, backdrop click, and `Escape` key
- Mobile bottom-sheet style, scroll locked while open

### 📱 Responsive Design
| Device | Layout |
|---|---|
| Mobile (~360px) | Single column, stacked elements, hamburger menu, full-width CTA, 44px+ touch targets |
| Small (480px+) | 2-column card grid |
| Tablet (768px+) | 3-column grid |
| Desktop (1024px+) | 4-column grid, optimized spacing |

Global safeguards: `overflow-x: hidden`, `16px` search input (prevents iOS zoom), `100dvh`, safe-area padding in modal.

## 🛠️ Technology Stack
- **Core:** JavaScript, React 19, Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Data:** TVMaze API (no key required)
- **Lint:** ESLint

## 🌐 API Reference
| Purpose | Endpoint |
|---|---|
| All shows | `GET https://api.tvmaze.com/shows` |
| Search shows | `GET https://api.tvmaze.com/search/shows?q=girls` |
| Show details | `GET https://api.tvmaze.com/shows/:id` |

Search returns `[{ score, show }]` — normalized to `[show]` in `src/api/tvmaze.js`.

## 📁 Project Structure
```
src/
├── api/
│   └── tvmaze.js          # fetchAllShows, searchShows, fetchShowById + helpers
├── assets/
│   └── hero.png           # hero background
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Footer.jsx
│   ├── SearchBar.jsx
│   ├── MovieCard.jsx
│   └── MovieModal.jsx
├── pages/
│   ├── HomePage.jsx       # hero + featured
│   └── ListingPage.jsx    # search + grid + modal
├── App.jsx                # simple page routing (home | movies)
├── main.jsx
├── index.css              # tailwind + responsive base
└── App.css
```

## 🚀 Getting Started
```bash
# install dependencies
npm install

# run dev server
npm run dev

# lint
npm run lint

# production build
npm run build
```

Open the URL Vite prints (typically `http://localhost:5173`).

## ✅ Requirements Checklist
- [x] Navbar with logo, links, Movies button
- [x] Hero with background, title, description, CTA
- [x] Footer with name + copyright
- [x] Search by title, grid updates dynamically
- [x] Reusable card: poster, title, year, rating, See Details
- [x] CSS Grid responsive layout
- [x] Modal: backdrop, title, overview, rating, release, genre + extras
- [x] Modal closable via ✕ / Close / backdrop / Escape
- [x] Mobile single-column, desktop 3–4+ column grid
