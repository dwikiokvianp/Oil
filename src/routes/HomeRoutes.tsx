import Home from "../pages/Home/Home.tsx";
import Dashboard from "../pages/Dashboard/Dashboard.tsx";
import Scan from "../pages/Scan/Scan.tsx";
import Sales from "../pages/Sales/Sales.tsx";
import Order from "../pages/Order/Order.tsx";
import { CameraReact } from "../pages/Camera/Camera.tsx";
import { redirectLogin } from "../utils/redirect.utils.ts";
import { OrderList } from "../pages/Order List/OrderList.tsx";
import { Try } from "../pages/Try/Try.tsx";

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
      { path: "/orderlist", element: <OrderList /> },
    ],
    loader: redirectLogin,
  },
  {
    path: "try",
    element: <Try />,
  },
];

export default homeRoutes;
