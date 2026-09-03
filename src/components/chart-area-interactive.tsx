"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { selectData } from "@/app/dashboard/services/rearrangeData";
import { seperateXfromY } from "@/app/dashboard/services/seprateXfromY";
import LoadingIcon from "@/assets/icons/loading";
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
import { generateDistinctColors } from "@/service/generateColors";
import { getPaginatedData } from "@/service/getPaginatedData";

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
  count,
  fileId,
  joints,
  setJoints
}: {
  fileData: Record<string, any>[];
  fishId: string;
  count: number;
  fileId: string;
  joints: [];
  setJoints: (_:[]) => void
}) {
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
  const [copyData, setCopyData] = React.useState(fileData);
  const [displayData, setDisplayData] = React.useState(fileData);
  const [page, setPage] = React.useState(1);
  const [isFirstTime, setIsFirstTime] = React.useState(true);

  React.useEffect(() => {
    if (displayData.length > 0) {
      setAxises(seperateXfromY(displayData[0]));
      setColors(generateDistinctColors(Object.keys(displayData[0]).length));
    }
  }, [displayData]);

  React.useEffect(() => {
    if (!isFirstTime) {
      setIsGraphLoading(true);
      getPaginatedData(fileId, page, (v) => {
        setDisplayData(v);
        setCopyData(v);
      }).then(() => setIsGraphLoading(false));
    } else {
      setIsFirstTime(false);
    }
  }, [page]);

  /* const handleGetEachFrameJoint = () => {
    setIsGraphLoading(true);
    reArrangeData(
      fishId,
      displayData,
      setDisplayData,
      joinDatas,
      setJointDatas,
    ).then(() => setIsGraphLoading(false));
  }; */

  const handleUseJointPoint = () => {
    setIsGraphLoading(true);
    selectData(
      fishId,
      setDisplayData,
      displayData,
      joints,
      setJoints,
    ).then(() => setIsGraphLoading(false));
  };

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Fish kinematic movement</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Fish movement accross frames
          </span>
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
              onClick={() => setDisplayData(copyData)}
            >
              Orinal Data
            </ToggleGroupItem>
            {/* <ToggleGroupItem value="30d" onClick={handleGetEachFrameJoint}>
              Joint points of every frame
            </ToggleGroupItem> */}
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
          ></Select>
        </CardAction>
      </CardHeader>
      {isGraphLoading && (
        <div className="flex w-full justify-center items-center  rounded-md">
          <LoadingIcon w="24px" h="24px" />
          <p className="animate-pulse font-semibold">Loading ...</p>
        </div>
      )}
      <p className="px-6 text-end">
        {1 + (page - 1) * 10}-{10 * page} on {count}
      </p>
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
      <div className="flex items-center justify-end w-full px-6 gap-1">
        <button
          className="p-2 border rounded-md cursor-pointer bg-border disabled:bg-transparent disabled:cursor-auto"
          disabled={page < 2}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <p className="text-lg">
          {page}...{Math.round(count / 10)}
        </p>
        <button
          className="p-2 border rounded-md bg-border cursor-pointer disabled:bg-transparent disabled:cursor-auto"
          disabled={page == Math.round(count / 10)}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </Card>
  );
}
