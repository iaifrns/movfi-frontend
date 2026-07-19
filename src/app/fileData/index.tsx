import LoadingPage from "@/components/LoadingPage";
import { dataContext } from "@/hooks/useContext";
import { getFishByActivity } from "@/service/getFishsByActivity";
import { useContext, useEffect, useState } from "react";
import { getDataFileFromSupabase } from "./services/getDataFile";

const FileData = () => {
  const { fish, activity, setFish } = useContext(dataContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fish.id.length < 1) {
      setLoading(true);
      getFishByActivity(activity.id, (v) => setFish(v[0])).then(() =>
        setLoading(false),
      );
    }
  }, []);

  useEffect(()=>{
    if(fish.file){
        getDataFileFromSupabase(fish.file.fullPath)
    }
  }, [fish])

  if (loading) {
    <LoadingPage />;
  }

  return <div>file data {fish.name}</div>;
};

export default FileData;
