import { HeaderOfficerTitle } from "../../components/molecules/HeaderOfficerTitle.tsx";
import { OfficerInformationBar } from "../../components/molecules/OfficerInformationBar.tsx";
import { OfficerHistoryBar } from "../../components/molecules/OfficerHistoryBar.tsx";
import { useQuery } from "react-query";
import { getSummaryTransaction } from "../../api/transaction.service.api.ts";

export function FuelIn() {
  const { data } = useQuery({
    queryKey: "summary",
    queryFn: getSummaryTransaction,
  });

  return (
    <div className="m-6">
      <HeaderOfficerTitle title={"Fuel In"} />
      <section className="grid grid-cols-2 gap-4 mt-8">
        <OfficerInformationBar
          title={"Fuel In"}
          value={data?.oil_in as number}
          type={"liter"}
        />
        <OfficerInformationBar
          title={"Close Order"}
          value={data?.order_today as number}
          type={"order"}
        />
      </section>
      <section className="mt-6">
        <header className="text-[#B2B2B2] font-medium text-sm">History</header>
        <main className="mt-4">
          <OfficerHistoryBar type={"Fuel In"} />
          <OfficerHistoryBar type={"Fuel Out"} />
        </main>
      </section>
    </div>
  );
}
