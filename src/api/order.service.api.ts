import axios from "axios";
import type { SalesInput, SalesResponse } from "../pages/Sales/sales.d.type.ts";
import {
  getLocalStorage,
  LocalStorageKeys,
} from "../utils/local.storage.utils.ts";

const orderService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_SALES,
  headers: {
    Authorization: `Bearer ${getLocalStorage(LocalStorageKeys.token)}`,
  },
});

export const postOrder = async (
  salesInput: SalesInput
): Promise<SalesResponse> => {
  salesInput.liter = Number(salesInput.liter);
  const { data } = await orderService.post("", {
    ...salesInput,
  });
  return data;
};
