# PHARMORIS — Pharmaceutical Intelligence Dashboard

A production-ready, single-page intelligence dashboard for pharmaceutical supply chain monitoring. Built with modern, scalable web technologies representing a state-of-the-art SaaS interface.

## Live Preview

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000/dashboard
```

---

## Features

- **Responsive Design**: Flawless scaling from mobile to desktop wide-screens.
- **Dark/Light Mode**: Full theme-switching support utilizing Tailwind v4 variants.
- **Premium Micro-interactions**: GPU-accelerated hover states, live pulse indicators, and staggered component loading.
- **Real-time Data Simulation**: "Live" data table, mock API latency, and visually engaging CSV file export functionality.
- **Advanced Data Table**: Integrated TanStack Table for headless, deeply typed sorting, searching, and pagination logic.

---

## Tech Stack

| Technology | Role |
|---|---|
| **Next.js 16** | App Router, SSR setup |
| **TypeScript** | Strict typing across components & data models |
| **Tailwind CSS v4** | Utility-first styling with custom theme variables |
| **Recharts** | Interactive Area Chart with customized gradients and tooltips |
| **Framer Motion** | Entry animations, interactive hover states, layout animations |
| **TanStack Table v8** | Sortable, filterable, scalable headless data tables |
| **Lucide React** | Consistent SVG iconography |
| **next-themes** | Persistent dark/light mode toggle system |

---

## Key Components

1. **`Header`**: Sticky top navigation bar. Includes a responsive mobile hamburger menu and a dynamic theme switcher switch.
2. **`KpiCard`**: Animated metric cards with GPU-accelerated hover interactions and trend tracking. Features skeleton loading states.
3. **`Chart`**: Responsive AreaChart mapping Monthly savings, customized to match Light/Dark aesthetic tones.
4. **`DataTable`**: Core inventory component. Includes global search, custom pagination controls, live sorting, and CSV export functionality.

---

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# App runs at http://localhost:3000 and redirects to /dashboard.
```

---

## AI & Usage Disclosure

AI assistance (Antigravity) was used for guidance on structure, implementation ideas, and minor optimizations.

All core logic, component design, and final implementation decisions were developed and validated independently.

**Open-Source Libraries Used:**
- **Next.js 15/16**: Core framework.
- **TanStack Table (React Table)**: Headless table logic.
- **Recharts**: Data visualization.
- **Framer Motion**: Interactive animations.
- **Lucide React**: Icon system.
- **next-themes**: Theme management.
