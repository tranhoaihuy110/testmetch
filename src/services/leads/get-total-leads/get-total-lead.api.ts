import { MS_API } from "../../api";
import { IGetTotalLeadsParams } from "./index";
interface GetTotalLeadsResponse {
  data: { total: number }[];
}
export const getTotalLeadsApi = async (params: IGetTotalLeadsParams) => {
  const token = localStorage.getItem("access_token");

  const res = await MS_API.get<GetTotalLeadsResponse>("/api/v1/leads/total", {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      lead_id: params.lead_id,
      last_name: params.last_name,
      created_at_from: params.from,
      created_at_to: params.to,
      email: params.email,
      phone_number: params.phone_number,
    },
  });
  return res.data.data[0].total || 0;
};
