/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";
import { IGetTotalApiLogsParams } from "./index";
interface GetTotalApiLogsResponse {
  data: { total: number }[];
}
export const getTotalApiLogsApi = async (params: IGetTotalApiLogsParams) => {
  const token = localStorage.getItem("access_token");
  const res = await MS_API.get<GetTotalApiLogsResponse>(
    "/api/v1/api-log/total",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id: params.id,
        name_log: params.name_log,
        create_date_from: params.from,
        create_date_to: params.to,
      },
    }
  );
  return res.data.data[0].total || 0;
};
