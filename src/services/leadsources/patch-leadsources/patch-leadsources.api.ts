/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";

export const patchLeadsourcesApi = (value?: Record<string, any>) => {
  const { source_id, ...payload } = value || {};
  if (!source_id) {
    return Promise.reject(new Error("source_id is required for update"));
  }
  return new Promise<Record<string, any>>((resolve, reject) => {
    MS_API.patch(`/api/v1/leadsources/update/${source_id}`, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
