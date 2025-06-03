import { ILeadsReferPartnerActivityGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchLeadsReferPartnerActivityParams } from "./index";

export const searchLeadsReferPartnerActivityApi = (
  params: ISearchLeadsReferPartnerActivityParams
) => {
  return new Promise<ILeadsReferPartnerActivityGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: ILeadsReferPartnerActivityGetApi[] }>(
      "/api/v1/leads-refer-partner-activity/list",
      {
        params: {
          refer_partner_id: params.refer_partner_id,
          status_old: params.status_old,
          status_new: params.status_new,
          id: params.id,
          user_action: params.user_action,
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
