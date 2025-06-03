/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPropertiesGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getPropertiesApi = (params?: Record<string, any>) => {
  return new Promise<{ data: IPropertiesGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: IPropertiesGetApi[] }>("/api/v1/properties/list", {
      params,
    })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
