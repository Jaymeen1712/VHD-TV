import { API_ROUTES } from "@/utils/enum";
import { CommonCardType } from "@/types";
import { tmdbRequest } from "../request";

const getMediaDetailsAPI = (media: string, mediaId: string) =>
  tmdbRequest<CommonCardType>(API_ROUTES.MEDIA_DETAILS, {
    routeParams: { media, mediaId },
  });

export default getMediaDetailsAPI;
