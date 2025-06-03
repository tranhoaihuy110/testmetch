import { MS_API } from "../../api";

export const deleteLeadsReferPartnerApi = (refer_partner_id?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!refer_partner_id) return reject(new Error("Missing refer_partner_id"));

    MS_API.delete<never[]>(
      `/api/v1/leads-refer-partner/delete/${refer_partner_id}`
    )
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
