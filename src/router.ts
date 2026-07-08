import { createBrowserRouter } from "react-router";
import Dashboard from "./app/dashboard/dashboard";
import QuickCreatePage from "./app/quikeStart";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/quick-start",
    Component: QuickCreatePage
  }
]);

export default router;
