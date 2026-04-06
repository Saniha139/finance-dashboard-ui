"use client";

import { useFinance } from "@/lib/finance-context";
import { formatCurrency } from "@/lib/currency";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function HeroBalance() {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/90 via-primary to-primary/80 p-8 text-primary-foreground">
      {/* Decorative elements */}
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
      
      <div className="relative">
        <div className="flex items-center gap-2 text-sm font-medium text-primary-foreground/80">
          <Sparkles className="h-4 w-4" />
          <span>Total Balance</span>
        </div>
        
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-5xl font-bold tracking-tight lg:text-6xl">
            {formatCurrency(totalBalance)}
          </span>
        </div>
        
        <div className="mt-6 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <ArrowUpRight className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-primary-foreground/70">Savings Rate</p>
              <p className="font-semibold">{savingsRate.toFixed(1)}%</p>
            </div>
          </div>
          
          <div className="h-8 w-px bg-white/20" />
          
          <div>
            <p className="text-xs text-primary-foreground/70">This Month</p>
            <p className="font-semibold">+{formatCurrency(totalIncome - totalExpenses)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
