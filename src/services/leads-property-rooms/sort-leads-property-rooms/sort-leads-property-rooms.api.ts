import { ILeadsPropertyRoomsGetApi } from "../../../models";
import { MS_API } from "../../api";

export interface ISortLeadsPropertyRoomsParams {
  page?: number;
  size?: number;
  option: string;
  ascDesc: string;
}

export const sortLeadsPropertyRoomsApi = async (
  params: ISortLeadsPropertyRoomsParams
): Promise<ILeadsPropertyRoomsGetApi[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token is missing");

  const queryParams = {
    page: params.page ?? 1,
    size: params.size ?? 10,
    sort: `${params.option},${params.ascDesc}`,
  };

  const res = await MS_API.get<{ data: ILeadsPropertyRoomsGetApi[] }>(
    "/api/v1/leadsproperty-rooms/list",
    {
      params: queryParams,
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.data;
};
