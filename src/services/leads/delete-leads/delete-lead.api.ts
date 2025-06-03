import { MS_API } from "../../api";

export const deleteLeadsApi = (lead_id?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!lead_id) return reject(new Error("Missing lead_id"));

    MS_API.delete<never[]>(`/api/v1/leads/delete/${lead_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
