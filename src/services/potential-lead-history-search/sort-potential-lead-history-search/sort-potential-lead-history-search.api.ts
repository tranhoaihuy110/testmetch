import { IPotentialLeadHistorySearchGetApi } from "../../../models";
import { MS_API } from "../../api";

export interface ISortPotentialLeadHistorySearchParams {
  page?: number;
  size?: number;
  option: string;
  ascDesc: string;
}

export const sortPotentialLeadHistorySearchApi = async (
  params: ISortPotentialLeadHistorySearchParams
): Promise<IPotentialLeadHistorySearchGetApi[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token is missing");

  const queryParams = {
    page: params.page ?? 1,
    size: params.size ?? 10,
    sort: `${params.option},${params.ascDesc}`,
  };

  const res = await MS_API.get<{ data: IPotentialLeadHistorySearchGetApi[] }>(
    "/api/v1/potential-lead-history-search/list",
    {
      params: queryParams,
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.data;
};
