const getVector = (
  pointA: { x: number; y: number },
  pointB: { x: number; y: number },
) => {
  return {
    x: pointB.x - pointA.x,
    y: pointB.y - pointA.y,
  };
};

const getAngle = (
  vectorA: { x: number; y: number },
  vectorB: { x: number; y: number },
) => {
  const dotProduct = vectorA.x * vectorB.x + vectorA.y * vectorB.y;
  const magnitudeA = Math.sqrt(vectorA.x ** 2 + vectorA.y ** 2);
  const magnitudeB = Math.sqrt(vectorB.x ** 2 + vectorB.y ** 2);
  const cosTheta = dotProduct / (magnitudeA * magnitudeB);
  return Math.acos(cosTheta) * (180 / Math.PI); // Convert to degrees
};

export const getJointAngles = (
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
  const angles: Record<string, any> = {};

  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    angles[frame] = [];
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

      const vectorAB = getVector(pointB, pointA);
      const vectorBC = getVector(pointB, pointC);
      const angle = getAngle(vectorAB, vectorBC);

      angles[frame].push(angle);
    }
  }
  
  return angles;
};
