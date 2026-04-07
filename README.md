# popcorn

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![TMDB API](https://img.shields.io/badge/API-TMDB-01B4E4)

A modern, two-page movie app with a cinematic hero, fast search, movie details, and watched-list tracking.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Integration](#api-integration)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Core Files](#core-files)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Overview

`popcorn` is built with Next.js App Router and Tailwind CSS.

- `/` - Hero landing page with animated poster background
- `/search` - Search and rating workspace

## Features

- Dynamic hero section with animated background posters
- Responsive glassmorphism UI across mobile, tablet, and desktop
- Search movies by title
- View movie details: release date, runtime, genre, cast, director, rating
- Rate movies with custom star rating component
- Save watched movies in browser local storage
- Remove items from watched list

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- TMDB API (The Movie Database)

## API Integration

This project uses **TMDB v3**.

- Base URL: `https://api.themoviedb.org/3`
- Image CDN: `https://image.tmdb.org/t/p/w500`
- Search: `GET /search/movie`
- Details: `GET /movie/{id}?append_to_response=credits`

The API layer is implemented in `src/tmdb.js`.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run start
```

## Environment Variables

Create `.env.local` in the project root and set at least one credential:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN=your_tmdb_read_access_token
```

`NEXT_PUBLIC_TMDB_API_KEY` is recommended.

## Scripts

- `npm run dev` - Start local dev server
- `npm run build` - Create production build
- `npm run start` - Run production server
- `npm run lint` - Run Next.js linting

## Project Structure

```text
.
|-- next.config.js
|-- package.json
|-- postcss.config.js
|-- tailwind.config.js
|-- public/
|   |-- favicon.ico
|   |-- index.html
|   |-- logo192.png
|   |-- logo512.png
|   |-- manifest.json
|   `-- robots.txt
`-- src/
    |-- App.js
    |-- StarRating.js
    |-- index.css
    |-- index.js
    |-- tmdb.js
    |-- useKey.js
    |-- useLocalStorageState.js
    |-- useMovies.js
    `-- app/
        |-- globals.css
        |-- layout.js
        |-- page.js
        `-- search/
            `-- page.js
```

## Core Files

- `src/app/page.js` - Hero landing page (`/`)
- `src/app/search/page.js` - Search page route (`/search`)
- `src/App.js` - Main search + details + watched-list UI
- `src/tmdb.js` - TMDB fetch and response mapping
- `src/useMovies.js` - Query-based movie search hook
- `src/useLocalStorageState.js` - Persist watched list in local storage
- `src/StarRating.js` - Interactive star rating component
- `src/app/globals.css` - Theme, layout, and responsive styles

## Troubleshooting

- If `npm run dev` fails due to occupied port, Next.js automatically tries another port.
- If build cache issues appear, remove `.next` and rebuild:

```bash
rmdir /s /q .next
npm run build
```

## License

For personal and educational use. Add a license file if you plan to distribute publicly.
