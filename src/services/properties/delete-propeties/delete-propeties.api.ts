import { MS_API } from "../../api";

export const deletePropertiesApi = (property_id?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!property_id) return reject(new Error("Missing property_id"));

    MS_API.delete<never[]>(`/api/v1/properties/delete/${property_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
