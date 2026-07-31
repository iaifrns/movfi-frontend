import LoadingPage from "@/components/LoadingPage";
import { dataContext } from "@/hooks/useContext";
import { useContext, useEffect, useState } from "react";
import { getOneActivity } from "../dashboard/services/getOneActivity";
import { checkFishAndFileData } from "../fileData/services/getDataFile";
import SvgAnimation from "./components/svgAnimation";
import { animationPoints } from "./services/animationPoints";

const VisualizationPage = () => {
  const { fileData, setFileData, fish, setFish, activity, setActivity } =
    useContext(dataContext);
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState<Record<string, any[]>>({});
  const [framesList, setFramesList] = useState<string[]>([]);

  useEffect(() => {
    if (activity.id.length < 1) {
      setLoading(true);
      getOneActivity(setActivity);
    }
  }, []);

  useEffect(() => {
    if (activity.id.length > 3) {
      setLoading(true);
      checkFishAndFileData(
        fish.id,
        fileData?.id,
        activity.id,
        setFish,
        setFileData,
      ).then(() => {
        setLoading(false);
      });
    }
  }, [activity]);

  useEffect(() => {
    if (fileData?.data) {
      animationPoints(fileData.data, setPoints, setFramesList);
    }
  }, [fileData]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <SvgAnimation points={points} framesList={framesList} />
    </>
  );
};

export default VisualizationPage;
