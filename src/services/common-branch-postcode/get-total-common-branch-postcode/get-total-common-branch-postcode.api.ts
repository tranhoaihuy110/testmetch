
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";
import { IGetTotalCommonBranchPostcodeParams } from "./index";
interface getTotalCommonBranchPostcodeApi {
  data: { total: number }[];
}
export const getTotalCommonBranchPostcodeApi = async (params: IGetTotalCommonBranchPostcodeParams) => {
  const token = localStorage.getItem("access_token");
  const res = await MS_API.get<getTotalCommonBranchPostcodeApi>("/api/v1/common-branch-postcode/total", {
    headers: { Authorization: `Bearer ${token}` },    
    params: {
        id: params.id,
        username: params.username,
        created_at_from: params.from,
        created_at_to: params.to,
      },
  });
  return res.data.data[0].total || 0;
};

