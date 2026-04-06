"use client";

import { monthlyData } from "@/lib/data";
import { formatCurrency } from "@/lib/currency";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { TrendingUp } from "lucide-react";

export function TrendSparkline() {
  const latestBalance = monthlyData[monthlyData.length - 1]?.balance || 0;
  const previousBalance = monthlyData[monthlyData.length - 2]?.balance || 0;
  const percentChange = previousBalance > 0 
    ? ((latestBalance - previousBalance) / previousBalance) * 100 
    : 0;

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Balance Trend</p>
          <p className="mt-1 text-2xl font-bold">{formatCurrency(latestBalance)}</p>
          <div className="mt-1 flex items-center gap-1 text-xs">
            <TrendingUp className="h-3 w-3 text-emerald-500" />
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              +{percentChange.toFixed(1)}%
            </span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 h-20">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.70 0.18 160)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="oklch(0.70 0.18 160)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" hide />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-lg">
                      <p className="text-xs font-medium">{formatCurrency(payload[0].value as number)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="oklch(0.70 0.18 160)"
              strokeWidth={2}
              fill="url(#sparklineGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
