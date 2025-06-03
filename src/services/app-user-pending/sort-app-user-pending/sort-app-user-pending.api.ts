import { IAppUserPendingGetApi } from "../../../models";
import { MS_API } from "../../api";

export interface ISortAppUserPendingParams {
  page?: number;
  size?: number;
  option: string;
  ascDesc: string;
}

export const sortAppUserPendingApi = async (
  params: ISortAppUserPendingParams
): Promise<IAppUserPendingGetApi[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token is missing");

  const queryParams = {
    page: params.page ?? 1,
    size: params.size ?? 10,
    sort: `${params.option},${params.ascDesc}`,
  };

  const res = await MS_API.get<{ data: IAppUserPendingGetApi[] }>("/api/v1/app-user-pending/list", {
    params: queryParams,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};
