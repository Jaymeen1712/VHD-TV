"use client";

import { CommonCardType } from "@/types";
import { Pagination, PaginationProps } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import MovieCard from "../movie-card";
import MovieCardSkeleton from "../movie-card-skeleton";

interface MovieListBodyScrollProps {
  data: CommonCardType[];
  pagination: boolean;
  totalPages?: number;
  isLoading?: boolean;
}

const MovieListBodyScroll = ({
  data,
  pagination,
  totalPages = 1,
  isLoading = false,
}: MovieListBodyScrollProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const renderList = data.map((subData) => {
    return <MovieCard key={subData.id} data={subData} />;
  });

  // Render skeleton cards while loading
  const renderSkeletonList = Array.from({ length: 20 }, (_, index) => (
    <MovieCardSkeleton key={`skeleton-${index}`} />
  ));

  const handlePageChange: PaginationProps["onChange"] = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div
        className={`grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3 sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] ${
          pagination ? "min-h-[60vh]" : ""
        }`}
      >
        {isLoading ? <>{renderSkeletonList}</> : <>{renderList}</>}
      </div>
      {pagination && (
        <div className="mt-12 flex w-full items-center justify-center">
          <Pagination
            // TMDB hard-rejects page > 500, so the control shouldn't offer it.
            total={Math.min(totalPages, 500)}
            page={currentPage}
            onChange={handlePageChange}
            radius="sm"
            classNames={{
              wrapper: "gap-4 items-center",
              item: "text-large w-fit bg-white/20 text-white pl-4 pr-4 h-10 hover:text-primary",
              cursor: "text-large w-fit bg-primary text-black pl-4 pr-4 h-10",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MovieListBodyScroll;
