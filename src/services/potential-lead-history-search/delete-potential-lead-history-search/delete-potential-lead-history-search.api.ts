import { MS_API } from "../../api";

export const deletePotentialLeadHistorySeachApi = (id?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!id) return reject(new Error("Missing id "));

    MS_API.delete<never[]>(`/api/v1/potential-lead-history-search/delete/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
