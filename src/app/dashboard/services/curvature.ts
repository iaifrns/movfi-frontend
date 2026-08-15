const areaOfTriangle = (
  pointA: { x: number; y: number },
  pointB: { x: number; y: number },
  pointC: { x: number; y: number },
) => {
  return Math.abs(
    (pointA.x * (pointB.y - pointC.y) +
      pointB.x * (pointC.y - pointA.y) +
      pointC.x * (pointA.y - pointB.y)) /
      2,
  );
};

const distance = (
  pointA: { x: number; y: number },
  pointB: { x: number; y: number },
) => {
  return Math.sqrt((pointB.x - pointA.x) ** 2 + (pointB.y - pointA.y) ** 2);
};

export const getCurvatures = (
  data: Record<string, any>[],
  joints: [],
) => {
  const frames = Object.keys(data[0])
    .filter((key) => key.endsWith("x"))
    .map((key) => key.slice(0, -1));

  const newJoints = [
    0,
    ...joints,
    data.length - 1,
  ];
  const curvatures: Record<string, any> = {};

  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    curvatures[frame] = [];
    for (let i = 0; i < newJoints.length - 2; i++) {
      const joint1 = newJoints[i];
      const joint2 = newJoints[i + 1];
      const joint3 = newJoints[i + 2];

      const pointA = {
        x: data[joint1][frame + "x"],
        y: data[joint1][frame + "y"],
      };
      const pointB = {
        x: data[joint2][frame + "x"],
        y: data[joint2][frame + "y"],
      };
      const pointC = {
        x: data[joint3][frame + "x"],
        y: data[joint3][frame + "y"],
      };

      const area = areaOfTriangle(pointA, pointB, pointC);
      const a = distance(pointA, pointB);
      const b = distance(pointB, pointC);
      const c = distance(pointA, pointC);

      const curvature = (2 * area) / (a * b * c);

      curvatures[frame].push(curvature);
    }
  }

  return curvatures;
};
