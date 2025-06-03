/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";
import { IGetTotalMetaDataParams } from "./index";
interface GetTotalMetaDataResponse {
  data: { total: number }[];
}
export const getTotalMetaDataApi = async (params: IGetTotalMetaDataParams) => {
  const token = localStorage.getItem("access_token");
  const res = await MS_API.get<GetTotalMetaDataResponse>(
    "/api/v1/common_metadata_partner/total",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        data_type: params.data_type,
        search_id: params.id,
        search_from_date: params.from,
        search_to_date: params.to,
      },
    }
  );
  return res.data.data[0].total || 0;
};
