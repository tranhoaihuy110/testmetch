/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILeadsReferPartnerActivityGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getLeadsReferPartnerActivityApi = (
  params?: Record<string, any>
) => {
  return new Promise<{ data: ILeadsReferPartnerActivityGetApi[] }>(
    (resolve, reject) => {
      MS_API.get<{ data: ILeadsReferPartnerActivityGetApi[] }>(
        "/api/v1/leads-refer-partner-activity/list",
        { params }
      )
        .then((res) => resolve(res.data))
        .catch(() => reject());
    }
  );
};
