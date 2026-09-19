import DashboardCarousel from "./components/dashboard-carousel";
import LatestMoviesList from "./components/latest-movies-list";
import LatestTvList from "./components/latest-tv-list";
import TrendingList from "./components/trending-list";

const HomePage = async () => {
  return (
    <div className="animate-fade-in flex-1 bg-neutral-900">
      <DashboardCarousel />
      <TrendingList />
      <LatestMoviesList />
      <LatestTvList />
    </div>
  );
};

export default HomePage;
