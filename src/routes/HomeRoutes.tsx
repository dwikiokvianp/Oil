import Home from "../pages/Home/Home.tsx";
import Dashboard from "../pages/Dashboard/Dashboard.tsx";
import Scan from "../pages/Scan/Scan.tsx";
import Order from "../pages/Order/Order.tsx";
import { CameraReact } from "../pages/Camera/Camera.tsx";
import { OrderForm } from "../pages/Order/OrderForm.tsx";
import { OrderTransaction } from "../pages/Order/OrderTransaction.tsx";
import { Vehicle } from "../pages/Vehicle/Vehicle.tsx";
import { Transaction } from "../pages/Transaction/Transaction.tsx";
import { DetailTransaction } from "../pages/Transaction/DetailTransaction.tsx";
import { UserList } from "../pages/UserList/UserList.tsx";

const homeRoutes = [
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/", element: <Dashboard /> },
      {
        path: "/order",
        element: <Order />,
      },
      { path: "/order/:id", element: <OrderForm /> },
      { path: "/order/:id/transaction", element: <OrderTransaction /> },
      { path: "/vehicle", element: <Vehicle /> },
      { path: "/transaction", element: <Transaction /> },
      { path: "/transaction/:id", element: <DetailTransaction /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/camera", element: <CameraReact /> },
      { path: "/scan", element: <Scan /> },
    ],
  },
];

export default homeRoutes;
