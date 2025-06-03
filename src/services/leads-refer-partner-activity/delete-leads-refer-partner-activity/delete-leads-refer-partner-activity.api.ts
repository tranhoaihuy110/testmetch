import { MS_API } from "../../api";

export const deleteLeadsReferPartnerActivityApi = (id?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!id) return reject(new Error("Missing id"));

    MS_API.delete<never[]>(`/api/v1/leads-refer-partner-activity/delete/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
