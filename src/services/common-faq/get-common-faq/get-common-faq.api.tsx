import { ICommonFaqGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getCommonFaqApi = (params?: Record<string, any>) => {
  return new Promise<{ data: ICommonFaqGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: ICommonFaqGetApi[] }>("/api/v1/common-faq/list", { params })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
