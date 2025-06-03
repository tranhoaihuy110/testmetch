/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";
import { IGetTotalCommonFaqParams } from "./index";
interface GetTotalCommonFaqResponse {
  data: { total: number }[];
}
export const getTotalCommonFaqApi = async (params: IGetTotalCommonFaqParams) => {
  const token = localStorage.getItem("access_token");
  const res = await MS_API.get<GetTotalCommonFaqResponse>(
    "/api/v1/common-faq/total",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id: params.id ,
        faq_q: params.faq_q,
        created_at_from: params.from,
        created_at_to: params.to,
      },
    }
  );
  return res.data.data[0].total || 0;
};
