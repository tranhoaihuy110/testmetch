import { MS_API } from "../../api";
import { IGetTotalOwnersParams } from "./index";
interface GetTotalOwnersResponse {
  data: { total: number }[];
}
export const getTotalOwnersApi = async (params: IGetTotalOwnersParams) => {
  const token = localStorage.getItem("access_token");

  const res = await MS_API.get<GetTotalOwnersResponse>("/api/v1/owners/total", {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      owner_id: params.owner_id,
      created_at_from: params.from,
      created_at_to: params.to,
      email: params.email,
      phone_number: params.phone_number,
      last_name: params.last_name,
      first_name: params.first_name,
      address: params.address,
    },
  });
  return res.data.data[0].total || 0;
};
