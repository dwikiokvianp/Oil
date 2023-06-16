import Home from "../pages/Home/Home.tsx";
import { CameraReact } from "../pages/Camera/Camera.tsx";

const officerRoutes = [
  {
    path: "/",
    element: <Home />,
    children: [{ path: "/camera", element: <CameraReact /> }],
  },
];

export default officerRoutes;
