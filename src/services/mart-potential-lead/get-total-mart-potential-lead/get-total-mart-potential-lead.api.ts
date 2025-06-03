/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";
import { IGetTotalMartPotentialLeadParams } from "./index";
interface GetTotalResponse {
  data: { total: number }[];
}
export const getTotalMartPotentialLeadApi = async (params: IGetTotalMartPotentialLeadParams) => {
  const token = localStorage.getItem("access_token");
  const res = await MS_API.get<GetTotalResponse>("/api/v1/mart-potential-lead/total", {
    headers: { Authorization: `Bearer ${token}` },
    params: {
        potential_lead_id: params.potential_lead_id,
        created_at_from: params.from,
        created_at_to: params.to,
        email:params.email,
      },
  });
  return res.data.data[0].total || 0;
};
