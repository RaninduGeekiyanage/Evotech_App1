"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import { getMonthlyAddedMovie } from "@/lib/actions/dashboard/monthly-movie";

const chartConfig = {
  movies: {
    label: "Completed Jobs",
    color: "hsl(var(--chart-1))",
  },
};

export function MonthlyJobChart() {
  const [data, setData] = useState([]);
  const [maxCount, setMaxCount] = useState(0);
  const [monthName, setMonthName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const movies = await getMonthlyAddedMovie();
      if (movies && movies.data) {
        setData(movies.data);
        setMonthName(movies.year + " - " + movies.month); // Set correct month name from backend
        setMaxCount(Math.max(...movies.data.map((movie) => movie.count), 0) + 5);
      }
    }

    fetchData();
  }, []);

  return (
    <Card className="dark:bg-neutral-900">
      <CardHeader>
        <CardTitle>Daily Added Movie Count for {monthName}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="md:w-[800px] md:h-[200px]" config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <YAxis
              type="number"
              domain={[0, maxCount]}
              tickCount={5} // Use a reasonable number
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="count" fill="hsl(210, 70%, 50%)" radius={8}>
              <LabelList
                dataKey="count"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value) => (value > 0 ? value : "")}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing movie additions per day for {monthName}
        </div>
      </CardFooter>
    </Card>
  );
}
