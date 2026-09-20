import ListCarousel from "@/components/list-carousel/carousel";
import { CommonCardType } from "@/types";
import React from "react";
import MovieListBodyScroll from "./body-scroll";
import MovieListHeader from "./header";

interface MovieListContainerProps {
  title: string;
  data: CommonCardType[] | undefined;
  headerRight?: React.ReactNode;
  type?: "scroll" | "carousel";
  pagination?: boolean;
  totalPages?: number;
  isLoading?: boolean;
}

const MovieListContainer = ({
  title,
  headerRight,
  data,
  type = "scroll",
  pagination = false,
  totalPages = 1,
  isLoading = false,
}: MovieListContainerProps) => {
  return (
    <div className="page-shell animate-fade-up my-12">
      <MovieListHeader title={title} headerRight={headerRight} />
      <div className="my-6">
        {(data || isLoading) &&
          (type === "scroll" ? (
            <MovieListBodyScroll
              data={data || []}
              pagination={pagination}
              totalPages={totalPages}
              isLoading={isLoading}
            />
          ) : (
            <ListCarousel data={data || []} isLoading={isLoading} />
          ))}
      </div>
    </div>
  );
};

export default MovieListContainer;
