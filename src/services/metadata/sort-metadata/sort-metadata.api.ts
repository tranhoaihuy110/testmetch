
import { IMetaDataApi } from "../../../models";
import { MS_API } from "../../api";

export interface ISortMetaDataParams {
  data_type?: string;
  page?: number;
  size?: number;
  option: string;
  ascDesc: string;
}

export const sortMetaDataApi = async (
  params: ISortMetaDataParams
): Promise<IMetaDataApi[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token is missing");

  const queryParams = {
    page: params.page ?? 1,
    size: params.size ?? 10,
    sort: `${params.option},${params.ascDesc}`,
    data_type: params.data_type,
  };

  const res = await MS_API.get<{ data: IMetaDataApi[] }>("/api/v1/common_metadata_partner/get-list", {
    params: queryParams,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};
