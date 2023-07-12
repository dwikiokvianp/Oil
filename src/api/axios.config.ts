import axios from "axios";
import { checkLocalStorage } from "../utils/api.interceptor.utils.ts";

export const fuelApiNoAuth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const fuelApiService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

fuelApiService.interceptors.request.use(checkLocalStorage);
