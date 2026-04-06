"use client";

import { useFinance } from "@/lib/finance-context";
import { formatCurrency } from "@/lib/currency";
import { TrendingUp, TrendingDown, Wallet, Target } from "lucide-react";

export function QuickStats() {
  const { totalIncome, totalExpenses, transactions } = useFinance();
  
  const avgTransaction = transactions.length > 0 
    ? transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length 
    : 0;
  
  const thisMonthExpenses = transactions
    .filter(t => t.type === "expense" && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0);

  const stats = [
    {
      label: "Income",
      value: formatCurrency(totalIncome),
      icon: TrendingUp,
      trend: "+12.5%",
      trendUp: true,
      bgClass: "bg-emerald-500/10 dark:bg-emerald-500/20",
      iconClass: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Expenses",
      value: formatCurrency(totalExpenses),
      icon: TrendingDown,
      trend: "-8.2%",
      trendUp: false,
      bgClass: "bg-rose-500/10 dark:bg-rose-500/20",
      iconClass: "text-rose-600 dark:text-rose-400",
    },
    {
      label: "Monthly Goal",
      value: formatCurrency(thisMonthExpenses),
      icon: Target,
      subtext: "of 50,000",
      bgClass: "bg-amber-500/10 dark:bg-amber-500/20",
      iconClass: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "Avg Transaction",
      value: formatCurrency(avgTransaction),
      icon: Wallet,
      bgClass: "bg-blue-500/10 dark:bg-blue-500/20",
      iconClass: "text-blue-600 dark:text-blue-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
        >
          <div className={`absolute -right-4 -top-4 h-16 w-16 rounded-full ${stat.bgClass} blur-2xl transition-all group-hover:scale-150`} />
          
          <div className="relative">
            <div className={`mb-3 inline-flex rounded-xl ${stat.bgClass} p-2.5`}>
              <stat.icon className={`h-4 w-4 ${stat.iconClass}`} />
            </div>
            
            <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-lg font-bold tracking-tight">{stat.value}</p>
            
            {stat.trend && (
              <span className={`mt-1 inline-flex text-xs font-medium ${stat.trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                {stat.trend}
              </span>
            )}
            {stat.subtext && (
              <span className="mt-1 block text-xs text-muted-foreground">{stat.subtext}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
