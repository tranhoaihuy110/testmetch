import { MS_API } from "../../api";

export const deletePropertyOwnerShipApi = (ownership_id?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!ownership_id) return reject(new Error("Missing ownership_id"));

    MS_API.delete<never[]>(`/api/v1/property-owner-ship/delete/${ownership_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
