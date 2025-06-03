/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";

export const patchLeadsReferPartnerApi = (value?: Record<string, any>) => {
  const { refer_partner_id, ...payload } = value || {};
  if (!refer_partner_id) {
    return Promise.reject(new Error("refer_partner_id is required for update"));
  }
  return new Promise<Record<string, any>>((resolve, reject) => {
    MS_API.patch(
      `/api/v1/leads-refer-partner/update/${refer_partner_id}`,
      payload
    )
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
