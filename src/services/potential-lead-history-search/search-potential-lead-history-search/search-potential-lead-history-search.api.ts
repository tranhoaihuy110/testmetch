import { IPotentialLeadHistorySearchGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchPotentialLeadHistorySearchParams } from "./index";

export const searchPotentialLeadHistorySearchApi = (
  params: ISearchPotentialLeadHistorySearchParams
) => {
  return new Promise<IPotentialLeadHistorySearchGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: IPotentialLeadHistorySearchGetApi[] }>(
      "/api/v1/potential-lead-history-search/list",
      {
        params: {
          id: params.id,
          username: params.username,
          keysearch: params.keysearch,
          status_search: params.status_search,
          created_at_from: params.from,
          created_at_to: params.to,
          page: params.page,
          size: params.size,
        },
      }
    )
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};
