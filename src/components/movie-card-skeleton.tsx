import { Card, CardBody, CardHeader } from "@heroui/react";

interface MovieCardSkeletonProps {
  className?: string;
}

const MovieCardSkeleton = ({ className = "" }: MovieCardSkeletonProps) => {
  return (
    <Card
      radius="lg"
      className={`relative aspect-[2/3] h-full w-full animate-pulse overflow-hidden border-none ${className}`}
      shadow="md"
    >
      <CardHeader className="absolute left-2 top-2 z-10">
        <div className="h-5 w-10 rounded-md bg-neutral-700"></div>
      </CardHeader>

      <CardBody className="overflow-hidden p-0">
        {/* Main image skeleton */}
        <div className="h-full w-full animate-pulse bg-neutral-700"></div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-black/95" />

        {/* Shimmer effect */}
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-neutral-600/20 to-transparent"></div>
      </CardBody>

      {/* Title skeleton */}
      <div className="absolute inset-x-3 bottom-9 space-y-1">
        <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-600"></div>
      </div>

      {/* Bottom strip skeleton */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-black/85 px-2.5 py-1.5">
        <div className="h-3 w-10 animate-pulse rounded bg-neutral-600"></div>
        <div className="h-3 w-px bg-white/20"></div>
        <div className="h-3 w-20 animate-pulse rounded bg-neutral-600"></div>
      </div>
    </Card>
  );
};

export default MovieCardSkeleton;
