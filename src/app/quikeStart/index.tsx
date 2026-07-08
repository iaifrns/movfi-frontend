import { useState } from "react";
import ActivityForm from "./components/ActivityForm";
import ProgressBar from "./components/ProgressBar";
import FishFrom from "./components/FishFrom";
import UploadData from "./components/UploadData";
import FishIcon from "@/assets/icons/fish";
import BackIcon from "@/assets/icons/back";
import { useNavigate } from "react-router";

const QuickCreatePage = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col p-8">
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
          {page == 1 && <ActivityForm onclick={() => setPage(2)} />}
          {page == 2 && (
            <FishFrom prev={() => setPage(1)} nex={() => setPage(3)} />
          )}
          {page == 3 && <UploadData prev={() => setPage(2)} nex={() => {}} />}
        </div>
      </div>
    </div>
  );
};

export default QuickCreatePage;
