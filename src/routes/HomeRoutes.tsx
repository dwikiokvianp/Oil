import Home from "../pages/Home/Home.tsx";
import Dashboard from "../pages/Dashboard/Dashboard.tsx";
import Scan from "../pages/Scan/Scan.tsx";
import Sales from "../pages/Sales/Sales.tsx";
import Order from "../pages/Order/Order.tsx";
import { CameraReact } from "../pages/Camera/Camera.tsx";
import { redirectLogin } from "../utils/redirect.utils.ts";

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
    loader: redirectLogin,
  },
];

export default homeRoutes;
