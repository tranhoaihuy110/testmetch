import { ICommonBranchPostcodeGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISortCommonBranchPostcodeParams } from "./index";



export const sortCommonBranchPostcodeApi = async (
  params: ISortCommonBranchPostcodeParams
): Promise<ICommonBranchPostcodeGetApi[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token is missing");

  const queryParams = {
    page: params.page ?? 1,
    size: params.size ?? 10,
    sort: `${params.option},${params.ascDesc}`,
  };

  const res = await MS_API.get<{ data: ICommonBranchPostcodeGetApi[] }>("/api/v1/common-branch-postcode/list", {
    params: queryParams,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};
