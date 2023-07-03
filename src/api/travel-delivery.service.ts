import axios from "axios";

const travelDeliveryService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

interface DriverData {
  id: number;
  name: string;
}
const getDrivers = async (): Promise<DriverData> => {
  const { data } = await travelDeliveryService.get("/drivers");
  return data;
};
