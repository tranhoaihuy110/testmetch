import { MS_API } from "../../api";
import { IGetTotalPotentialLeadActionParams } from "./index";
interface GetTotalPotentialLeadActionResponse {
  data: { total: number }[];
}
export const getTotalPotentialLeadActionApi = async (
  params: IGetTotalPotentialLeadActionParams
) => {
  const token = localStorage.getItem("access_token");

  const res = await MS_API.get<GetTotalPotentialLeadActionResponse>(
    "/api/v1/potential-lead-action/total",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        id: params.id,
        potential_lead_id: params.potential_lead_id,
        list_potential_lead_id: params.list_potential_lead_id,
        action_username: params.action_username,
        action_username_id: params.action_username_id,
        action_type: params.action_type,
        create_at_from: params.from,
        create_at_to: params.to,
      },
    }
  );
  return res.data.data[0].total || 0;
};
