import axios from "axios";
import type {
  SalesResponseUpdated,
  UpdatedStatusResponse,
} from "../type/sales.d.type.ts";
import { checkLocalStorage } from "../utils/api.interceptor.utils.ts";

const salesService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ORDER,
});

salesService.interceptors.request.use(checkLocalStorage);

export const getSales = async (): Promise<SalesResponseUpdated> => {
  const { data } = await salesService.get("/orders");
  return data;
};

export const confirmOrder = async (
  id: number
): Promise<UpdatedStatusResponse> => {
  const { data } = await salesService.post(`/confirm/${id}`);
  return data;
};
