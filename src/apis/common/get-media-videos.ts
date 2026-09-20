import { API_ROUTES } from "@/utils/enum";
import { MediaVideosResponse } from "@/types";
import { REVALIDATE, tmdbRequest } from "../request";

const getMediaVideosAPI = (media: string, mediaId: string) =>
  tmdbRequest<MediaVideosResponse>(API_ROUTES.MEDIA_VIDEOS, {
    routeParams: { media, mediaId },
    revalidate: REVALIDATE.DETAIL,
  });

export default getMediaVideosAPI;
