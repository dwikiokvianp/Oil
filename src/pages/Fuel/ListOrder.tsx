import { HeaderOfficerTitle } from "../../components/molecules/HeaderOfficerTitle.tsx";
import { AiOutlineSearch } from "react-icons/ai";
import { OrderBarInformation } from "../../components/molecules/OrderBarInformation.tsx";
import { useQuery } from "react-query";
import { getTomorrowTransactions } from "../../api/transaction.service.api.ts";

export function ListOrder() {
  const { data } = useQuery({
    queryKey: "listOrder",
    queryFn: getTomorrowTransactions,
  });
  return (
    <div className="m-6">
      <HeaderOfficerTitle title={"List Order"} />
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
