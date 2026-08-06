export const getCurvatures = (data: Record<string, any>[], joints: []) => {
  const frames = Object.keys(data[0])
    .filter((key) => key.endsWith("x"))
    .map((key) => key.slice(0, -1));

  const newJoints = [0, ...joints, data.length - 1];
  const curvatures: Record<string, any> = {};
};
