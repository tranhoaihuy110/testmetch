import { IPotentialLeadActionGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchPotentialLeadActionParams } from "./index";

export const searchPotentialLeadActionApi = (
  params: ISearchPotentialLeadActionParams
) => {
  return new Promise<IPotentialLeadActionGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: IPotentialLeadActionGetApi[] }>(
      "/api/v1/potential-lead-action/list",
      {
        params: {
          id: params.id,
          potential_lead_id: params.potential_lead_id,
          list_potential_lead_id: params.list_potential_lead_id,
          last_name: params.last_name,
          action_username: params.action_username,
          action_type: params.action_type,
          action_username_id: params.action_username_id,
          create_at_from: params.from,
          create_at_to: params.to,
          page: params.page,
          size: params.size,
        },
      }
    )
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};
