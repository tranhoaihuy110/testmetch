import { IUserNotificationsGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchUserNotificationsParams } from "./index";

export const searchUserNotificationsApi = (
  params: ISearchUserNotificationsParams
) => {
  return new Promise<IUserNotificationsGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: IUserNotificationsGetApi[] }>(
      "/api/v1/user-notifications/list",
      {
        params: {
          id: params.id,
          title: params.title,
          message: params.message,
          user_id: params.user_id,
          user_email: params.user_email,
          type: params.type,
          is_read: params.is_read,
          created_at_from: params.from,
          created_at_to: params.to,
          page: params.page,
          size: params.size,
        },
      }
    )
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};
