/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";

export const patchUserProfileUrlMapApi = (value?: Record<string, any>) => {
  const { id, ...payload } = value || {};
  if (!id) {
    return Promise.reject(new Error("id is required for update"));
  }
  return new Promise<Record<string, any>>((resolve, reject) => {
    MS_API.patch(`/api/v1/user-profile-url-map/update/${id}`, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
