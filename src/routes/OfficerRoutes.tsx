import Home from "../pages/Home/Home.tsx";
import Scan from "../pages/Scan/Scan.tsx";
import { CameraReact } from "../pages/Camera/Camera.tsx";

const officerRoutes = [
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/scan", element: <Scan /> },
      { path: "/camera", element: <CameraReact /> },
    ],
  },
];

export default officerRoutes;
