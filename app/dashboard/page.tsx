"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import KpiCard, { KpiSkeleton } from "@/components/KpiCard";
import Chart from "@/components/Chart";
import DataTable from "@/components/DataTable";
import { kpiData } from "@/lib/data";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetch — demo skeleton for ~1.5s
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white transition-colors duration-200 dark:bg-[#0A0B0F]">
      <Header activeNav={activeNav} onNavChange={setActiveNav} />

      <main className="mx-auto max-w-screen-xl px-4 sm:px-6 py-6 sm:py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium uppercase tracking-widest text-[#4F6EF7]">
              {new Date().toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-[#F0F1F5]">
            Intelligence Overview
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-[#8B8FA8]">
            Real-time pharmaceutical supply chain monitoring across all
            registered pharmacies.
          </p>
        </motion.div>

        {/* KPI Cards Grid */}
        <section aria-label="Key performance indicators" className="mb-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <KpiSkeleton key={`kpi-skeleton-${index}`} />
                ))
              : kpiData.map((item, index) => (
                  <KpiCard key={item.id} data={item} index={index} />
                ))}
          </div>
        </section>

        {/* Chart + Sidebar Grid */}
        <section aria-label="Analytics" className="mb-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Chart — takes 2/3 width on large screens */}
            <div className="lg:col-span-2">
              <Chart />
            </div>

            {/* Alert Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.55,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#1E1F28] dark:bg-[#111218] dark:shadow-none"
            >
              <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-[#F0F1F5]">
                Alert Summary
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Critical Shortages", count: 3, color: "bg-[#EF4444]" },
                  { label: "Low Stock Items", count: 14, color: "bg-[#F59E0B]" },
                  { label: "Price Spikes &gt;5%", count: 8, color: "bg-[#4F6EF7]" },
                  { label: "Recall Notices", count: 2, color: "bg-[#EC4899]" },
                ].map((alert) => (
                  <div
                    key={alert.label}
                    className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 transition-colors duration-150 hover:border-gray-200 hover:bg-white dark:border-[#1E1F28] dark:bg-[#0A0B0F] dark:hover:border-[#2E2F3C] dark:hover:bg-[#13141D]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`h-2 w-2 rounded-full ${alert.color}`}
                        aria-hidden="true"
                      />
                      <span className="text-xs text-gray-600 dark:text-[#8B8FA8]" dangerouslySetInnerHTML={{ __html: alert.label }} />
                    </div>
                    <span className="text-sm font-semibold tabular-nums text-gray-900 dark:text-[#F0F1F5]">
                      {alert.count}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-auto border-t border-gray-100 pt-4 dark:border-[#1E1F28]">
                <p className="text-xs text-gray-500 dark:text-[#8B8FA8]">
                  Last synced{" "}
                  <span className="font-medium text-gray-900 dark:text-[#C8CDE0]">
                    2 minutes ago
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Data Table */}
        <section aria-label="Drug inventory table">
          <DataTable isLoading={isLoading} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-8 sm:mt-12 px-4 sm:px-6 py-5 dark:border-[#1E1F28]">
        <div className="mx-auto flex flex-col sm:flex-row max-w-screen-xl items-center sm:justify-between gap-2 text-center sm:text-left">
          <span className="text-xs text-gray-500 dark:text-[#8B8FA8]">
            © 2026 PHARMORIS. Pharmaceutical Intelligence Platform.
          </span>
          <span className="text-xs text-gray-500 dark:text-[#8B8FA8]">
            v2.4.1 · UK NHS Supply Chain
          </span>
        </div>
      </footer>
    </div>
  );
}
