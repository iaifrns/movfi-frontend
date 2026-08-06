const distance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

export const getSegmentationLength = (
  data: Record<string, any>[],
  joints: [],
) => {
  if (data.length < 2 || joints.length == 0) {
    return 0;
  }

  let totalLength = 0;
  const frame = Object.keys(data[0])[0].slice(0, -1);
  const newJoints = [0, ...joints, data.length - 1];
  for (let i = 0; i < (newJoints.length - 1); i++) {
    let joint = newJoints[i];
    let x1 = data[joint][frame + "x"];
    let y1 = data[joint][frame + "y"];
    let x2 = data[newJoints[i + 1]][frame + "x"];
    let y2 = data[newJoints[i + 1]][frame + "y"];
    totalLength += distance(x1, y1, x2, y2);
  }

  return totalLength.toFixed(4);
};
