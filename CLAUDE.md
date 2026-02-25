# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Start development server at localhost:3000
npm run build   # Production build
npm start       # Start production server
npm run lint    # Run ESLint
```

## Environment Variables

- `NEXT_PUBLIC_GEO_API_KEY` — Required for Geoapify geocoding/routing (autocomplete search and directions)

## Architecture

This is a **Next.js 15 / React 19 / TypeScript** campus navigation kiosk for Virginia Tech, displayed on public information screens. Tailwind CSS 4 handles styling.

### Page Flow

The entry point (`src/app/page.tsx`) renders `CarouselView`, which auto-rotates between:
1. **Map view** (`mapPage.tsx`) — shown for 100 seconds
2. **KioskDemoView01–04** — shown for 50 seconds each

`mapPage.tsx` is the main application shell. It manages a multi-tab UI (Map, Events, Alerts, Preferences) and polls `/realTimeData/*.json` every 30 seconds for live data.

### Key Components

| File | Role |
|------|------|
| `src/app/page.tsx` | Entry point — renders CarouselView |
| `src/app/components/CarouselView.tsx` | Timer-driven carousel controller |
| `src/app/mapPage.tsx` | Main UI: tabs, state, data polling |
| `src/app/components/MapComponent.tsx` | MapLibre GL map with routing, markers, autocomplete |
| `src/app/components/MapLegend.tsx` | Legend overlay for the map |
| `src/app/components/NearbyFooter.tsx` | Footer showing nearby locations |
| `src/app/components/KioskDemoView0[1-4].tsx` | Static demo image slides |
| `public/realTimeData/events.json` | Campus events data (polled live) |
| `public/realTimeData/closures.json` | Campus alerts/closures data (polled live) |
| `public/realTimeData/*.py` | Python scripts for scraping/updating the JSON files (not part of build) |

### Data Models

```typescript
interface Event {
  Title: string;
  Date: string; // e.g. "Monday, December 8 at 10:00AM EST"
  Location: string;
}

interface Closures {
  id: number;
  name: string;
  type: string;
  details: {
    "Closure Start Date": string;
    "Closure End Date": string;
    COMMENTS: string;
    "More Information": string;
  }
}
```

### Map Details

- Library: **MapLibre GL** with `@maplibre/maplibre-gl-directions`
- Campus center: `37.22610350373415, -80.42224010371321` (Drillfield)
- Blacksburg bounding box: lat `[37.15, 37.3]`, lng `[-80.5, -80.35]`
- Autocomplete uses Geoapify API biased to the Blacksburg area

### Styling Conventions

- All components use `"use client"` directive
- Primary brand color: `#6B1F3D` (VT maroon)
- Tailwind utility classes throughout; custom theme variables in `src/app/globals.css`
- `framer-motion` used for page/tab transition animations

### Categorization Logic

`mapPage.tsx` auto-categorizes incoming JSON data by scanning text for keywords:
- **Events** → Academics, Sports, Arts, Career, Social, General
- **Alerts** → Weather, Transport, Facilities; urgency levels: critical / warning / info
