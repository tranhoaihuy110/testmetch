import { MS_API } from "../../api";

export const patchRentalsApi = (value?: Record<string, any>) => {
  const { rental_id, ...payload } = value || {};
  if (!rental_id) {
    return Promise.reject(new Error("rental_id is required for update"));
  }
  return new Promise<Record<string, any>>((resolve, reject) => {
    MS_API.patch(`/api/v1/rentals/update/${rental_id}`, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
