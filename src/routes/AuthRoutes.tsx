import Login from "../pages/Auth/Login/Login.tsx";
import Register from "../pages/Auth/Register/Register.tsx";

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
