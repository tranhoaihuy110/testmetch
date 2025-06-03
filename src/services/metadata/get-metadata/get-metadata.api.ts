import { IMetaDataApi } from "../../../models";
import { MS_API } from "../../api";

export const getMetaDataApi = (params?: Record<string, any>) => {
  return new Promise<{ data: IMetaDataApi[] }>((resolve, reject) => {
    MS_API.get<{ data: IMetaDataApi[] }>(
      "/api/v1/common_metadata_partner/get-list",
      { params }
    )
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
