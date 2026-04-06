"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinance } from "@/lib/finance-context";
import { formatCurrency } from "@/lib/currency";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "oklch(0.65 0.16 240)",
  "oklch(0.65 0.15 190)",
  "oklch(0.72 0.12 80)",
  "oklch(0.58 0.18 30)",
  "oklch(0.62 0.14 280)",
  "oklch(0.60 0.16 150)",
  "oklch(0.55 0.20 320)",
  "oklch(0.68 0.10 100)",
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      name: string;
      value: number;
      percent: number;
    };
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
        <p className="font-medium text-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          {formatCurrency(data.value)} ({(data.percent * 100).toFixed(1)}%)
        </p>
      </div>
    );
  }
  return null;
}

export function SpendingChart() {
  const { transactions } = useFinance();

  // Calculate spending by category
  const spendingByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const totalSpending = Object.values(spendingByCategory).reduce(
    (sum, val) => sum + val,
    0
  );

  const chartData = Object.entries(spendingByCategory)
    .map(([name, value]) => ({
      name,
      value,
      percent: value / totalSpending,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Spending Breakdown</CardTitle>
        <p className="text-sm text-muted-foreground">
          Expenses by category
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  formatter={(value) => (
                    <span className="text-sm text-foreground">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">No expense data available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
