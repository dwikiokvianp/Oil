import { HeaderOfficerTitle } from "../../../components/molecules/HeaderOfficerTitle.tsx";
import { OfficerInformationBar } from "../../../components/molecules/OfficerInformationBar.tsx";
import { OfficerHistoryBar } from "../../../components/molecules/OfficerHistoryBar.tsx";
import { useQuery } from "react-query";
import { getHistory } from "../../../api/transaction.service.api.ts";
import { formatIndonesianTime } from "../../../utils/day.converter.ts";

export function FuelIn() {
  const { data } = useQuery({
    queryKey: "history",
    queryFn: getHistory,
  });

  return (
    <div className="m-6">
      <HeaderOfficerTitle title={"Fuel In"} />
      <section className="grid grid-cols-2 gap-4 mt-8">
        <OfficerInformationBar
          title={"Fuel In"}
          value={data?.totalQuantityIn as number}
          type={"liter"}
        />
        <OfficerInformationBar
          title={"Close Order"}
          value={data?.totalIn as number}
          type={"order"}
        />
      </section>
      <section className="mt-6">
        <header className="text-[#B2B2B2] font-medium text-sm">History</header>
        <main className="mt-4">
          {data?.historyIn.map((item) => (
            <OfficerHistoryBar
              type={"Fuel In"}
              date={formatIndonesianTime(item.date)}
              quantity={item.quantity}
            />
          ))}
        </main>
      </section>
    </div>
  );
}
