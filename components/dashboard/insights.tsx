"use client";

import { useFinance } from "@/lib/finance-context";
import { formatCurrency } from "@/lib/currency";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export function Insights() {
  const { transactions, totalIncome, totalExpenses } = useFinance();

  // Calculate insights
  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const highestSpendingCategory = Object.entries(expensesByCategory).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // Monthly comparison
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const currentMonthExpenses = transactions
    .filter((t) => {
      const date = new Date(t.date);
      return (
        t.type === "expense" &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const lastMonthExpenses = transactions
    .filter((t) => {
      const date = new Date(t.date);
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return (
        t.type === "expense" &&
        date.getMonth() === lastMonth &&
        date.getFullYear() === lastMonthYear
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyChange =
    lastMonthExpenses > 0
      ? ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100
      : 0;

  // Savings rate
  const savingsRate =
    totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  // Average transaction amount
  const avgExpense =
    transactions.filter((t) => t.type === "expense").length > 0
      ? totalExpenses /
        transactions.filter((t) => t.type === "expense").length
      : 0;

  const insights = [
    {
      title: "Highest Spending Category",
      value: highestSpendingCategory
        ? highestSpendingCategory[0]
        : "No expenses yet",
      description: highestSpendingCategory
        ? formatCurrency(highestSpendingCategory[1])
        : "Start tracking your expenses",
      icon: Target,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      title: "Monthly Comparison",
      value:
        monthlyChange > 0
          ? `+${monthlyChange.toFixed(1)}%`
          : `${monthlyChange.toFixed(1)}%`,
      description:
        monthlyChange > 0
          ? "More spending than last month"
          : monthlyChange < 0
          ? "Less spending than last month"
          : "Same as last month",
      icon: monthlyChange > 0 ? TrendingUp : TrendingDown,
      color: monthlyChange > 0 ? "text-destructive" : "text-success",
      bgColor: monthlyChange > 0 ? "bg-destructive/10" : "bg-success/10",
    },
    {
      title: "Savings Rate",
      value: `${savingsRate.toFixed(1)}%`,
      description:
        savingsRate >= 20
          ? "Great job saving!"
          : savingsRate >= 10
          ? "Good progress"
          : "Consider saving more",
      icon: savingsRate >= 20 ? CheckCircle : AlertTriangle,
      color: savingsRate >= 20 ? "text-success" : "text-warning",
      bgColor: savingsRate >= 20 ? "bg-success/10" : "bg-warning/10",
    },
    {
      title: "Average Expense",
      value: formatCurrency(avgExpense),
      description: "Per transaction average",
      icon: Calendar,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
  ];

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Financial Insights</CardTitle>
        <p className="text-sm text-muted-foreground">
          Key observations from your data
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {insights.map((insight) => {
            const Icon = insight.icon;
            return (
              <div
                key={insight.title}
                className="flex items-start gap-4 rounded-lg border border-border/50 bg-secondary/20 p-4 transition-colors hover:bg-secondary/40"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${insight.bgColor}`}
                >
                  <Icon className={`h-5 w-5 ${insight.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">
                    {insight.title}
                  </p>
                  <p className="mt-1 truncate text-lg font-semibold">
                    {insight.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {insight.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
