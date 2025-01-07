import React from "react";
import { getRestaurants } from "../libs/apis/server";

export default async function RestaurantPage() {
  // const { restaurants } = await getRestaurants();

  // console.log("RESTAURANTS:: ", restaurants);
  return (
    <main>
      {/* Navigation Bar */}
      <nav className="bg-gray-400 w-full h-16 flex justify-start items-center">
        <div className="container">
          <h1 className="text-black font-bold text-xl">Restaurants</h1>
        </div>
      </nav>

      {/* Body */}
      <div className="container mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5">
          <div className="h-96 bg-blue-300">Restaurant 1</div>
          <div className="h-96 bg-blue-300">Restaurant 2</div>
          <div className="h-96 bg-blue-300">Restaurant 3</div>
          <div className="h-96 bg-blue-300">Restaurant 4</div>
          <div className="h-96 bg-blue-300">Restaurant 5</div>
          <div className="h-96 bg-blue-300">Restaurant 6</div>
          <div className="h-96 bg-blue-300">Restaurant 7</div>
          <div className="h-96 bg-blue-300">Restaurant 8</div>
        </div>
      </div>
    </main>
  );
}
