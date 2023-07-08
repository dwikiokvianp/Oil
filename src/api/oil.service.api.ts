import { GetOil } from "../pages/admin/pages/Order/constant/order.constant.ts";
import { fuelApiService } from "./axios.config.ts";

export const getOil = async (): Promise<GetOil> => {
  const { data } = await fuelApiService.get("/oil");
  return data;
};
