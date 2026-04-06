"use client";

import { useFinance } from "@/lib/finance-context";
import { formatCurrency } from "@/lib/currency";
import { 
  ShoppingBag, 
  Utensils, 
  Car, 
  Gamepad2, 
  GraduationCap,
  HeartPulse,
  Home,
  Briefcase,
  ArrowDownLeft,
  ArrowUpRight
} from "lucide-react";

const categoryIcons: Record<string, typeof ShoppingBag> = {
  "Food & Dining": Utensils,
  "Shopping": ShoppingBag,
  "Transportation": Car,
  "Entertainment": Gamepad2,
  "Education": GraduationCap,
  "Healthcare": HeartPulse,
  "Housing": Home,
  "Salary": Briefcase,
  "Investment": ArrowUpRight,
  "Freelance": Briefcase,
};

export function ActivityFeed() {
  const { transactions } = useFinance();
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
  };

  return (
    <div className="rounded-2xl border border-border/50 bg-card">
      <div className="flex items-center justify-between border-b border-border/50 p-5">
        <h3 className="font-semibold">Recent Activity</h3>
        <span className="text-xs text-muted-foreground">Last 5 transactions</span>
      </div>
      
      <div className="divide-y divide-border/30">
        {recentTransactions.map((transaction) => {
          const Icon = categoryIcons[transaction.category] || ShoppingBag;
          const isIncome = transaction.type === "income";
          
          return (
            <div
              key={transaction.id}
              className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/30"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                isIncome 
                  ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400" 
                  : "bg-muted text-muted-foreground"
              }`}>
                {isIncome ? <ArrowDownLeft className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </div>
              
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">{transaction.category}</p>
              </div>
              
              <div className="text-right">
                <p className={`text-sm font-semibold ${
                  isIncome 
                    ? "text-emerald-600 dark:text-emerald-400" 
                    : "text-foreground"
                }`}>
                  {isIncome ? "+" : "-"}{formatCurrency(transaction.amount)}
                </p>
                <p className="text-xs text-muted-foreground">{formatTime(transaction.date)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
