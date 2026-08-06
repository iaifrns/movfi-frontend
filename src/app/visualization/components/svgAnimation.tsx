import NextIcon from "@/assets/icons/next";
import PauseIcon from "@/assets/icons/pause";
import PlayIcon from "@/assets/icons/play";
import PreviousIcon from "@/assets/icons/previous";
import SpeedUpIcon from "@/assets/icons/speedUp";
import type { FileDataStructure } from "@/types/fish";
import { useEffect, useMemo, useState } from "react";
import { animationPoints } from "../services/animationPoints";

const SvgAnimation = ({
  fileData,
  title,
}: {
  fileData: FileDataStructure | null;
  title: string;
}) => {
  const [frame, setFrame] = useState(0);
  const [isPause, setIsPause] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [points, setPoints] = useState<Record<string, any[]>>({});
  const [framesList, setFramesList] = useState<string[]>([]);

  let timer = 0;

  useEffect(() => {
    if (fileData?.data) {
      animationPoints(fileData.data, setPoints, setFramesList);
    }
  }, [fileData]);

  useEffect(() => {
    if (framesList.length > 0 && !isPause) {
      timer = setInterval(() => {
        setFrame((n) => {
          return (n + 1) % framesList.length;
        });
      }, speed);

      return () => clearInterval(timer);
    }
  }, [framesList, isPause, speed]);

  const polylinePoints = useMemo(() => {
    if (Object.keys(points).length > 1) {
      return points[framesList[frame]]
        .map((p) => `${p.x * 850},${200 - p.y * 800}`)
        .join(" ");
    }
  }, [points, frame]);

  const handlePause = () => {
    setIsPause(!isPause);
    if (!isPause == true) {
      clearInterval(timer);
    }
  };

  return (
    <div className="mx-6 flex flex-col gap-2">
      <p className="font-semibold text-lg">{title}</p>
      <div className="flex flex-col gap-2 border rounded-md py-2 px-1">
        <svg className="w-full h-80">
          <polyline
            points={polylinePoints || ""}
            fill="none"
            stroke="blue"
            strokeWidth={4}
          />
        </svg>
        <div className="w-full h-2 bg-gray-300 rounded-xl">
          <div
            className="bg-red-400 h-2 rounded-xl"
            style={{ width: `${((frame + 1) / framesList.length) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3">
        <button
          className="border p-2 rounded-xl rotate-180 cursor-pointer hover:bg-border"
          onClick={() => {
            if (speed < 1500) setSpeed(speed + 100);
          }}
        >
          <SpeedUpIcon w="24px" h="24px" />
        </button>
        <button
          className="border p-2 rounded-xl cursor-pointer hover:bg-border"
          onClick={() =>
            setFrame((n) => {
              if (n == 0) return framesList.length - 1;
              return (n - 1) % framesList.length;
            })
          }
        >
          <PreviousIcon w="24px" h="24px" />
        </button>
        <button
          className="border rounded-full h-15 w-15 flex justify-center items-center cursor-pointer hover:bg-border"
          onClick={handlePause}
        >
          {isPause ? (
            <PlayIcon w="30px" h="30px" />
          ) : (
            <PauseIcon w="40px" h="40px" />
          )}
        </button>
        <button
          className="border p-2 rounded-xl cursor-pointer hover:bg-border"
          onClick={() => setFrame((n) => (n + 1) % framesList.length)}
        >
          <NextIcon w="24px" h="24px" />
        </button>
        <button
          className="border p-2 rounded-xl cursor-pointer hover:bg-border"
          onClick={() => {
            if (speed > 100) setSpeed(speed - 100);
          }}
        >
          <SpeedUpIcon w="24px" h="24px" />
        </button>
      </div>
    </div>
  );
};

export default SvgAnimation;
