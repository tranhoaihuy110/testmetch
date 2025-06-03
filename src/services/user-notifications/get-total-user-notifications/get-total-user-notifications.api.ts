import { MS_API } from "../../api";
import { IGetTotalUserNotificationsParams } from "./index";

interface GetTotalUserNotificationsResponse {
  data: { total: number }[];
}
export const getTotalUserNotificationsApi = async (
  params: IGetTotalUserNotificationsParams
) => {
  const token = localStorage.getItem("access_token");

  const res = await MS_API.get<GetTotalUserNotificationsResponse>(
    "/api/v1/user-notifications/total",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        id: params.id,
        created_at_from: params.from,
        created_at_to: params.to,
        title: params.title,
        message: params.message,
        user_id: params.user_id,
        user_email: params.user_email,
        type: params.type,
        is_read: params.is_read,
      },
    }
  );
  return res.data.data[0].total || 0;
};
