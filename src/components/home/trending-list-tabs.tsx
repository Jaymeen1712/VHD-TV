"use client";

import MovieListContainer from "@/components/movie-list/container";
import { CommonCardType } from "@/types";
import { Button } from "@heroui/react";
import { useState } from "react";

interface TrendingListTabsProps {
  movieData: CommonCardType[];
  tvData: CommonCardType[];
}

const TrendingListTabs = ({ movieData, tvData }: TrendingListTabsProps) => {
  const [currentTab, setCurrentTab] = useState<"movies" | "tvSeries">("movies");

  return (
    <MovieListContainer
      data={currentTab === "movies" ? movieData : tvData}
      title="Trending"
      headerRight={
        <div className="ml-4 space-x-3">
          <Button
            onPress={() => setCurrentTab("movies")}
            className={`px-6 text-base ${
              currentTab === "movies"
                ? `bg-primary text-black`
                : `border-1 bg-transparent text-white hover:text-primary `
            }`}
            radius="full"
            disableRipple
            disableAnimation
          >
            Movies
          </Button>
          <Button
            onPress={() => setCurrentTab("tvSeries")}
            className={`px-6 text-base ${
              currentTab === "tvSeries"
                ? "bg-primary text-black"
                : `border-1 bg-transparent text-white hover:text-primary `
            }`}
            radius="full"
            disableRipple
            disableAnimation
          >
            TV Series
          </Button>
        </div>
      }
    />
  );
};

export default TrendingListTabs;
