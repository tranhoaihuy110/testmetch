
import { MS_API } from "../../api";

export const deleteCommonMetadataApi = (key?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!key) return reject(new Error("Missing key"));

    MS_API.delete<never[]>(`/api/v1/common-metadata/delete/${key}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
