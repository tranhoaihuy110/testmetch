/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";
import { IGetTotalLeadsPropertyParams } from "./index";
interface GetTotalLeadsPropertyResponse {
  data: { total: number }[];
}
export const getTotalLeadsPropertyApi = async (
  params: IGetTotalLeadsPropertyParams
) => {
  const token = localStorage.getItem("access_token");
  const res = await MS_API.get<GetTotalLeadsPropertyResponse>(
    "/api/v1/leadsproperty/total",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        created_at_from: params.from,
        created_at_to: params.to,
        email: params.email,
        lead_property_id: params.lead_property_id,
      },
    }
  );
  return res.data.data[0].total || 0;
};
