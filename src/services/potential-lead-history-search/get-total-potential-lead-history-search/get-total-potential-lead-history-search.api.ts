import { MS_API } from "../../api";
import { IGetTotalPotentialLeadHistorySearchParams } from "./index";

interface GetTotalPotentialLeadHistorySearchResponse {
  data: { total: number }[];
}
export const getTotalPotentialLeadHistorySearchApi = async (
  params: IGetTotalPotentialLeadHistorySearchParams
) => {
  const token = localStorage.getItem("access_token");

  const res = await MS_API.get<GetTotalPotentialLeadHistorySearchResponse>(
    "/api/v1/potential-lead-history-search/total",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        id: params.id,
        created_at_from: params.from,
        created_at_to: params.to,
        username: params.username,
        keysearch: params.keysearch,
        status_search: params.status_search,
      },
    }
  );
  return res.data.data[0].total || 0;
};
