import { MS_API } from "../../api";
import { IGetTotalLeadsReferPartnerParams } from "./index";
interface GetTotalLeadsReferPartnerResponse {
  data: { total: number }[];
}
export const getTotalLeadsReferPartnerApi = async (
  params: IGetTotalLeadsReferPartnerParams
) => {
  const token = localStorage.getItem("access_token");

  const res = await MS_API.get<GetTotalLeadsReferPartnerResponse>(
    "/api/v1/leads-refer-partner/total",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        lead_id: params.lead_id,
        created_at_from: params.from,
        created_at_to: params.to,
        refer_partner_id: params.refer_partner_id,
        email: params.email,
      },
    }
  );
  return res.data.data[0].total || 0;
};
