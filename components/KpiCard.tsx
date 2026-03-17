"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Pill,
  TrendingUp,
  AlertTriangle,
  TrendingDown,
  LucideIcon,
} from "lucide-react";
import { KpiData } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Pill,
  TrendingUp,
  AlertTriangle,
};

interface KpiCardProps {
  data: KpiData;
  index: number;
}

const KpiCard = memo(function KpiCard({ data, index }: KpiCardProps) {
  const Icon = iconMap[data.icon] ?? Building2;
  const isPositive = data.trend >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group cursor-pointer relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all dark:border-[#1E1F28] dark:bg-[#111218] dark:shadow-none [transform:translateZ(0)] will-change-transform"
    >
      {/* Subtle shimmer on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-[#4F6EF7]/5 via-transparent to-transparent" />

      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-3">
          {/* Label */}
          <span className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-[#8B8FA8]">
            {data.label}
          </span>

          {/* Value */}
          <span className="text-3xl font-semibold tabular-nums tracking-tight text-gray-900 dark:text-[#F0F1F5]">
            {data.value}
          </span>

          {/* Trend */}
          <div className="flex items-center gap-1.5">
            {isPositive ? (
              <TrendingUp className="h-3.5 w-3.5 text-[#34C780]" aria-hidden="true" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-[#EF4444]" aria-hidden="true" />
            )}
            <span
              className={`text-xs font-medium ${
                isPositive ? "text-[#34C780]" : "text-[#EF4444]"
              }`}
            >
              {isPositive ? "+" : ""}
              {data.trend}%
            </span>
            <span className="text-xs text-gray-500 dark:text-[#8B8FA8]">{data.trendLabel}</span>
          </div>
        </div>

        {/* Icon */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4F6EF7]/10"
          aria-hidden="true"
        >
          <Icon className="h-5 w-5 text-[#4F6EF7]" />
        </div>
      </div>
    </motion.div>
  );
});

export default KpiCard;
