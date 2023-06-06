import { createBrowserRouter } from "react-router-dom";
import homeRoutes from "./HomeRoutes.tsx";
import authRoutes from "./AuthRoutes.tsx";

const router = [...homeRoutes, ...authRoutes];

const BrowserRouter = createBrowserRouter(router);

export default BrowserRouter;
