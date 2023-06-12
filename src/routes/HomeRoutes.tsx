import Home from "../pages/Home/Home.tsx";
import Dashboard from "../pages/Dashboard/Dashboard.tsx";
import Scan from "../pages/Scan/Scan.tsx";
import Sales from "../pages/Sales/Sales.tsx";
import Order from "../pages/Order/Order.tsx";
import { CameraReact } from "../pages/Camera/Camera.tsx";
import { OrderList } from "../pages/Order List/OrderList.tsx";
import { OrderForm } from "../pages/Order/OrderForm.tsx";

const homeRoutes = [
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/sales", element: <Sales /> },
      { path: "/scan", element: <Scan /> },
      {
        path: "/order",
        element: <Order />,
      },
      { path: "/order/:id", element: <OrderForm /> },
      { path: "/camera", element: <CameraReact /> },
      { path: "/orderlist", element: <OrderList /> },
    ],
  },
];

export default homeRoutes;
