import { getLocalStorage, LocalStorageKeys } from "./local.storage.utils.ts";
import { addNotification } from "./notification.utils.ts";
import { redirect } from "react-router-dom";

export const redirectRoot = () => {
  const token = getLocalStorage(LocalStorageKeys.token);
  const role = getLocalStorage(LocalStorageKeys.role);
  if ((token && role === "ADMIN_PUSAT") || role === "ADMIN_SALES") {
    addNotification("info", "You are already logged in");
    return redirect("/");
  } else {
    return null;
  }
};

export const redirectLogin = () => {
  const token = getLocalStorage(LocalStorageKeys.token);
  if (!token) {
    addNotification("info", "You have to login first");
    return redirect("login");
  } else {
    return null;
  }
};
