import { IAppUserPendingGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getAppUserPendingApi = (params?: Record<string, any>) => {
  return new Promise<{ data: IAppUserPendingGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: IAppUserPendingGetApi[] }>("/api/v1/app-user-pending/list", { params })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
