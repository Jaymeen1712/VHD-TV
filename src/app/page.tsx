import DashboardCarousel from "@/components/home/dashboard-carousel";
import LatestMoviesList from "@/components/home/latest-movies-list";
import LatestTvList from "@/components/home/latest-tv-list";
import TrendingList from "@/components/home/trending-list";
import { Metadata } from "next";

// No `title` override here: this page shares the root segment with the
// root layout, so `layout.tsx`'s `title.template` does not apply to it
// (Next.js only applies a layout's template to *nested* segments) — the
// layout's `title.default` is used instead, which is what we want anyway.
export const metadata: Metadata = {
  description:
    "Discover trending, popular, and latest movies and TV series streaming on VHD TV.",
  alternates: {
    canonical: "/",
  },
};

const HomePage = async () => {
  return (
    <div className="animate-fade-in flex-1 flow-root bg-neutral-900">
      <h1 className="sr-only">VHD TV — Stream Movies & TV Series</h1>
      <DashboardCarousel />
      <TrendingList />
      <LatestMoviesList />
      <LatestTvList />
    </div>
  );
};

export default HomePage;
