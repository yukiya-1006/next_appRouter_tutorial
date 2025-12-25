import { fetchCardData, fetchLatestInvoices } from "@/app/lib/data";
import { GetServerSideProps } from "next";
import SideNav from "@/app/ui/dashboard/sidenav";
import DashboardContent from "@/app/ui/dashboard/dashboard-content";

interface DashboardProps {
  latestInvoices: any[];
  cardData: {
    totalPaidInvoices: string;
    totalPendingInvoices: string;
    numberOfInvoices: number;
    numberOfCustomers: number;
  };
}

export default function PagesDashboard({
  latestInvoices,
  cardData,
}: DashboardProps) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <SideNav />
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <DashboardContent
          latestInvoices={latestInvoices}
          cardData={cardData}
          title="Dashboard (Pages Router)"
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const latestInvoices = await fetchLatestInvoices();
  const cardData = await fetchCardData();

  return {
    props: {
      latestInvoices,
      cardData,
    },
  };
};
