import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home.tsx";
import Login from "../pages/Login/Login.tsx";
import Sales from "../pages/Sales/Sales.tsx";
import Scan from "../pages/Scan/Scan.tsx";
import Order from "../pages/Order/Order.tsx";
import { CameraReact } from "../pages/Camera/Camera.tsx";
import Dashboard from "../pages/Dashboard/Dashboard.tsx";
import Register from "../pages/Register/Register.tsx";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      { path: "/sales", element: <Sales /> },
      {
        path: "/scan",
        element: <Scan />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/camera",
        element: <CameraReact />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default BrowserRouter;
