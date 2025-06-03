/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";
import { IGetTotalSfMartLeadsParams } from "./index";
interface GetTotalResponse {
  data: { total: number }[];
}
export const getTotalSfMartLeadsApi = async (
  params: IGetTotalSfMartLeadsParams
) => {
  const token = localStorage.getItem("access_token");
  const res = await MS_API.get<GetTotalResponse>(
    "/api/v1/sf-mart-leads/total",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        id: params.id,
        username: params.username,
        created_at_from: params.from,
        created_at_to: params.to,
      },
    }
  );
  return res.data.data[0].total || 0;
};
