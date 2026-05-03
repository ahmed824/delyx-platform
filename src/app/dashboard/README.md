# Dashboard — Overview & Flow

**Location:** [src/app/dashboard/page.tsx](src/app/dashboard/page.tsx#L1)

**Purpose**: The Dashboard page is the admin analytics overview. It aggregates KPI cards, revenue charts, small summary cards, growth area chart, and a category donut. The page is implemented as a composition of small, focused components to keep layout and data concerns separated.

**Pages / Tabs in this area**
- **Dashboard (main)** — Overview of KPIs, revenue chart, customer growth, sales-by-category. See [src/app/dashboard/page.tsx](src/app/dashboard/page.tsx#L1).
- **Tracking** — Live delivery map + order list (admin tracking). See [src/app/tracking/page.tsx](src/app/tracking/page.tsx#L1).
- **Orders / Other admin pages** — Implemented under `src/app` as separate routes (e.g., orders, settings). The dashboard acts as the primary landing for metrics.

**Key Components**
- **Layout**: `DashboardLayout` wraps pages with sidebar/topbar and layout chrome.
  - File: [src/components/dashboard/DashboardLayout.tsx](src/components/dashboard/DashboardLayout.tsx#L1)
- **KPI Card**: `KpiCard` displays a metric, trend and tone.
  - File: [src/components/dashboard/KpiCard.tsx](src/components/dashboard/KpiCard.tsx#L1)
- **Chart Wrapper**: `ChartWrapper` provides a titled card shell for charts.
  - File: [src/components/dashboard/ChartWrapper.tsx](src/components/dashboard/ChartWrapper.tsx#L1)
- **Card**: Generic card wrapper used across dashboard and tracking.
  - File: [src/components/dashboard/Card.tsx](src/components/dashboard/Card.tsx#L1)

**Data Flow**
- The dashboard page currently uses local/static arrays and inline values for charts (see arrays passed to bar/area charts in [src/app/dashboard/page.tsx](src/app/dashboard/page.tsx#L1)).
- To connect real data:
  - Replace static arrays with fetched results from an API or a server-side call.
  - Pass data into `KpiCard`, `ChartWrapper` children, and any charting components.

**How the Dashboard UI is composed (flow)**
1. `DashboardLayout` renders shell (sidebar + content area).
2. `page.tsx` renders top toolbar (`.dashboard-toolbar`) then `dashboard-grid`.
3. Inside the grid:
   - KPI grid (`.kpi-grid`) renders four `KpiCard` instances.
   - `ChartWrapper` with class `revenue-card` renders the bar chart markup.
   - Small `mini-card`s show quick counts.
   - `ChartWrapper` with class `growth-card` renders the customers growth area SVG.
   - `ChartWrapper` with class `donut-card` shows a static donut layout and legend.
4. Each visual block is purely presentational — chart data comes from the parent and is rendered inside the wrapper.

**Styling**
- Global styles live in `public/css/style.css` and contain dashboard-specific selectors like `.dashboard-grid`, `.kpi-grid`, `.bar-chart`, `.area-chart`, and `.donut-layout`.
- To tweak spacing/colors, update that CSS file.

**Run & Test**
- Install dependencies (if not done):

```bash
npm install
```

- Start development server:

```bash
npm run dev
```

- Open the dashboard at `http://localhost:3000/dashboard` (or the Next.js route that serves the dashboard page).

**Extending the Dashboard**
- Replace static arrays with a hook that fetches metrics from an API endpoint (e.g., `/api/metrics`).
- Extract chart shapes into standalone components and feed them props for reusability.
- For complex charts consider a charting library (Chart.js, Recharts, ApexCharts) and wrap it with `ChartWrapper`.

**Files of interest**
- Dashboard page: [src/app/dashboard/page.tsx](src/app/dashboard/page.tsx#L1)
- Dashboard layout: [src/components/dashboard/DashboardLayout.tsx](src/components/dashboard/DashboardLayout.tsx#L1)
- KPI card: [src/components/dashboard/KpiCard.tsx](src/components/dashboard/KpiCard.tsx#L1)
- Chart wrapper: [src/components/dashboard/ChartWrapper.tsx](src/components/dashboard/ChartWrapper.tsx#L1)
- Generic card: [src/components/dashboard/Card.tsx](src/components/dashboard/Card.tsx#L1)
- Styles: [public/css/style.css](public/css/style.css#L1)

**Developer notes & suggestions**
- Convert static charts to data-driven components and add prop types.
- Add loading/error states for async data.
- Consider server-side rendering or incremental static regeneration for metrics that don't change every second.
- Add unit/integration tests for layout and chart components.

---
If you want, I can:
- Replace the inline SVG area chart with a reusable `AreaChart` component.
- Wire the KPI cards to a mocked API endpoint and demonstrate fetching.
- Add a top-level `README` section in the repository root that links to this dashboard README.
