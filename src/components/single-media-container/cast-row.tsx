import Image from "next/image";
import React from "react";

import { CastCreditType } from "@/types";
import { tmdbImage } from "@/utils";

interface CastRowProps {
  cast: CastCreditType[];
}

const CastRow = ({ cast }: CastRowProps) => {
  if (!cast.length) return null;

  return (
    <div className="scrollbar-brand flex gap-4 overflow-x-auto pb-2">
      {cast.slice(0, 10).map((member) => {
        const src = tmdbImage(member.profile_path, "w200");
        return (
          <div key={member.credit_id} className="w-20 shrink-0 text-center">
            <div className="relative mx-auto mb-1 h-20 w-20 overflow-hidden rounded-full bg-neutral-800">
              {src && (
                <Image
                  src={src}
                  alt={member.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              )}
            </div>
            <p className="truncate text-xs font-medium text-white">
              {member.name}
            </p>
            <p className="truncate text-xs text-white/50">
              {member.character}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CastRow;
