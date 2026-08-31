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
  login,
  quickStart,
  register,
  visualization,
} from "./constant/routs";
import DashboardLayout from "./layout/DashboardLayout";
import ProtectingLayout from "./layout/ProtectingLayout";
import GeneratePDF from "./app/generatePdf";
import RegistrationPage from "./app/authentification/Register";
import LoginPage from "./app/authentification/Login";

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
  {
    path: register,
    Component: RegistrationPage,
  },
  {
    path: login,
    Component: LoginPage,
  },
]);

export default router;
