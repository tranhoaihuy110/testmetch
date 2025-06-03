import { IMartPotentialLeadOrderGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchMartPotentialLeadOrderParams } from "./index";

export const searchMartPotentialLeadOrderApi = (params: ISearchMartPotentialLeadOrderParams) => {
  return new Promise<IMartPotentialLeadOrderGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: IMartPotentialLeadOrderGetApi[] }>(
      "/api/v1/mart-potential-lead-order/list",
      {
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
          page: params.page,
          size: params.size,
        },
      }
    )
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};
