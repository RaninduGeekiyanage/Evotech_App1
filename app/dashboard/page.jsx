import React, { Suspense } from "react";
import MovieCount from "./dashboard-component/movie-count";
import { Loader } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserCount from "./dashboard-component/user-count";
import DailyMovieCount from "./dashboard-component/daily-movie-count";
import { MonthlyJobChart } from "./dashboard-component/monthly-bar-chart";
import { MovieGenereCategoryPieChart } from "./dashboard-component/genere-pie-chart";

export const page = () => {
  return (
    <div className="flex flex-col items-center min-h-screen text-black dark:bg-slate-900 dark:bg-[url('/dark2.jpg')] dark:bg-cover dark:bg-center relative">
      {/* Background overlay */}
      <div className="absolute inset-0 dark:bg-black opacity-80 z-10"></div>
      <div className="container relative z-20"> {/* Ensure this is above the overlay */}
        <div className="flex flex-col md:flex-row justify-between mt-12 gap-2">
          <Suspense fallback={<Loader className="animate-spin duration-1000 text-green-500 text-3xl text-center z-10" />}>
            <Card className="w-full max-w-md shadow-lg dark:bg-neutral-900">
              <CardHeader>
                <CardTitle className="text-slate-600 dark:text-slate-200">Total Movies Count</CardTitle>
              </CardHeader>
              <CardContent>
                <MovieCount />
              </CardContent>
            </Card>
          </Suspense>

          <Suspense fallback={<Loader className="animate-spin duration-1000 text-green-500 text-3xl text-center" />}>
            <Card className="w-full max-w-md shadow-lg dark:bg-neutral-900">
              <CardHeader>
                <CardTitle className="text-slate-600 dark:text-slate-200">Daily Added Movie Count</CardTitle>
              </CardHeader>
              <CardContent>
                <DailyMovieCount />
              </CardContent>
            </Card>
          </Suspense>

          <Suspense fallback={<Loader className="animate-spin duration-1000 text-green-500 text-3xl text-center" />}>
            <Card className="w-full max-w-md shadow-lg dark:bg-neutral-900">
              <CardHeader>
                <CardTitle className="text-slate-600 dark:text-slate-200">Total Active User Count</CardTitle>
              </CardHeader>
              <CardContent>
                <UserCount />
              </CardContent>
            </Card>
          </Suspense>
        </div>
        <div className="flex flex-col mt-16 w-full md:flex-row md:justify-between gap-2">
          <MonthlyJobChart className="flex-1" />
          <MovieGenereCategoryPieChart className="flex-1" />
        </div>
      </div>
    </div>
  );
};

export default page;
