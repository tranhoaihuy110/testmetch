import { ILeadsourcesGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchLeadsourcesParams } from "./index";

export const searchLeadsourcesApi = (params: ISearchLeadsourcesParams) => {
  return new Promise<ILeadsourcesGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: ILeadsourcesGetApi[] }>("/api/v1/leadsources/list", {
      params: {
        source_id: params.source_id,
        source_name: params.source_name,
        description: params.description,
        page: params.page,
        size: params.size,
      },
    })
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};
