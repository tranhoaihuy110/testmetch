import { ILeadsourcesGetApi } from "../../../models";
import { MS_API } from "../../api";

export interface ISortLeadsourcesParams {
  page?: number;
  size?: number;
  option: string;
  ascDesc: string;
}

export const sortLeadsourcesApi = async (
  params: ISortLeadsourcesParams
): Promise<ILeadsourcesGetApi[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token is missing");

  const queryParams = {
    page: params.page ?? 1,
    size: params.size ?? 10,
    sort: `${params.option},${params.ascDesc}`,
  };

  const res = await MS_API.get<{ data: ILeadsourcesGetApi[] }>(
    "/api/v1/leadsources/list",
    {
      params: queryParams,
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.data;
};
