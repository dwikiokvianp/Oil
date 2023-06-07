import axios from "axios";
import type {
  SalesResponseUpdated,
  UpdatedStatusResponse,
} from "../type/sales.d.type.ts";
import {
  getLocalStorage,
  LocalStorageKeys,
} from "../utils/local.storage.utils.ts";

const salesService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ORDER,
  headers: {
    Authorization: `Bearer ${getLocalStorage(LocalStorageKeys.token)}`,
  },
});

export const getSales = async (): Promise<SalesResponseUpdated> => {
  const { data } = await salesService.get("/orders", {});
  return data;
};

export const confirmOrder = async (
  id: number
): Promise<UpdatedStatusResponse> => {
  const { data } = await salesService.post(`/confirm/${id}`);
  return data;
};
