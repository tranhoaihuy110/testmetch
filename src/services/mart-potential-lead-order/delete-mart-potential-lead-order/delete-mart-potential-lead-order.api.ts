import { MS_API } from "../../api";

export const deleteMartPotentialLeadOrderApi = (source_id?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!source_id) return reject(new Error("Missing source id"));

    MS_API.delete<never[]>(
      `/api/v1/mart-potential-lead-order/delete/${source_id}`
    )
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
