import { MS_API } from "../../api";
import { IGetTotalAppUserParams } from "./index";

interface GetTotalAppUserResponse {
  data: { total: number }[];
}
export const getTotalAppUserApi = async (params: IGetTotalAppUserParams) => {
  const token = localStorage.getItem("access_token");

  const res = await MS_API.get<GetTotalAppUserResponse>(
    "/api/v1/app-user/total",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        user_id: params.user_id,
        created_at_from: params.from,
        created_at_to: params.to,
        user_email: params.user_email,
        username: params.username,
        phone_number: params.phone_number,
      },
    }
  );
  return res.data.data[0].total || 0;
};
