
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";
import { IGetTotalAppConfigParams } from "./index";
interface GetTotalAppConfigResponse {
  data: { total: number }[];
}
export const getTotalAppConfigApi = async (params: IGetTotalAppConfigParams) => {
  const token = localStorage.getItem("access_token");
  const res = await MS_API.get<GetTotalAppConfigResponse>("/api/v1/app-config/total", {
    headers: {
        Authorization: `Bearer ${token}`,
      },
    params: {
        key: params.key,
        created_at_from: params.from,
        created_at_to: params.to,

      },
  });
  return res.data.data[0].total || 0;
};
