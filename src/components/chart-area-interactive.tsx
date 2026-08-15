"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { seperateXfromY } from "@/app/dashboard/services/seprateXfromY";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { generateDistinctColors } from "@/service/generateColors";
import LoadingIcon from "@/assets/icons/loading";
import {
  reArrangeData,
  selectData,
} from "@/app/dashboard/services/rearrangeData";

export const description = "An interactive area chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive({
  fileData,
  fishId,
  count
}: {
  fileData: Record<string, any>[];
  fishId: string;
  count: number
}) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");
  const [axises, setAxises] = React.useState<{
    x_axis: string[];
    y_axis: string[];
  }>({
    x_axis: [],
    y_axis: [],
  });
  const [colors, setColors] = React.useState<string[]>([]);
  const [isGraphLoading, setIsGraphLoading] = React.useState(false);
  const [displayData, setDisplayData] = React.useState(fileData);
  const [joinDatas, setJointDatas] = React.useState({});
  const [allJoinPoints, setAllJointPoints] = React.useState<[]>([]);

  React.useEffect(() => {
    setAxises(seperateXfromY(displayData[0]));
    setColors(generateDistinctColors(Object.keys(displayData[0]).length));
  }, [displayData]);

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const handleGetEachFrameJoint = () => {
    setIsGraphLoading(true);
    reArrangeData(
      fishId,
      fileData,
      setDisplayData,
      joinDatas,
      setJointDatas,
    ).then(() => setIsGraphLoading(false));
  };

  const handleUseJointPoint = () => {
    setIsGraphLoading(true);
    selectData(
      fishId,
      setDisplayData,
      fileData,
      allJoinPoints,
      setAllJointPoints,
    ).then(() => setIsGraphLoading(false));
  };

  /* const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  }); */

  /*  if (isGraphLoading) {
    return (
      <div className="flex w-full h-105 justify-center items-center border rounded-md">
        <LoadingIcon w="32px" h="32px" />
      </div>
    );
  } */

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            multiple={false}
            value={timeRange ? [timeRange] : []}
            onValueChange={(value) => {
              setTimeRange(value[0] ?? "90d");
            }}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem
              value="90d"
              onClick={() => setDisplayData(fileData)}
            >
              Orinal Data
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" onClick={handleGetEachFrameJoint}>
              Joint points of every frame
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" onClick={handleUseJointPoint}>
              General joint points
            </ToggleGroupItem>
          </ToggleGroup>
          <Select
            value={timeRange}
            onValueChange={(value) => {
              if (value !== null) {
                setTimeRange(value);
              }
            }}
          >
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      {isGraphLoading && (
        <div className="flex w-full justify-center items-center  rounded-md">
          <LoadingIcon w="24px" h="24px" />
          <p className="animate-pulse font-semibold">Loading ...</p>
        </div>
      )}
      <p className="px-6 text-end">1-10 on {count}</p>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-62.5 w-full"
        >
          <AreaChart data={displayData}>
            <CartesianGrid vertical={false} />
            {axises.x_axis.map((item) => (
              <XAxis
                dataKey={item}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  return value.toFixed(4);
                }}
              />
            ))}
            {/* <YAxis
              domain={[-0.5, 1]} // Sets min to 0, max to 100
            /> */}
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return value;
                  }}
                  indicator="dot"
                />
              }
            />
            {axises.y_axis.map((item, ind) => (
              <Area
                dataKey={item}
                type="natural"
                fill={colors[ind]}
                fillOpacity={0.05}
                stroke={colors[ind]}
                stackId="a"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <div className="flex items-center justify-end w-full px-6">
        <button className="p-2 border rounded-md">Prev</button>
        <p className="text-lg">1...10</p>
        <button className="p-2 border rounded-md">Next</button>
      </div>
    </Card>
  );
}
