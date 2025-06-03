/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";
import { IGetTotalEntityFileMappingParams } from "./index";
interface GetTotalLeadsResponse {
  data: { total: number }[];
}
export const getTotalEntityFileMappingApi = async (params: IGetTotalEntityFileMappingParams) => {
  const token = localStorage.getItem("access_token");
  const res = await MS_API.get<GetTotalLeadsResponse>("/api/v1/entity-file-mapping/total", {
    headers: { Authorization: `Bearer ${token}` },
    params: {
        id: params.id,
        entity_type: params.entity_type,
        created_at_from: params.from,
        created_at_to: params.to
      },
  });
  return res.data.data[0].total || 0;
};
