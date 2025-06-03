import { MS_API } from "../../api";
import { IGetTotalLeadsReferPartnerActivityParams } from "./index";
interface GetTotalLeadsReferPartnerActivityResponse {
  data: { total: number }[];
}
export const getTotalLeadsReferPartnerActivityApi = async (
  params: IGetTotalLeadsReferPartnerActivityParams
) => {
  const token = localStorage.getItem("access_token");

  const res = await MS_API.get<GetTotalLeadsReferPartnerActivityResponse>(
    "/api/v1/leads-refer-partner-activity/total",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        id: params.id,
        created_at_from: params.from,
        created_at_to: params.to,
        refer_partner_id: params.refer_partner_id,
        user_action: params.user_action,
        status_old: params.status_old,
        status_new: params.status_new,
      },
    }
  );
  return res.data.data[0].total || 0;
};
