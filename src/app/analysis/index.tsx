import LoadingPage from "@/components/LoadingPage";
import { dataContext } from "@/hooks/useContext";
import { useContext, useEffect, useState } from "react";
import { getOneActivity } from "../dashboard/services/getOneActivity";
import { checkFishFileDataAndJointPoints } from "../fileData/services/getDataFile";
import { SectionCards } from "@/components/section-cards";
import JointAngles from "../dashboard/components/jointAngles";

const AnalysisPage = () => {
  const [loading, setLoading] = useState(true);
  const [jointPoints, setJointPoints] = useState<[]>([]);

  const { activity, setActivity, fileData, setFileData, fish, setFish } =
    useContext(dataContext);

  useEffect(() => {
    if (activity.id.length < 1) {
      setLoading(true);
      getOneActivity(setActivity);
    }
  }, []);

  useEffect(() => {
    if (activity.id.length > 3) {
      setLoading(true);
      checkFishFileDataAndJointPoints(
        fish.id,
        activity.id,
        setFish,
        setFileData,
        setJointPoints,
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
      <SectionCards jointPoints={jointPoints} data={fileData?.data} />

      <JointAngles data={fileData?.data} joints={jointPoints} />
    </>
  );
};

export default AnalysisPage;
