/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";

export const patchLeadActivityApi = (value?: Record<string, any>) => {
  const { activity_id, ...payload } = value || {};
  if (!activity_id) {
    return Promise.reject(new Error("activity_id is required for update"));
  }
  return new Promise<Record<string, any>>((resolve, reject) => {
    MS_API.patch(`/api/v1/leadactivities/update/${activity_id}`, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
