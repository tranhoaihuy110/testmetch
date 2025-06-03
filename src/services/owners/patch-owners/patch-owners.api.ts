/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";

export const patchOwnersApi = (value?: Record<string, any>) => {
  const { owner_id, ...payload } = value || {};
  if (!owner_id) {
    return Promise.reject(new Error("owner_id is required for update"));
  }
  return new Promise<Record<string, any>>((resolve, reject) => {
    MS_API.patch(`/api/v1/owners/update/${owner_id}`, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
