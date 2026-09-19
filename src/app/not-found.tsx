"use client";

import paths from "@/app/paths";
import { Button } from "@heroui/react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-neutral-900 px-4 text-center">
      <div className="flex items-center justify-center text-5xl">
        <span className="font-bold text-primary">V</span>
        <span className="ml-1 font-bold -tracking-widest text-white">HD</span>
      </div>
      <h1 className="text-2xl font-bold text-white">Page not found</h1>
      <p className="max-w-md text-white/70">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <Button as={Link} href={paths.home()} className="bg-primary text-black">
        Back to Home
      </Button>
    </div>
  );
};

export default NotFound;
