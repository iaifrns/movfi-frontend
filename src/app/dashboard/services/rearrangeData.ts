import {
  getEachFrameJointPoint,
  getGeneralJointPoint,
} from "@/service/getJointpoints";

export const reArrangeData = async (
  fishId: string,
  data: Record<string, any>[],
  setData: (_: Record<string, any>[]) => void,
  joints: {},
  setJoints: (_: {}) => void,
) => {
  let jointData: any;
  if (Object.keys(joints).length == 0) {
    jointData = await getEachFrameJointPoint(fishId);
    setJoints(jointData);
  } else {
    jointData = joints;
  }

  if (jointData == null) {
    alert("Could not get the joint data");
    return;
  }

  const newFileData = [data[0]];

  let count = 1;
  let j = 0;

  for (let key in jointData) {
    for (let i = 0; i < jointData[key].length; i++) {
      let ind = jointData[key][i];
      let x = key + "x";
      let y = key + "y";
      let ob = { [x]: data[ind][x], [y]: data[ind][y] };
      if (j == 0 || !newFileData[count]) {
        newFileData.push(ob);
      } else {
        newFileData[count] = { ...newFileData[count], ...ob };
      }
      count++;
    }
    let ob = {
      [key + "x"]: data.at(-1)![key + "x"],
      [key + "y"]: data.at(-1)![key + "y"],
    };
    if (!newFileData[count]) {
      newFileData.push(ob);
    } else {
      newFileData[count] = { ...newFileData[count], ...ob };
    }
    j++;
    count = 1;
  }

  setData(newFileData);
};

export const selectData = async (
  fishId: string,
  setData: (_: Record<string, any>[]) => void,
  data: Record<string, any>[],
  joints: [],
  setJoints:(_:[])=>void
) => {
  let joinPoints = joints;
  if(joinPoints.length < 1){
    const result = await getGeneralJointPoint(fishId);
    joinPoints = result.joints
    setJoints(joinPoints)
  }
  const newList: Record<string, any>[] = [];

  if (joinPoints == null) {
    alert("an error occured please try later");
    return;
  }

  newList.push(data[0]);

  for (let i = 0; i < joinPoints.length; i++) {
    newList.push(data[joinPoints[i]]);
  }

  newList.push(data.at(-1)!);

  console.log(newList);
  setData(newList);
};
