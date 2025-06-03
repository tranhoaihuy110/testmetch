import { ILeadsPropertyGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getLeadsPropertyApi = (params?: Record<string, any>) => {
  return new Promise<{ data: ILeadsPropertyGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: ILeadsPropertyGetApi[] }>("/api/v1/leadsproperty/list", {
      params,
    })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
