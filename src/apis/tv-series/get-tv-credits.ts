import { API_ROUTES } from "@/utils/enum";
import { CreditsResponse } from "@/types";
import { tmdbRequest } from "../request";

const getTvCreditsAPI = (tvId: string) =>
  tmdbRequest<CreditsResponse>(API_ROUTES.TV_CREDITS, {
    routeParams: { tvId },
  });

export default getTvCreditsAPI;
