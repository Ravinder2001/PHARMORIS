"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { costSavingsData } from "@/lib/data";

interface TooltipEntry {
  value?: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const value = payload[0]?.value;
    return (
      <div className="rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 shadow-xl dark:border-[#1E1F28] dark:bg-[#0A0B0F]">
        <p className="mb-1 text-xs font-medium text-gray-500 dark:text-[#8B8FA8]">{label} 2025–26</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-[#F0F1F5]">
          £{value}k saved
        </p>
      </div>
    );
  }
  return null;
};

const Chart = memo(function Chart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#1E1F28] dark:bg-[#111218] dark:shadow-none"
    >
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-[#F0F1F5]">
            Cost Savings Over Time
          </h2>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-[#8B8FA8]">
            Monthly procurement savings — GBP (thousands)
          </p>
        </div>
        <span className="rounded-md bg-[#34C780]/10 px-2.5 py-1 text-xs font-semibold text-[#34C780]">
          ↑ 12.5% QoQ
        </span>
      </div>

      <div className="flex-1 min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={costSavingsData}
            margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F6EF7" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#4F6EF7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1E1F28"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#8B8FA8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#8B8FA8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `£${v}k`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#4F6EF7", strokeWidth: 1, strokeDasharray: "4 4" }}
            />
            <Area
              type="monotone"
              dataKey="savings"
              stroke="#4F6EF7"
              strokeWidth={2}
              fill="url(#savingsGradient)"
              dot={false}
              activeDot={{
                r: 4,
                fill: "#4F6EF7",
                stroke: "#111218",
                strokeWidth: 2,
              }}
              isAnimationActive={true}
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
});

export default Chart;
