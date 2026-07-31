export const animationPoints = (
  data: Record<string, any>[],
  setPoints: (_: Record<string, any[]>) => void,
  setFrames: (_:string[]) => void
) => {
  const newData: Record<string, any[]> = {};
  for (let key in data[0]) {
    newData[key.slice(0, key.length - 1)] = [];
  }

  setFrames(Object.keys(newData))

  for (let i = 0; i < data.length; i++) {
    for (let key in newData) {
      newData[key].push({ x: data[i][key + "x"], y: data[i][key + "y"] });
    }
  }

  setPoints(newData);
};
