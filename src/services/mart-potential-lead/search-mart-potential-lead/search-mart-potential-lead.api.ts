import { IMartPotentialLeadGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchMartPotentialLeadParams } from "./index";

export const searchMartPotentialLeadsApi = (params: ISearchMartPotentialLeadParams) => {
  return new Promise<IMartPotentialLeadGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: IMartPotentialLeadGetApi[] }>("/api/v1/mart-potential-lead/list", {  
      params: {
        potential_lead_id: params.potential_lead_id,
        created_at_from: params.from,
        created_at_to: params.to,
        email:params.email,
        page: params.page,
        size: params.size
      },
    })
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};