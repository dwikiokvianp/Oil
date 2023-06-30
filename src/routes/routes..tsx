import { createBrowserRouter } from "react-router-dom";
import homeRoutes from "./HomeRoutes.tsx";
import authRoutes from "./AuthRoutes.tsx";
import officerRoutes from "./OfficerRoutes.tsx";
import driverRoutes from "./DriverRoutes.tsx";

const router = [
  ...homeRoutes,
  ...authRoutes,
  ...officerRoutes,
  ...driverRoutes,
];

const BrowserRouter = createBrowserRouter(router);

export { BrowserRouter };
