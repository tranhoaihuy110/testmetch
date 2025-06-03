/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppUserGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getAppUserApi = (params?: Record<string, any>) => {
  return new Promise<{ data: IAppUserGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: IAppUserGetApi[] }>("/api/v1/app-user/list", { params })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
