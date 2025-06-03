import { ILeadPropertyFloorsGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchLeadsPropertyFloorsParams } from "./index";

export const searchLeadPropertyFloorsApi = (
  params: ISearchLeadsPropertyFloorsParams
) => {
  return new Promise<ILeadPropertyFloorsGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: ILeadPropertyFloorsGetApi[] }>(
      "/api/v1/leadsproperty-floors/list",
      {
        params: {
          id: params.id,
          lead_property_id: params.lead_property_id,
          created_at_from: params.from,
          created_at_to: params.to,
          floor_type: params.floor_type,
          floor_name: params.floor_name,
          page: params.page,
          size: params.size,
        },
      }
    )
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};
