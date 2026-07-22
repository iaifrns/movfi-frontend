import BackIcon from "@/assets/icons/back";
import FishIcon from "@/assets/icons/fish";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import ActivityForm from "./components/ActivityForm";
import FishFrom from "./components/FishFrom";
import ProgressBar from "./components/ProgressBar";
import UploadData from "./components/UploadData";
import { quickStart } from "./services/quickStart";
import { dataContext } from "@/hooks/useContext";
import { Dashboard } from "@/constant/routs";

export type Activiy = {
  name: string;
  description: string;
};

export type Fish = {
  name: string;
  note: string;
  behavior: string;
  weight: number;
  length: number;
  species: string;
};

const QuickCreatePage = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    fish: Fish;
    activity: Activiy;
  }>({
    activity: {
      name: "",
      description: "",
    },
    fish: {
      name: "",
      note: "",
      behavior: "",
      species: "",
      weight: 0,
      length: 0,
    },
  });

  const [processList, setProcessList] = useState([
    "Processing Creation of activity ...",
  ]);
  const [processing, setProcessing] = useState(false);

  const handleOnFishChange = (fish: Fish) =>
    setFormData({ ...formData, fish: fish });

  const handleOnActivityChange = (activity: Activiy) =>
    setFormData({ ...formData, activity: activity });

  const handleCreate = async (file: File) => {
    setProcessing(true);
    quickStart(
      formData.activity,
      formData.fish,
      file,
      (v) => setProcessList([...processList, v]),
      handleValidation,
    ).then(() => {
      setProcessing(false);
      setProcessList(["Processing Creation of activity ..."]);
    });
  };

  const { setActivity, setFish, setFileData } = useContext(dataContext);

  const handleValidation = (active: any, fish: any, fileData: any) => {
    setActivity(active);
    setFish(fish);
    setFileData(fileData)
    navigate(Dashboard);
  };

  return (
    <div className="w-full min-h-screen flex flex-col p-8">
      <div className="flex flex-col gap-2 mb-15 max-md:mb-10">
        <div className="flex gap-2 items-center w-full justify-center">
          <FishIcon w="24px" h="24px" />
          <span className="text-base font-semibold">MovFi.</span>
        </div>
        <div className="flex gap-2 items-center ml-10">
          <div className="cursor-pointer" onClick={() => navigate(-1)}>
            <BackIcon w="24px" h="24px" />
          </div>
          <p className="text-2xl font-bold">Quick Start</p>
        </div>
      </div>
      {processing ? (
        <div className="w-full h-full flex justify-center">
          <div className="w-2/3 max-w-210 flex flex-col gap-6 mt-10">
            {processList.map((text, ind) => (
              <p
                className={
                  ind != processList.length - 1
                    ? "text-green-600 font-semibold"
                    : "text-red-600 animate-pulse"
                }
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center">
          <div className="w-2/3 max-w-210 flex flex-col gap-6">
            <ProgressBar progress={page} />
            <p className="text-xl font-bold text-center">
              Filling and verification of informations
            </p>
            {page == 1 && (
              <ActivityForm
                onclick={() => setPage(2)}
                activity={formData.activity}
                setActivity={handleOnActivityChange}
              />
            )}
            {page == 2 && (
              <FishFrom
                prev={() => setPage(1)}
                nex={() => setPage(3)}
                fish={formData.fish}
                setFish={handleOnFishChange}
              />
            )}
            {page == 3 && (
              <UploadData
                prev={() => setPage(2)}
                nex={(file) => {
                  setFormData({ ...formData });
                  handleCreate(file);
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickCreatePage;
