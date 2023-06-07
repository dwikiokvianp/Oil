import Login from "../pages/Login/Login.tsx";
import Register from "../pages/Register/Register.tsx";
import { redirectRoot } from "../utils/redirect.utils.ts";

const authRoutes = [
  {
    path: "/login",
    loader: redirectRoot,
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
    loader: redirectRoot,
  },
];

export default authRoutes;
