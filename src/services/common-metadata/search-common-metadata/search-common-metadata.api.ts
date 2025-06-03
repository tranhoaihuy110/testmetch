import { ICommonMetadataGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchCommonMetadataParams } from "./index";

export const searchCommonMetadataApi = (params: ISearchCommonMetadataParams) => {
  return new Promise<ICommonMetadataGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: ICommonMetadataGetApi[] }>(
      "/api/v1/common-metadata/list",
      {
        params: {
          created_at_from: params.from,
          created_at_to: params.to,
          id: params.id,
          meta_key: params.meta_key,
          size: params.size,
          page: params.page,
        },
      }
    )
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};
