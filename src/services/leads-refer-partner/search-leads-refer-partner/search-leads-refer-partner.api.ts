import { ILeadsReferPartnerGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchLeadsReferPartnerParams } from "./index";

export const searchLeadsReferPartnerApi = (
  params: ISearchLeadsReferPartnerParams
) => {
  return new Promise<ILeadsReferPartnerGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: ILeadsReferPartnerGetApi[] }>(
      "/api/v1/leads-refer-partner/list",
      {
        params: {
          refer_partner_id: params.refer_partner_id,
          email: params.email,
          updated_by: params.updated_by,
          refer_partner_status: params.refer_partner_status,
          lead_id: params.lead_id,
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
