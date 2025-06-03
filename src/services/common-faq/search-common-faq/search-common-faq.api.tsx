import { ICommonFaqGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchCommonFaqParams } from "./index";

export const searchCommonFaqApi = (params: ISearchCommonFaqParams) => {
  return new Promise<ICommonFaqGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: ICommonFaqGetApi[] }>("/api/v1/common-faq/list", {
      params: {
        created_at_from: params.from,
        created_at_to: params.to,
        id : params.id,
        faq_type: params.faq_type,
        faq_q : params.faq_q,
        faq_a : params.faq_a,
        page: params.page,
        size: params.size,
      },
    })
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};
