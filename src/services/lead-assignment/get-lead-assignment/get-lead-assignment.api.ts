/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILeadAssignmentGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getLeadAssignmentApi = (params?: Record<string, any>) => {
  return new Promise<{ data: ILeadAssignmentGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: ILeadAssignmentGetApi[] }>(
      "/api/v1/leadassignments/list",
      {
        params,
      }
    )
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
