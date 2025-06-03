/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILeadsReferPartnerGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getLeadsReferPartnerApi = (params?: Record<string, any>) => {
  return new Promise<{ data: ILeadsReferPartnerGetApi[] }>(
    (resolve, reject) => {
      MS_API.get<{ data: ILeadsReferPartnerGetApi[] }>(
        "/api/v1/leads-refer-partner/list",
        {
          params,
        }
      )
        .then((res) => resolve(res.data))
        .catch(() => reject());
    }
  );
};
