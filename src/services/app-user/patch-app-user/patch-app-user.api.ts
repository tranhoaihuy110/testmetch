/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";

export const patchAppUserApi = (value?: Record<string, any>) => {
  const { user_id, ...payload } = value || {};
  if (!user_id) {
    return Promise.reject(new Error("user_id is required for update"));
  }
  return new Promise<Record<string, any>>((resolve, reject) => {
    MS_API.patch(`/api/v1/app-user/update/${user_id}`, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
