import { MS_API } from "../../api";

export const deleteEntityFileMappingApi = (key?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!key) return reject(new Error('Missing lead_id'));

    MS_API.delete<never[]>(`/api/v1/entity-file-mapping/delete/${key}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
