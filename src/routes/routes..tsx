import { createBrowserRouter } from "react-router-dom";
import homeRoutes from "./HomeRoutes.tsx";
import authRoutes from "./AuthRoutes.tsx";
import officerRoutes from "./OfficerRoutes.tsx";

const router = [...homeRoutes, ...authRoutes, ...officerRoutes];

const BrowserRouter = createBrowserRouter(router);

export { BrowserRouter };
