import { MS_API } from "../../api";
import { IGetTotalLeadsPropertyFloorsParams } from "./index";
interface GetTotalLeadsPropertyFloorsResponse {
  data: { total: number }[];
}
export const getTotalLeadPropertyFloorsApi = async (
  params: IGetTotalLeadsPropertyFloorsParams
) => {
  const token = localStorage.getItem("access_token");

  const res = await MS_API.get<GetTotalLeadsPropertyFloorsResponse>(
    "/api/v1/leadsproperty-floors/total",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        id: params.id,
        created_at_from: params.from,
        created_at_to: params.to,
        lead_property_id: params.lead_property_id,
        floor_name: params.floor_name,
        floor_type: params.floor_type,
      },
    }
  );
  return res.data.data[0].total || 0;
};
