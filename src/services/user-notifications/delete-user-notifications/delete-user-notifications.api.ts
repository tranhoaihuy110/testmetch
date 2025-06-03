import { MS_API } from "../../api";

export const deleteUserNotificationsApi = (id?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!id) return reject(new Error("Missing id"));

    MS_API.delete<never[]>(`/api/v1/user-notifications/delete/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
