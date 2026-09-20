"use client";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { tmdbImage } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const GradientImageContainer = ({ path }: { path: string | null }) => {
  const src = tmdbImage(path, "original");
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-x-0 -bottom-[30%] top-0 -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a8085] to-neutral-900 opacity-50" />
      <AnimatePresence initial={false}>
        {src && (
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.7,
              ease: "easeOut",
            }}
            className="absolute inset-0 blur-lg"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GradientImageContainer;
