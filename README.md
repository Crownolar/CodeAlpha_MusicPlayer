# Noor — Quran Audio Player

A mobile-first web music player built with vanilla HTML, CSS, and JavaScript. Designed around a dark editorial aesthetic with a red accent, Noor lets you browse, play, and track Quran recitations by Maher Al-Mu'aiqly across two screens: a home/browse screen and a full player dashboard.

---

## Project Structure

```
CODEALPHA_MUSICPLAYER/
├── index.html                  # Home screen (browse + now playing bar)
├── README.md
├── css/
│   ├── style.css               # Home screen styles
│   └── mobileStyle.css         # Additional mobile styles
├── js/
│   └── script.js               # Home screen logic
├── assets/
│   ├── audio/                  # Audio files (.mp3)
│   ├── images/                 # Album art (.png)
│   └── icons/                  # Icon assets
├── dashboard/
│   ├── index.html              # Full player screen
│   ├── css/
│   │   └── style.css           # Dashboard styles
│   ├── js/
│   │   └── script.js           # Dashboard logic
│   └── assets/                 # Dashboard-scoped assets
└── screenshots/                # Project screenshots
```

---

## Features

### Home Screen
- **Top Picks carousel** — horizontally scrollable cards with album art, title, artist, and year
- **Recently Played** — horizontally scrollable row that persists across sessions via `localStorage`; updates automatically when a song is played
- **Now Playing bar** — mini-bar at the bottom showing current song art, title, artist, and playback controls (previous, play/pause, next)
- **Mini progress bar** — a 2px red fill bar inside the Now Playing section that tracks real-time playback position
- **Bottom navigation** — Listen, Library, Search, Profile tabs (active state on Listen; other tabs are UI only)
- **ARCHKODE wordmark** — branded header with Playfair Display + DM Mono typeface pairing

### Dashboard (Full Player)
- **Album art display** — full-width square art container
- **Song metadata** — title and artist displayed below the art
- **Progress bar** — seekable range input that tracks and updates `currentTime` in real time
- **Time display** — shows elapsed time and remaining time (e.g. `1:23 / -2:44`)
- **Playback controls** — previous, play/pause, next
- **Volume slider** — adjusts `audio.volume`; persists value to `localStorage` across sessions
- **Audio status indicator** — "Loading audio…" message shown during network fetch, auto-hides on load
- **Back button** — returns to home screen via `history.back()` or falls back to `../index.html`

### Playback State (Single Source of Truth)
Playback state is managed entirely through `localStorage` so it survives page navigation:

| Key | Purpose |
|---|---|
| `playlist` | Full array of song objects |
| `curInd` | Index of the currently selected song |
| `selectedSong` | The currently selected song object |
| `recentlyPlayed` | Array of up to 6 recently played songs |
| `resumeTime` | Playback position to restore on dashboard load |
| `wasPlaying` | Whether audio was playing when navigation occurred |
| `vol` | Last set volume level |

**Navigation behaviour:**
- Tapping a **card** → navigates to dashboard, starts song from `0:00`, autoplays
- Tapping a **recently played** item → navigates to dashboard, starts from `0:00`, autoplays
- Tapping the **Now Playing bar** → navigates to dashboard, resumes from exact position, respects paused/playing state
- Using **forward/backward** on home → changes song in place, autoplays

---

## Known Limitations / Not Yet Working

| Feature | Status |
|---|---|
| Shuffle button | UI only — does not randomise playback order |
| Repeat button | UI only — does not loop current song or playlist |
| Like / heart button | Visual toggle only — not saved to `localStorage` |
| Library, Search, Profile nav tabs | UI only — no screens built for these yet |
| "See All" links | UI only — no expanded view |
| Home screen audio | The home `audio` object plays independently of the dashboard — state is synced only on navigation, not in real time |
| Autoplay policy | Some browsers (especially mobile Safari) block `audio.play()` on page load without a prior user gesture. If autoplay silently fails, the user must tap play once manually |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, flexbox, CSS animations) |
| Logic | Vanilla JavaScript (ES6+) |
| Icons | Font Awesome 6.5.1 |
| Fonts | Playfair Display, DM Mono (Google Fonts) |
| State | `localStorage` |
| Audio | Web Audio API (`new Audio()`) |

No frameworks. No build tools. No dependencies beyond the CDN icon and font imports.

---

## Setup

1. Clone or download the project
2. Place `.mp3` audio files in `assets/audio/` and `.png` cover art in `assets/images/`
3. File names must match the `audio` and `image` fields in `cardData` inside `js/script.js`
4. Open `index.html` in a browser — no server required for local use

> For production deployment, serve over HTTPS. Some browsers block autoplay and `localStorage` access on plain `file://` URLs.

---

## Audio Files Expected

| Title | Audio file | Image file |
|---|---|---|
| Al-Fatiha | `Al-Fatiha.mp3` | `Al-Fatiha.png` |
| An-Nas | `An-Nas.mp3` | `An-Nas.png` |
| Al-Falaq | `Al-Falaq.mp3` | `Al-Falaq.png` |
| Al-Ikhlas | `Al-Ikhlas.mp3` | `Al-Ikhlas.png` |
| Al-Masad | `Al-Masad.mp3` | `Al-Masad.png` |
| An-Nasr | `An-Nasr.mp3` | `An-Nasr.png` |

---

## Design

- **Palette:** Near-black layered backgrounds (`#0e0c0d` → `#161214` → `#1e181b`), single red accent `#e11b3f`, muted text `#9b8f93`
- **Theme:** Dark editorial — intentional depth through background layering rather than flat cards
- **Brand:** ARCHKODE wordmark in the header (Playfair Display + DM Mono), Noor as the product name

---

*Built by Abu-Khodijah · ARCHKODE Project*
