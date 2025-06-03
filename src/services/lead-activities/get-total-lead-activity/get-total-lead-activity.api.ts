import { MS_API } from "../../api";
import { IGetTotalLeadActivityParams } from "./index";
interface GetTotalLeadActivityResponse {
  data: { total: number }[];
}
export const getTotalLeadActivityApi = async (
  params: IGetTotalLeadActivityParams
) => {
  const token = localStorage.getItem("access_token");

  const res = await MS_API.get<GetTotalLeadActivityResponse>(
    "/api/v1/leadactivities/total",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        activity_id: params.activity_id,
        lead_id: params.lead_id,
        activity_type: params.activity_type,
        status: params.status,
        email: params.email,
        activity_date_from: params.from,
        activity_date_to: params.to,
      },
    }
  );
  return res.data.data[0].total || 0;
};
