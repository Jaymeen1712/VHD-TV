import { API_ROUTES } from "@/utils/enum";
import { SingleMediaType } from "@/types";
import { tmdbRequest } from "../request";

const getTvSingleAPI = (tvId: string) =>
  tmdbRequest<SingleMediaType>(`${API_ROUTES.TV_SINGLE}/${tvId}`);

export default getTvSingleAPI;
