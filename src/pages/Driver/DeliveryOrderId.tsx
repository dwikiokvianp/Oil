import { HeaderOfficerTitle } from "../../components/molecules/HeaderOfficerTitle.tsx";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getDeliveryOrdersMobile } from "../../api/delivery-order.service.api.ts";

export default function DeliveryOrderId() {
  const { id } = useParams();

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
      {id}
    </div>
  );
}
