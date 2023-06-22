import { HeaderOfficerTitle } from "../../components/molecules/HeaderOfficerTitle.tsx";
import { OfficerInformationBar } from "../../components/molecules/OfficerInformationBar.tsx";
import { OrderBarInformation } from "../../components/molecules/OrderBarInformation.tsx";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import {
  getSummaryTransaction,
  getTodayTransactions,
} from "../../api/transaction.service.api.ts";
import { formatIndonesianTime } from "../../utils/day.converter.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function TodayOrder() {
  const [queryName, setQueryName] = useState("");
  const navigate = useNavigate();
  const { data: Summary } = useQuery({
    queryKey: "summary",
    queryFn: getSummaryTransaction,
  });
  const { data } = useQuery({
    queryKey: ["today", queryName],
    queryFn: () => getTodayTransactions(queryName),
    keepPreviousData: true,
  });

  return (
    <div className="m-6">
      <HeaderOfficerTitle title={"Today Order"} />
      <section className="grid grid-cols-1 gap-4 mt-8">
        <OfficerInformationBar
          title={"Total Order Today"}
          value={Summary?.order_today as number}
          type={"order"}
        />
      </section>
      <section className="flex rounded-2xl border-2 overflow-hidden border-[#B2B2B2] items-center mt-8">
        <input
          type="text"
          className="w-full border-none italic font-normal text-xs focus:outline-none"
          placeholder="Search Order"
          onChange={(e) => setQueryName(e.target.value)}
        />
        <AiOutlineSearch className="text-[#B2B2B2] bg-white text-xl mr-2" />
      </section>
      <section className="mt-6">
        {data?.data.map((item) => (
          <div
            key={item.id}
            className="w-full"
            onClick={() => navigate(`/transaction/officer/${item.id}`)}
          >
            <OrderBarInformation
              date={formatIndonesianTime(item.date)}
              company_name={item.User.company.companyName}
              quantity={item.quantity}
              status={item.status}
              phone_number={item.User.phone}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
