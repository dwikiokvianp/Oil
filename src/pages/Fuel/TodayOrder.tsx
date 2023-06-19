import { HeaderOfficerTitle } from "../../components/molecules/HeaderOfficerTitle.tsx";
import { OfficerInformationBar } from "../../components/molecules/OfficerInformationBar.tsx";
import { OrderBarInformation } from "../../components/molecules/OrderBarInformation.tsx";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import { getTodayTransactions } from "../../api/transaction.service.api.ts";

export function TodayOrder() {
  const { data } = useQuery({
    queryKey: "todayOrder",
    queryFn: getTodayTransactions,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <div className="m-6">
      <HeaderOfficerTitle title={"Today Order"} />
      <section className="grid grid-cols-1 gap-4 mt-8">
        <OfficerInformationBar
          title={"Total Order Today"}
          value={250}
          type={"order"}
        />
      </section>
      <section className="flex rounded-2xl border-2 overflow-hidden border-[#B2B2B2] items-center mt-8">
        <input
          type="text"
          className="w-full border-none italic font-normal text-xs focus:outline-none"
          placeholder="Search Order"
        />
        <AiOutlineSearch className="text-[#B2B2B2] bg-white text-xl mr-2" />
      </section>
      <section className="mt-6">
        {data?.map((item) => (
          <OrderBarInformation
            key={item.id}
            date={item.date}
            company_name={item.name}
            quantity={item.quantity}
            status={item.status}
            phone_number={item.phone}
          />
        ))}
      </section>
    </div>
  );
}
