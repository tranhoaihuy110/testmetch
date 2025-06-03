/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserFcmTokenGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getUserFcmTokenApi = (params?: Record<string, any>) => {
  return new Promise<{ data: IUserFcmTokenGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: IUserFcmTokenGetApi[] }>("/api/v1/user-fcm-token/list", {
      params,
    })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
