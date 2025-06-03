import { ILeadAssignmentGetApi } from "../../../models";
import { MS_API } from "../../api";

export interface ISortLeadAssignmentParams {
  page?: number;
  size?: number;
  option: string;
  ascDesc: string;
}

export const sortLeadAssignmentApi = async (
  params: ISortLeadAssignmentParams
): Promise<ILeadAssignmentGetApi[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token is missing");

  const queryParams = {
    page: params.page ?? 1,
    size: params.size ?? 10,
    sort: `${params.option},${params.ascDesc}`,
  };

  const res = await MS_API.get<{ data: ILeadAssignmentGetApi[] }>(
    "/api/v1/leadassignments/list",
    {
      params: queryParams,
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.data;
};
