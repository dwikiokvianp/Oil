import axios from "axios";
import { checkLocalStorage } from "../utils/api.interceptor.utils.ts";
import { OrderInput } from "../pages/admin/pages/Order/constant/order.constant.ts";

const orderService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

orderService.interceptors.request.use(checkLocalStorage);

export const postOrder = async (
  order: OrderInput
): Promise<{ message: string }> => {
  const { data } = await orderService.post(
    `/transactions/${order.id}?${
      order.isPickup ? "status=pickup" : "status=pending"
    }`,
    order
  );
  return data;
};
