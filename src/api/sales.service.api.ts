import axios from "axios";
import type { SalesResponseUpdated } from "../type/sales.d.type.ts";

const salesService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ORDER,
});

export const getSales = async (): Promise<SalesResponseUpdated> => {
  const { data } = await salesService.get("/orders");
  return data;
};

interface UpdatedStatusResponse {
  message: string;
  otp: string;
}

export const confirmOrder = async (
  id: number
): Promise<UpdatedStatusResponse> => {
  const { data } = await salesService.post(`/confirm/${id}`);
  return data;
};
