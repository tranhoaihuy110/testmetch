import { MS_API } from "../../api";

export const patchAppConfigApi = (value?: Record<string, any>) => {
  const { key, ...payload } = value || {};
  if (!key) {
    return Promise.reject(new Error("key is required for update"));
  }
  return new Promise<Record<string, any>>((resolve, reject) => {
    MS_API.patch(`/api/v1/app-config/update/${key}`, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
