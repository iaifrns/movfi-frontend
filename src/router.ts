import { createBrowserRouter } from "react-router";
import Dashboard from "./app/dashboard/dashboard";
import QuickCreatePage from "./app/quikeStart";
import ProtectingLayout from "./layout/ProtectingLayout";
import {
  activityList,
  analysis,
  detailActivity,
  fileData,
  quickStart,
  visualization,
} from "./constant/routs";
import DashboardLayout from "./layout/DashboardLayout";
import ActivityList from "./app/activity/ActivityList";
import DetailActivity from "./app/activity/DetailActivity";
import FileData from "./app/fileData";
import VisualizationPage from "./app/visualization";
import AnalysisPage from "./app/analysis";

const router = createBrowserRouter([
  {
    path: "/",
    Component: ProtectingLayout,
    children: [
      {
        path: "/",
        Component: DashboardLayout,
        children: [
          { index: true, Component: Dashboard },
          { path: activityList, Component: ActivityList },
          { path: detailActivity, Component: DetailActivity },
          { path: fileData, Component: FileData },
          { path: visualization, Component: VisualizationPage },
          { path: analysis, Component: AnalysisPage },
        ],
      },
      {
        path: quickStart,
        Component: QuickCreatePage,
      },
    ],
  },
]);

export default router;
