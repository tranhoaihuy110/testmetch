/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPropertyOwnerShipGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getPropertyOwnerShipApi = (params?: Record<string, any>) => {
  return new Promise<{ data: IPropertyOwnerShipGetApi[] }>(
    (resolve, reject) => {
      MS_API.get<{ data: IPropertyOwnerShipGetApi[] }>(
        "/api/v1/property-owner-ship/list",
        { params }
      )
        .then((res) => resolve(res.data))
        .catch(() => reject());
    }
  );
};
