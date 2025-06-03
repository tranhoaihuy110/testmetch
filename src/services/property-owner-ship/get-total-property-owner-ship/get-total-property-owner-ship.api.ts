import { MS_API } from "../../api";
import { IGetTotalPropertyOwnerShipParams } from "./index";
interface GetTotalPropertyOwnerShipResponse {
  data: { total: number }[];
}
export const getTotalPropertyOwnerShipApi = async (
  params: IGetTotalPropertyOwnerShipParams
) => {
  const token = localStorage.getItem("access_token");

  const res = await MS_API.get<GetTotalPropertyOwnerShipResponse>(
    "/api/v1/property-owner-ship/total",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        ownership_id: params.ownership_id,
        start_date_from: params.from,
        start_date_to: params.to,
        owner_id: params.owner_id,
      },
    }
  );
  return res.data.data[0].total || 0;
};
