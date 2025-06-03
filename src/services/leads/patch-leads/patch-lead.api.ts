/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";

export const patchLeadsApi = (value?: Record<string, any>) => {
  const { lead_id, ...payload } = value || {};
  if (!lead_id) {
    return Promise.reject(new Error("lead_id is required for update"));
  }
  return new Promise<Record<string, any>>((resolve, reject) => {
    MS_API.patch(`/api/v1/leads/update/${lead_id}`, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
