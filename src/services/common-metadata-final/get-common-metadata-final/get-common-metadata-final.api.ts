import { ICommonMetadataFinalGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getCommonMetadataFinalApi = (params?: Record<string, any>) => {
  return new Promise<{ data: ICommonMetadataFinalGetApi[] }>(
    (resolve, reject) => {
      MS_API.get<{ data: ICommonMetadataFinalGetApi[] }>(
        "/api/v1/common-metadata-final/list",
        { params }
      )
        .then((res) => resolve(res.data))
        .catch(() => reject());
    }
  );
};
