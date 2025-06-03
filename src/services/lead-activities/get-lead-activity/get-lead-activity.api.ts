/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILeadActivityGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getLeadActivityApi = (params?: Record<string, any>) => {
  return new Promise<{ data: ILeadActivityGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: ILeadActivityGetApi[] }>("/api/v1/leadactivities/list", {
      params,
    })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
