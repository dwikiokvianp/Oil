import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./AuthRoutes.tsx";
import officerRoutes from "./OfficerRoutes.tsx";
import driverRoutes from "./DriverRoutes.tsx";
import adminRoutes from "./HomeRoutes.tsx";

const router = [
  ...adminRoutes,
  ...authRoutes,
  ...officerRoutes,
  ...driverRoutes,
];

const BrowserRouter = createBrowserRouter(router);

export { BrowserRouter };
