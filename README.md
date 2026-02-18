# 🔥 PlotBurn — AI-Powered Movie Roasts

PlotBurn is a full-stack web application that generates satirical, AI-powered roasts of movies. It scrapes the web for reviews, ratings, and audience sentiment, then uses LLMs to craft brutally honest — and hilarious — movie critiques.

**Live:** [plotburn.com](https://plotburn.com)

---

## Screenshots

> *Popular Right Now* — horizontally scrollable carousel of trending movies  
> *Latest Disasters* — infinite-scroll grid of the latest AI-generated roasts  
> *Roast Modal* — full breakdown with headline, plot, burn, score, streaming info & shareable caption

---

## Features

- 🎬 **Trending & Popular Movies** — Real-time data from TMDB (now playing, popular)
- 🤖 **AI-Generated Roasts** — Satirical critiques powered by Claude (Anthropic) & Grok (xAI)
- 🔍 **Search** — Filter movies by title or roast headline
- 📜 **Infinite Scroll** — Cursor-based pagination with Intersection Observer
- 🎯 **Roast Modal** — Detailed view with plot summary, the burn, tags, similar movies, score & streaming providers
- 📋 **Share** — One-click copy of a shareable roast caption
- 📱 **Fully Responsive** — Mobile-first design with back-button modal handling
- ⚡ **Animated UI** — Smooth transitions powered by Framer Motion

---

## Tech Stack

### Frontend (this repo)

| Technology | Purpose |
|---|---|
| **React 19** | UI library (SPA) |
| **TypeScript** | Static typing |
| **Vite** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion** | Animations & transitions |

### Backend (separate repos)

| Technology | Purpose |
|---|---|
| **Cloudflare Workers** | Serverless compute (2 microservices) |
| **Cloudflare D1** | Edge SQL database (SQLite) |
| **Cloudflare R2** | Object storage for structured logs |
| **Cloudflare KV** | Caching & rate limiting |
| **Cloudflare Queues** | Async movie processing pipeline with DLQ & retries |
| **Cron Triggers** | Scheduled daily roast generation |

### AI & External APIs

| Service | Use Case |
|---|---|
| **Anthropic Claude** | Satirical roast generation (with prompt caching) |
| **xAI Grok** | Structured data extraction from web search results |
| **TMDB API** | Movie metadata, credits, trending lists, streaming providers |
| **Brave Search API** | Web search for reviews, ratings & audience sentiment |

---

## Architecture

```
Cron Trigger (daily)
    │
    ▼
TMDB API ──▶ Cloudflare Queue ──▶ Brave Search ──▶ Grok (extraction)
                                                        │
                                                        ▼
                                                  Claude (roast)
                                                        │
                                                        ▼
                                                  D1 Database
                                                        │
                                                        ▼
                                              Roast Reader API
                                                        │
                                                        ▼
                                              React Frontend (this repo)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/avenka23/roast-reader-ui.git
cd roast-reader-ui
npm install
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_BASE_URL=<your-roast-reader-api-url>
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
src/
├── components/
│   ├── home/           # Hero, RoastGrid
│   ├── layout/         # Header, Footer
│   ├── roast/          # RoastCard, RoastModal, RoastTabs, SatireBadge
│   └── ui/             # EmptyState, ErrorState, Skeleton
├── config/             # API configuration
├── hooks/              # Custom hooks (useRoasts)
├── services/           # API service layer
├── types/              # TypeScript type definitions
├── App.tsx             # Main application
└── main.tsx            # Entry point
```

---

## License

This project is for personal/portfolio use.
