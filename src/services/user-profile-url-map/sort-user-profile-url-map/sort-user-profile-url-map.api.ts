import { IUserProfileUrlMapGetApi } from "../../../models";
import { MS_API } from "../../api";

export interface ISortProfileUrlMapParams {
  page?: number;
  size?: number;
  option: string;
  ascDesc: string;
}

export const sortUserProfileUrlMapApi = async (
  params: ISortProfileUrlMapParams
): Promise<IUserProfileUrlMapGetApi[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token is missing");

  const queryParams = {
    page: params.page ?? 1,
    size: params.size ?? 10,
    sort: `${params.option},${params.ascDesc}`,
  };

  const res = await MS_API.get<{ data: IUserProfileUrlMapGetApi[] }>(
    "/api/v1/user-profile-url-map/list",
    {
      params: queryParams,
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.data;
};
