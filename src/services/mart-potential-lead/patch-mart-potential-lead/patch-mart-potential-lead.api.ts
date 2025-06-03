import { MS_API } from "../../api";

export const patchMartPotentialLeadApi = (value?: Record<string, any>) => {
  const { potential_lead_id, ...payload } = value || {};
  if (!potential_lead_id) {
    return Promise.reject(new Error("lead_id is required for update"));
  }
  return new Promise<Record<string, any>>((resolve, reject) => {
    MS_API.patch(
      `/api/v1/mart-potential-lead/update/${potential_lead_id}`,
      payload
    )
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};