import { MS_API } from "../../api";

export const deleteOwnersApi = (owner_id?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!owner_id) return reject(new Error("Missing owner_id"));

    MS_API.delete<never[]>(`/api/v1/leads/delete/${owner_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
