"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative, Parallax } from "swiper/modules";
import CarouselImage from "./image";

import "swiper/css";
import "swiper/css/effect-creative";
import "./carousel.css";

import CarouselPaginationButtons from "./controls/pagination-buttons";
import CarouselDetails from "./details";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { CommonCardType } from "@/types";
import { capitalizeFirstLetter, tmdbImage } from "@/utils";

const AUTOPLAY_DELAY = 7000;

const Carousel = ({
  commonDetails,
  setDashboardImage,
}: {
  commonDetails: CommonCardType[];
  setDashboardImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const swiperRef = useRef<SwiperRef>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(commonDetails.length <= 1);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Cycling/autoplay only make sense with more than a couple of slides, and are
  // switched off entirely when the user asks for reduced motion.
  const canCycle = commonDetails.length > 2 && !prefersReducedMotion;

  const handleSlideChange: SwiperProps["onActiveIndexChange"] = (swiper) => {
    const detail = commonDetails[swiper.activeIndex];
    if (detail?.backdrop_path) {
      setDashboardImage(detail.backdrop_path);
    }
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleAutoplayTimeLeft: SwiperProps["onAutoplayTimeLeft"] = (
    _swiper,
    _timeLeft,
    progress,
  ) => {
    // Swiper counts progress down from 1 to 0; the ring should fill up instead.
    ringRef.current?.style.setProperty(
      "--autoplay-progress",
      String(1 - progress),
    );
  };

  return (
    <div className="flex w-full min-w-0 items-center justify-center gap-6">
      <div className="min-w-0 flex-1">
        <Swiper
          ref={swiperRef}
          onActiveIndexChange={handleSlideChange}
          modules={[EffectCreative, Parallax, Autoplay]}
          effect={prefersReducedMotion ? "slide" : "creative"}
          parallax={!prefersReducedMotion}
          speed={prefersReducedMotion ? 0 : 700}
          // `rewind` (jump straight to slide 0/last via a normal slideTo) gives the
          // same wrap-around as `loop`, without loop's slide-cloning/reordering —
          // which fights the creative effect's virtual-translate transition
          // tracking and can leave Swiper's internal `animating` lock stuck true,
          // silently breaking every Next/Prev click after the first.
          rewind={canCycle}
          autoplay={
            canCycle
              ? {
                  delay: AUTOPLAY_DELAY,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          onAutoplayTimeLeft={handleAutoplayTimeLeft}
          creativeEffect={{
            limitProgress: 1,
            perspective: true,
            prev: { translate: ["-18%", 0, -140], scale: 0.88, opacity: 0 },
            next: { translate: ["18%", 0, 0], scale: 1.06, opacity: 0 },
          }}
          roundLengths
          maxBackfaceHiddenSlides={0}
          className="hero-swiper min-w-0 max-w-full"
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
                    <div
                      data-swiper-parallax="-40"
                      className="w-full shrink-0 sm:max-w-[740px] lg:max-w-[820px]"
                    >
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
      <CarouselPaginationButtons
        ref={swiperRef}
        // While cycling, `rewind` makes Next/Prev wrap past either edge, so the
        // buttons should never disable — only the finite (canCycle === false)
        // case has a real beginning/end.
        isBeginning={canCycle ? false : isBeginning}
        isEnd={canCycle ? false : isEnd}
        ringRef={ringRef}
        showProgressRing={canCycle}
      />
    </div>
  );
};

export default Carousel;
