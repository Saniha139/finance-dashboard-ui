"use client";

import { useFinance } from "@/lib/finance-context";
import { formatCurrency } from "@/lib/currency";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export function SummaryCards() {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();

  const cards = [
    {
      title: "Total Balance",
      value: totalBalance,
      icon: Wallet,
      trend: totalBalance > 0 ? "positive" : "negative",
      description: "Current account balance",
    },
    {
      title: "Total Income",
      value: totalIncome,
      icon: TrendingUp,
      trend: "positive",
      description: "All time income",
    },
    {
      title: "Total Expenses",
      value: totalExpenses,
      icon: TrendingDown,
      trend: "negative",
      description: "All time expenses",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        const isPositive = card.trend === "positive";

        return (
          <Card
            key={card.title}
            className="relative overflow-hidden border-border/50 bg-card"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      isPositive
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{card.title}</p>
                    <p className="text-2xl font-semibold tracking-tight">
                      {formatCurrency(card.value)}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    isPositive ? "text-success" : "text-destructive"
                  }`}
                >
                  {isPositive ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
