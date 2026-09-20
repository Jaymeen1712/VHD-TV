import getTrendingAPI from "@/apis/common/get-trending";
import CarouselContainer from "@/components/carousel/container";

const DashboardCarousel = async () => {
  const { response, errors } = await getTrendingAPI();
  const data = !errors && response ? response.results.slice(0, 10) : [];

  return <CarouselContainer commonDetails={data} />;
};

export default DashboardCarousel;
