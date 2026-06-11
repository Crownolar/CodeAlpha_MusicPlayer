# Noor — Quran Audio Player

> An ARCHKODE Project · Foundation first.

A mobile-first Quran audio player built with vanilla HTML, CSS, and JavaScript. No frameworks. No shortcuts. Just clean, intentional front-end craft.

Noor (نور) means *light* in Arabic — the name chosen deliberately. Built as part of the **CodeAlpha Frontend Development Internship**.

---

## Live Demo

[archkode-noor.vercel.app](https://archkode-noor.vercel.app)

---

## Screenshots

| Home Screen | Full Player |
|-------------|-------------|
| ![Home](./screenshots/home.png) | ![Dashboard](./screenshots/dashboard.png) |

---

## Features

### Home Screen
- **Top Picks carousel** — horizontally scrollable cards with album art, title, artist, and year
- **Recently Played** — scrollable row that persists across sessions via `localStorage`; updates automatically when a song is played
- **Now Playing bar** — mini-bar showing current song art, title, artist, and playback controls
- **Mini progress bar** — 2px red fill bar inside the Now Playing section tracking real-time playback position
- **Bottom navigation** — Listen, Library, Search, Profile tabs with active state
- **ARCHKODE wordmark** — branded header with Playfair Display + DM Mono typeface pairing

### Full Player (Dashboard)
- **Album art display** — full-width square art container
- **Song metadata** — title and artist rendered below the art
- **Seekable progress bar** — range input that reads and updates `currentTime` in real time
- **Time display** — elapsed time and remaining time (e.g. `1:23 / -2:44`)
- **Playback controls** — previous, play/pause, next
- **Volume control** — slider that adjusts `audio.volume` and persists to `localStorage`
- **Audio status indicator** — loading message shown during network fetch, auto-hides on ready
- **Back button** — returns to home via `history.back()`, falls back to `../index.html`

### Playback State
State is managed through `localStorage` as a single source of truth — surviving page navigation between the home screen and dashboard without losing position or context.

| Key | Purpose |
|-----|---------|
| `playlist` | Full array of song objects |
| `curInd` | Index of the currently selected song |
| `selectedSong` | The currently selected song object |
| `recentlyPlayed` | Up to 6 recently played songs |
| `resumeTime` | Playback position to restore on dashboard load |
| `wasPlaying` | Whether audio was playing when navigation occurred |
| `vol` | Last set volume level |

**Navigation behaviour:**
- Tapping a **card** → navigates to dashboard, starts from `0:00`, autoplays
- Tapping a **recently played** item → navigates to dashboard, starts from `0:00`, autoplays
- Tapping the **Now Playing bar** → navigates to dashboard, resumes from exact position, respects paused/playing state
- Using **forward/backward** on home → changes song in place, autoplays

---

## Known Limitations

These are noted honestly — an architect documents what isn't finished, not just what works.

| Feature | Status |
|---------|--------|
| Shuffle | UI only — does not randomise playback order yet |
| Repeat | UI only — does not loop current song or playlist yet |
| Like / heart | Visual toggle only — not persisted to `localStorage` yet |
| Library, Search, Profile tabs | UI only — screens not yet built |
| "See All" links | UI only — no expanded view yet |
| Home ↔ Dashboard audio sync | State syncs on navigation, not in real time |
| Autoplay policy | Mobile Safari may block autoplay without a prior user gesture — tap play once manually if needed |

---

## Folder Structure

```
CODEALPHA_MUSICPLAYER/
├── index.html                  # Home screen
├── README.md
├── css/
│   ├── style.css               # Home screen styles
│   └── mobileStyle.css         # Mobile-specific styles
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

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 — Flexbox, Custom Properties, Keyframe Animations |
| Logic | Vanilla JavaScript (ES6+) |
| Icons | Font Awesome 6.5.1 |
| Fonts | Playfair Display · DM Mono (Google Fonts) |
| State | `localStorage` |
| Audio | Web Audio API — `new Audio()` |

No frameworks. No build tools. No dependencies beyond CDN icon and font imports.

---

## Design System

Noor runs on the **ARCHKODE** brand token system — a consistent set of CSS variables shared across all ARCHKODE projects:

```css
:root {
  --ak-arch:  #f0ece4;  /* primary text — cream     */
  --ak-kode:  #c9a96e;  /* accent — gold            */
  --ak-bg:    #0a0a0a;  /* background — deep black  */
  --ak-muted: #7a7570;  /* secondary text — warm grey */
  --noor-red: #e11b3f;  /* Noor's signature accent  */
}
```

Noor's own identity lives in `--noor-red` — a deliberate separation. The ARCHKODE brand is the foundation; Noor is the project built on top of it.

**Palette:** Near-black layered backgrounds (`#0e0c0d` → `#161214` → `#1e181b`) create depth through layering rather than flat cards. The red accent is used sparingly — active states, the now-playing indicator, the progress thumb — so it carries weight every time it appears.

**Typography:** Playfair Display for display text and song titles (the craft). DM Mono for UI labels, timestamps, and navigation (the code).

---

## Audio Files Expected

Place these in `assets/audio/` and `assets/images/` respectively:

| Surah | Audio | Cover Art |
|-------|-------|-----------|
| Al-Fatiha | `Al-Fatiha.mp3` | `Al-Fatiha.png` |
| An-Nas | `An-Nas.mp3` | `An-Nas.png` |
| Al-Falaq | `Al-Falaq.mp3` | `Al-Falaq.png` |
| Al-Ikhlas | `Al-Ikhlas.mp3` | `Al-Ikhlas.png` |
| Al-Masad | `Al-Masad.mp3` | `Al-Masad.png` |
| An-Nasr | `An-Nasr.mp3` | `An-Nasr.png` |

Reciter: **Maher Al-Mu'aiqly**

---

## Getting Started

No installation or build step required.

```bash
# Clone the repository
git clone https://github.com/your-username/codealpha-musicplayer.git

# Open in browser
open index.html
```

Or open `index.html` directly in any modern browser.

> For deployment, serve over HTTPS. Some browsers restrict autoplay and `localStorage` on plain `file://` URLs.

---

## Keyboard & Interaction

| Action | Behaviour |
|--------|-----------|
| Tap card | Opens dashboard, plays from start |
| Tap Now Playing bar | Opens dashboard, resumes exact position |
| Swipe (dashboard) | Not yet implemented |
| Volume slider | Persists across sessions |

---

## Author

**Oriade Yusuf** · [ARCHKODE](https://archkode.dev)

Frontend Engineer · CodeAlpha Intern · Building with intention, not shortcuts.

---

*An ARCHKODE Project · Foundation first.*