"use client";
import * as React from "react";
import { Label, LabelList, Pie, PieChart } from "recharts";
import {
  Card,
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
import { getMovieGenreCount } from "@/lib/actions/dashboard/get-genere-pie-chart";

export function MovieGenereCategoryPieChart() {
  const [data, setData] = React.useState([]);
  const [totalMovies, setTotalMovies] = React.useState(0); // Store total movies count

  React.useEffect(() => {
    async function fetchData() {
      const { totalMoviesCount, genreCounts } = await getMovieGenreCount();
      setTotalMovies(totalMoviesCount); // Set total movies count
      setData(genreCounts); // Set genre counts
      console.log("categoryCounts", genreCounts);
    }
    fetchData();
  }, []);

  // Format the data for the Pie chart
  const chartData = data.map((item) => ({
    browser: item.genre, // Changed to genre
    visitors: item.count,
    fill: `hsl(${Math.random() * 360}, 70%, 50%)`, // Random color for each genre
  }));

  const chartConfig = {
    visitors: {
      label: "Movies",
    },
  };

  return (
    <Card className="flex flex-col dark:bg-neutral-900">
      <CardHeader className="items-center pb-0">
        <CardTitle>Movies by Genre</CardTitle>
        <CardDescription>Movies categorized by genre</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px] w-[350px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors" nameKey="browser">
              <LabelList
                dataKey="browser"
                className="fill-background"
                stroke="none"
                fontSize={10}
                formatter={(value) => value} // Display genre name
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        
        <div className="leading-none text-muted-foreground">
          Showing movies categorized by genre
        </div>
      </CardFooter>
    </Card>
  );
}
