import { HeaderOfficerTitle } from "../../components/molecules/HeaderOfficerTitle.tsx";
import { useQuery } from "react-query";
import { getDeliveryOrders } from "../../api/driver.service.api.ts";
import { OfficerHistoryBar } from "../../components/molecules/OfficerHistoryBar.tsx";
import { formatIndonesianTime } from "../../utils/day.converter.ts";

export default function PickupOrder() {
  const { data: pickupOrder } = useQuery({
    queryKey: "pickupOrder",
    queryFn: getDeliveryOrders,
  });

  return (
    <div className="m-6">
      <HeaderOfficerTitle title={"Pickup Order"} />
      <section className="grid grid-cols-2 gap-4 mt-8"></section>
      <section className="mt-6">
        <main className="mt-4">
          {pickupOrder?.data.map((item) => (
            <OfficerHistoryBar
              type={"Pickup Order"}
              date={formatIndonesianTime(item.departure_date)}
              quantity={item.quantity}
            />
          ))}
        </main>
      </section>
    </div>
  );
}
