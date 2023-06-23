import Home from "../pages/Home/Home.tsx";
import Dashboard from "../pages/Dashboard/Dashboard.tsx";
import Order from "../pages/Order/Order.tsx";
import { OrderForm } from "../pages/Order/OrderForm.tsx";
import { OrderTransaction } from "../pages/Order/OrderTransaction.tsx";
import { Vehicle } from "../pages/Vehicle/Vehicle.tsx";
import { Transaction } from "../pages/Transaction/Transaction.tsx";
import { DetailTransaction } from "../pages/Transaction/DetailTransaction.tsx";
import { UserList } from "../pages/UserList/UserList.tsx";
import { redirect } from "react-router-dom";
import { addNotification } from "../utils/notification.utils.ts";
import NotFound from "../pages/NotFound/NotFound.tsx";
function loaderHome() {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");
  if (!token) {
    addNotification("info", "Please login first");
    return redirect("/login");
  } else if (role === "OFFICER") {
    addNotification("info", "Coming soon officer feature");
    return redirect("/officer");
  }
  return null;
}

const homeRoutes = [
  {
    path: "/",
    element: <Home />,
    loader: loaderHome,
    children: [
      { path: "/", element: <Dashboard /> },
      {
        path: "/order",
        element: <Order />,
      },
      { path: "/order/:id", element: <OrderForm /> },
      { path: "/order/:id/transaction", element: <OrderTransaction /> },
      { path: "/userlist", element: <UserList /> },
      { path: "/vehicle", element: <Vehicle /> },
      { path: "/transaction", element: <Transaction /> },
      { path: "/transaction/:id", element: <DetailTransaction /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
];

export default homeRoutes;
