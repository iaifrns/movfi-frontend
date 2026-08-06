export const getTailBeatAmplitude = (data: Record<string, any>) => {
  if (!data || Object.keys(data).length === 0) {
    console.log("No data or joints available");
    return 0;
  }

  const frames = Object.keys(data)
    .filter((key) => key.includes("x"))
    .map((key) => parseInt(key));

  const minY = Math.min(...frames.map((frame) => data[`${frame}y`]));
  const maxY = Math.max(...frames.map((frame) => data[`${frame}y`]));

  const amplitude = (maxY - minY) / 2;

  return amplitude.toFixed(3);
};
