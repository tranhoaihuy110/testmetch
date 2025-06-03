import { ILeadsGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchLeadsParams } from "./search-lead.type";

export const searchLeadsApi = (params: ISearchLeadsParams) => {
  return new Promise<ILeadsGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: ILeadsGetApi[] }>("/api/v1/leads/list", {
      params: {
        lead_id: params.lead_id,
        last_name: params.last_name,
        created_at_from: params.from,
        created_at_to: params.to,
        email: params.email,
        phone_number: params.phone_number,
        page: params.page,
        size: params.size,
      },
    })
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};
