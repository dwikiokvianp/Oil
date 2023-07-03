import axios from "axios";

const warehouseServiceApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

interface WarehouseData {
  id: number;
  name: string;
  location: string;
}

export const getWarehouses = async (): Promise<WarehouseData[]> => {
  const { data } = await warehouseServiceApi.get("/warehouses");
  return data;
};
