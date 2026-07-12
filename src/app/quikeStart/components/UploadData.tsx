import UploadIcon from "@/assets/icons/upload";
import { useState } from "react";

const UploadData = ({
  nex,
  prev,
}: {
  nex: (v: File) => void;
  prev: () => void;
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };
  return (
    <div className="w-full flex flex-col gap-3 p-4">
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="fileUpload" className="text-sm font-semibold">
          Upload Movement Data
        </label>
        <div className="text-sm text-gray-500 mb-2">
          Please upload your movement data in CSV or Excel format. Ensure that
          the file contains the necessary columns for analysis.
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
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="hidden w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
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
          onClick={() => nex(file as File)}
          disabled={file==null ? true : false}
        >
          Upload Data
        </button>
      </div>
    </div>
  );
};

export default UploadData;
