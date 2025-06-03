import { IUserFcmTokenGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchUserFcmTokenParams } from "./index";

export const searchUserFcmTokenApi = (params: ISearchUserFcmTokenParams) => {
  return new Promise<IUserFcmTokenGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: IUserFcmTokenGetApi[] }>("/api/v1/user-fcm-token/list", {
      params: {
        id: params.id,
        user_id: params.user_id,
        user_email: params.user_email,
        token: params.token,
        device_id: params.device_id,
        page: params.page,
        size: params.size,
        created_at_from: params.from,
        created_at_to: params.to,
      },
    })
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};
