export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

export interface KpiData {
  id: string;
  label: string;
  value: string;
  icon: string;
  trend: number; // percentage change, positive = up, negative = down
  trendLabel: string;
}

export interface DrugRow {
  id: string;
  name: string;
  manufacturer: string;
  stockStatus: StockStatus;
  priceChange: number; // percentage, e.g. 2.4 = +2.4%, -1.8 = -1.8%
  lastUpdated: string; // ISO date string
}

export interface ChartDataPoint {
  month: string;
  savings: number; // in thousands GBP
}

export type NavItem = {
  label: string;
  key: string;
};

export type SortConfig = {
  key: keyof DrugRow | null;
  direction: "asc" | "desc";
};
