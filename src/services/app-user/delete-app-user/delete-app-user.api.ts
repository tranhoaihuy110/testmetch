import { MS_API } from "../../api";

export const deleteAppUserApi = (user_id?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!user_id) return reject(new Error("Missing user_id"));

    MS_API.delete<never[]>(`/api/v1/app-user/delete/${user_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
