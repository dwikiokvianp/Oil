import axios from "axios";
import { checkLocalStorage } from "../utils/api.interceptor.utils.ts";
import {
  OrderData,
  OrderResponse,
  OrderTwoResponse,
} from "../pages/Order List/order.constant.ts";
import { OrderInput } from "../pages/Order/constant/order.constant.ts";

const orderService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

orderService.interceptors.request.use(checkLocalStorage);

export const postOrder = async (
  order: OrderInput
): Promise<{ message: string }> => {
  console.log(order, "ini dari order");
  const { data } = await orderService.post(`/transactions/${order.id}`, order);
  return data;
};

export const getOrder = async (): Promise<OrderData> => {
  const { data } = await orderService.get("/sales");
  return data;
};

export const getOrderById = async (id: number): Promise<OrderResponse> => {
  const { data } = await orderService.get(`/sales/${id}`);
  return data;
};

export const getOrderTwoById = async (
  id: number
): Promise<OrderTwoResponse> => {
  const { data } = await orderService.get(`/orders/${id}`);
  return data;
};
