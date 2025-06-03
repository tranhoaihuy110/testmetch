import { MS_API } from "../../api";

export const deleteLeadsPropertyApi = (lead_property_id?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!lead_property_id) return reject(new Error("Missing lead_property_id"));

    MS_API.delete<never[]>(`/api/v1/leadsproperty/delete/${lead_property_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
