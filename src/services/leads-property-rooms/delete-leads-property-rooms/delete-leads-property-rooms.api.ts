import { MS_API } from "../../api";

export const deleteLeadsPropertyRoomsApi = (id?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!id) return reject(new Error("Missing id"));

    MS_API.delete<never[]>(`/api/v1/leadsproperty-rooms/delete/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
