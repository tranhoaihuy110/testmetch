/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserProfileUrlMapGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getUserProfileUrlMapApi = (params?: Record<string, any>) => {
  return new Promise<{ data: IUserProfileUrlMapGetApi[] }>(
    (resolve, reject) => {
      MS_API.get<{ data: IUserProfileUrlMapGetApi[] }>(
        "/api/v1/user-profile-url-map/list",
        {
          params,
        }
      )
        .then((res) => resolve(res.data))
        .catch(() => reject());
    }
  );
};
