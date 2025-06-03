import { MS_API } from "../../api";

export const deleteRentalsApi = (rental_id?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!rental_id) return reject(new Error("Missing rental_id"));

    MS_API.delete<never[]>(`/api/v1/rentals/delete/${rental_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
