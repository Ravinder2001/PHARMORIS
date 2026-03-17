# PHARMORIS — Pharmaceutical Intelligence Dashboard

This project is a single-page dashboard designed for monitoring pharmaceutical supply chain data. The goal was to build something that feels close to a real SaaS product — clean, responsive, and focused on data clarity rather than visual noise.

---

## Live Preview

```bash
npm install
npm run dev
# http://localhost:3000/dashboard
```

---

## Overview

The dashboard includes key metrics, a data table, and a chart to represent insights in a clear and structured way. While the data is mocked, the UI and interactions are built keeping real-world usage in mind.

---

## Features

- Responsive layout (mobile → large screens)
- Light / Dark mode support
- KPI cards with subtle animations
- Data table with sorting, search, and pagination
- Chart showing cost savings over time
- CSV export functionality
- Basic loading (skeleton) states

---

## Tech Stack

- **Next.js (App Router)** – for structure and routing  
- **TypeScript** – for type safety  
- **Tailwind CSS** – for styling and layout  
- **Recharts** – for chart visualization  
- **Framer Motion** – for animations  
- **TanStack Table** – for table logic (sorting, filtering, pagination)  
- **next-themes** – for dark/light mode  
- **Lucide React** – for icons  

---

## Project Structure

```
/app/dashboard/page.tsx  
/components  
  Header.tsx  
  KpiCard.tsx  
  DataTable.tsx  
  Chart.tsx  
/lib  
  data.ts  
  types.ts  
```

The project is structured to keep components reusable and maintainable. Data and types are separated to avoid clutter and improve scalability.

---

## Key Implementation Notes

- The table is built using TanStack Table to separate logic from UI.
- Components are kept modular to avoid unnecessary complexity.
- Basic memoization is used where needed to prevent unnecessary re-renders.
- The UI focuses on spacing, readability, and consistency rather than heavy styling.
- Animations are intentionally minimal to avoid distraction.

---

## Running Locally

```bash
npm install
npm run dev
```

---

## AI Usage Disclosure

AI tools (Antigravity) were used for guidance and general implementation support.

All major decisions, component structure, and final implementation were reviewed and adjusted manually.

**Open-Source Libraries Used:**
- **Next.js 15/16**: Core framework.
- **TanStack Table (React Table)**: Headless table logic.
- **Recharts**: Data visualization.
- **Framer Motion**: Interactive animations.
- **Lucide React**: Icon system.
- **next-themes**: Theme management.
