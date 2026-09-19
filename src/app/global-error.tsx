"use client";

import { useEffect } from "react";

const GlobalError = ({
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
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-neutral-900 px-4 text-center">
          <div className="flex items-center justify-center text-5xl">
            <span className="font-bold text-cyan-300">V</span>
            <span className="ml-1 font-bold -tracking-widest text-white">
              HD
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white">
            Something went wrong
          </h1>
          <p className="max-w-md text-white/70">
            We couldn&apos;t load the app. Please try again.
          </p>
          <button
            onClick={reset}
            className="rounded-md bg-cyan-300 px-6 py-2 font-medium text-black"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
