/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";

export const postPropertiesApi = (value?: Record<string, any>) => {
  return new Promise<Record<string, any>>((resolve, reject) => {
    MS_API.post<Record<string, any>>("/api/v1/properties/insert", value)
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
