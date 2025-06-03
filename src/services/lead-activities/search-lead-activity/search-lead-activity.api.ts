import { ILeadActivityGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchLeadActivityParams } from "./index";

export const searchLeadActivityApi = (params: ISearchLeadActivityParams) => {
  return new Promise<ILeadActivityGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: ILeadActivityGetApi[] }>("/api/v1/leadactivities/list", {
      params: {
        activity_id: params.activity_id,
        activity_type: params.activity_type,
        lead_id: params.lead_id,
        email: params.email,
        status: params.status,
        activity_date_from: params.from,
        activity_date_to: params.to,
        page: params.page,
        size: params.size,
      },
    })
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};
