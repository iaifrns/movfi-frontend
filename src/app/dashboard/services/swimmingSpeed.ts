const distance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export const swimmingSpeed = (data: Record<string, any>) => {
    if (!data || Object.keys(data).length === 0) {
        console.log("No data or joints available");
        return 0;
    }

    const frames = Object.keys(data)
        .filter((key) => key.includes("x"))
        .map((key) => parseInt(key));

    const headPosition:Record<string, any> = {}

    for (const frame of frames) {
        headPosition[frame] = {
            x: data[`${frame}x`],
            y: data[`${frame}y`]
        }
    }

    let totalDistance = 0;

    for (let i = 1; i < frames.length; i++) {
        const prevFrame = frames[i - 1];
        const currFrame = frames[i];

        totalDistance += distance(
            headPosition[prevFrame].x,
            headPosition[prevFrame].y,
            headPosition[currFrame].x,
            headPosition[currFrame].y
        );
    }

    const totalTime = frames.length / 30; // Assuming 30 frames per second

    const speed = totalDistance / totalTime; // Speed in units per second

    return speed.toFixed(3); // Return speed rounded to 3 decimal places
}