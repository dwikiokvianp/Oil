import Home from "../pages/Home/Home.tsx";
import Dashboard from "../pages/Dashboard/Dashboard.tsx";
import Scan from "../pages/Scan/Scan.tsx";
import Sales from "../pages/Sales/Sales.tsx";
import Order from "../pages/Order/Order.tsx";
import { CameraReact } from "../pages/Camera/Camera.tsx";
import {
  getLocalStorage,
  LocalStorageKeys,
} from "../utils/local.storage.utils.ts";
import { redirect } from "react-router-dom";

const homeRoutes = [
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/sales", element: <Sales /> },
      { path: "/scan", element: <Scan /> },
      { path: "/order", element: <Order /> },
      { path: "/camera", element: <CameraReact /> },
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
];

export default homeRoutes;
