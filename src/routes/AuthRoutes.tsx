import Login from "../pages/Login/Login.tsx";
import Register from "../pages/Register/Register.tsx";

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
