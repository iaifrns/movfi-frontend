import { useState } from "react";
import ActivityForm from "./components/ActivityForm";
import ProgressBar from "./components/ProgressBar";
import FishFrom from "./components/FishFrom";
import UploadData from "./components/UploadData";
import FishIcon from "@/assets/icons/fish";
import BackIcon from "@/assets/icons/back";
import { useNavigate } from "react-router";

export type Activiy = {
  name: string;
  description: string;
};

export type Fish = {
  name: string;
  note: string;
  behavior: string;
  weight: number;
  lenght: number;
};

const QuickCreatePage = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{ fish: Fish; activity: Activiy }>({
    activity: {
      name: "",
      description: "",
    },
    fish: {
      name: "",
      note: "",
      behavior: "",
      weight: 0,
      lenght: 0,
    },
  });

  const handleOnFishChange = (fish: Fish) =>
    setFormData({ ...formData, fish: fish });

  const handleOnActivityChange = (activity: Activiy) =>
    setFormData({ ...formData, activity: activity });

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
            <FishFrom prev={() => setPage(1)} nex={() => setPage(3)} fish={formData.fish} setFish={handleOnFishChange} />
          )}
          {page == 3 && <UploadData prev={() => setPage(2)} nex={() => {}} />}
        </div>
      </div>
    </div>
  );
};

export default QuickCreatePage;
