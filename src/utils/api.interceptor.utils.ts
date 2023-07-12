import { InternalAxiosRequestConfig } from "axios";
import { getLocalStorage, LocalStorageKeys } from "./local.storage.utils.ts";

export function checkLocalStorage(
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> {
  console.log("checkLocalStorage");
  const token = getLocalStorage(LocalStorageKeys.access_token);
  console.log("token", token);
  token ? (config.headers.Authorization = `Bearer ${token}`) : null;
  return config;
}
