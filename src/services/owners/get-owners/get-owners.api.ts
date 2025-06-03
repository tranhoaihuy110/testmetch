/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOwnersGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getOwnersApi = (params?: Record<string, any>) => {
  return new Promise<{ data: IOwnersGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: IOwnersGetApi[] }>("/api/v1/owners/list", { params })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
