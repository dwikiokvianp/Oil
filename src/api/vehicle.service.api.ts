import axios from "axios";
import { GetVehicle } from "../pages/Order/constant/order.constant.ts";

export const vehicleService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getVehicle = async (): Promise<GetVehicle> => {
  const { data } = await vehicleService.get("/vehicle/");
  return data;
};
