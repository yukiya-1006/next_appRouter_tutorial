import { NextResponse } from "next/server";

// モックデータを使用（比較ページ用）
const mockCardData = {
  totalPaidInvoices: "$52,250.00",
  totalPendingInvoices: "$12,555.00",
  numberOfInvoices: 15,
  numberOfCustomers: 8,
};

const mockLatestInvoices = [
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

export async function GET() {
  // 意図的に遅延を追加（Pages Routerの動作をシミュレート）
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return NextResponse.json({
    cardData: mockCardData,
    latestInvoices: mockLatestInvoices,
  });
}
