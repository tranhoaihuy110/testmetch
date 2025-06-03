/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";

export const patchPropertyOwnerShipApi = (value?: Record<string, any>) => {
  const { ownership_id, ...payload } = value || {};
  if (!ownership_id) {
    return Promise.reject(new Error("ownership_id is required for update"));
  }
  return new Promise<Record<string, any>>((resolve, reject) => {
    MS_API.patch(`/api/v1/property-owner-ship/update/${ownership_id}`, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
