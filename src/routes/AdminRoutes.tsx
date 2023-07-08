import Home from "../pages/admin/AdminNavigation/Home.tsx";
import Dashboard from "../pages/admin/pages/Dashboard/Dashboard.tsx";
import Order from "../pages/admin/pages/Order/Order.tsx";
import { OrderForm } from "../pages/admin/pages/Order/OrderForm.tsx";
import { OrderTransaction } from "../pages/admin/pages/Order/OrderTransaction.tsx";
import { Transaction } from "../pages/admin/pages/Transaction/Transaction.tsx";
import { DetailTransaction } from "../pages/admin/pages/Transaction/DetailTransaction.tsx";
import { redirect } from "react-router-dom";
import { addNotification } from "../utils/notification.utils.ts";
import NotFound from "../pages/ErrorComponent/NotFound.tsx";
import { Travel } from "../pages/admin/pages/Travel/TravelTwo.tsx";
async function loaderHome() {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");
  if (!token) {
    addNotification("info", "Please login first");
    return redirect("/login");
  } else if (role === "OFFICER") {
    addNotification("info", "Coming soon officer feature");
    return redirect("/officer");
  } else if (role === "DRIVER") {
    addNotification("info", "You are not allowed to access this page");
    return redirect("/driver");
  }
  return null;
}

const adminRoutes = [
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
      { path: "/travel", element: <Travel /> },
      { path: "/order/:id/transaction", element: <OrderTransaction /> },
      { path: "/order/:id", element: <OrderForm /> },
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

export default adminRoutes;
