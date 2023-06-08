import axios from "axios";
import type {
  SalesResponse,
  SalesResponseUpdated,
  UpdatedStatusResponse,
} from "../type/sales.d.type.ts";
import { checkLocalStorage } from "../utils/api.interceptor.utils.ts";
import {
  getLocalStorage,
  LocalStorageKeys,
} from "../utils/local.storage.utils.ts";

const salesService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ORDER,
});

salesService.interceptors.request.use(checkLocalStorage);

export const getSales = async (): Promise<SalesResponseUpdated> => {
  const { data } = await salesService.get("/orders");
  return data;
};

export const getSalesById = async (id: number): Promise<SalesResponse> => {
  const token = getLocalStorage(LocalStorageKeys.token);
  const { data } = await axios.get(`http://localhost:8080/api/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const confirmOrder = async (
  id: number
): Promise<UpdatedStatusResponse> => {
  const { data } = await salesService.post(`/confirm/${id}`);
  return data;
};
