import React from "react";
import { getCurvatures } from "../services/curvature";
import { getJointAngles } from "../services/jointAngles";
import { getPaginatedData } from "@/service/getPaginatedData";
import LoadingIcon from "@/assets/icons/loading";

type JointTableProps = {
  data: Record<string, number[]>;
  option: number;
};

const JointAngleTable: React.FC<JointTableProps> = ({ data, option }) => {
  const rows = Object.entries(data);

  // Find the maximum number of joints
  const maxJoints = Math.max(
    ...Object.values(data).map((joints) => joints.length),
  );

  const getAngle = (angles: number) => {
    if (option === 1) {
      return 180 - angles;
    }
    return angles;
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-300">
      <table className="min-w-max w-full border-collapse">
        <thead>
          <tr className="">
            <th className="border px-4 py-2 text-left">Frame</th>

            {Array.from({ length: maxJoints }).map((_, index) => (
              <th key={index} className="border px-4 py-2 text-left">
                {option == 2 ? "Curvature" : "Angle"} {index + 1}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map(([key, joints]) => (
            <tr key={key} className="hover:bg-border">
              <td className="border px-4 py-2 font-medium">{key}</td>

              {Array.from({ length: maxJoints }).map((_, index) => (
                <td key={index} className="border px-4 py-2">
                  {joints[index] !== undefined
                    ? `${getAngle(joints[index]).toFixed(2)} ${option != 2 ? "°" : ""}`
                    : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const JointAngles = ({
  data,
  joints,
  count,
  fileId
}: {
  data?: Record<string, any>[];
  joints: [];
  count: number;
  fileId: string
}) => {
  const [jointAngles, setJointAngles] = React.useState<Record<string, any>>({});
  const [curvature, setCurvature] = React.useState<Record<string, any>>({});
  const [tableOption, setTableOption] = React.useState(0);
  const [displayData, setDisplayData] = React.useState<
    Record<string, any>[] | undefined
  >(data);
  const [isFirst, setIsFirst] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    if (!displayData || displayData.length === 0 || joints.length === 0) {
      console.log("No data or joints available");
      return;
    }
    setJointAngles(getJointAngles(displayData, joints));
    setCurvature(getCurvatures(displayData, joints));
  }, [displayData]);

  React.useEffect(() => {
    if (!isFirst) {
      setIsLoading(true)
      getPaginatedData(fileId, page, (v) => {
        setDisplayData(v);
      }).then(() => setIsLoading(false));
    } else {
      setIsFirst(false);
    }
  }, [page]);

  return (
    <div className="flex flex-col gap-4 mx-6">
      <div className="flex justify-between items-center max-md:flex-col gap-2">
        <p className="font-semibold text-lg">
          {tableOption === 0 ? "Joint Angles Table" : "Bending Angles Table"}
        </p>
        <div className="flex gap-2">
          <button
            className={`border rounded-md p-2 w-35 cursor-pointer ${tableOption == 0 && "bg-primary text-white"}`}
            onClick={() => setTableOption(0)}
          >
            Joint Angles
          </button>
          <button
            className={`border rounded-md p-2 w-35 cursor-pointer ${tableOption == 1 && "bg-primary text-white"}`}
            onClick={() => setTableOption(1)}
          >
            Bending Angle
          </button>
          <button
            className={`border rounded-md p-2 w-35 cursor-pointer ${tableOption == 2 && "bg-primary text-white"}`}
            onClick={() => setTableOption(2)}
          >
            Curvature
          </button>
        </div>
      </div>
      {isLoading && <div className="w-full flex justify-center items-center"><LoadingIcon /><p>Loading ...</p></div>}
      <JointAngleTable
        data={tableOption < 2 ? jointAngles : curvature}
        option={tableOption}
      />
      <div className="flex items-center justify-end w-full px-6 gap-1">
        <button
          className="p-2 border rounded-md cursor-pointer bg-border disabled:bg-transparent disabled:cursor-auto"
          disabled={page < 2}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <p className="text-lg">
          {page}...{Math.round(count / 10)}
        </p>
        <button
          className="p-2 border rounded-md bg-border cursor-pointer disabled:bg-transparent disabled:cursor-auto"
          disabled={page == Math.round(count / 10)}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JointAngles;
