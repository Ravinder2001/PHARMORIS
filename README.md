# PHARMORIS — Pharmaceutical Intelligence Dashboard

A production-quality, single-page intelligence dashboard for pharmaceutical supply chain monitoring. Built to demonstrate senior-level frontend engineering — clean architecture, strong design judgment, and performant interactions.

## Live Preview

```
npm run dev
# → http://localhost:3000/dashboard
```

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| **Next.js** | 15 (App Router) | Framework + SSR/routing |
| **TypeScript** | 5.x (strict) | Type safety throughout |
| **Tailwind CSS** | 4.x | Utility-first styling |
| **Recharts** | 2.x | Area chart with gradient |
| **Framer Motion** | 11.x | Entry/hover animations |
| **TanStack Table** | 8.x | Headless sortable table |
| **Lucide React** | latest | Icon system |

---

## Folder Structure

```
pharmoris/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Main dashboard composing all components
│   ├── globals.css           # Design tokens, scrollbar, focus styles
│   ├── layout.tsx            # Root layout — Inter font, metadata, dark bg
│   └── page.tsx              # Root redirect → /dashboard
├── components/
│   ├── Header.tsx            # Sticky nav with animated active pill
│   ├── KpiCard.tsx           # Animated KPI card with trend indicator
│   ├── Chart.tsx             # Recharts AreaChart with gradient fill
│   └── DataTable.tsx         # TanStack Table with sorting, badges, skeleton
├── lib/
│   ├── types.ts              # All shared TypeScript interfaces + types
│   └── data.ts               # Mock data — KPIs, drug rows, chart points
└── README.md
```

---

## Component Architecture

### `Header.tsx`
Sticky top bar with backdrop blur. Navigation state managed via `useState` prop-drilled from the dashboard page. Active tab uses a Framer Motion `layoutId` animated background pill — this is a Stripe-style pattern that feels smooth without JS-heavy transitions. Designed to swap easily to `next/link` routing for a multi-page app.

### `KpiCard.tsx`
Wrapped in `React.memo` to prevent re-renders when only unrelated state changes. Framer Motion stagger: each card delays by `index * 100ms` — gives a cascade entry that feels intentional, not simultaneous. Hover uses `whileHover={{ scale: 1.018 }}` — deliberately subtle, not flashy.

### `Chart.tsx`
`AreaChart` from Recharts inside a `ResponsiveContainer`. Key decisions:
- Gradient fill (`linearGradient`) rather than solid fill — maintains readability on dark backgrounds
- `type="monotone"` for smooth curve vs. linear segments
- Custom tooltip component — avoids Recharts' default styling which conflicts with the design system
- Wrapped in `React.memo` — chart doesn't receive props so never re-renders

### `DataTable.tsx`
Uses **TanStack Table v8** (headless) — full sorting with `getSortedRowModel`, `SortingState`. Column definitions built with `createColumnHelper` for full TypeScript inference. Key patterns:
- `useMemo` wraps the column definition to prevent recreation on each render
- `useCallback` wraps the date formatter
- `AnimatePresence` wraps the row list to animate sort transitions
- Skeleton loader is separate memoized component to avoid layout shift
- `min-w-[640px]` + `overflow-x-auto` wrapper ensures horizontal scroll on mobile

---

## Performance Decisions

1. **`React.memo`** on all components — `KpiCard`, `DataTable`, `Chart`, `StatusBadge`, `SkeletonRow` — prevents cascading re-renders when navigation state changes in the parent.

2. **`useMemo` for column definitions** — TanStack Table column definitions are expensive objects; recreating them on every render triggers full table rebuilds.

3. **`useCallback` for formatDate** — stable reference avoids unnecessary memoization busting in the table.

4. **No unnecessary `useEffect`** — data is static. The only `useEffect` is the loading timer simulation, which properly cleans up with `clearTimeout` on unmount.

5. **Next.js App Router** — server components where possible; `"use client"` only where interactivity is required.

6. **Font display swap** — `display: swap` on Inter prevents layout shift during font load.

---

## Animation Reasoning

All animations follow a single principle: **motion must convey meaning, not decoration**.

| Animation | Component | Purpose |
|---|---|---|
| Fade + slide up on mount | KpiCard, Chart, DataTable | Signals fresh data loading |
| Stagger delay (100ms per card) | KpiCard | Guides eye left-to-right across metrics |
| `layoutId` pill transition | Header nav | Communicates active selection change smoothly |
| `whileHover scale(1.018)` | KpiCard | Confirms interactivity without distraction |
| Row fade on sort | DataTable | Signals data has changed without jarring jump |
| Chart `animationDuration=1200` | Chart | Draws the trend line — tells the data story |

Deliberately avoided: parallax, rotation, color flash, bounce, pop, or any animation > 600ms except the chart draw.

---

## Design Decisions & Trade-offs

### Dark theme
Chosen because:
- Reduces eye fatigue for power users monitoring dashboards continuously
- High contrast ratios achievable with fewer colors
- Matches the "institutional trust" tone (Bloomberg, Linear, Vercel)

### Tab state vs. full routing
Navigation uses `useState` rather than `next/link` + separate routes. Trade-off: simpler for a single-page demo, but in production each tab would have its own route for deep-linking and browser back/forward support. Easy to swap — nav key maps 1:1 to route paths.

### TanStack Table vs. custom sort
TanStack Table is the industry standard for headless tables. Adds ~20KB but provides robust multi-column sort, virtualization-ready architecture, and TypeScript inference. Worth the bundle cost for a data-heavy dashboard.

### No heavy UI library
Deliberately avoided Material UI / Radix full suites. Using Tailwind + Lucide + targeted Framer Motion keeps the bundle lean and the design entirely bespoke.

### Mock data vs. API
All data in `lib/data.ts`. In production: replace with `useSWR` or React Query calls against a REST/GraphQL API. The 1.5s loading simulation demonstrates the skeleton state pattern that would be used with real async data.

---

## Accessibility

- Semantic HTML: `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`, `<table>` with proper roles
- `aria-label` on nav, sections, and table
- `aria-sort` on sortable column headers (updates to `ascending`/`descending`)
- `aria-current="page"` on active nav tab
- `:focus-visible` outline — keyboard navigation fully supported
- Color is never the **sole** indicator (badges have dot + text + ring)
- All icons marked `aria-hidden="true"` — they're decorative

---

## AI Usage Disclosure

This project was built with the assistance of **Antigravity (Google DeepMind)**, an AI coding assistant. All architectural decisions, component design patterns, naming conventions, and design system choices were intentionally directed and reviewed. The AI was used as a pair-programming tool — akin to using GitHub Copilot or a senior colleague — to accelerate implementation while maintaining full ownership of design judgment and engineering decisions.

---

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type check
npx tsc --noEmit

# Build for production
npm run build
```

App runs at `http://localhost:3000` and redirects to `/dashboard`.
