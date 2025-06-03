import { MS_API } from "../../api";

export const patchMartPotentialLeadOrderApi = (value?: Record<string, any>) => {
  const { potential_lead_order_id, ...payload } = value || {};
  if (!potential_lead_order_id) {
    return Promise.reject(
      new Error("potential_lead_order_id is required for update")
    );
  }
  return new Promise<Record<string, any>>((resolve, reject) => {
    MS_API.patch(
      `/api/v1/mart-potential-lead-order/update/${potential_lead_order_id}`,
      payload
    )
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
