import { MS_API } from "../../api";
import { IGetTotalUserFcmTokenParams } from "./index";

interface GetTotalUserFcmTokenResponse {
  data: { total: number }[];
}
export const getTotalUserFcmTokenApi = async (
  params: IGetTotalUserFcmTokenParams
) => {
  const token = localStorage.getItem("access_token");
  const res = await MS_API.get<GetTotalUserFcmTokenResponse>(
    "/api/v1/user-fcm-token/total",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        id: params.id,
        created_at_from: params.from,
        created_at_to: params.to,
        user_id: params.user_id,
        user_email: params.user_email,
        token: params.token,
        device_id: params.device_id,
        create_at: params.create_at,
        update_at: params.update_at,
      },
    }
  );
  return res.data.data[0].total || 0;
};
