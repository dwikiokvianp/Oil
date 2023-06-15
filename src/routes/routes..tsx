import { createBrowserRouter } from "react-router-dom";
import homeRoutes from "./HomeRoutes.tsx";
import authRoutes from "./AuthRoutes.tsx";
import adminRoutes from "./AdminRoutes.tsx";
import officerRoutes from "./OfficerRoutes.tsx";

const router = [...homeRoutes, ...authRoutes];
const adminRouter = [...authRoutes, adminRoutes];
const officeRouter = [...authRoutes, officerRoutes];

const BrowserRouter = createBrowserRouter(router);

export { BrowserRouter, adminRouter, officeRouter };
