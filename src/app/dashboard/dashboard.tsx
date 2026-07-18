/* Home
Docs
Components
Blocks
Charts
Directory
Create
118k
Components for Chat Interfaces
Building Blocks for the Web

Clean, modern building blocks. Copy and paste into your apps. Works with all React frameworks. Open Source. Free forever.
Browse Blocks
View Components
Featured
Sidebar
Login
Signup
Browse all blocks
A dashboard with sidebar, charts and data table
Open in New Tab
Open in
Files

app/dashboard/page.tsx */

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import LoadingPage from "@/components/LoadingPage";
import { dataContext } from "@/hooks/useContext";
import { useContext, useEffect, useState } from "react";
import data from "./data.json";
import { getOneActivity } from "./services/getOneActivity";

export default function Dashaboard() {
  const [loading, setLoading] = useState(false);

  const { activity, setActivity } = useContext(dataContext);

  useEffect(() => {
    if (activity.id.length < 1) {
      setLoading(true);
      getOneActivity(setActivity).then(() => {
        setLoading(false);
      });
    } else {
      setActivity(activity);
    }
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </>
  );
}
/* 
A sidebar that collapses to icons
Open in New Tab
Open in
A sidebar with submenus
Open in New Tab
Open in
A login page with a muted background color
Open in New Tab
Open in
A login page with form and image
Open in New Tab
Open in
Browse more blocks
Built by shadcn at Vercel. The source code is available on GitHub.
Building Blocks for the Web - shadcn/ui */
