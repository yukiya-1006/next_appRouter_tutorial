"use client";

import { Card } from "@/app/ui/dashboard/cards";
import RevenueChartStatic from "@/app/ui/dashboard/revenue-chart-static";
import LatestInvoicesClient from "@/app/ui/dashboard/latest-invoices-client";
import { lusitana } from "@/app/ui/fonts";
import { useEffect, useState } from "react";
import DashboardSkeleton from "@/app/ui/skeletons";
import { LatestInvoice, Revenue } from "@/app/lib/definitions";

interface CardData {
  totalPaidInvoices: string;
  totalPendingInvoices: string;
  numberOfInvoices: number;
  numberOfCustomers: number;
}

// Pages Routerの動作をシミュレート（全データ取得後に一括レンダリング）
export default function PagesRouterDashboard() {
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [latestInvoices, setLatestInvoices] = useState<LatestInvoice[]>([]);
  const [revenue, setRevenue] = useState<Revenue[]>([]);
  const [loadTime, setLoadTime] = useState<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();

    // 全データを一度に取得（Pages RouterのgetServerSidePropsを完全にシミュレート）
    // すべてのデータが揃うまで、何も表示しない
    Promise.all([
      fetch("/api/dashboard-data")
        .then((res) => res.json())
        .then((data) => {
          setCardData(data.cardData);
          setLatestInvoices(data.latestInvoices);
        }),
      fetch("/api/revenue")
        .then((res) => res.json())
        .then((data) => {
          setRevenue(data);
        }),
      // 意図的に遅延を追加（全データ取得まで待つ - Pages Routerのブロッキング動作）
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]).then(() => {
      const endTime = performance.now();
      setLoadTime(endTime - startTime);
      // すべてのデータが揃ってから、一度にレンダリング
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <main>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Dashboard (Pages Router)
        </h1>
        <div className="mb-2 text-xs text-gray-500">
          ⏳ ブロッキング: 全データ取得後に一括表示
        </div>
        <DashboardSkeleton />
      </main>
    );
  }

  if (!cardData) {
    return <div>Error loading data</div>;
  }

  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers,
  } = cardData;

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard (Pages Router)
      </h1>
      <div className="mb-2 text-xs text-gray-500">
        ✅ 全データ取得完了 ({loadTime?.toFixed(0)}ms)
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* すべてのデータが揃ってから一度にレンダリング（ブロッキング） */}
        <RevenueChartStatic revenue={revenue} />
        <LatestInvoicesClient latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
