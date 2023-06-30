import DriverRoot from "../pages/Driver/DriverRoot.tsx";
import PickupOrder from "../pages/Driver/PickupOrder.tsx";
import DeliveryOrder from "../pages/Driver/DeliveryOrder.tsx";

const driverRoutes = [
  {
    path: "/driver",
    element: <DriverRoot />,
  },
  {
    path: "/pickup-order",
    element: <PickupOrder />,
  },
  {
    path: "/delivery-order",
    element: <DeliveryOrder />,
  },
];

export default driverRoutes;
