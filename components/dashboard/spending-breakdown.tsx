"use client";

import { useFinance } from "@/lib/finance-context";
import { formatCurrency } from "@/lib/currency";

const CATEGORY_COLORS: Record<string, string> = {
  "Food & Dining": "bg-emerald-500",
  "Shopping": "bg-blue-500",
  "Transportation": "bg-amber-500",
  "Entertainment": "bg-purple-500",
  "Education": "bg-cyan-500",
  "Healthcare": "bg-rose-500",
  "Housing": "bg-orange-500",
  "Utilities": "bg-slate-500",
};

export function SpendingBreakdown() {
  const { transactions } = useFinance();
  
  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const totalExpenses = Object.values(expensesByCategory).reduce((a, b) => a + b, 0);
  
  const categories = Object.entries(expensesByCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
      color: CATEGORY_COLORS[category] || "bg-gray-500",
    }));

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-semibold">Spending Breakdown</h3>
        <span className="text-xs text-muted-foreground">Top 5 categories</span>
      </div>
      
      {/* Stacked bar */}
      <div className="mb-6 flex h-3 overflow-hidden rounded-full bg-muted">
        {categories.map((cat, index) => (
          <div
            key={cat.category}
            className={`${cat.color} transition-all first:rounded-l-full last:rounded-r-full`}
            style={{ width: `${cat.percentage}%` }}
          />
        ))}
      </div>
      
      {/* Category list */}
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.category} className="flex items-center gap-3">
            <div className={`h-2.5 w-2.5 rounded-full ${cat.color}`} />
            <span className="flex-1 text-sm">{cat.category}</span>
            <span className="text-sm font-medium">{formatCurrency(cat.amount)}</span>
            <span className="w-12 text-right text-xs text-muted-foreground">
              {cat.percentage.toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
