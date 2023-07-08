import { RootOfficer } from "../pages/Officer/RootOfficer.tsx";
import { FuelIn } from "../pages/Officer/pages/Fuel/FuelIn.tsx";
import { FuelOut } from "../pages/Officer/pages/Fuel/FuelOut.tsx";
import { TodayOrder } from "../pages/Officer/pages/Fuel/TodayOrder.tsx";
import { ListOrder } from "../pages/Officer/pages/Fuel/ListOrder.tsx";
import { Handover } from "../pages/Officer/pages/Fuel/Handover.tsx";
import { redirect } from "react-router-dom";
import { addNotification } from "../utils/notification.utils.ts";
import { TransactionDetailOfficer } from "../pages/Officer/pages/Fuel/TransactionDetailOfficer.tsx";
import { UploadProof } from "../pages/Officer/pages/Fuel/UploadProof.tsx";

const checkAuth = () => {
  const role = localStorage.getItem("role");
  if (role !== "OFFICER") {
    addNotification("warning", "You are not authorized to access this page");
    return redirect("/");
  } else {
    return null;
  }
};

const officerRoutes = [
  {
    path: "/officer",
    element: <RootOfficer />,
    loader: checkAuth,
  },
  {
    path: "/fuel-in",
    element: <FuelIn />,
    loader: checkAuth,
  },
  {
    path: "/fuel-out",
    element: <FuelOut />,
    loader: checkAuth,
  },
  {
    path: "/today-order",
    element: <TodayOrder />,
    loader: checkAuth,
  },
  {
    path: "/list-order",
    element: <ListOrder />,
    loader: checkAuth,
  },
  {
    path: "/handover",
    element: <Handover />,
    loader: checkAuth,
  },

  { path: "/transaction/officer/:id", element: <TransactionDetailOfficer /> },
  { path: "/camera/:orderId", element: <UploadProof /> },
];

export default officerRoutes;
