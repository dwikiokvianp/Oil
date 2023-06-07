import axios from "axios";
import type { SalesInput, SalesResponse } from "../pages/Sales/sales.d.type.ts";
import { checkLocalStorage } from "../utils/api.interceptor.utils.ts";

const orderService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_SALES,
});

orderService.interceptors.request.use(checkLocalStorage);

export const postOrder = async (
  salesInput: SalesInput
): Promise<SalesResponse> => {
  salesInput.liter = Number(salesInput.liter);
  const { data } = await orderService.post("", {
    ...salesInput,
  });
  return data;
};
