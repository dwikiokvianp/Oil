import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "../pages/Home/Home.tsx";
import Login from "../pages/Login/Login.tsx";
import Sales from "../pages/Sales/Sales.tsx";
import Scan from "../pages/Scan/Scan.tsx";
import Order from "../pages/Order/Order.tsx";
import { CameraReact } from "../pages/Camera/Camera.tsx";
import Dashboard from "../pages/Dashboard/Dashboard.tsx";
import Register from "../pages/Register/Register.tsx";
import {
  getLocalStorage,
  LocalStorageKeys,
} from "../utils/local.storage.utils.ts";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      { path: "/sales", element: <Sales /> },
      {
        path: "/scan",
        element: <Scan />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/camera",
        element: <CameraReact />,
      },
    ],
    loader: () => {
      const token = getLocalStorage(LocalStorageKeys.token);
      if (!token) {
        return redirect("login");
      } else {
        return null;
      }
    },
  },
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
]);

export default BrowserRouter;
