import { absoluteUrl } from "@/utils";
import { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/watch/", "/search"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
};

export default robots;
