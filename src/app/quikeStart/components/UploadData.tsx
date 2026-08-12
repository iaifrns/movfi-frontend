import UploadIcon from "@/assets/icons/upload";
import { useState } from "react";
import DataGenerateInputs from "./DataGenerateInputs";
import type { SimulatedData } from "@/types/fish";

const UploadData = ({
  nex,
  prev,
}: {
  nex: (v: File | SimulatedData) => void;
  prev: () => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploadData, setIsUploadData] = useState(true);
  const [simulatedData, setSimulatedData] = useState<SimulatedData>({
    fps: 30,
    duration: 5,
    body_points: 100,
    max_amplitude: 5,
    tail_beat_frequency: 2,
    wave_length: 1.2,
  });

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };
  return (
    <div className="w-full flex flex-col gap-3 p-4">
      <div className="w-full flex flex-col gap-1">
        <div className="w-full flex mb-2">
          <button
            className={`flex-1 rounded-l-md p-2 border ${isUploadData && "bg-primary text-white"}`}
            onClick={() => setIsUploadData(true)}
          >
            Upload Raw Data
          </button>
          <button
            className={`flex-1 rounded-r-md p-2 border ${!isUploadData && "bg-primary text-white"}`}
            onClick={() => setIsUploadData(false)}
          >
            Use Pre-processed Kinematic Datasets
          </button>
        </div>
        {isUploadData ? (
          <>
            <label htmlFor="fileUpload" className="font-bold">
              Upload Movement Data
            </label>
            <div className="text-sm mb-2">
              Please upload your movement data in CSV or Excel format. Ensure
              that the file contains the necessary columns for analysis.
            </div>
            <div
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 text-center flex justify-center items-center flex-col cursor-pointer hover:bg-gray-200 *:**:"
              onClick={() => document.getElementById("fileUpload")?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <UploadIcon color="gray" w="54px" h="54px" />
              <p>{file?.name}</p>
              <p className="mt-2">
                Drag and drop your file here, or click to select a file
              </p>
            </div>
            <input
              type="file"
              id="fileUpload"
              name="fileUpload"
              accept=".csv, .xlsx"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
              className="hidden w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </>
        ) : (
          <>
            <DataGenerateInputs
              dataInput={simulatedData}
              setDataInput={setSimulatedData}
            />
          </>
        )}
      </div>
      <div className="w-full flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-300"
          onClick={prev}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-primary/50"
          onClick={() =>
            nex(
              isUploadData
                ? (file as File)
                : {
                    duration: simulatedData.duration || 0,
                    fps: simulatedData.fps || 0,
                    body_points: simulatedData.body_points || 0,
                    max_amplitude: simulatedData.max_amplitude || 0,
                    tail_beat_frequency: simulatedData.tail_beat_frequency || 0,
                    wave_length: simulatedData.wave_length || 0,
                  },
            )
          }
          disabled={file == null && isUploadData ? true : false}
        >
          Upload Data
        </button>
      </div>
    </div>
  );
};

export default UploadData;
