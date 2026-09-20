"use client";

import { Button } from "@heroui/react";
import { useEffect } from "react";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-neutral-900 px-4 text-center">
      <div className="flex items-center justify-center text-5xl">
        <span className="font-bold text-primary">V</span>
        <span className="ml-1 font-bold -tracking-widest text-white">HD</span>
      </div>
      <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
      <p className="max-w-md text-white/70">
        We couldn&apos;t load this page. Please try again.
      </p>
      <Button className="bg-primary text-black" onPress={reset}>
        Try again
      </Button>
    </div>
  );
};

export default Error;
