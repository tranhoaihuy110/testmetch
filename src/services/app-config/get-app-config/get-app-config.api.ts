
import { IAppConfigGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getAppConFigApi = (params?: Record<string, any>) => {
  return new Promise<{ data: IAppConfigGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: IAppConfigGetApi[] }>("/api/v1/app-config/list", { params })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};