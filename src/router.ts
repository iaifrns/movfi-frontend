import { createBrowserRouter } from "react-router";
import Dashboard from "./app/dashboard/dashboard";
import QuickCreatePage from "./app/quikeStart";
import ProtectingLayout from "./layout/ProtectingLayout";
import { quickStart } from "./constant/routs";

const router = createBrowserRouter([
  {
    path: "/",
    Component: ProtectingLayout,
    children: [
      { index: true, Component: Dashboard },
      {
        path: quickStart,
        Component: QuickCreatePage,
      },
    ],
  },
]);

export default router;
