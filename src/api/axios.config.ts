import axios from "axios";
import { checkLocalStorage } from "../utils/api.interceptor.utils.ts";

export const fuelApiNoAuth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const fuelApiService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

fuelApiService.interceptors.request.use(checkLocalStorage);
