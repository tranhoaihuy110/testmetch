import { ISfMartLeadsGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getSfMartLeadsApi = (params?: Record<string, any>) => {
  return new Promise<{ data: ISfMartLeadsGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: ISfMartLeadsGetApi[] }>("/api/v1/sf-mart-leads/list", { params })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
