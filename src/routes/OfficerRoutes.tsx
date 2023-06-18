import { RootOfficer } from "../pages/Officer/RootOfficer.tsx";
import { FuelIn } from "../pages/Fuel/FuelIn.tsx";
import { FuelOut } from "../pages/Fuel/FuelOut.tsx";
import { TodayOrder } from "../pages/Fuel/TodayOrder.tsx";
import { ListOrder } from "../pages/Fuel/ListOrder.tsx";

const officerRoutes = [
  {
    path: "/officer",
    element: <RootOfficer />,
  },
  {
    path: "/fuel-in",
    element: <FuelIn />,
  },
  {
    path: "/fuel-out",
    element: <FuelOut />,
  },
  {
    path: "/today-order",
    element: <TodayOrder />,
  },
  {
    path: "/list-order",
    element: <ListOrder />,
  },
];

export default officerRoutes;
