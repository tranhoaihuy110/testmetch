/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPotentialLeadActionGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getPotentialLeadActionApi = (params?: Record<string, any>) => {
  return new Promise<{ data: IPotentialLeadActionGetApi[] }>(
    (resolve, reject) => {
      MS_API.get<{ data: IPotentialLeadActionGetApi[] }>(
        "/api/v1/potential-lead-action/list",
        { params }
      )
        .then((res) => resolve(res.data))
        .catch(() => reject());
    }
  );
};
