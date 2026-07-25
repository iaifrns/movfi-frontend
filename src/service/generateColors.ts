export function generateDistinctColors(
  count: number,
  saturation: number = 80,
  lightness: number = 60,
): string[] {
  const colors: string[] = [];
  const goldenRatio = (Math.sqrt(5) - 1) / 2; // ~0.618
  let hue = 0;

  for (let i = 0; i < count; i++) {
    // Use golden ratio to spread hues evenly
    hue = (hue + goldenRatio) % 1;
    const hueDegrees = Math.round(hue * 360);
    colors.push(`hsl(${hueDegrees}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
}
