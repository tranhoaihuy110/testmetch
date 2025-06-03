import { MS_API } from "../../api";
import { IGetTotalLeadAssignmentParams } from "./index";

interface GetTotalLeadAssignmentResponse {
  data: { total: number }[];
}
export const getTotalLeadAssignmentApi = async (
  params: IGetTotalLeadAssignmentParams
) => {
  const token = localStorage.getItem("access_token");

  const res = await MS_API.get<GetTotalLeadAssignmentResponse>(
    "/api/v1/leadassignments/total",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        assignment_id: params.assignment_id,
        lead_id: params.lead_id,
        assigned_to_id: params.assigned_to_id,
        assigned_to: params.assigned_to,
        email: params.email,
        assigned_date_from: params.from,
        assigned_date_to: params.to,
      },
    }
  );
  return res.data.data[0].total || 0;
};
