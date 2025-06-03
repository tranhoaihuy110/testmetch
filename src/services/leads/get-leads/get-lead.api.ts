/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILeadsGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getLeadsApi = (params?: Record<string, any>) => {
  return new Promise<{ data: ILeadsGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: ILeadsGetApi[] }>("/api/v1/leads/list", { params })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
