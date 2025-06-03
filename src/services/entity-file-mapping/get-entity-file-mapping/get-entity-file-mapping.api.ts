import { IEntityFileMappingGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getEntityFileMappingApi = (params?: Record<string, any>) => {
  return new Promise<{ data: IEntityFileMappingGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: IEntityFileMappingGetApi[] }>("/api/v1/entity-file-mapping/list", { params })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
