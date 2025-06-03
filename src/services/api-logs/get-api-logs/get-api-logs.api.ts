

import { IApiLogsGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getApiLogsApi = (params?: Record<string, any>) => {
  return new Promise<{ data: IApiLogsGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: IApiLogsGetApi[] }>("/api/v1/api-log/list", { params })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};