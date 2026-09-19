"use client";

import paths from "@/app/paths";
import { CommonCardType } from "@/types";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import SearchList from "./search-list";

interface SearchContainerProps {
  data: CommonCardType[] | undefined;
  search: string;
  isLoading?: boolean;
}

const SearchContainer = ({
  data,
  search,
  isLoading = false,
}: SearchContainerProps) => {
  const router = useRouter();

  const handleViewMore = () => {
    router.push(paths.search(search));
  };

  return (
    <div className="scrollbar-brand absolute left-0 top-full z-50 mt-2 max-h-[70vh] w-full min-w-[320px] overflow-y-auto rounded-xl border border-white/10 bg-neutral-900/95 px-4 py-4 shadow-2xl backdrop-blur-xl">
      {isLoading ? (
        <div className="space-y-3 py-1">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="h-[60px] w-[50px] animate-pulse rounded bg-neutral-700" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-700" />
                <div className="h-3 w-1/3 animate-pulse rounded bg-neutral-700" />
              </div>
            </div>
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <>
          {data.slice(0, 5).map((subData) => (
            <div key={subData.id}>
              <SearchList data={subData} />
            </div>
          ))}
          <div>
            <Button
              fullWidth
              className="mt-4 bg-primary text-base"
              disableAnimation
              disableRipple
              onPress={handleViewMore}
            >
              View more
            </Button>
          </div>
        </>
      ) : (
        <div className="py-2 text-center text-white/70">No results found</div>
      )}
    </div>
  );
};

export default SearchContainer;
