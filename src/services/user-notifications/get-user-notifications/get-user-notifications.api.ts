/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserNotificationsGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getUserNotificationsApi = (params?: Record<string, any>) => {
  return new Promise<{ data: IUserNotificationsGetApi[] }>(
    (resolve, reject) => {
      MS_API.get<{ data: IUserNotificationsGetApi[] }>(
        "/api/v1/user-notifications/list",
        { params }
      )
        .then((res) => resolve(res.data))
        .catch(() => reject());
    }
  );
};
