import axios from "axios";
import type { SalesInput, SalesResponse } from "../pages/Sales/sales.d.type.ts";
import { checkLocalStorage } from "../utils/api.interceptor.utils.ts";
import {
  OrderData,
  OrderResponse,
  OrderTwoResponse,
} from "../pages/Order List/order.constant.ts";

const orderService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

orderService.interceptors.request.use(checkLocalStorage);

export const postOrder = async (
  salesInput: SalesInput
): Promise<SalesResponse> => {
  salesInput.liter = Number(salesInput.liter);
  const { data } = await orderService.post("/sales/input", {
    ...salesInput,
  });
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
