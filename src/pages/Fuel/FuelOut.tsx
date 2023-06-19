import { HeaderOfficerTitle } from "../../components/molecules/HeaderOfficerTitle.tsx";
import { OfficerInformationBar } from "../../components/molecules/OfficerInformationBar.tsx";
import { OfficerHistoryBar } from "../../components/molecules/OfficerHistoryBar.tsx";
import { useQuery } from "react-query";
import { getSummaryTransaction } from "../../api/transaction.service.api.ts";

export function FuelOut() {
  const { data } = useQuery({
    queryKey: "summary",
    queryFn: getSummaryTransaction,
  });
  return (
    <div className="m-6">
      <HeaderOfficerTitle title={"Fuel Out"} />
      <section className="grid grid-cols-2 gap-4 mt-8">
        <OfficerInformationBar
          title={"Fuel Out"}
          value={data?.oil_out as number}
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
          <OfficerHistoryBar type={"Fuel Out"} />
          <OfficerHistoryBar type={"Fuel Out"} />
        </main>
      </section>
    </div>
  );
}
