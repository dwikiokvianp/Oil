import { HeaderOfficerTitle } from "../../components/molecules/HeaderOfficerTitle.tsx";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getDeliveryOrdersMobile } from "../../api/delivery-order.service.api.ts";
import { OfficerHistoryBar } from "../../components/molecules/OfficerHistoryBar.tsx";
import { useNavigate } from "react-router-dom";

export default function DeliveryOrderId() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: deliveryOrder } = useQuery({
    queryKey: ["deliveryOrder", id],
    queryFn: () => getDeliveryOrdersMobile(Number(id)),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <div className="m-6">
      <HeaderOfficerTitle title={"Delivery Order Detail"} />
      <div className="mt-12">
        <OfficerHistoryBar
          type={"Pickup Point"}
          date={deliveryOrder?.travel_order.pickup_location as string}
          quantity={deliveryOrder?.travel_order.quantity as number}
        />

        {deliveryOrder?.recipient.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              navigate(`/delivery-order/transaction/${item.transaction.id}`);
            }}
          >
            <InformationBar
              key={item.id}
              type={"Delivery Point"}
              date={`${item.transaction.Province.name} - ${item.transaction.City.name}`}
              company={item.transaction.User.company.companyName}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface InformationBarProps {
  type: string;
  date: string;
  company: string;
}
export function InformationBar({ type, date, company }: InformationBarProps) {
  return (
    <div className="border-[1px] shadow-md rounded-xl my-2">
      <div className="p-4">
        <div className="flex justify-between">
          <div className="text-green-800 font-semibold text-sm">{type}</div>
          <div className="text-[#B2B2B2] font-medium text-xs">{date}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="font-semibold text-md">{company}</div>
          <div className="text-[#00A3FF] text-xs"> Detail</div>
        </div>
      </div>
    </div>
  );
}
