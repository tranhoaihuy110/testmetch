import { IUserFcmTokenGetApi } from "../../../models";
import { MS_API } from "../../api";

export interface ISortUserFcmTokenParams {
  page?: number;
  size?: number;
  option: string;
  ascDesc: string;
}

export const sortUserFcmTokenApi = async (
  params: ISortUserFcmTokenParams
): Promise<IUserFcmTokenGetApi[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token is missing");

  const queryParams = {
    page: params.page ?? 1,
    size: params.size ?? 10,
    sort: `${params.option},${params.ascDesc}`,
  };

  const res = await MS_API.get<{ data: IUserFcmTokenGetApi[] }>(
    "/api/v1/user-fcm-token/list",
    {
      params: queryParams,
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.data;
};
