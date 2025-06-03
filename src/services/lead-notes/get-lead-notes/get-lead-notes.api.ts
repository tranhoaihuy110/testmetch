/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILeadNotesGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getLeadNotesApi = (params?: Record<string, any>) => {
  return new Promise<{ data: ILeadNotesGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: ILeadNotesGetApi[] }>("/api/v1/leadnotes/list", {
      params,
    })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
