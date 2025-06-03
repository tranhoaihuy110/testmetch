import { ILeadsReferPartnerActivityGetApi } from "../../../models";
import { MS_API } from "../../api";

export interface ISortLeadsReferPartnerActivityParams {
  page?: number;
  size?: number;
  option: string;
  ascDesc: string;
}

export const sortLeadsReferPartnerActivityApi = async (
  params: ISortLeadsReferPartnerActivityParams
): Promise<ILeadsReferPartnerActivityGetApi[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token is missing");

  const queryParams = {
    page: params.page ?? 1,
    size: params.size ?? 10,
    sort: `${params.option},${params.ascDesc}`,
  };

  const res = await MS_API.get<{ data: ILeadsReferPartnerActivityGetApi[] }>(
    "/api/v1/leads-refer-partner-activity/list",
    {
      params: queryParams,
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.data;
};
