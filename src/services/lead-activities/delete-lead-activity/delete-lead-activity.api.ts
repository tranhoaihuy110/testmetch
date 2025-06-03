import { MS_API } from "../../api";

export const deleteLeadActivityApi = (activity_id?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!activity_id) return reject(new Error("Missing activity_id"));

    MS_API.delete<never[]>(`/api/v1/leadactivities/delete/${activity_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
