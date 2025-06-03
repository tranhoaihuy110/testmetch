import { ICommonMetadataGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getCommonMetadataApi = (params?: Record<string, any>) => {
  return new Promise<{ data: ICommonMetadataGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: ICommonMetadataGetApi[] }>(
      "/api/v1/common-metadata/list",
      { params }
    )
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
