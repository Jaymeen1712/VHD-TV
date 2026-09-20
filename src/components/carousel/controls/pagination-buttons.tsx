"use client";

import React, { forwardRef, MutableRefObject } from "react";
import CarouselPaginationButton from "../controls/button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { SwiperRef } from "swiper/react";

interface CarouselPaginationButtonsProps {
  isBeginning?: boolean;
  isEnd?: boolean;
  ringRef?: React.RefObject<HTMLDivElement | null>;
  showProgressRing?: boolean;
}

const CarouselPaginationButtons = forwardRef<
  SwiperRef,
  CarouselPaginationButtonsProps
>(({ isBeginning, isEnd, ringRef, showProgressRing }, ref) => {
  return (
    <div className="grid shrink-0 grid-rows-2 items-center justify-center gap-6">
      <div ref={ringRef} className="relative inline-flex">
        {showProgressRing && (
          <svg
            viewBox="0 0 40 40"
            className="pointer-events-none absolute inset-0 h-full w-full -rotate-90 text-primary"
          >
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-70"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="calc(1 - var(--autoplay-progress, 0))"
            />
          </svg>
        )}
        <CarouselPaginationButton
          Icon={FaAngleRight}
          label="Next slide"
          isDisabled={isEnd}
          handleClick={() => {
            if (ref) {
              (ref as MutableRefObject<SwiperRef>).current.swiper.slideNext();
            }
          }}
        />
      </div>
      <CarouselPaginationButton
        Icon={FaAngleLeft}
        label="Previous slide"
        isDisabled={isBeginning}
        handleClick={() => {
          if (ref) {
            (ref as MutableRefObject<SwiperRef>).current.swiper.slidePrev();
          }
        }}
      />
    </div>
  );
});

CarouselPaginationButtons.displayName = "CarouselPaginationButtons";

export default CarouselPaginationButtons;
