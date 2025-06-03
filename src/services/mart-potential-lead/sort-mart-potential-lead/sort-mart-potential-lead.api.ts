import { IMartPotentialLeadGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISortMartPotentialLeadsParams } from "./index";

export const sortMartPotentialLeadsApi = async (
  params: ISortMartPotentialLeadsParams
): Promise<IMartPotentialLeadGetApi[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token is missing");

  const queryParams = {
    page: params.page ?? 1,
    size: params.size ?? 10,
    sort: `${params.option},${params.ascDesc}`,
  };

  const res = await MS_API.get<{ data: IMartPotentialLeadGetApi[] }>("/api/v1/mart-potential-lead/list", {
    params: queryParams,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};
