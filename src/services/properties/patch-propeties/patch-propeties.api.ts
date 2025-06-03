/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";

export const patchPropertiesApi = (value?: Record<string, any>) => {
  const { property_id, ...payload } = value || {};
  if (!property_id) {
    return Promise.reject(new Error("property_id is required for update"));
  }
  return new Promise<Record<string, any>>((resolve, reject) => {
    MS_API.patch(`/api/v1/properties/update/${property_id}`, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
