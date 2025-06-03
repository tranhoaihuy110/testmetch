/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPotentialLeadHistorySearchGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getPotentialLeadHistorySearchApi = (
  params?: Record<string, any>
) => {
  return new Promise<{ data: IPotentialLeadHistorySearchGetApi[] }>(
    (resolve, reject) => {
      MS_API.get<{ data: IPotentialLeadHistorySearchGetApi[] }>(
        "/api/v1/potential-lead-history-search/list",
        { params }
      )
        .then((res) => resolve(res.data))
        .catch(() => reject());
    }
  );
};
