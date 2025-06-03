/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";
import { IGetTotalRentalsParams } from "./index";
interface GetTotalRentalsResponse {
  data: { total: number }[];
}
export const getTotalRentalsApi = async (params: IGetTotalRentalsParams) => {
  const token = localStorage.getItem("access_token");
  const res = await MS_API.get<GetTotalRentalsResponse>(
    "/api/v1/rentals/total",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        rental_id: params.rental_id,
        created_at_from: params.from,
        created_at_to: params.to,
        tenant_name: params.tenant_name,
        tenant_phone: params.tenant_phone,
        address: params.address,
        property_id: params.property_id,
        rental_price: params.rental_price,
      },
    }
  );
  return res.data.data[0].total || 0;
};
