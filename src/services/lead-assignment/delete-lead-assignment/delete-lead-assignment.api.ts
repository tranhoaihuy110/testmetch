import { MS_API } from "../../api";

export const deleteLeadAssignmentApi = (assignment_id?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!assignment_id) return reject(new Error("Missing assignment_id"));

    MS_API.delete<never[]>(`/api/v1/leadassignments/delete/${assignment_id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
