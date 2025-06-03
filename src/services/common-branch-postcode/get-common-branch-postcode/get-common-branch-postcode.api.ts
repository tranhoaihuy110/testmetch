import { ICommonBranchPostcodeGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getCommonBranchPostcodeApi = (params?: Record<string, any>) => {
  return new Promise<{ data: ICommonBranchPostcodeGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: ICommonBranchPostcodeGetApi[] }>("/api/v1/common-branch-postcode/list", { params })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
