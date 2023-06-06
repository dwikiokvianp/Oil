import Login from "../pages/Login/Login.tsx";
import Register from "../pages/Register/Register.tsx";
import {
  getLocalStorage,
  LocalStorageKeys,
} from "../utils/local.storage.utils.ts";
import { redirect } from "react-router-dom";

const authRoutes = [
  {
    path: "/login",
    loader: () => {
      const token = getLocalStorage(LocalStorageKeys.token);
      if (token) {
        return redirect("/");
      } else {
        return null;
      }
    },
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => {
      const token = getLocalStorage(LocalStorageKeys.token);
      if (token) {
        return redirect("/");
      } else {
        return null;
      }
    },
  },
];

export default authRoutes;
