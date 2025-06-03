/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILeadsPropertyRoomsGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getLeadsPropertyRoomsApi = (params?: Record<string, any>) => {
  return new Promise<{ data: ILeadsPropertyRoomsGetApi[] }>(
    (resolve, reject) => {
      MS_API.get<{ data: ILeadsPropertyRoomsGetApi[] }>(
        "/api/v1/leadsproperty-rooms/list",
        { params }
      )
        .then((res) => resolve(res.data))
        .catch(() => reject());
    }
  );
};
