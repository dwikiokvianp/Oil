import Login from "../pages/Auth/pages/Login/Login.tsx";
import Register from "../pages/Auth/pages/Register/Register.tsx";

const authRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default authRoutes;
