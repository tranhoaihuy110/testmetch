/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILeadsourcesGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getLeadsourcesApi = (params?: Record<string, any>) => {
  return new Promise<{ data: ILeadsourcesGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: ILeadsourcesGetApi[] }>("/api/v1/leadsources/list", {
      params,
    })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
