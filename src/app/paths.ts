const paths = {
  home() {
    return "/home";
  },
  movies() {
    return "/movies";
  },
  movie(movieId: string | number) {
    return `/movie/${movieId}`;
  },
  tvSeries() {
    return "/tv-series";
  },
  series(seriesId: string | number) {
    return `/series/${seriesId}`;
  },
  search(keyword?: string) {
    return keyword ? `/search?keyword=${encodeURIComponent(keyword)}` : "/search";
  },
  watch(media: "movie" | "tv", mediaId: string | number) {
    return `/watch/${media}/${mediaId}`;
  },
};

export default paths;
