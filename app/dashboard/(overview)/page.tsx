import { fetchCardData, fetchLatestInvoices } from "@/app/lib/data";
import DashboardContent from "@/app/ui/dashboard/dashboard-content";

export default async function Page() {
  const latestInvoices = await fetchLatestInvoices();
  const cardData = await fetchCardData();
  
  return (
    <DashboardContent
      latestInvoices={latestInvoices}
      cardData={cardData}
      title="Dashboard (App Router)"
    />
  );
}
