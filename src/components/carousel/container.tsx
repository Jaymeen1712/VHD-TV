"use client";

import GradientImageContainer from "@/components/gradient-image-container";
import { CommonCardType } from "@/types";
import React, { useState } from "react";
import Carousel from "./carousel";

const CarouselContainer = ({
  commonDetails,
}: {
  commonDetails: CommonCardType[];
}) => {
  const [dashboardImage, setDashboardImage] = useState(
    commonDetails[0]?.backdrop_path ?? "",
  );

  return (
    <section className="relative isolate">
      <GradientImageContainer path={dashboardImage} />
      <div className="page-shell flex min-h-[34rem] items-center py-20 md:min-h-[550px] md:py-24 lg:min-h-[600px]">
        <Carousel
          commonDetails={commonDetails}
          setDashboardImage={setDashboardImage}
        />
      </div>
    </section>
  );
};

export default CarouselContainer;
