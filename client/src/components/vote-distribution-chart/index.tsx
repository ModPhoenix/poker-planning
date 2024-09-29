import { FC, useMemo } from "react";
import {
  Bar,
  BarChart,
  Label,
  Rectangle,
  ReferenceLine,
  XAxis,
} from "recharts";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Room } from "@/types";

interface VoteDistributionChartProps {
  room: Room;
}

export const VoteDistributionChart: FC<VoteDistributionChartProps> = ({
  room,
}) => {
  const chartData = useMemo(() => {
    const voteCount: { [key: string]: number } = {};
    room.game.table.forEach((userCard) => {
      if (userCard.card) {
        voteCount[userCard.card] = (voteCount[userCard.card] || 0) + 1;
      }
    });
    return Object.entries(voteCount).map(([card, count]) => ({
      card,
      count,
    }));
  }, [room.game.table]);

  const maxCardCount = useMemo(() => {
    return Math.max(...chartData.map((card) => card.count));
  }, [chartData]);

  const averageVote = useMemo(() => {
    const numericVotes = room.game.table
      .map((userCard) => parseFloat(userCard.card || "0"))
      .filter((vote) => !isNaN(vote));
    const sum = numericVotes.reduce((acc, vote) => acc + vote, 0);
    return numericVotes.length > 0 ? sum / numericVotes.length : 0;
  }, [room.game.table]);

  return (
    <div>
      <CardHeader className="space-y-0 pb-2"></CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            card: {
              label: "Card",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <BarChart
            accessibilityLayer
            margin={{
              left: -4,
              right: -4,
            }}
            data={chartData}
          >
            <Bar
              dataKey="count"
              fill="hsl(var(--chart-1))"
              radius={5}
              fillOpacity={0.6}
              activeBar={<Rectangle fillOpacity={0.8} />}
            />
            <XAxis
              dataKey="card"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `Card: ${value}`}
                />
              }
              cursor={false}
            />
            <ReferenceLine
              y={maxCardCount / 2}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value="Average Vote"
                offset={10}
                fill="hsl(var(--foreground))"
              />
              <Label
                position="insideTopLeft"
                value={averageVote.toFixed(1)}
                className="text-lg"
                fill="hsl(var(--foreground))"
                offset={10}
                startOffset={100}
              />
            </ReferenceLine>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-between gap-1 pb-0">
        <CardTitle className="text-4xl tabular-nums mr-4">
          {averageVote.toFixed(1)}{" "}
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            average
          </span>
        </CardTitle>
        <div className="flex flex-col gap-2">
          <CardDescription>
            Most common vote:{" "}
            <span className="font-medium text-foreground">
              {chartData.reduce((a, b) => (a.count > b.count ? a : b)).card}
            </span>
          </CardDescription>
          <CardDescription>
            Total votes: {room.game.table.length}
          </CardDescription>
        </div>
      </CardFooter>
    </div>
  );
};
