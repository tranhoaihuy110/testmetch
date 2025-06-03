import { MS_API } from "../../api";

export const deleteLeadNotesApi = (note_id?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!note_id) return reject(new Error("Missing note_id"));

    MS_API.delete<never[]>(`/api/v1/leadnotes/delete/${note_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
