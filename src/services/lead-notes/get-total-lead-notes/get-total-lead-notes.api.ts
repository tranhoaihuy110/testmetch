import { MS_API } from "../../api";
import { IGetTotalLeadNotesParams } from "./index";

interface GetTotalLeadNotesResponse {
  data: { total: number }[];
}
export const getTotalLeadNotesApi = async (
  params: IGetTotalLeadNotesParams
) => {
  const token = localStorage.getItem("access_token");
  const res = await MS_API.get<GetTotalLeadNotesResponse>(
    "/api/v1/leadnotes/total",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        note_id: params.note_id,
        lead_id: params.lead_id,
        created_at_from: params.from,
        created_at_to: params.to,
      },
    }
  );
  return res.data.data[0].total || 0;
};
