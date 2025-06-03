import { MS_API } from "../../api";
import { IGetTotalLeadsourcesParams } from "./index";
interface GetTotalLeadsourcesResponse {
  data: { total: number }[];
}
export const getTotalLeadsourcesApi = async (
  params: IGetTotalLeadsourcesParams
) => {
  const token = localStorage.getItem("access_token");
  const res = await MS_API.get<GetTotalLeadsourcesResponse>(
    "/api/v1/leadsources/total",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        source_id: params.source_id,
        source_name: params.source_name,
        description: params.description,
      },
    }
  );
  return res.data.data[0].total || 0;
};
