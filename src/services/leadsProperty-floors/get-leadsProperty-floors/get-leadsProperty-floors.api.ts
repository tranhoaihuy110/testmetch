/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILeadPropertyFloorsGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getLeadPropertyFloorsApi = (params?: Record<string, any>) => {
  return new Promise<{ data: ILeadPropertyFloorsGetApi[] }>(
    (resolve, reject) => {
      MS_API.get<{ data: ILeadPropertyFloorsGetApi[] }>(
        "/api/v1/leadsproperty-floors/list",
        { params }
      )
        .then((res) => resolve(res.data))
        .catch(() => reject());
    }
  );
};
