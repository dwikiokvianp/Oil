import { GetVehicle } from "../pages/admin/pages/Order/constant/order.constant.ts";
import { fuelApiService } from "./axios.config.ts";

export const getVehicle = async (): Promise<GetVehicle> => {
  const { data } = await fuelApiService.get("/vehicle/");
  return data;
};

export const createVehicle = async (vehicle: {
  name: string;
  vehicle_type_id: number;
}): Promise<{ message: string }> => {
  const { data } = await fuelApiService.post(`/vehicle/`, vehicle);
  return data;
};
