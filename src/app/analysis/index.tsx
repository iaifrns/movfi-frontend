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
  const [count, setCount] = useState(0);
  const [seg_length, setSeg_length] = useState(0);
  const [tailAmplitude, setTailAmplitude] = useState(0);

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
        handleJointsSegments,
        setCount,
      ).then(() => {
        setLoading(false);
      });
    }
  }, [activity]);

  const handleJointsSegments = (result: any) => {
    setJointPoints(result.joints);
    setSeg_length(result.segementation_length);
    setTailAmplitude(result.tail_amplitude);
  };

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

      <JointAngles
        data={fileData?.data}
        joints={jointPoints}
        count={count}
        fileId={fileData?.id || ""}
      />
    </>
  );
};

export default AnalysisPage;
