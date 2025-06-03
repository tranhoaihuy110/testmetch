import { ILeadsPropertyRoomsGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchLeadsPropertyRoomsParams } from "./index";

export const searchLeadsPropertyRoomsApi = (
  params: ISearchLeadsPropertyRoomsParams
) => {
  return new Promise<ILeadsPropertyRoomsGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: ILeadsPropertyRoomsGetApi[] }>(
      "/api/v1/leadsproperty-rooms/list",
      {
        params: {
          id: params.id,
          lead_property_id: params.lead_property_id,
          floor_id: params.floor_id,
          floor_name: params.floor_name,
          room_type: params.room_type,
          room_name: params.room_name,
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
