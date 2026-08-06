import React from "react";
import { getJointAngles } from "../services/jointAngles";

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
                Angle {index + 1}
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
                    ? `${getAngle(joints[index]).toFixed(2)}°`
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
}: {
  data?: Record<string, any>[];
  joints: [];
}) => {
  const [jointAngles, setJointAngles] = React.useState<Record<string, any>>({});
  const [tableOption, setTableOption] = React.useState(0);
  React.useEffect(() => {
    if (!data || data.length === 0 || joints.length === 0) {
      console.log("No data or joints available");
      return;
    }
    setJointAngles(getJointAngles(data, joints));
  }, []);
  return (
    <div className="flex flex-col gap-4 mx-6">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">
            {tableOption === 0 ? "Joint Angles Table" : "Bending Angles Table"}
        </p>
        <select
          className="border rounded-lg p-2"
          defaultValue={0}
          onChange={(e) => setTableOption(Number(e.target.value))}
        >
          <option value={0}>Joint Angles</option>
          <option value={1}>Bending Angle</option>
        </select>
      </div>
      <JointAngleTable data={jointAngles} option={tableOption} />
    </div>
  );
};

export default JointAngles;
