"use client";

import { useState } from "react";
import { FinanceProvider } from "@/lib/finance-context";
import { Header } from "@/components/dashboard/header";
import { HeroBalance } from "@/components/dashboard/hero-balance";
import { QuickStats } from "@/components/dashboard/quick-stats";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { SpendingBreakdown } from "@/components/dashboard/spending-breakdown";
import { TrendSparkline } from "@/components/dashboard/trend-sparkline";
import { MonthlyComparison } from "@/components/dashboard/monthly-comparison";
import { TransactionsTable } from "@/components/dashboard/transactions-table";
import { Profile } from "@/components/dashboard/profile";

function DashboardContent() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "profile">("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {activeTab === "dashboard" ? (
          <div className="space-y-6">
            {/* Hero Section - Asymmetric Bento Grid */}
            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Large Hero Card - spans 2 cols on lg */}
              <div className="lg:col-span-2">
                <HeroBalance />
              </div>
              
              {/* Quick Stats - Right side */}
              <div className="md:col-span-2 lg:col-span-1">
                <QuickStats />
              </div>
            </section>

            {/* Middle Section - 3 Column Bento */}
            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Trend Sparkline */}
              <TrendSparkline />
              
              {/* Monthly Comparison - spans 2 on lg */}
              <div className="md:col-span-2 lg:col-span-2">
                <MonthlyComparison />
              </div>
            </section>

            {/* Bottom Section */}
            <section className="grid gap-4 lg:grid-cols-5">
              {/* Activity Feed - takes 3 cols */}
              <div className="lg:col-span-3">
                <ActivityFeed />
              </div>
              
              {/* Spending Breakdown - takes 2 cols */}
              <div className="lg:col-span-2">
                <SpendingBreakdown />
              </div>
            </section>

            {/* Transactions Table - Full Width */}
            <section>
              <TransactionsTable />
            </section>
          </div>
        ) : (
          <Profile />
        )}
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <FinanceProvider>
      <DashboardContent />
    </FinanceProvider>
  );
}
