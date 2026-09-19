"use client";

import React, { forwardRef, MutableRefObject } from "react";
import CarouselPaginationButton from "../controls/button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { SwiperRef } from "swiper/react";

const CarouselPaginationButtons = forwardRef((props, ref) => {
  return (
    <div className="grid shrink-0 grid-rows-2 items-center justify-center gap-6">
      <CarouselPaginationButton
        Icon={FaAngleRight}
        label="Next slide"
        handleClick={() => {
          if (ref) {
            (ref as MutableRefObject<SwiperRef>).current.swiper.slideNext();
          }
        }}
      />
      <CarouselPaginationButton
        Icon={FaAngleLeft}
        label="Previous slide"
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
