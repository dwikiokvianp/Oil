import { OrderInput } from "../pages/admin/pages/Order/constant/order.constant.ts";
import { fuelApiService } from "./axios.config.ts";

export const postOrder = async (
  order: OrderInput
): Promise<{ message: string }> => {
  const { data } = await fuelApiService.post(
    `/transactions/${order.id}?${
      order.isPickup ? "status=pickup" : "status=pending"
    }`,
    order
  );
  return data;
};
