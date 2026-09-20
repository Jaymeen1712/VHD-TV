import { SITE_NAME } from "@/utils";
import { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: `${SITE_NAME} — Stream Movies & TV Series`,
    short_name: SITE_NAME,
    description:
      "A sleek and modern app for streaming movies and series, powered by TMDB.",
    start_url: "/",
    display: "standalone",
    background_color: "#171717",
    theme_color: "#171717",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
};

export default manifest;
