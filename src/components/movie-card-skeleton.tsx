import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";

interface MovieCardSkeletonProps {
  className?: string;
}

const MovieCardSkeleton = ({ className = "" }: MovieCardSkeletonProps) => {
  return (
    <Card
      radius="none"
      className={`relative aspect-[2/3] h-full w-full animate-pulse border-none ${className}`}
      shadow="md"
    >
      <CardHeader className="absolute left-2 top-1 z-10">
        <div className="h-6 w-8 rounded bg-neutral-700"></div>
      </CardHeader>

      <CardBody className="overflow-hidden p-0">
        {/* Main image skeleton */}
        <div className="h-full w-full animate-pulse bg-neutral-700"></div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-neutral-800" />

        {/* Shimmer effect */}
        <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-neutral-600/20 to-transparent"></div>
      </CardBody>

      <CardFooter className="absolute bottom-3 left-3 w-[89%] justify-between rounded-lg py-2">
        <div className="w-full grid-rows-2">
          {/* Chips skeleton */}
          <div className="mb-2 flex items-center justify-start space-x-2">
            <div className="h-5 w-8 animate-pulse rounded-md bg-neutral-600"></div>
            <div className="h-5 w-12 animate-pulse rounded-md bg-neutral-600"></div>
            <div className="h-5 w-10 animate-pulse rounded-md bg-neutral-600"></div>
          </div>

          {/* Title skeleton */}
          <div className="space-y-1">
            <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-600"></div>
            <div className="h-4 w-1/2 animate-pulse rounded bg-neutral-600"></div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MovieCardSkeleton;
