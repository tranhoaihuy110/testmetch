import { IAppUserGetApi } from "../../../models";
import { MS_API } from "../../api";

export interface ISortAppUserParams {
  page?: number;
  size?: number;
  option: string;
  ascDesc: string;
}

export const sortAppUserApi = async (
  params: ISortAppUserParams
): Promise<IAppUserGetApi[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token is missing");

  const queryParams = {
    page: params.page ?? 1,
    size: params.size ?? 10,
    sort: `${params.option},${params.ascDesc}`,
  };

  const res = await MS_API.get<{ data: IAppUserGetApi[] }>(
    "/api/v1/app-user/list",
    {
      params: queryParams,
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.data;
};
