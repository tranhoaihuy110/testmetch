import { ICommonMetadataFinalGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchCommonMetadataFinalParams } from "./index";

export const searchCommonMetadataFinalApi = (
  params: ISearchCommonMetadataFinalParams
) => {
  return new Promise<ICommonMetadataFinalGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: ICommonMetadataFinalGetApi[] }>(
      "/api/v1/common-metadata-final/list",
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
