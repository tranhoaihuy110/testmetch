/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";

export const patchLeadAssignmentApi = (value?: Record<string, any>) => {
  const { assignment_id, ...payload } = value || {};
  if (!assignment_id) {
    return Promise.reject(new Error("assignment_id is required for update"));
  }
  return new Promise<Record<string, any>>((resolve, reject) => {
    MS_API.patch(`/api/v1/leadassignments/update/${assignment_id}`, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
