/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";
import { IGetTotalMartPotentialLeadOrderParams } from "./index";
interface GetTotalMartPotentialLeadOrderResponse {
  data: { total: number }[];
}
export const getTotalMartPotentialLeadOrderApi = async (
  params: IGetTotalMartPotentialLeadOrderParams
) => {
  const token = localStorage.getItem("access_token");
  const res = await MS_API.get<GetTotalMartPotentialLeadOrderResponse>(
    "/api/v1/mart-potential-lead-order/total",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        potential_lead_order_id: params.potential_lead_order_id,
        full_address: params.full_address,
        postal_code: params.postal_code,
        username_order: params.username_order,
        order_status: params.order_status,
        updated_at_from: params.updated_at_from,
        updated_at_to: params.updated_at_to,
        created_at_from: params.from,
        created_at_to: params.to,

      },
    }
  );
  return res.data.data[0].total || 0;
};
