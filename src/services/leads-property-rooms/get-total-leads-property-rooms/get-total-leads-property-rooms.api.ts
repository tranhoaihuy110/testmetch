import { MS_API } from "../../api";
import { IGetTotalLeadsPropertyRoomsParams } from "./index";
interface GetTotalLeadsPropertyRoomsResponse {
  data: { total: number }[];
}
export const getTotalLeadsPropertyRoomsApi = async (
  params: IGetTotalLeadsPropertyRoomsParams
) => {
  const token = localStorage.getItem("access_token");

  const res = await MS_API.get<GetTotalLeadsPropertyRoomsResponse>(
    "/api/v1/leadsproperty-rooms/total",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        id: params.id,
        lead_property_id: params.lead_property_id,
        floor_id: params.floor_id,
        floor_name: params.floor_name,
        room_type: params.room_type,
        room_name: params.room_name,
        created_at_from: params.from,
        created_at_to: params.to,
      },
    }
  );
  return res.data.data[0].total || 0;
};
