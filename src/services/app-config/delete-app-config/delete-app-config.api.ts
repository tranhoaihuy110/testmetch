
import { MS_API } from "../../api";

export const deleteAppConfigApi = (key?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!key) return reject(new Error("Missing key"));

    MS_API.delete<never[]>(`/api/v1/app-config/delete/${key}`)
      .then((res) => {key
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
