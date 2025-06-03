import { ICommonBranchPostcodeGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchCommonBranchPostcodeParams } from "./index";

export const searchCommonBranchPostcodeApi = (params: ISearchCommonBranchPostcodeParams) => {
  return new Promise<ICommonBranchPostcodeGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: ICommonBranchPostcodeGetApi[] }>("/api/v1/common-branch-postcode/list", {  
      params: {
        id: params.id,
        username: params.user_name,
        created_at_from: params.from,
        created_at_to: params.to,
        page: params.page,
        size: params.size
      },
    })
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};