"use client";

import { tmdbImage } from "@/utils";
import Image from "next/image";
import React from "react";

const GradientImageContainer = ({ path }: { path: string | null }) => {
  const src = tmdbImage(path, "original");

  return (
    <div className="pointer-events-none absolute inset-x-0 -bottom-[30%] top-0 -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a8085] to-neutral-900 opacity-50" />
      {src && (
        <div className="absolute inset-0 opacity-20 blur-lg">
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}
    </div>
  );
};

export default GradientImageContainer;
