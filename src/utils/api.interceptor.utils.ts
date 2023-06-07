import { InternalAxiosRequestConfig } from "axios";
import { getLocalStorage, LocalStorageKeys } from "./local.storage.utils.ts";

export function checkLocalStorage(
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> {
  const token = getLocalStorage(LocalStorageKeys.token);
  token ? (config.headers.Authorization = `Bearer ${token}`) : null;
  return config;
}
