import { fuelApiService } from "./axios.config.ts";

interface WarehouseData {
  id: number;
  name: string;
  location: string;
}

export const getWarehouses = async (): Promise<WarehouseData[]> => {
  const { data } = await fuelApiService.get("/warehouses");
  return data;
};
