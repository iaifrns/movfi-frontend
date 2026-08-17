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
import { SectionCards } from "@/components/section-cards";

import LoadingPage from "@/components/LoadingPage";
import { dataContext } from "@/hooks/useContext";
import { useContext, useEffect, useState } from "react";
import { checkFishFileDataAndJointPoints } from "../fileData/services/getDataFile";
import SvgAnimation from "../visualization/components/svgAnimation";
import JointAngles from "./components/jointAngles";
import { getOneActivity } from "./services/getOneActivity";

export default function Dashaboard() {
  const [loading, setLoading] = useState(true);
  const [jointPoints, setJointPoints] = useState<[]>([]);
  const [seg_length, setSeg_length] = useState(0);
  const [tailAmplitude, setTailAmplitude] = useState(0);
  const [count, setCount] = useState(0);

  const { activity, setActivity, fileData, setFileData, fish, setFish } =
    useContext(dataContext);

  useEffect(() => {
    if (activity.id.length < 1) {
      setLoading(true);
      getOneActivity(setActivity);
    }
  }, []);

  const handleJointsSegments = (result: any) => {
    setJointPoints(result.joints);
    setSeg_length(result.segementation_length);
    setTailAmplitude(result.tail_amplitude);
  };

  useEffect(() => {
    if (activity.id.length > 3) {
      setLoading(true);
      checkFishFileDataAndJointPoints(
        fish.id,
        activity.id,
        setFish,
        setFileData,
        handleJointsSegments,
        setCount,
      ).then(() => {
        setLoading(false);
      });
    }
  }, [activity]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <SectionCards
        jointPoints={jointPoints}
        data={fileData?.data}
        seg_length={seg_length}
        tailAmplitude={tailAmplitude}
      />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive
          fileData={fileData?.data || []}
          fishId={fish.id}
          count={count}
          fileId={fileData?.id ?? ""}
        />
      </div>
      <SvgAnimation
        fileData={fileData}
        title="Annimated Fish Movement With Full Data"
        isDashboard={true}
      />
      <JointAngles data={fileData?.data} joints={jointPoints} fileId={fileData?.id ?? ""} count={count} />
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
