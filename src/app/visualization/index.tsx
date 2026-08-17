import LoadingPage from "@/components/LoadingPage";
import { dataContext } from "@/hooks/useContext";
import type { FileDataStructure } from "@/types/fish";
import { useContext, useEffect, useState } from "react";
import { getOneActivity } from "../dashboard/services/getOneActivity";
import { selectData } from "../dashboard/services/rearrangeData";
import { checkFishAndGetAllFileData } from "../fileData/services/getDataFile";
import SvgAnimation from "./components/svgAnimation";

const VisualizationPage = () => {
  const { fish, setFish, activity, setActivity } = useContext(dataContext);
  const [loading, setLoading] = useState(false);
  const [allJoinPoints, setAllJointPoints] = useState<[]>([]);
  const [displayData, setDisplayData] = useState<Record<string, any>[]>([]);
  const [fileData, setFileData] = useState<FileDataStructure | null>(null);

  useEffect(() => {
    if (activity.id.length < 1) {
      setLoading(true);
      getOneActivity(setActivity);
    }
  }, []);

  useEffect(() => {
    if (activity.id.length > 3) {
      setLoading(true);
      checkFishAndGetAllFileData(
        fish.id,
        fileData?.id,
        activity.id,
        setFish,
        setFileData,
        (_: number) => {},
      ).then(() => {
        setLoading(false);
      });
    }
  }, [activity]);

  useEffect(() => {
    if (fileData?.data) {
      setDisplayData(fileData.data);
      selectData(
        fish.id,
        setDisplayData,
        fileData.data,
        allJoinPoints,
        setAllJointPoints,
      );
    }
  }, [fileData]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <SvgAnimation
        fileData={fileData}
        title="Annimated Fish Movement With Full Data"
      />
      <SvgAnimation
        fileData={{ ...fileData, data: displayData } as FileDataStructure}
        title="Annimated Fish Movement With Segmente"
      />
    </>
  );
};

export default VisualizationPage;
