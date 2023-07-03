import axios from "axios";

const travelDeliveryServiceApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

interface DriverData {
  id: number;
  username: string;
}
export const getDrivers = async (): Promise<{
  data: DriverData[];
}> => {
  const { data } = await travelDeliveryServiceApi.get("/drivers");
  return data;
};
