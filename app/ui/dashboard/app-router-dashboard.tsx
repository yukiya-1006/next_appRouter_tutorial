import { Card } from "@/app/ui/dashboard/cards";
import RevenueChartMock from "@/app/ui/dashboard/revenue-chart-mock";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import {
  CardsSkeleton,
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
} from "@/app/ui/skeletons";
import { LatestInvoice } from "@/app/lib/definitions";

// モックデータ（比較ページ用）
const mockCardData = {
  totalPaidInvoices: "$52,250.00",
  totalPendingInvoices: "$12,555.00",
  numberOfInvoices: 15,
  numberOfCustomers: 8,
};

const mockLatestInvoices: LatestInvoice[] = [
  {
    id: "1",
    name: "Delba de Oliveira",
    email: "delba@oliveira.com",
    image_url: "/customers/delba-de-oliveira.png",
    amount: "$2,000.00",
  },
  {
    id: "2",
    name: "Lee Robinson",
    email: "lee@robinson.com",
    image_url: "/customers/lee-robinson.png",
    amount: "$1,500.00",
  },
  {
    id: "3",
    name: "Hector Simpson",
    email: "hector@simpson.com",
    image_url: "/customers/hector-simpson.png",
    amount: "$1,200.00",
  },
  {
    id: "4",
    name: "Steven Tey",
    email: "steven@tey.com",
    image_url: "/customers/steven-tey.png",
    amount: "$1,000.00",
  },
  {
    id: "5",
    name: "Steph Dietz",
    email: "steph@dietz.com",
    image_url: "/customers/steph-dietz.png",
    amount: "$800.00",
  },
];

// 遅延を追加してストリーミングを可視化
async function DelayedCardData() {
  // 意図的に遅延を追加（実際のデータ取得をシミュレート）
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockCardData;
}

async function DelayedLatestInvoices() {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockLatestInvoices;
}

async function CardsSection() {
  const cardData = await DelayedCardData();
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers,
  } = cardData;

  return (
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
  );
}

async function InvoicesSection() {
  const latestInvoices = await DelayedLatestInvoices();
  return <LatestInvoices latestInvoices={latestInvoices} />;
}

export default function AppRouterDashboard() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard (App Router)
      </h1>
      <div className="mb-2 text-xs text-gray-500">
        ⚡ ストリーミング: 各セクションが準備でき次第表示
      </div>

      {/* カードセクション - Suspenseでラップ */}
      <Suspense fallback={<CardsSkeleton />}>
        <CardsSection />
      </Suspense>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* チャートセクション - Suspenseでラップ */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChartMock />
        </Suspense>

        {/* 請求書セクション - Suspenseでラップ */}
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <InvoicesSection />
        </Suspense>
      </div>
    </main>
  );
}
