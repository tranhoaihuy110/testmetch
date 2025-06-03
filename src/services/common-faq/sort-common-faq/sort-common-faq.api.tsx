import { ICommonFaqGetApi } from "../../../models";
import { MS_API } from "../../api";

export interface ISortfaqParams {
  page?: number;
  size?: number;
  option: string;
  ascDesc: string;
}

export const sortCommonFaqApi = async (
  params: ISortfaqParams
): Promise<ICommonFaqGetApi[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token is missing");

  const queryParams = {
    page: params.page ?? 1,
    size: params.size ?? 10,
    sort: `${params.option},${params.ascDesc}`,
  };

  const res = await MS_API.get<{ data: ICommonFaqGetApi[] }>(
    "/api/v1/common_faq/list",
    {
      params: queryParams,
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.data;
};
