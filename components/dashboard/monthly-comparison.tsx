"use client";

import { monthlyData } from "@/lib/data";
import { formatCurrency } from "@/lib/currency";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function MonthlyComparison() {
  const recentData = monthlyData.slice(-6);

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Income vs Expenses</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="text-muted-foreground">Expenses</span>
          </div>
        </div>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={recentData} barGap={4}>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "oklch(0.55 0 0)" }}
              dy={10}
            />
            <YAxis 
              hide
            />
            <Tooltip
              cursor={{ fill: "oklch(0.5 0 0 / 0.05)" }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-xl border border-border bg-popover px-4 py-3 shadow-xl">
                      <p className="mb-2 text-xs font-medium text-muted-foreground">{label}</p>
                      <div className="space-y-1">
                        <p className="flex items-center gap-2 text-sm">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          <span className="text-muted-foreground">Income:</span>
                          <span className="font-semibold">{formatCurrency(payload[0].value as number)}</span>
                        </p>
                        <p className="flex items-center gap-2 text-sm">
                          <span className="h-2 w-2 rounded-full bg-rose-400" />
                          <span className="text-muted-foreground">Expenses:</span>
                          <span className="font-semibold">{formatCurrency(payload[1].value as number)}</span>
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="income" 
              fill="oklch(0.60 0.17 160)" 
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
            />
            <Bar 
              dataKey="expenses" 
              fill="oklch(0.70 0.15 25)" 
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
