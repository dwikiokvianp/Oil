import axios from "axios";
import { GetOil } from "../pages/Order/constant/order.constant.ts";

export const oilService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getOil = async (): Promise<GetOil> => {
  const { data } = await oilService.get("/oil");
  return data;
};
