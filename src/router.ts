import { createBrowserRouter } from "react-router";
import ActivityList from "./app/activity/ActivityList";
import DetailActivity from "./app/activity/DetailActivity";
import AnalysisPage from "./app/analysis";
import Dashboard from "./app/dashboard/dashboard";
import FileData from "./app/fileData";
import QuickCreatePage from "./app/quikeStart";
import VisualizationPage from "./app/visualization";
import {
  activityList,
  analysis,
  detailActivity,
  fileData,
  generatepdf,
  quickStart,
  visualization,
} from "./constant/routs";
import DashboardLayout from "./layout/DashboardLayout";
import ProtectingLayout from "./layout/ProtectingLayout";
import GeneratePDF from "./app/generatePdf";

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
          { path: generatepdf, Component: GeneratePDF },
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
