
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";
import { IGetTotalAppUserPendingParams } from "./index";
interface getTotalAppUserPendingApi {
  data: { total: number }[];
}
export const getTotalAppUserPendingApi = async (params: IGetTotalAppUserPendingParams) => {
  const token = localStorage.getItem("access_token");
  const res = await MS_API.get<getTotalAppUserPendingApi>("/api/v1/app-user-pending/total", {
    headers: { Authorization: `Bearer ${token}` },    
    params: {
        user_id: params.user_id,
        phone_number: params.phone_number,
        created_at_from: params.from,
        created_at_to: params.to,
        verify_status: params.verify_status,
        username: params.username
      },
  });
  return res.data.data[0].total || 0;
};

