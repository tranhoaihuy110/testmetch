import { MS_API } from "../../api";

export const deleteLeadsourcesApi = (source_id?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!source_id) return reject(new Error("Missing source_id"));

    MS_API.delete<never[]>(`/api/v1/leadsources/delete/${source_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
