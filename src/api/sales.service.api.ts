import axios from "axios";
import type {
  GetSales,
  SalesInput,
  SalesResponse,
} from "../type/sales.d.type.ts";

const salesService = axios.create({
  baseURL: "http://localhost:3000",
});

export const postSales = async (
  salesData: Omit<SalesInput, "id">
): Promise<SalesResponse> => {
  const { data }: { data: SalesResponse } = await salesService.post("/sales", {
    ...salesData,
  });
  return data;
};

export const getSales = async () => {
  const { data }: { data: GetSales[] } = await salesService.get("/sales");
  return data;
};

export const getSalesById = async (id: number) => {
  const { data }: { data: GetSales } = await salesService.get(`/sales/${id}`);
  return data;
};

export const updateSales = async (id: number) => {
  const { data }: { data: SalesResponse } = await salesService.put(
    `/admin/config/${id}`
  );
  return data;
};
