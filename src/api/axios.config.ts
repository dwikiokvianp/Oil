import axios from "axios";

export const fuelApiService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
