import { MS_API } from "../../api";
import { IGetTotalPropertiesParams } from "./index";
interface GetTotalPropertiesResponse {
  data: { total: number }[];
}
export const getTotalPropertiesApi = async (
  params: IGetTotalPropertiesParams
) => {
  const token = localStorage.getItem("access_token");

  const res = await MS_API.get<GetTotalPropertiesResponse>(
    "/api/v1/properties/total",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        property_id: params.property_id,
        created_at_from: params.from,
        created_at_to: params.to,
        property_name: params.property_name,
        property_type: params.property_type,
        description: params.description,
        full_address: params.full_address,
        address: params.address,
        city: params.city,
        state: params.state,
        postal_code: params.postal_code,
        country: params.country,
        longtitude: params.longtitude,
        latitude: params.latitude,
        created_by: params.created_by,
      },
    }
  );
  return res.data.data[0].total || 0;
};
