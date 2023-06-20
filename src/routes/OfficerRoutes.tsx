import { RootOfficer } from "../pages/Officer/RootOfficer.tsx";
import { FuelIn } from "../pages/Fuel/FuelIn.tsx";
import { FuelOut } from "../pages/Fuel/FuelOut.tsx";
import { TodayOrder } from "../pages/Fuel/TodayOrder.tsx";
import { ListOrder } from "../pages/Fuel/ListOrder.tsx";
import { Handover } from "../pages/Fuel/Handover.tsx";
import { redirect } from "react-router-dom";
import { addNotification } from "../utils/notification.utils.ts";

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
];

export default officerRoutes;
