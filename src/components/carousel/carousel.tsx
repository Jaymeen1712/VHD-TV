"use client";

import React, { useRef } from "react";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import CarouselImage from "./image";

import "swiper/css";

import CarouselPaginationButtons from "./controls/pagination-buttons";
import CarouselDetails from "./details";

import { CommonCardType } from "@/types";
import { capitalizeFirstLetter, tmdbImage } from "@/utils";

const Carousel = ({
  commonDetails,
  setDashboardImage,
}: {
  commonDetails: CommonCardType[];
  setDashboardImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const swiperRef = useRef<SwiperRef>(null);

  const handleSlideChange: SwiperProps["onActiveIndexChange"] = (swiper) => {
    const detail = commonDetails[swiper.activeIndex];
    if (detail?.backdrop_path) {
      setDashboardImage(detail.backdrop_path);
    }
  };

  return (
    <div className="flex w-full min-w-0 items-center justify-center gap-6">
      <div className="min-w-0 flex-1">
        <Swiper
          ref={swiperRef}
          onActiveIndexChange={handleSlideChange}
          roundLengths
          maxBackfaceHiddenSlides={0}
          className="min-w-0 max-w-full"
        >
          <>
            {commonDetails.map((detail, index) => {
              const chips: string[] = ["HD"];
              if (detail.media_type) {
                chips.push(
                  detail.media_type.toLowerCase() === "movie"
                    ? "Movie"
                    : "TV Series",
                );
              }

              const year = (
                detail.release_date || detail.first_air_date
              )?.split("-")[0];
              if (year) chips.push(year);

              const title = detail.title || detail.name || "Title";

              return (
                <SwiperSlide key={detail.id}>
                  <div className="flex flex-col items-center gap-8 md:flex-row md:gap-16">
                    <div className="w-full shrink-0 sm:max-w-[740px] lg:max-w-[820px]">
                      <CarouselImage
                        src={tmdbImage(detail.backdrop_path, "w780") ?? ""}
                        alt={title}
                        type={detail.media_type}
                        detailId={detail.id}
                        priority={index === 0}
                      />
                    </div>
                    <div className="w-full min-w-0 md:flex-1">
                      <CarouselDetails
                        detailId={detail.id}
                        chips={chips}
                        title={capitalizeFirstLetter(title)}
                        rating={detail.vote_average}
                        description={detail.overview}
                        type={detail.media_type}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </>
        </Swiper>
      </div>
      <CarouselPaginationButtons ref={swiperRef} />
    </div>
  );
};

export default Carousel;
